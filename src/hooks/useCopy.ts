import { useState, useCallback, useRef } from 'react'
import { copyToClipboard } from '../utils/helpers'

interface UseCopyReturn {
  copied: boolean
  copy: (text: string) => Promise<void>
}

export function useCopy(resetDelay = 2000): UseCopyReturn {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(
    async (text: string) => {
      const success = await copyToClipboard(text)
      if (success) {
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          setCopied(false)
        }, resetDelay)
      }
    },
    [resetDelay]
  )

  return { copied, copy }
}
