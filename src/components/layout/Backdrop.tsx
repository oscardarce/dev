// Fondo fijo inspirado en _referencias/fondo.jpg: negro, retícula de puntos y trazos geométricos finos.
export function Backdrop() {
  return (
    <div aria-hidden="true" className="dot-grid pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Línea en L superior izquierda: periwinkle → rose */}
      <svg className="absolute top-0 left-0 h-32 w-72 sm:h-44 sm:w-md" viewBox="0 0 280 90" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="bd-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--color-periwinkle)" />
            <stop offset="1" stopColor="var(--color-rose)" />
          </linearGradient>
        </defs>
        <path d="M0 80H274V0" stroke="url(#bd-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Arco rose y triángulo mint → rose, anclados a la derecha */}
      <svg
        className="absolute -right-40 bottom-0 h-[70vh] w-auto opacity-35 sm:-right-24 sm:opacity-50 lg:right-0 lg:opacity-70"
        viewBox="0 0 340 320"
        fill="none"
      >
        <defs>
          <linearGradient id="bd-triangle" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-mint)" />
            <stop offset="1" stopColor="var(--color-rose)" />
          </linearGradient>
        </defs>
        <circle cx="330" cy="40" r="190" stroke="var(--color-rose)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
        <path d="M250 70 L240 310 L10 270 Z" stroke="url(#bd-triangle)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
