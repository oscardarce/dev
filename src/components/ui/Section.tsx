import type { ReactNode } from 'react'
import type { SectionId } from '../../data/profile'

type SectionProps = {
  id: SectionId
  eyebrow: string
  title: string
  children: ReactNode
}

// Sección a pantalla completa con snap. La transición entre secciones es CSS (.section-fade y .fade-item en index.css).
export function Section({ id, eyebrow, title, children }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="section-timeline flex min-h-dvh snap-start flex-col justify-center px-5 pt-24 pb-16 sm:px-8"
    >
      <div className="section-fade mx-auto w-full max-w-6xl">
        <div className="fade-item">
          <p className="font-display text-xs font-semibold tracking-widest text-primary uppercase">{eyebrow}</p>
          <h2 id={headingId} className="mt-3 text-title font-bold text-white">
            {title}
          </h2>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
