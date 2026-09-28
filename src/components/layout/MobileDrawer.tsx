import { useEffect, useRef, type RefObject } from 'react'
import type { SectionId } from '../../data/profile'
import { Button } from '../ui/Button'
import { CloseIcon } from '../ui/Icons'
import { Navigation } from './Navigation'

type MobileDrawerProps = {
  open: boolean
  active: SectionId | null
  onClose: () => void
  // Botón que abre el drawer: recibe el foco al cerrar.
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

// Menú lateral (móvil y tablet): panel desde la derecha sobre un overlay con blur.
// Bloquea el scroll del documento mientras está abierto, atrapa el foco y se cierra con Escape,
// con el overlay, con la X, al elegir una sección o al pasar a desktop.
export function MobileDrawer({ open, active, onClose, returnFocusRef }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const trigger = returnFocusRef.current
    // El scroll de la página es el del documento (<html>), no el de un contenedor.
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') return onClose()
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onBreakpoint = () => desktop.matches && onClose()

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
      root.style.overflow = previousOverflow
      trigger?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocusRef])

  return (
    <div className={`fixed inset-0 z-60 lg:hidden ${open ? '' : 'pointer-events-none'}`}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col gap-6 overscroll-contain border-l border-white/10 bg-ink/95 p-5 shadow-glass transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-xs font-semibold tracking-widest text-white/60 uppercase">Menu</p>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition-colors duration-200 hover:border-white/25 motion-reduce:transition-none"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Primary">
          <Navigation active={active} orientation="vertical" onNavigate={onClose} />
        </nav>

        <Button href="#contact" className="w-full" onClick={onClose}>
          Let&rsquo;s connect
        </Button>
      </div>
    </div>
  )
}
