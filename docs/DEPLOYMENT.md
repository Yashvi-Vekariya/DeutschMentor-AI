# Deployment

## Frontend on Vercel

1. Import `frontend`.
2. Set `NEXT_PUBLIC_API_URL=https://your-railway-api/api`.
3. Build command: `npm run build`.

## Backend on Railway

1. Deploy `backend`.
2. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. Add environment variables from `.env.example`.

## Clerk

Create a Clerk app, add allowed origins, and set `CLERK_JWKS_URL` in the backend. Protect memory, exam, and dashboard routes with JWT verification before public launch.

## Pinecone

Create an index named `deutschmentor`. Replace the local `KnowledgeBase` service with Pinecone upsert/query calls while keeping the current API contract.

