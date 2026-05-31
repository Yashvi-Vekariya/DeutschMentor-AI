import httpx
from app.core.config import get_settings


class AIProvider:
    async def complete(self, system: str, user: str) -> str:
        settings = get_settings()
        if settings.ai_provider in {"auto", "groq"} and settings.groq_api_key:
            return await self._groq(settings.groq_api_key, settings.groq_model, system, user)
        if settings.ai_provider in {"auto", "gemini"} and settings.gemini_api_key:
            return await self._gemini(settings.gemini_api_key, settings.gemini_model, system, user)
        if settings.ai_provider in {"auto", "openai"} and settings.openai_api_key:
            return await self._openai(settings.openai_api_key, settings.openai_model, system, user)
        return self._local(system, user)

    async def _groq(self, api_key: str, model: str, system: str, user: str) -> str:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={"model": model, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}], "temperature": 0.35},
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]

    async def _gemini(self, api_key: str, model: str, system: str, user: str) -> str:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, json={"contents": [{"parts": [{"text": f"{system}\n\n{user}"}]}]})
            response.raise_for_status()
            return response.json()["candidates"][0]["content"]["parts"][0]["text"]

    async def _openai(self, api_key: str, model: str, system: str, user: str) -> str:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={"model": model, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}], "temperature": 0.35},
            )
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]

    def _local(self, system: str, user: str) -> str:
        return (
            "Local tutor response: I can teach this without an external key. "
            "For German, start with a clear A1 pattern, add English and Hindi meaning, "
            "then practice one speaking and one writing task. "
            f"Focus request: {user[:420]}"
        )

