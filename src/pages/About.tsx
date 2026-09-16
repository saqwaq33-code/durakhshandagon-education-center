import { teachers } from '../data/siteData'
import { useLanguage } from '../hooks/useLanguage'

const About = () => {
  const { language, t } = useLanguage()

  return (
    <section className="space-y-6 page-enter">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t('about.title')}</h1>
        <p className="mt-3 max-w-3xl text-slate-700">{t('about.description')}</p>
      </div>

      <div>
        <h2 className="mb-3 text-xl font-semibold text-slate-900">{t('about.teachers')}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <article key={teacher.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-slate-900">{teacher.name[language]}</h3>
              <p className="mt-1 text-sm text-slate-600">{teacher.specialty[language]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
