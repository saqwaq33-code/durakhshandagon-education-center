import { useLanguage } from '../hooks/useLanguage'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="mt-8 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Durakhshandagon Education Center</p>
        <p>{t('footer.tagline')}</p>
      </div>
    </footer>
  )
}

export default Footer
