import { profile, type SocialId } from '../../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

const icons: Record<SocialId, typeof MailIcon> = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
}

type SocialLinksProps = { variant?: 'icons' | 'list'; className?: string }

export function SocialLinks({ variant = 'icons', className = '' }: SocialLinksProps) {
  if (variant === 'list') {
    return (
      <ul className={`flex flex-col gap-3 ${className}`}>
        {profile.socials.map(({ id, label, display, href }) => {
          const Icon = icons[id]
          const external = !href.startsWith('mailto:')
          return (
            <li key={id}>
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noreferrer' })}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 motion-reduce:transition-none"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 text-lg text-primary">
                  <Icon />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-xs font-semibold tracking-widest text-white/50 uppercase">
                    {label}
                  </span>
                  <span className="truncate text-sm font-medium text-white group-hover:text-primary">{display}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {profile.socials.map(({ id, label, href }) => {
        const Icon = icons[id]
        const external = !href.startsWith('mailto:')
        return (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              {...(external && { target: '_blank', rel: 'noreferrer' })}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/5 text-lg text-white/70 transition-colors duration-200 hover:border-white/25 hover:text-primary motion-reduce:transition-none"
            >
              <Icon />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
