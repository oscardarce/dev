import { profile } from '../../data/profile'
import { Chip } from '../ui/Chip'
import { GlassCard } from '../ui/GlassCard'

export function Skills() {
  return (
    // Un único panel de vidrio: los grupos internos no llevan blur propio.
    <GlassCard className="p-6 sm:p-10">
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {profile.skills.map(({ category, items }) => (
          <li key={category}>
            <h3 className="font-display text-xs font-semibold tracking-widest text-white/50 uppercase">{category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
