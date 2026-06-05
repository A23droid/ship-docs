import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { LandingPage } from './pages/LandingPage'
import { ResultPage } from './pages/ResultPage'
import { LoadingOverlay } from './components/LoadingOverlay'
import { useGenerate } from './hooks/useGenerate'

export default function App() {
  const {
    markdown,
    view,
    error,
    repoUrl,
    description,
    setRepoUrl,
    setDescription,
    handleGenerate,
    handleRegenerate,
    handleReset,
    setMarkdown,
  } = useGenerate()

  return (
    <div className="bg-paper min-h-screen">
      <AnimatePresence mode="wait">
        {view === 'loading' && <LoadingOverlay key="loading" />}
      </AnimatePresence>

      {view !== 'result' && (
        <Navbar onLogoClick={handleReset} />
      )}

      <AnimatePresence mode="wait">
        {(view === 'landing' || view === 'loading') && (
          <LandingPage
            key="landing"
            repoUrl={repoUrl}
            description={description}
            error={error}
            onRepoUrlChange={setRepoUrl}
            onDescriptionChange={setDescription}
            onSubmit={handleGenerate}
          />
        )}

        {view === 'result' && (
          <ResultPage
            key="result"
            markdown={markdown}
            repoUrl={repoUrl}
            onMarkdownChange={setMarkdown}
            onRegenerate={handleRegenerate}
            onBack={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
