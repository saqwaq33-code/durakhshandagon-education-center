import { useLanguage } from '../hooks/useLanguage'

type SidebarProps = {
  items: Array<{
    id: string
    label: string
  }>
}

const Sidebar = ({ items }: SidebarProps) => {
  const { t } = useLanguage()

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-800">{t('profile.menu')}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded-md px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100">
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
