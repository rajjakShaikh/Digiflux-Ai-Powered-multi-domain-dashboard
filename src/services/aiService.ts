type ChatRole = 'user' | 'assistant'

export interface ChatHistoryMessage {
  role: ChatRole
  content: string
}

interface StreamChunkResponse {
  choices?: Array<{
    delta?: { content?: string }
    message?: { content?: string }
  }>
}

interface ChatErrorResponse {
  error?: {
    message?: string
  }
}

const DEFAULT_FALLBACK_MODELS = ['meta-llama/llama-3.1-8b-instruct:free', 'mistralai/mistral-7b-instruct:free']

function getMockAiResponse(prompt: string) {
  const lower = prompt.toLowerCase()
  if (lower.includes('finance')) return 'Finance insight: keep discretionary spending under 20% this week.'
  if (lower.includes('health')) return 'Health suggestion: add 15 minutes of light activity after lunch.'
  if (lower.includes('weather')) return 'Weather advisory: check humidity before scheduling outdoor workouts.'
  if (lower.includes('news')) return 'News summary: AI tooling and cloud optimization remain dominant themes.'
  return 'I can summarize trends across finance, health, weather, and news widgets.'
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

async function simulateStreaming(text: string, onToken: (token: string) => void) {
  const parts = text.split(' ')
  for (const part of parts) {
    onToken(`${part} `)
    await sleep(30)
  }
  return text
}

export async function streamAiResponse({
  prompt,
  history = [],
  onToken,
  signal,
}: {
  prompt: string
  history?: ChatHistoryMessage[]
  onToken: (token: string) => void
  signal?: AbortSignal
}): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const endpoint = import.meta.env.VITE_OPENAI_API_URL ?? 'https://openrouter.ai/api/v1/chat/completions'
  const primaryModel = import.meta.env.VITE_OPENAI_MODEL ?? 'meta-llama/llama-3.1-8b-instruct:free'
  const candidateModels = [primaryModel, ...DEFAULT_FALLBACK_MODELS].filter((m, i, arr) => arr.indexOf(m) === i)

  if (!apiKey) {
    return simulateStreaming(getMockAiResponse(prompt), onToken)
  }

  for (const model of candidateModels) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content:
              'You are a concise dashboard copilot. Give practical insights for finance, health, weather, and news in 1-2 short sentences.',
          },
          ...history.map((item) => ({ role: item.role, content: item.content })),
          { role: 'user', content: prompt },
        ],
      }),
      signal,
    })

    if (response.ok && response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const jsonPayload = trimmed.replace('data:', '').trim()
          if (jsonPayload === '[DONE]') return fullText.trim()

          const chunk = JSON.parse(jsonPayload) as StreamChunkResponse
          const token = chunk.choices?.[0]?.delta?.content ?? chunk.choices?.[0]?.message?.content ?? ''
          if (!token) continue
          fullText += token
          onToken(token)
        }
      }

      return fullText.trim()
    }

    const errorJson = (await response.json().catch(() => ({}))) as ChatErrorResponse
    const message = errorJson.error?.message?.toLowerCase() ?? ''
    const unavailable = response.status === 404 || message.includes('no endpoints found')
    if (!unavailable) {
      throw new Error('AI provider request failed. Check endpoint/key/model configuration.')
    }
  }

  throw new Error('All configured AI models are currently unavailable.')
}
