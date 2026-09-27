import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { SectionId } from '../../data/profile'

type SectionProps = {
  id: SectionId
  eyebrow: string
  title: string
  children: ReactNode
}

// Sección a pantalla completa con snap y una entrada discreta (fade + translate) al hacerse visible.
export function Section({ id, eyebrow, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const headingId = `${id}-title`

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className="flex min-h-dvh snap-start flex-col justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div
        className={`mx-auto w-full max-w-6xl transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <p className="font-display text-xs font-semibold tracking-widest text-mint uppercase">{eyebrow}</p>
        <h2 id={headingId} className="mt-3 text-title font-bold text-white">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
