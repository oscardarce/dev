import { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.svg'
import { profile, sections, type SectionId } from '../../data/profile'
import { Button } from '../ui/Button'
import { MenuIcon } from '../ui/Icons'
import { MobileDrawer } from './MobileDrawer'
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      {/* Desktop: logo y pastilla de navegación flotantes, sin fondo. Móvil y tablet: barra glass de ancho
          completo para que el logo y el botón de menú no queden encima del texto. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 px-5 py-3 backdrop-blur-md sm:px-8 lg:pointer-events-none lg:border-0 lg:bg-transparent lg:pt-4 lg:pb-0 lg:backdrop-blur-none">
        <div className="mx-auto flex max-w-6xl items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#home"
            className="pointer-events-auto justify-self-start rounded-lg transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none"
          >
            <img src={logo} alt={`${profile.name}, home`} width={74} height={40} className="h-10 w-auto" />
          </a>

          <div className="glass pointer-events-auto hidden items-center gap-2 rounded-full border border-white/10 bg-ink/60 p-1.5 shadow-glass backdrop-blur-md lg:flex">
            <nav aria-label="Primary">
              <Navigation active={active} orientation="horizontal" />
            </nav>
            <Button href="#contact" className="py-2">
              Let&rsquo;s connect
            </Button>
          </div>

          {/* Sin blur propio: ya está dentro de la barra glass. */}
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-xl text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* Fuera del header: su backdrop-filter en móvil haría que el drawer fixed se posicione dentro de la barra. */}
      <MobileDrawer open={menuOpen} active={active} onClose={closeMenu} returnFocusRef={menuButtonRef} />
    </>
  )
}
