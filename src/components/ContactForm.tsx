import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'

const ContactForm = () => {
  const { t } = useLanguage()
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage(t('contact.form.success'))
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
          {t('contact.form.name')}
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email">
          {t('contact.form.email')}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="message">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        {t('contact.form.submit')}
      </button>

      {statusMessage && (
        <p className="text-sm text-emerald-700" role="status" aria-live="polite">
          {statusMessage}
        </p>
      )}
    </form>
  )
}

export default ContactForm
