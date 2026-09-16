import { useLanguage } from '../hooks/useLanguage'
import type { Language } from '../context/LanguageContext'

const options: Language[] = ['tg', 'ru', 'en']

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm"
      role="group"
      aria-label="Language switcher"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          className={`rounded-md px-3 py-1 text-xs font-semibold uppercase transition ${
            language === option
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
