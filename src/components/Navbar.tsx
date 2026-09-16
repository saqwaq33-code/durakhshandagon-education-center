import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
  }`

const Navbar = () => {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-bold text-blue-700 sm:text-base">
            Durakhshandagon Education Center
          </Link>
          <LanguageSwitcher />
        </div>

        <nav className="mt-3 flex flex-wrap items-center gap-2 md:hidden">
          <NavLink to="/" className={navItemClass} end>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/courses" className={navItemClass}>
            {t('nav.courses')}
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/contact" className={navItemClass}>
            {t('nav.contact')}
          </NavLink>
          <NavLink to="/profile" className={navItemClass}>
            {t('nav.profile')}
          </NavLink>
        </nav>

        <nav className="mt-3 hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navItemClass} end>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/courses" className={navItemClass}>
            {t('nav.courses')}
          </NavLink>
          <NavLink to="/about" className={navItemClass}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/contact" className={navItemClass}>
            {t('nav.contact')}
          </NavLink>
          <NavLink to="/profile" className={navItemClass}>
            {t('nav.profile')}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
