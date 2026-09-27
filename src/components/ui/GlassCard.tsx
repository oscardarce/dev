import type { ElementType, ReactNode } from 'react'

type GlassCardProps = {
  as?: ElementType
  children: ReactNode
  className?: string
}

// Superficie de vidrio. No anidar: el blur es costoso y dos capas no aportan nada visible.
export function GlassCard({ as: Tag = 'div', children, className = '' }: GlassCardProps) {
  return (
    <Tag
      className={`glass rounded-card border border-white/10 bg-white/[0.04] shadow-glass backdrop-blur-md ${className}`}
    >
      {children}
    </Tag>
  )
}
