import { useEffect, useState } from 'react'
import { sections, type SectionId } from '../data/profile'

// Sección visible en la franja central del viewport (IntersectionObserver, sin librerías).
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const hero = document.getElementById('home')
    if (hero) observer.observe(hero)
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return active
}
