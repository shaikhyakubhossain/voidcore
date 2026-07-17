# VoidEngine

A sleek full-stack AI chat experience built with Next.js on the frontend and Express on the backend. VoidEngine brings together a polished chat UI, streaming responses, markdown rendering, and model/provider selection in one modern app.

## ✨ What makes it special

- Beautiful chat-first interface with a minimal, futuristic feel
- Streaming AI responses for a more interactive experience
- Rich markdown support with syntax-highlighted code blocks
- Flexible model and provider selection
- Clear separation between frontend and backend services for fast iteration

## 🛠 Tech stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Sass + Tailwind-based styling
- Custom chat components and markdown rendering

### Backend
- Express.js
- TypeScript
- Zod for validation
- Google Gemini API integration

## 📁 Project structure

```text
BE/      # Express API and AI provider integration
FE/      # Next.js frontend and chat UI
```

## 🚀 Getting started

### Prerequisites

- Node.js 18+
- npm
- A Gemini API key from Google AI Studio

### 1) Install dependencies

```bash
git clone <your-repo-url>
cd voidcore

cd FE && npm install
cd ../BE && npm install
```

### 2) Configure environment variables

Create a file named `.env` inside the backend folder:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Create a file named `.env.local` inside the frontend folder:

```env
BACKEND_API_URL=http://localhost:5000
```

### 3) Run the app locally

Start the backend:

```bash
cd BE
npm run dev
```

Start the frontend in a second terminal:

```bash
cd FE
npm run dev
```

Then open:

- Frontend: http://localhost:3000
- Backend health check: http://localhost:5000/health

## 🧪 Available scripts

### Frontend

```bash
cd FE
npm run dev      # start development server
npm run build    # create production build
npm run lint     # run lint checks
```

### Backend

```bash
cd BE
npm run dev      # start development server with tsx watch
npm run build    # compile TypeScript
npm run start    # run built server
```

## 🔥 Features at a glance

- Real-time AI chat experience
- Markdown rendering for structured responses
- Code block styling and syntax highlighting
- Provider/model switching for different AI backends
- Clean, modular architecture for future expansion

## 🧭 Roadmap

- Add authentication and user accounts
- Persist chat history in a database
- Support additional AI providers
- Improve conversation search and organization

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
