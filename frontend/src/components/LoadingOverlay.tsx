import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const LOADING_MESSAGES = [
  'fetching repository metadata...',
  'analyzing project structure...',
  'reading source files...',
  'detecting tech stack...',
  'generating documentation...',
  'formatting sections...',
  'polishing the README...',
]

export function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 3, 90))
      setTick((t) => t + 1)
    }, 300)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper/97 backdrop-blur-sm bg-notebook"
    >
      {/* Blueprint crosshair */}
      <div className="relative mb-10">
        <div className="w-16 h-16 border border-rule flex items-center justify-center bg-white">
          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-accent/40"
            animate={{ top: ['25%', '75%', '25%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Crosshair */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent relative z-10">
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>

          {/* Corner annotations */}
          <span className="absolute top-1 left-1 font-mono text-[8px] text-ink-5">A1</span>
          <span className="absolute bottom-1 right-1 font-mono text-[8px] text-ink-5">B2</span>
        </div>

        {/* Animated corner brackets */}
        <motion.div
          className="absolute -inset-3 border border-dashed border-rule"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Status display */}
      <div className="w-72 space-y-4">
        {/* Progress bar — blueprint style */}
        <div className="border border-rule bg-white h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Progress annotation */}
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-xs text-ink-3"
            >
              {'>>'} {LOADING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
          <span className="font-mono text-xs text-ink-4 tabular-nums">{Math.round(progress)}%</span>
        </div>

        {/* Tick counter */}
        <div className="font-mono text-[10px] text-ink-5 flex items-center gap-2">
          <span>step_{String(tick).padStart(3, '0')}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 border border-rule transition-colors duration-150 ${
                  i < (tick % 9) ? 'bg-accent' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
