export interface GenerateRequest {
  repoUrl: string
  description?: string
}

export interface GenerateResponse {
  markdown: string
}

export type AppView = 'landing' | 'loading' | 'result'

export interface FeatureItem {
  icon: string
  title: string
  description: string
}
