import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { ArrowRightIcon, BriefcaseIcon, MapPinIcon } from '../ui/Icons'
import { SocialLinks } from '../ui/SocialLinks'

export function Hero() {
  const [firstName, ...rest] = profile.name.split(' ')

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="section-timeline flex min-h-dvh snap-start flex-col justify-center px-5 pt-24 pb-16 sm:px-8"
    >
      <div className="section-fade">
        <div className="fade-item flex flex-col items-center text-center">
          <Chip>
            <MapPinIcon className="text-primary" />
            {profile.location}
          </Chip>

          <h1 id="home-title" className="mt-8 text-display font-extrabold text-white">
            {firstName}{' '}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {rest.join(' ')}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">{profile.headline}</p>
          {/* TODO: texto (tagline del hero; el CV no incluye uno) */}

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href="#contact" className="w-full sm:w-auto">
              Contact me
              <ArrowRightIcon />
            </Button>
            <Button href="#experience" variant="secondary" className="w-full sm:w-auto">
              <BriefcaseIcon />
              View experience
            </Button>
          </div>

          <SocialLinks className="mt-10" />
        </div>
      </div>
    </section>
  )
}
