import { motion } from 'framer-motion'
import { Github } from 'lucide-react'

interface NavbarProps {
  onLogoClick: () => void
}

export function Navbar({ onLogoClick }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Left: coord label */}
        <div className="flex items-center gap-6">
          <span className="coord-marker hidden sm:block">x:0 y:0</span>
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 group focus:outline-none"
          >
            {/* Blueprint icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
              <rect x="1" y="1" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M5 10h10M10 5v10" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <span className="font-mono font-semibold text-ink text-sm tracking-tight">
              ship<span className="text-accent">docs</span>
            </span>
          </button>
        </div>

        <nav className="flex items-center gap-1">
          <span className="coord-marker hidden sm:block mr-4">fig. 1.0</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost py-1.5 px-3 text-xs"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
