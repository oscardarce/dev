import { profile } from '../../data/profile'
import { GlassCard } from '../ui/GlassCard'
import { ArrowUpRightIcon } from '../ui/Icons'

export function Education() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {profile.education.map((study) => (
        <GlassCard key={study.institution} as="article" className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white">{study.institution}</h3>
          {study.website && (
            <a
              href={study.website.href}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:text-white"
            >
              {study.website.label}
              <ArrowUpRightIcon />
            </a>
          )}
          <ul className="mt-5 flex flex-col gap-4">
            {study.programs.map((program) => (
              <li key={program.name}>
                <p className="text-sm font-medium text-white/90">{program.name}</p>
                {program.status && (
                  <p className="mt-1 font-display text-xs font-semibold tracking-widest text-white/50 uppercase">
                    {program.status}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}

      <article className="fade-item rounded-card border border-white/10 bg-ink/70 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white">{profile.openSource.title}</h3>
        <ul className="mt-5 flex flex-col gap-3 text-sm leading-relaxed">
          {profile.openSource.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
