// frontend/src/utils/api.ts
import type { GenerateRequest, GenerateResponse, FastAPIError } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

/**
 * Extracts a human-readable message from a FastAPI error response body.
 *   { "detail": "some string" }          — HTTPException
 *   { "detail": [{ "msg": "...", ... }] } — Pydantic validation error
 */
async function parseFastAPIError(response: Response): Promise<string> {
  try {
    const body: FastAPIError = await response.json()
    if (typeof body.detail === 'string') {
      return body.detail
    }
    if (Array.isArray(body.detail) && body.detail.length > 0) {
      return body.detail.map((e) => e.msg).join('; ')
    }
  } catch {
    // Response body was not JSON — fall back to HTTP status
  }
  return `Request failed (${response.status}: ${response.statusText})`
}

export async function generateReadme(
  payload: GenerateRequest
): Promise<GenerateResponse> {
  let response: Response

  try {
    response = await fetch(`${API_BASE}/shipdocs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'Cannot reach the backend. Make sure the FastAPI server is running on port 8000.'
    )
  }

  if (!response.ok) {
    const message = await parseFastAPIError(response)
    throw new Error(message)
  }

  return response.json() as Promise<GenerateResponse>
}