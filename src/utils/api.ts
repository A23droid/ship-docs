import type { GenerateRequest, GenerateResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export async function generateReadme(payload: GenerateRequest): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`Generation failed (${response.status}): ${errorText}`)
  }

  const data: GenerateResponse = await response.json()
  return data
}
