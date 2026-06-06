// frontend/src/hooks/useGenerate.ts
import { useState, useCallback } from 'react'
import { generateReadme } from '../utils/api'
import type { AppView } from '../types'

interface UseGenerateReturn {
  markdown: string
  view: AppView
  error: string | null
  repoUrl: string
  description: string
  setRepoUrl: (url: string) => void
  setDescription: (desc: string) => void
  handleGenerate: () => Promise<void>
  handleRegenerate: () => Promise<void>
  handleReset: () => void
  setMarkdown: (md: string) => void
}

export function useGenerate(): UseGenerateReturn {
  const [markdown, setMarkdown] = useState<string>('')
  const [view, setView] = useState<AppView>('landing')
  const [error, setError] = useState<string | null>(null)
  const [repoUrl, setRepoUrl] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const runGeneration = useCallback(
    async (repoUrlValue: string, descriptionValue?: string) => {
      setError(null)
      setView('loading')
      try {
        const result = await generateReadme({
          github_url: repoUrlValue,           // map UI state → backend field name
          description: descriptionValue,
        })
        setMarkdown(result.markdown_text)     // map backend field → UI state
        setView('result')
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.'
        )
        setView('landing')
      }
    },
    []
  )

  const handleGenerate = useCallback(async () => {
    await runGeneration(repoUrl.trim(), description.trim() || undefined)
  }, [repoUrl, description, runGeneration])

  const handleRegenerate = useCallback(async () => {
    await runGeneration(repoUrl.trim(), description.trim() || undefined)
  }, [repoUrl, description, runGeneration])

  const handleReset = useCallback(() => {
    setView('landing')
    setMarkdown('')
    setError(null)
  }, [])

  return {
    markdown,
    view,
    error,
    repoUrl,
    description,
    setRepoUrl,
    setDescription,
    handleGenerate,
    handleRegenerate,
    handleReset,
    setMarkdown,
  }
}