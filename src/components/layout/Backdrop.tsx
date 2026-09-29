import { usePointerGlow } from '../../hooks/usePointerGlow'

// Fondo fijo: luces suaves, brillo del puntero, retícula de puntos y los trazos geométricos del banner.
export function Backdrop() {
  const glowRef = usePointerGlow()

  return (
    <div aria-hidden="true" className="backdrop-lights pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div ref={glowRef} className="pointer-glow" />

      {/* Línea en L superior izquierda: secondary → primary */}
      <svg className="absolute top-0 left-0 h-32 w-72 opacity-60 sm:h-44 sm:w-md" viewBox="0 0 280 90" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bd-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-secondary)" />
            <stop offset="1" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
        <path d="M0 80H274V0" stroke="url(#bd-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Arco tertiary y triángulo primary → secondary, anclados a la derecha */}
      <svg
        className="absolute -right-40 bottom-0 h-[70vh] w-auto opacity-35 sm:-right-24 sm:opacity-50 lg:right-0 lg:opacity-70"
        viewBox="0 0 340 320"
        fill="none"
      >
        <defs>
          <linearGradient id="bd-triangle" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-primary)" />
            <stop offset="1" stopColor="var(--color-secondary)" />
          </linearGradient>
        </defs>
        <circle cx="330" cy="40" r="190" stroke="var(--color-tertiary)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <path d="M250 70 L240 310 L10 270 Z" stroke="url(#bd-triangle)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
