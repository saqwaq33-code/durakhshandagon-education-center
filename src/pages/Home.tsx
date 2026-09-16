import HeroSection from '../components/HeroSection'
import CourseCard from '../components/CourseCard'
import TestimonialCard from '../components/TestimonialCard'
import { courses, testimonials } from '../data/siteData'
import { useLanguage } from '../hooks/useLanguage'

const Home = () => {
  const { t } = useLanguage()

  return (
    <div className="space-y-10 page-enter">
      <HeroSection />

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{t('home.popularCourses')}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">{t('home.testimonials')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
