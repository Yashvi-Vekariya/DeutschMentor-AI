# API

- `GET /api/health`
- `GET /api/curriculum/a1`
- `GET /api/lessons/{lesson_id}`
- `POST /api/chat`
- `POST /api/planner`
- `GET /api/memory/{user_id}`
- `PATCH /api/memory/{user_id}`
- `GET /api/rag/search?q=articles`
- `POST /api/correction`
- `GET /api/exam/goethe-a1`
- `GET /api/dashboard/demo`

Example:

```json
{
  "message": "Explain der die das in Hindi",
  "mode": "teacher",
  "user_id": "demo-user"
}
```

