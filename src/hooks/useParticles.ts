import { useEffect } from 'react'

export function useParticles(containerId: string) {
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const particles: HTMLDivElement[] = []
    const count = 12

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 6 + 2
      const angle = (Math.PI * 2 * i) / count
      const radius = 120 + Math.random() * 80
      const startX = Math.cos(angle) * radius
      const startY = Math.sin(angle) * radius

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = '50%'
      particle.style.top = '50%'
      particle.style.setProperty('--startX', `${startX}px`)
      particle.style.setProperty('--startY', `${startY}px`)
      particle.style.animationDelay = `${(i * 3) / count}s`

      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [containerId])
}
