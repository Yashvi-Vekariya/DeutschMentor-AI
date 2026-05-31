# DeutschMentor AI

DeutschMentor AI is a production-shaped AI German learning platform for A1-C2 learners. It includes a multi-agent tutoring backend, A1 curriculum database, RAG-style semantic search, memory-aware personalization, exam simulation, voice workflow placeholders, and a premium responsive Next.js interface.

## Stack

- Frontend: Next.js, TypeScript, TailwindCSS, Framer Motion, lucide-react
- Backend: FastAPI, Pydantic, provider adapters for Groq, Gemini, OpenAI, and deterministic local fallback
- Memory/RAG: pluggable in-memory vector search with Pinecone-ready service boundaries
- Database target: PostgreSQL schema in `docs/DATABASE_SCHEMA.sql`
- Auth target: Clerk integration notes in `docs/DEPLOYMENT.md`

## Quick Start

Backend:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8001
 ```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:3010`.

## Free AI Provider Keys

Create `backend/.env` from `backend/.env.example`. The app checks providers in this order:

1. Groq (`GROQ_API_KEY`)
2. Gemini (`GEMINI_API_KEY`)
3. OpenAI-compatible (`OPENAI_API_KEY`)
4. Local deterministic fallback

## Included Systems

- 7 specialized agents: teacher, pronunciation coach, conversation partner, exam evaluator, planner, motivation coach, memory agent
- Complete Goethe A1 topic map with lesson generation fields
- German-English-Hindi vocabulary
- Smart correction endpoint
- 30/60/90 day adaptive roadmap
- Goethe A1 exam simulator
- Long-term memory model and progress analytics
- CI workflow, tests, deployment guide, diagrams, security notes
- Fature :- https://deutsch-mentor-os.lovable.app/


