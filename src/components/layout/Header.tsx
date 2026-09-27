import { useEffect, useState } from 'react'
import { sections, type SectionId } from '../../data/profile'
import { Button } from '../ui/Button'
import { CloseIcon, MenuIcon } from '../ui/Icons'
import { Navigation } from './Navigation'

// Sección visible en la franja central del viewport (IntersectionObserver, sin librerías).
function useActiveSection(): SectionId | null {
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

export function Header() {
  const active = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 64rem)').matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    // Barra flotante sin marca: solo navegación y CTA. En móvil, solo el botón de menú.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 pt-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl justify-end lg:justify-center">
        <div className="glass pointer-events-auto hidden items-center gap-2 rounded-full border border-white/10 bg-ink/60 p-1.5 shadow-glass backdrop-blur-md lg:flex">
          <nav aria-label="Primary">
            <Navigation active={active} orientation="horizontal" />
          </nav>
          <Button href="#contact" className="py-2">
            Let&rsquo;s connect
          </Button>
        </div>

        <button
          type="button"
          className="glass pointer-events-auto grid size-12 place-items-center rounded-full border border-white/10 bg-ink/60 text-xl text-white shadow-glass backdrop-blur-md lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Panel móvil: fondo opaco, sin segunda capa de blur. */}
      <nav
        id="mobile-menu"
        aria-label="Primary"
        hidden={!menuOpen}
        className="pointer-events-auto mx-auto mt-3 max-w-6xl rounded-card border border-white/10 bg-ink/95 p-3 shadow-glass lg:hidden"
      >
        <Navigation active={active} orientation="vertical" onNavigate={closeMenu} />
        <Button href="#contact" className="mt-3 w-full" onClick={closeMenu}>
          Let&rsquo;s connect
        </Button>
      </nav>
    </header>
  )
}
