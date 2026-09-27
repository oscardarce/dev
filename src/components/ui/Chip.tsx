import type { ReactNode } from 'react'

type ChipProps = { children: ReactNode; dot?: boolean }

export function Chip({ children, dot = false }: ChipProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {dot && <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />}
      {children}
    </span>
  )
}
