import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100'

const variants: Record<Variant, string> = {
  primary: 'bg-mint text-ink shadow-glass hover:bg-white',
  secondary: 'border border-white/10 bg-white/5 text-white hover:border-white/25 hover:bg-white/10',
}

type CommonProps = { variant?: Variant; children: ReactNode; className?: string }

type ButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
