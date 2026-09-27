import { useState, type FormEvent } from 'react'
import { sendContact } from '../../lib/sendContact'
import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { AlertIcon, ArrowRightIcon, CheckIcon } from '../ui/Icons'
import { SocialLinks } from '../ui/SocialLinks'

type Status = 'idle' | 'sending' | 'success' | 'error'

const fieldClass =
  'mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition-colors duration-200 hover:border-white/25 focus-visible:border-mint disabled:opacity-50 motion-reduce:transition-none user-invalid:border-rose'

const labelClass = 'font-display text-xs font-semibold tracking-widest text-white/60 uppercase'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      await sendContact({
        name: String(data.get('name')),
        email: String(data.get('email')),
        message: String(data.get('message')),
      })
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const sending = status === 'sending'

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <SocialLinks variant="list" className="lg:col-span-2" />

      <GlassCard className="p-6 sm:p-8 lg:col-span-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-describedby="contact-status">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Name</span>
              <input name="name" type="text" required autoComplete="name" disabled={sending} className={fieldClass} />
            </label>
            <label className="block">
              <span className={labelClass}>Email</span>
              <input name="email" type="email" required autoComplete="email" disabled={sending} className={fieldClass} />
            </label>
          </div>
          <label className="block">
            <span className={labelClass}>Message</span>
            <textarea
              name="message"
              required
              minLength={10}
              rows={5}
              disabled={sending}
              className={`${fieldClass} resize-y`}
            />
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p id="contact-status" role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === 'success' && (
                <span className="inline-flex items-center gap-2 text-mint">
                  <CheckIcon /> Message sent. Thank you!
                </span>
              )}
              {status === 'error' && (
                <span className="inline-flex items-center gap-2 text-rose">
                  <AlertIcon /> Something went wrong. Please try again or email me directly.
                </span>
              )}
            </p>
            <Button type="submit" disabled={sending} className="w-full sm:w-auto">
              {sending ? 'Sending…' : 'Send message'}
              {!sending && <ArrowRightIcon />}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}
