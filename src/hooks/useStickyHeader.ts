import { useEffect } from 'react'

export function useStickyHeader() {
  useEffect(() => {
    const header = document.getElementById('sticky-header')
    if (!header) return

    const onScroll = () => {
      if (window.scrollY > 600) {
        header.style.transform = 'translateY(0)'
      } else {
        header.style.transform = 'translateY(-100%)'
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
