# AI-Powered Multi-Domain Dashboard

A modern React + TypeScript dashboard that combines finance, health, news, weather, and an AI chat assistant into a single responsive interface.

This project focuses on building a **scalable frontend architecture**, clean UI, and integrating real-world features like drag-and-drop layouts, live data updates, and AI-powered insights.

## Project Overview

I built this dashboard as part of a frontend assignment to demonstrate how a modular React application can handle multiple domains in a clean and scalable way.

The goal was not just to implement features, but to structure the application in a way that resembles a real production project — with proper separation of concerns, reusable components, and maintainable code.

---

## Setup Instructions

1. Install dependencies
   `npm install`

2. Create environment file
   `.env`

Create a .env file in the root directory (my-app) and add the following:

VITE_OPENAI_API_KEY=your_api_key_here
VITE_OPENAI_API_URL=https://openrouter.ai/api/v1/chat/completions
VITE_OPENAI_MODEL=openai/gpt-4o-mini

To get your API key:

Go to https://openrouter.ai/workspaces/default/keys
Generate a new API key
Paste it into VITE_OPENAI_API_KEY

3. Run project
   `npm run dev`

4. Build for production
   `npm run build`

---

## Features Implemented

### Dashboard Layout

- Drag-and-drop widget reordering using `@dnd-kit`
- Persistent layout using `localStorage`
- Responsive grid (mobile, tablet, desktop)
- Flexible widget sizing (AI chat takes larger space)

---

### Finance Widget

- Displays mock financial data
- Line and bar charts using `recharts`
- Trend-based insights

---

### Health Widget

- Tracks steps, sleep, and calories
- Progress bars for better visualization
- Clean hierarchy for metrics

---

### News Widget

- Fetches articles from public API
- Displays thumbnail, source, and date
- Handles API fallback gracefully

---

### Weather Widget

- City-based weather search
- Uses geocoding + forecast APIs
- Displays real-time weather data

---

### AI Chat Widget

- Integrated with OpenAI-compatible API (via OpenRouter)
- Supports dynamic, non-repetitive responses
- Context-aware replies using dashboard data
- Loading state and smooth chat UI

---

### Live Data Simulation

- Simulates real-time updates for finance and health data
- Uses interval-based updates without breaking UI

---

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Context API + custom hooks
- @dnd-kit library (drag and drop)
- Recharts (charts)
- Fetch API (service layer)

---

## Folder Structure

src/
├── components/ # shared UI components
├── widgets/ # domain-specific widgets
├── hooks/ # reusable logic
├── services/ # API calls
├── context/ # global state
├── utils/ # helpers & AI logic
├── types/ # TypeScript types
├── pages/ # page structure
└── constants/ # app constants

## Environment Variables

VITE_OPENAI_API_KEY=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
VITE_OPENAI_API_URL=https://openrouter.ai/api/v1/chat/completions
VITE_OPENAI_MODEL=openai/gpt-4o-mini

---

## Architecture Decisions

- Used **Context API + custom hooks** to avoid prop drilling while keeping the setup lightweight
- Introduced a **service layer** to isolate API logic from UI components
- Designed widgets as **independent modules** for scalability
- Used **localStorage abstraction** to persist layout and theme
- Focused on **reusable UI components** for consistency

---

## Tradeoffs

- Context API works well for current scope, but Zustand/Redux could scale better for larger apps
- Some public APIs may be unreliable, so fallback handling is added
- AI calls are handled on the client side for simplicity (backend proxy recommended for production)

---

## Assumptions

- No authentication is required
- Users interact with dashboard anonymously
- Widget customization is limited to layout and theme

---

## Known Limitations

- Free AI models can sometimes be unavailable or rate-limited
- API keys are used on the client side (not secure for production)
- Data is partially simulated and not fully real-time

---

## Key Highlights

- Clean and scalable architecture
- Drag-and-drop dashboard with persistence
- Real API integrations (news + weather)
- AI-powered chat with contextual responses
- Responsive and modern UI
- Proper loading, empty, and error states

## Future Improvements

- Move AI integration to backend for better security
- Add chat streaming (real-time typing effect)
- Improve AI with deeper context awareness
- Add unit and integration testing
- Optimize bundle size with code splitting

---

## Notes

This project was built with a focus on writing clean, maintainable code and demonstrating real-world frontend development practices rather than just completing UI requirements.
