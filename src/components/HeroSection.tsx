import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="relative pt-32 pb-12 px-6">
      {/* Graph paper background element */}
      <div className="absolute inset-0 bg-notebook pointer-events-none" />

      {/* Margin line */}
      <div className="absolute left-[72px] top-0 bottom-0 w-px bg-margin pointer-events-none hidden lg:block" />

      {/* Top annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Blueprint header annotation */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-rule max-w-[80px]" />
          <span className="font-mono text-xs text-ink-4 tracking-[0.15em] uppercase">
            project / documentation-tools / v1
          </span>
          <div className="h-px flex-1 bg-rule" />
        </div>

        {/* Main title — engineering notebook style */}
        <div className="relative">
          {/* Annotation bracket */}
          <div className="absolute -left-8 top-0 bottom-0 hidden lg:flex flex-col items-center gap-1 pointer-events-none">
            <div className="w-3 h-px bg-ink-5" />
            <div className="w-px flex-1 bg-ink-5" />
            <div className="w-3 h-px bg-ink-5" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ink leading-[1.08] tracking-tight mb-2"
          >
            Generate READMEs
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif italic text-5xl sm:text-6xl lg:text-7xl text-accent leading-[1.08] tracking-tight mb-8"
          >
            that ship.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="text-ink-3 text-base sm:text-lg max-w-lg leading-relaxed mb-10 font-sans font-light"
        >
          Paste a GitHub repository URL. Receive a production-ready README in seconds.
          No templates. No boilerplate.
        </motion.p>

        {/* Stats row — blueprint callout style */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center gap-0 flex-wrap"
        >
          {[
            { value: '< 30s', label: 'generation', note: 'avg.' },
            { value: 'GFM', label: 'output format', note: 'spec' },
            { value: 'any repo', label: 'github support', note: 'public' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-stretch">
              <div className="border border-rule bg-white px-5 py-3">
                <div className="font-mono font-semibold text-lg text-ink leading-none">{stat.value}</div>
                <div className="font-mono text-[10px] text-ink-4 uppercase tracking-widest mt-1">{stat.label}</div>
                <div className="font-mono text-[9px] text-ink-5 mt-0.5">[{stat.note}]</div>
              </div>
              {i < 2 && <div className="w-px bg-rule" />}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
