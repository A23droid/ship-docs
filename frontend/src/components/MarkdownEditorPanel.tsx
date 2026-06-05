import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useCopy } from '../hooks/useCopy'

interface MarkdownEditorPanelProps {
  markdown: string
  onChange: (value: string) => void
}

export function MarkdownEditorPanel({ markdown, onChange }: MarkdownEditorPanelProps) {
  const { copied, copy } = useCopy()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [markdown])

  const lineCount = markdown.split('\n').length

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full min-h-0"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-rule shrink-0 bg-paper-dark">
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-ink-4">
            <rect x="1" y="1" width="10" height="10" stroke="currentColor" strokeWidth="1"/>
            <path d="M3 4h6M3 6h4" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
          </svg>
          <span className="font-mono text-[11px] text-ink-4 uppercase tracking-[0.12em]">
            source.md
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-ink-5 tabular-nums">
            {lineCount}L
          </span>
          <button
            onClick={() => copy(markdown)}
            className="btn-ghost py-1 px-2 text-xs gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-accent" />
                <span className="text-accent font-mono text-[11px]">copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="font-mono text-[11px]">copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Line numbers */}
        <div className="flex flex-col items-end py-3 px-2 bg-paper-dark border-r border-rule select-none shrink-0 overflow-hidden">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="font-mono text-[10px] text-ink-5 leading-6 w-8 text-right tabular-nums">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <div className="flex-1 overflow-auto bg-notebook">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full min-h-full bg-transparent text-ink-2 font-mono text-sm leading-6 p-3 resize-none focus:outline-none caret-accent"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>
    </motion.div>
  )
}
