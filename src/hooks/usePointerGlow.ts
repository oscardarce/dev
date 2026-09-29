import { useEffect, useRef } from 'react'

// Suavizado del seguimiento (0–1): más bajo = el brillo llega con más retraso y se siente más sereno.
const FOLLOW_EASE = 0.12

// Brillo que sigue al puntero. Solo con mouse o trackpad (hover + puntero fino) y sin reduced motion;
// en táctil no existe. Se mueve con transform (compositor), sin repintar el fondo.
export function usePointerGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = ref.current
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!glow || !enabled.matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let frame = 0

    const render = () => {
      x += (targetX - x) * FOLLOW_EASE
      y += (targetY - y) * FOLLOW_EASE
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(render) : 0
    }
    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      glow.style.opacity = '1'
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onPointerLeave = () => {
      glow.style.opacity = '0'
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
