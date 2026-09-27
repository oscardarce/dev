import { useEffect, useState } from 'react'
import { profile, sections, type SectionId } from '../../data/profile'
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
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/60 backdrop-blur-md">
      <div className="mx-auto box-content flex h-18 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3 whitespace-nowrap" onClick={closeMenu}>
          <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 font-display text-sm font-bold text-mint">
            OD
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-white">{profile.name}</span>
            <span className="text-xs text-white/60">Software Developer</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <Navigation active={active} orientation="horizontal" />
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact">Let&rsquo;s connect</Button>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-xl text-white lg:hidden"
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
        className="border-t border-white/10 bg-ink/95 px-5 pt-3 pb-6 sm:px-8 lg:hidden"
      >
        <Navigation active={active} orientation="vertical" onNavigate={closeMenu} />
        <Button href="#contact" className="mt-4 w-full" onClick={closeMenu}>
          Let&rsquo;s connect
        </Button>
      </nav>
    </header>
  )
}
