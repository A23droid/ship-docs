import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { isValidGithubUrl } from '../utils/helpers'

interface RepoInputFormProps {
  repoUrl: string
  description: string
  onRepoUrlChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSubmit: () => void
  error: string | null
}

export function RepoInputForm({
  repoUrl,
  description,
  onRepoUrlChange,
  onDescriptionChange,
  onSubmit,
  error,
}: RepoInputFormProps) {
  const [showDescription, setShowDescription] = useState(false)
  const [touched, setTouched] = useState(false)

  const isValid = repoUrl.trim() !== '' && isValidGithubUrl(repoUrl)
  const showUrlError = touched && repoUrl.trim() !== '' && !isValidGithubUrl(repoUrl)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    onSubmit()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="max-w-2xl mx-auto px-6 pb-16"
    >
      {/* Form label — notebook annotation style */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-[10px] text-ink-4 uppercase tracking-[0.15em]">
          input / 01
        </span>
        <div className="h-px flex-1 bg-rule" />
      </div>

      <div className="card-notebook">
        {/* Header strip */}
        <div className="border-b border-rule px-5 py-2.5 flex items-center justify-between bg-paper-dark">
          <span className="font-mono text-xs text-ink-4">README_GENERATOR.form</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 border border-rule bg-white" />
            <div className="w-2 h-2 border border-rule bg-white" />
            <div className="w-2 h-2 border border-rule bg-accent" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-notebook">
          <div>
            <label className="block font-mono text-xs text-ink-4 mb-2 uppercase tracking-[0.12em]">
              repository_url <span className="text-accent">*required</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Github className="w-4 h-4 text-ink-4" />
              </div>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => onRepoUrlChange(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="https://github.com/owner/repository"
                className={`input-base pl-10 ${showUrlError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            {showUrlError && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500 font-mono">
                <AlertCircle className="w-3 h-3" />
                Enter a valid GitHub repository URL
              </p>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowDescription(!showDescription)}
              className="flex items-center gap-1.5 font-mono text-xs text-ink-4 hover:text-ink-2 transition-colors"
            >
              {showDescription ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
              <span className="uppercase tracking-[0.12em]">
                {showDescription ? 'hide' : 'add'} optional_description
              </span>
            </button>

            {showDescription && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3"
              >
                <textarea
                  value={description}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  placeholder="Briefly describe the project, its tech stack, or anything to include in the README..."
                  rows={3}
                  className="input-base resize-none font-sans"
                />
                <p className="mt-1.5 font-mono text-[11px] text-ink-4">
                  // helps the AI generate more accurate documentation
                </p>
              </motion.div>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 bg-red-50 border border-red-200 px-4 py-3"
            >
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-red-600 font-mono leading-relaxed">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
            generate_readme()
          </button>
        </form>
      </div>

      <p className="font-mono text-[11px] text-ink-5 mt-3 flex items-center gap-2">
        <span className="text-ink-5">—</span>
        works with any public GitHub repository
      </p>
    </motion.div>
  )
}
