import { useEffect, useRef } from 'react'

// Suavizado del seguimiento (0–1): más bajo = el brillo llega con más retraso y se siente más sereno.
const FOLLOW_EASE = 0.12

// Brillo que sigue al puntero. Solo con mouse o trackpad (hover + puntero fino), sin reduced motion y fuera
// del modo ligero; en táctil no existe. Se mueve con transform (compositor), sin repintar el fondo.
export function usePointerGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = ref.current
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const lite = document.documentElement.dataset.lite !== undefined
    if (!glow || !enabled.matches || lite) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let frame = 0
    let visible = false

    const render = () => {
      x += (targetX - x) * FOLLOW_EASE
      y += (targetY - y) * FOLLOW_EASE
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(render) : 0
    }
    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!visible) glow.style.opacity = '1'
      visible = true
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onPointerLeave = () => {
      glow.style.opacity = '0'
      visible = false
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
