import { motion } from 'framer-motion'
import { Download, RefreshCw, ArrowLeft, Check, Copy } from 'lucide-react'
import { MarkdownEditorPanel } from '../components/MarkdownEditorPanel'
import { MarkdownPreviewPanel } from '../components/MarkdownPreviewPanel'
import { downloadMarkdown, extractRepoName } from '../utils/helpers'
import { useCopy } from '../hooks/useCopy'

interface ResultPageProps {
  markdown: string
  repoUrl: string
  onMarkdownChange: (value: string) => void
  onRegenerate: () => void
  onBack: () => void
}

export function ResultPage({
  markdown,
  repoUrl,
  onMarkdownChange,
  onRegenerate,
  onBack,
}: ResultPageProps) {
  const { copied, copy } = useCopy()
  const repoName = extractRepoName(repoUrl)

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-paper">
      {/* Top toolbar — blueprint header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between px-4 py-2 border-b border-rule bg-paper-dark/90 backdrop-blur-sm shrink-0 gap-3"
      >
        {/* Left: nav + repo info */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="btn-ghost py-1.5 px-2.5 gap-1.5 text-xs shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-[11px]">back</span>
          </button>

          <div className="h-4 w-px bg-rule hidden sm:block" />

          <div className="min-w-0 hidden sm:block">
            <p className="font-mono text-[11px] text-ink-4 truncate">
              <span className="text-ink-5">output:</span>{' '}
              <span className="text-ink-3">README.md</span>
              <span className="text-ink-5 mx-1.5">/</span>
              <span className="text-ink-2">{repoName}</span>
            </p>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => copy(markdown)}
            className="btn-outline py-1.5 px-3 gap-1.5 text-xs"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-accent" />
                <span className="hidden sm:inline font-mono text-[11px] text-accent">copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="hidden sm:inline font-mono text-[11px]">copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => downloadMarkdown(markdown, 'README.md')}
            className="btn-outline py-1.5 px-3 gap-1.5 text-xs"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline font-mono text-[11px]">download</span>
          </button>

          <button
            onClick={onRegenerate}
            className="btn-primary py-1.5 px-3 gap-1.5 text-xs"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline font-mono text-[11px]">regenerate</span>
          </button>
        </div>
      </motion.div>

      {/* Split editor */}
      <div className="flex flex-1 min-h-0 divide-x divide-rule">
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <MarkdownEditorPanel markdown={markdown} onChange={onMarkdownChange} />
        </div>
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          <MarkdownPreviewPanel markdown={markdown} />
        </div>
      </div>
    </div>
  )
}
