# Architecture

```mermaid
flowchart TD
  UI["Next.js learner app"] --> API["FastAPI API"]
  API --> ORCH["Agent Orchestrator"]
  ORCH --> T["Teacher Agent"]
  ORCH --> P["Pronunciation Coach"]
  ORCH --> C["Conversation Partner"]
  ORCH --> E["Exam Evaluator"]
  ORCH --> L["Learning Planner"]
  ORCH --> M["Motivation Coach"]
  ORCH --> MEM["Memory Agent"]
  ORCH --> RAG["RAG Knowledge Base"]
  RAG --> VDB["Pinecone or local vector index"]
  MEM --> PG["PostgreSQL"]
  ORCH --> AI["Groq / Gemini / OpenAI-compatible provider"]
  API --> SPEECH["Whisper STT + German TTS adapters"]
```

## Agent Contract

Every agent receives:

- Learner memory
- Retrieved curriculum snippets
- Chat mode and task
- Safety and scoring rubric

Every agent returns:

- Answer
- Sources
- Suggested next actions
- Optional score payload

