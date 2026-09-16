import CourseCard from '../components/CourseCard'
import { courses } from '../data/siteData'
import { useLanguage } from '../hooks/useLanguage'

const Courses = () => {
  const { t } = useLanguage()

  return (
    <section className="space-y-5 page-enter">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{t('courses.title')}</h1>
      <p className="max-w-2xl text-sm text-slate-600 sm:text-base">{t('courses.description')}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

export default Courses
