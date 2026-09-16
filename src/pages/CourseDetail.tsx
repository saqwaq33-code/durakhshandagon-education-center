import { Link, useParams } from 'react-router-dom'
import { courses } from '../data/siteData'
import { useLanguage } from '../hooks/useLanguage'

const CourseDetail = () => {
  const { courseId } = useParams()
  const { language, t } = useLanguage()
  const course = courses.find((item) => item.id === courseId)

  if (!course) {
    return (
      <section className="page-enter rounded-xl border border-red-200 bg-red-50 p-6">
        <h1 className="text-xl font-bold text-red-700">{t('courses.notFound')}</h1>
        <Link to="/courses" className="mt-3 inline-block text-sm font-semibold text-blue-700 hover:underline">
          {t('courses.backToList')}
        </Link>
      </section>
    )
  }

  return (
    <section className="page-enter rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{course.title[language]}</h1>
      <p className="mt-4 text-slate-700">{course.description[language]}</p>

      <div className="mt-6 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-3">
        <p>{course.teacher[language]}</p>
        <p>{course.duration[language]}</p>
        <p>{course.level[language]}</p>
      </div>

      <Link
        to="/contact"
        className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        {t('courses.enrollNow')}
      </Link>
    </section>
  )
}

export default CourseDetail
