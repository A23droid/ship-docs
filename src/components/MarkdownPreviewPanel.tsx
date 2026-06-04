import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownPreviewPanelProps {
  markdown: string
}

export function MarkdownPreviewPanel({ markdown }: MarkdownPreviewPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full min-h-0"
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-rule shrink-0 bg-paper-dark">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-ink-4">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1"/>
          <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
        </svg>
        <span className="font-mono text-[11px] text-ink-4 uppercase tracking-[0.12em]">
          preview
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-accent" />
          <span className="font-mono text-[10px] text-ink-5">live</span>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <div className="max-w-none prose-notebook">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              pre: ({ children }) => (
                <pre className="bg-paper-dark border border-rule p-4 mb-4 overflow-x-auto">
                  {children}
                </pre>
              ),
              code: ({ children, className }) => {
                const isBlock = className !== undefined
                if (isBlock) {
                  return <code className="font-mono text-sm text-ink-2">{children}</code>
                }
                return (
                  <code className="font-mono text-[0.8em] bg-paper-dark text-accent border border-rule px-1.5 py-0.5">
                    {children}
                  </code>
                )
              },
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="max-w-full my-4" loading="lazy" />
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="text-left px-3 py-2 bg-paper-dark text-ink font-semibold border border-rule text-sm font-mono">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 text-ink-2 border border-rule text-sm">
                  {children}
                </td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-accent pl-4 italic text-ink-3 mb-4">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="border-rule my-6" />,
              h1: ({ children }) => (
                <h1 className="font-serif text-2xl font-normal text-ink mb-4 mt-8 first:mt-0 border-b border-rule pb-3">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-sans font-semibold text-xl text-ink mb-3 mt-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-sans font-semibold text-base text-ink-2 mb-2 mt-5">{children}</h3>
              ),
              p: ({ children }) => <p className="mb-4 text-ink-2 leading-7 font-light">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1 text-ink-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1 text-ink-2">{children}</ol>
              ),
              li: ({ children }) => <li className="leading-7 font-light">{children}</li>,
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  )
}
