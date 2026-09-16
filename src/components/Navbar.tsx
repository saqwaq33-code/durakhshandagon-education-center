import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
  }`

const Navbar = () => {
  const { t } = useLanguage()
  const navItems = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/courses', label: t('nav.courses') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/profile', label: t('nav.profile') },
  ]

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
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navItemClass} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <nav className="mt-3 hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navItemClass} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
