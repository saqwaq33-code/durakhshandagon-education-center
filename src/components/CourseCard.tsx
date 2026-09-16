import { Link } from 'react-router-dom'
import type { Course } from '../data/siteData'
import { useLanguage } from '../hooks/useLanguage'

const CourseCard = ({ course }: { course: Course }) => {
  const { language, t } = useLanguage()

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900">{course.title[language]}</h3>
      <p className="mt-2 text-sm text-slate-600">{course.description[language]}</p>
      <div className="mt-4 space-y-1 text-sm text-slate-500">
        <p>{course.teacher[language]}</p>
        <p>{course.duration[language]}</p>
        <p>{course.level[language]}</p>
      </div>
      <Link
        to={`/courses/${course.id}`}
        className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        {t('common.readMore')}
      </Link>
    </article>
  )
}

export default CourseCard
