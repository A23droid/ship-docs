export function Footer() {
  return (
    <footer className="border-t border-rule py-8 px-6 bg-paper-dark">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-accent">
            <rect x="1" y="1" width="18" height="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M5 10h10M10 5v10" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          <span className="font-mono font-semibold text-xs text-ink">
            ship<span className="text-accent">docs</span>
          </span>
        </div>

        <p className="font-mono text-xs text-ink-4 text-center">
          Generate production-ready README files from any GitHub repository.
        </p>

        <p className="font-mono text-xs text-ink-5">
          &copy; {new Date().getFullYear()} ShipDocs
        </p>
      </div>
    </footer>
  )
}
