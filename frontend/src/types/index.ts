// frontend/src/types/index.ts

/** Body sent to POST /shipdocs */
export interface GenerateRequest {
  github_url: string        // matches backend ShipDocsRequest.github_url
  description?: string      // matches backend ShipDocsRequest.description
}

/** Successful response from POST /shipdocs */
export interface GenerateResponse {
  markdown_text: string     // matches backend ShipDocsResponse.markdown_text
}

/**
 * FastAPI error response shape.
 * HTTPException  → { detail: string }
 * Validation err → { detail: Array<{ msg, loc, type }> }
 */
export interface FastAPIValidationError {
  msg: string
  loc?: (string | number)[]
  type?: string
}

export interface FastAPIError {
  detail: string | FastAPIValidationError[]
}

export type AppView = 'landing' | 'loading' | 'result'

export interface FeatureItem {
  icon: string
  title: string
  description: string
}