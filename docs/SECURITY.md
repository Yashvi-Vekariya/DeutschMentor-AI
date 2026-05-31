# Security Best Practices

- Never expose provider API keys in the frontend.
- Validate Clerk JWTs on all user-specific routes.
- Store learner memory as private data and encrypt sensitive records at rest.
- Rate limit chat, speech, exam, and PDF generation endpoints.
- Log provider latency and errors, but do not log full private conversations in production.
- Use CORS allowlists per environment.
- Add content moderation and exam integrity checks before certification.

