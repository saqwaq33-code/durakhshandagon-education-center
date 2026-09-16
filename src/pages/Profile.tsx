import Sidebar from '../components/Sidebar'
import { useLanguage } from '../hooks/useLanguage'

const Profile = () => {
  const { t } = useLanguage()

  const menuItems = [
    { id: 'courses', label: t('profile.myCourses') },
    { id: 'progress', label: t('profile.progress') },
    { id: 'certificates', label: t('profile.certificates') },
  ]

  return (
    <section className="grid gap-6 page-enter lg:grid-cols-[260px_1fr]">
      <Sidebar items={menuItems} />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{t('profile.title')}</h1>
        <p className="mt-3 text-slate-700">{t('profile.description')}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-700">{t('profile.stats.activeCourses')}</p>
            <p className="mt-1 text-2xl font-bold text-blue-900">3</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">{t('profile.stats.completed')}</p>
            <p className="mt-1 text-2xl font-bold text-emerald-900">7</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
