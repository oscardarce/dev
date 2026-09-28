import { profile } from '../../data/profile'

export function Footer() {
  return (
    <footer className="snap-end border-t border-white/10 bg-ink/80 px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-sm text-white/50 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>{profile.motto}</p>
      </div>
    </footer>
  )
}
