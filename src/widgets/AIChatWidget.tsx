import { useEffect, useRef, useState } from 'react'
import { WidgetCard } from '../components/common/WidgetCard'
import { streamAiResponse } from '../services/aiService'
import type { ChatMessage } from '../types/dashboard'

export function AIChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!scrollerRef.current) return
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userPrompt = input.trim()
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userPrompt,
      createdAt: new Date().toISOString(),
    }
    const assistantMessageId = crypto.randomUUID()

    const history = messages.slice(-8).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        createdAt: new Date().toISOString(),
      },
    ])
    setInput('')
    setLoading(true)

    try {
      await streamAiResponse({
        prompt: userPrompt,
        history,
        onToken: (token) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessageId ? { ...msg, content: msg.content + token } : msg)),
          )
        },
      })
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: 'I could not generate a response right now. Please try again.',
              }
            : msg,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <WidgetCard title="AI Chat" description="Ask quick domain questions">
      <div
        ref={scrollerRef}
        className="max-h-80 space-y-2 overflow-y-auto rounded-xl border border-slate-300 bg-white/80 p-4 dark:border-gray-800 dark:bg-gray-950/70"
      >
        {messages.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Start by asking for finance or health insights.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                message.role === 'user'
                  ? 'rounded-br-md bg-indigo-600 text-white'
                  : 'rounded-bl-md bg-slate-200 text-slate-800 dark:bg-gray-800 dark:text-slate-100'
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-xs text-slate-500 dark:text-slate-400">AI is typing...</p>}
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 p-2 dark:border-gray-800 dark:bg-gray-950/70">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-slate-100"
          placeholder="Ask for an insight..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </WidgetCard>
  )
}
