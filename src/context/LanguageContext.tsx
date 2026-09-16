import { createContext, useMemo, useState, type ReactNode } from 'react'
import tg from '../i18n/tg.json'
import ru from '../i18n/ru.json'
import en from '../i18n/en.json'

export type Language = 'tg' | 'ru' | 'en'

interface Translations {
  [key: string]: string | Translations
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const dictionary: Record<Language, Translations> = { tg, ru, en }

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const getValue = (translations: Translations, key: string): string => {
  const value = key.split('.').reduce<string | Translations | undefined>((acc, section) => {
    if (typeof acc === 'object' && acc !== null) {
      return acc[section]
    }
    return undefined
  }, translations)

  return typeof value === 'string' ? value : key
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const browserLanguage = (localStorage.getItem('language') as Language) || 'tg'
  const [language, setLanguageState] = useState<Language>(browserLanguage)

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    localStorage.setItem('language', nextLanguage)
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => getValue(dictionary[language], key),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
