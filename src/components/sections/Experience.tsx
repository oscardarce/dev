import { profile } from '../../data/profile'
import { Chip } from '../ui/Chip'
import { GlassCard } from '../ui/GlassCard'
import { ArrowUpRightIcon, MapPinIcon } from '../ui/Icons'

export function Experience() {
  return (
    <ol className="relative grid gap-6 lg:grid-cols-2">
      {profile.experience.map((job) => (
        <li key={job.company}>
          <GlassCard as="article" className="flex h-full flex-col p-6 sm:p-8">
            <p className="font-display text-xs font-semibold tracking-widest text-mint uppercase">{job.period}</p>
            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{job.role}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-white/90">{job.company}</span>
              <span className="inline-flex items-center gap-1 text-white/50">
                <MapPinIcon />
                {job.location}
              </span>
              {job.website && (
                <a
                  href={job.website.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-mint hover:text-white"
                >
                  {job.website.label}
                  <ArrowUpRightIcon />
                </a>
              )}
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed">
              {job.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rose" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`${job.company} stack`}>
              {job.stack.map((tech) => (
                <li key={tech}>
                  <Chip dot>{tech}</Chip>
                </li>
              ))}
            </ul>
          </GlassCard>
        </li>
      ))}
    </ol>
  )
}
