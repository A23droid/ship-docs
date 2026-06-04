export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}

export function downloadMarkdown(content: string, filename = 'README.md'): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function extractRepoName(url: string): string {
  try {
    const cleaned = url.replace(/\.git$/, '').replace(/\/$/, '')
    const parts = cleaned.split('/')
    return parts[parts.length - 1] || 'repository'
  } catch {
    return 'repository'
  }
}

export function isValidGithubUrl(url: string): boolean {
  const pattern = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+(\/.*)?$/
  return pattern.test(url.trim())
}
