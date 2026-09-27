import { profile } from '../../data/profile'
import { GlassCard } from '../ui/GlassCard'

export function About() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <GlassCard className="p-6 sm:p-10 lg:col-span-3">
        <div className="flex flex-col gap-5 text-base leading-relaxed sm:text-lg">
          {profile.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </GlassCard>

      <dl className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
        {profile.facts.map(({ value, label }) => (
          <div key={label} className="rounded-card border border-white/10 bg-ink/70 p-6">
            <dt className="sr-only">{label}</dt>
            <dd className="font-display text-3xl font-bold text-white">{value}</dd>
            <dd className="mt-2 text-sm text-white/60">{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
