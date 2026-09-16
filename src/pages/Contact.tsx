import ContactForm from '../components/ContactForm'
import { useLanguage } from '../hooks/useLanguage'

const Contact = () => {
  const { t } = useLanguage()

  return (
    <section className="grid gap-6 page-enter lg:grid-cols-2">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t('contact.title')}</h1>
        <p className="mt-3 text-slate-700">{t('contact.description')}</p>

        <div className="mt-5 space-y-2 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
          <p>{t('contact.info.phone')}</p>
          <p>{t('contact.info.email')}</p>
          <p>{t('contact.info.address')}</p>
        </div>
      </div>
      <ContactForm />
    </section>
  )
}

export default Contact
