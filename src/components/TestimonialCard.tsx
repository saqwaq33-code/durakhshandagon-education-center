import type { Testimonial } from '../data/siteData'
import { useLanguage } from '../hooks/useLanguage'

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const { language } = useLanguage()

  return (
    <article className="rounded-xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-emerald-900">“{testimonial.quote[language]}”</p>
      <p className="mt-4 text-sm font-semibold text-emerald-800">{testimonial.student[language]}</p>
      <p className="text-xs text-emerald-700">{testimonial.role[language]}</p>
    </article>
  )
}

export default TestimonialCard
