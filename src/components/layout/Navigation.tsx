import { sections, type SectionId } from '../../data/profile'

type NavigationProps = {
  active: SectionId | null
  orientation: 'horizontal' | 'vertical'
  onNavigate?: () => void
}

export function Navigation({ active, orientation, onNavigate }: NavigationProps) {
  const isVertical = orientation === 'vertical'

  return (
    <ul className={isVertical ? 'flex flex-col gap-1' : 'flex items-center gap-1'}>
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onNavigate}
              aria-current={isActive ? 'location' : undefined}
              className={`block rounded-full font-medium transition-colors duration-200 motion-reduce:transition-none ${
                isVertical ? 'px-4 py-3 text-base' : 'px-4 py-2 text-sm'
              } ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}
            >
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
