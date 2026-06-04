import { motion } from 'framer-motion'
import { Cpu, Clock, FileCode, GitFork, Lock, Download } from 'lucide-react'

const FEATURES = [
  {
    icon: Cpu,
    title: 'Context-aware generation',
    description:
      'Analyzes repository structure, code patterns, and dependencies to produce accurate, relevant documentation.',
    ref: 'fig. A',
  },
  {
    icon: Clock,
    title: 'Ready in under 30 seconds',
    description:
      'Submit a URL and receive a complete, structured README with all standard sections populated.',
    ref: 'fig. B',
  },
  {
    icon: FileCode,
    title: 'GitHub-Flavored Markdown',
    description:
      'Outputs GFM with tables, badges, code blocks, and proper heading hierarchy out of the box.',
    ref: 'fig. C',
  },
  {
    icon: GitFork,
    title: 'Any public repository',
    description:
      'Works with any language, framework, or project type. Node, Python, Rust, Go — handled.',
    ref: 'fig. D',
  },
  {
    icon: Lock,
    title: 'Editable source',
    description:
      'Every generated README is fully editable in the split-screen editor before exporting.',
    ref: 'fig. E',
  },
  {
    icon: Download,
    title: 'One-click export',
    description:
      'Copy to clipboard or download as README.md instantly. Drop it straight into your repository.',
    ref: 'fig. F',
  },
]

export function FeatureSection() {
  return (
    <section className="py-20 px-6 relative">
      {/* Section background */}
      <div className="absolute inset-0 bg-paper-dark border-t border-b border-rule pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-ink-5" />
            <span className="font-mono text-xs text-ink-4 uppercase tracking-[0.15em]">
              specifications / features
            </span>
            <div className="h-px flex-1 bg-rule" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
            Everything your README needs.
          </h2>
          <p className="mt-3 text-ink-3 font-sans font-light text-base max-w-md">
            Stop writing documentation from scratch. Ship Docs handles the structure,
            content, and formatting.
          </p>
        </motion.div>

        {/* Feature grid — blueprint card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white p-5 hover:bg-accent-bg transition-colors group relative"
              >
                <div className="absolute top-3 right-3 font-mono text-[10px] text-ink-5 group-hover:text-ink-4 transition-colors">
                  {feature.ref}
                </div>
                <div className="w-8 h-8 border border-rule flex items-center justify-center mb-4 group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-ink-4 group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-sans font-semibold text-ink text-sm mb-2">{feature.title}</h3>
                <p className="text-ink-3 text-sm leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* "What gets generated" section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-ink-5" />
            <span className="font-mono text-xs text-ink-4 uppercase tracking-[0.15em]">
              output / sections_generated
            </span>
            <div className="h-px flex-1 bg-rule" />
          </div>

          <div className="border border-rule bg-white p-5">
            {/* Blueprint grid of tags */}
            <div className="flex flex-wrap gap-2">
              {[
                'Project Overview',
                'Installation Steps',
                'Usage Examples',
                'Configuration',
                'API Reference',
                'Contributing Guide',
                'License Info',
                'Tech Stack Badges',
                'Prerequisites',
                'Project Structure',
              ].map((section, i) => (
                <span
                  key={section}
                  className="font-mono text-xs border border-rule text-ink-3 px-2.5 py-1 bg-paper-dark"
                >
                  <span className="text-ink-5 mr-1">{String(i + 1).padStart(2, '0')}.</span>
                  {section}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
