import { useEffect } from 'react'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · PulseFit` : 'PulseFit — Train smarter. Get stronger.'
  }, [title])
}
