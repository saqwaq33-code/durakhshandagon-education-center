import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'

const HeroSection = () => {
  const { t } = useLanguage()

  return (
    <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-emerald-600 p-8 text-white shadow-lg page-enter sm:p-12">
      <h1 className="text-2xl font-bold leading-tight sm:text-4xl">{t('home.heroTitle')}</h1>
      <p className="mt-4 max-w-2xl text-sm text-blue-50 sm:text-base">{t('home.heroDescription')}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/courses"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          {t('home.viewCourses')}
        </Link>
        <Link
          to="/contact"
          className="rounded-lg border border-white/70 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
        >
          {t('home.contactUs')}
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
