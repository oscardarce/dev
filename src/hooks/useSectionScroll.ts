import { useEffect } from 'react'
import { sections } from '../data/profile'

// Marca en <html> la dirección de cada gesto de scroll (la usa styles/transitions.css).
// Se fija al inicio del gesto y no cambia hasta que el scroll se detiene: el retorno del snap no la invierte.
function useScrollDirection() {
  useEffect(() => {
    const root = document.documentElement
    let lastY = window.scrollY
    let settled = true
    let idleTimer = 0

    const onScroll = () => {
      const y = window.scrollY
      if (settled && y !== lastY) {
        root.dataset.scrollDir = y > lastY ? 'down' : 'up'
        settled = false
      }
      lastY = y
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        settled = true
      }, 150)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idleTimer)
    }
  }, [])
}

const PAGE_IDS = ['home', ...sections.map(({ id }) => id)]
// Tiempo mínimo entre dos saltos: cubre el scroll suave y la inercia del trackpad.
const PAGE_LOCK_MS = 800
const WHEEL_IDLE_MS = 180

// Siguiente posición de scroll para un gesto de rueda: sección siguiente o anterior, o el borde de la
// sección actual si es más alta que la pantalla (Experience a 1280×720).
function nextWheelTarget(dir: 1 | -1): number | null {
  const pages = PAGE_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
  const y = window.scrollY
  const vh = window.innerHeight
  const index = pages.findLastIndex((el) => el.offsetTop <= y + 1)
  const current = pages[Math.max(index, 0)]
  const top = current.offsetTop
  const bottom = top + current.offsetHeight

  if (dir > 0) {
    if (bottom - (y + vh) > 1) return Math.min(bottom - vh, y + vh * 0.85)
    const next = pages[index + 1]
    if (next) return next.offsetTop
    const end = document.documentElement.scrollHeight - vh
    return end - y > 1 ? end : null
  }

  if (y - top > 1) return top
  const prev = pages[index - 1]
  if (!prev) return null
  // Al volver a una sección más alta que la pantalla se entra por su final.
  return Math.max(prev.offsetTop, prev.offsetTop + prev.offsetHeight - vh)
}

// Desktop: un gesto de rueda = una sección, sin el rebote del snap mandatory. Teclado, táctil, anclas
// y scrollbar siguen nativos; móvil, tablet y reduced motion no se tocan.
function useWheelPaging() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lockedUntil = 0
    let lastWheel = 0
    // Un gesto (varias muescas seguidas o la inercia del trackpad) solo produce un salto.
    let gestureConsumed = false

    const onWheel = (event: WheelEvent) => {
      if (!desktop.matches || reduced.matches || event.ctrlKey) return
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()

      const now = performance.now()
      if (now - lastWheel >= WHEEL_IDLE_MS) gestureConsumed = false
      lastWheel = now
      if (gestureConsumed || now < lockedUntil) return

      const dir = event.deltaY > 0 ? 1 : -1
      const target = nextWheelTarget(dir)
      if (target === null) return
      gestureConsumed = true
      lockedUntil = now + PAGE_LOCK_MS
      document.documentElement.dataset.scrollDir = dir > 0 ? 'down' : 'up'
      window.scrollTo({ top: target, behavior: 'smooth' })
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])
}

// Comportamiento de scroll de la landing: dirección del gesto para la transición y rueda por secciones.
export function useSectionScroll() {
  useScrollDirection()
  useWheelPaging()
}
