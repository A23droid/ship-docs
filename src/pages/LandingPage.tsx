import { HeroSection } from '../components/HeroSection'
import { RepoInputForm } from '../components/RepoInputForm'
import { FeatureSection } from '../components/FeatureSection'
import { Footer } from '../components/Footer'

interface LandingPageProps {
  repoUrl: string
  description: string
  error: string | null
  onRepoUrlChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onSubmit: () => void
}

export function LandingPage({
  repoUrl,
  description,
  error,
  onRepoUrlChange,
  onDescriptionChange,
  onSubmit,
}: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <RepoInputForm
          repoUrl={repoUrl}
          description={description}
          onRepoUrlChange={onRepoUrlChange}
          onDescriptionChange={onDescriptionChange}
          onSubmit={onSubmit}
          error={error}
        />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  )
}
