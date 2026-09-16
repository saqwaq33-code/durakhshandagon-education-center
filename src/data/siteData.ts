export type MultiLangText = {
  tg: string
  ru: string
  en: string
}

export type Course = {
  id: string
  title: MultiLangText
  description: MultiLangText
  teacher: MultiLangText
  duration: MultiLangText
  level: MultiLangText
}

export type Testimonial = {
  id: string
  student: MultiLangText
  role: MultiLangText
  quote: MultiLangText
}

export type Teacher = {
  id: string
  name: MultiLangText
  specialty: MultiLangText
}

export const courses: Course[] = [
  {
    id: 'english-pro',
    title: {
      tg: 'Англисӣ барои ояндаи байналмилалӣ',
      ru: 'Английский для международного будущего',
      en: 'English for an International Future',
    },
    description: {
      tg: 'Омӯзиши муосири грамматика, гуфтугӯ ва имтиҳонҳои байналмилалӣ.',
      ru: 'Современный курс грамматики, разговорной практики и подготовки к международным экзаменам.',
      en: 'Modern grammar, speaking practice, and international exam preparation.',
    },
    teacher: {
      tg: 'Устод: Мадина Раҳмонова',
      ru: 'Преподаватель: Мадина Рахмонова',
      en: 'Instructor: Madina Rahmonova',
    },
    duration: {
      tg: '6 моҳ',
      ru: '6 месяцев',
      en: '6 months',
    },
    level: {
      tg: 'Аз A1 то B2',
      ru: 'От A1 до B2',
      en: 'A1 to B2',
    },
  },
  {
    id: 'it-start',
    title: {
      tg: 'IT Start: Барномасозӣ аз сифр',
      ru: 'IT Start: Программирование с нуля',
      en: 'IT Start: Programming from Scratch',
    },
    description: {
      tg: 'HTML, CSS, JavaScript ва лоиҳаҳои амалӣ барои шурӯъкунандагон.',
      ru: 'HTML, CSS, JavaScript и практические проекты для начинающих.',
      en: 'HTML, CSS, JavaScript, and practical projects for beginners.',
    },
    teacher: {
      tg: 'Устод: Фарид Ҷӯраев',
      ru: 'Преподаватель: Фарид Джураев',
      en: 'Instructor: Farid Juraev',
    },
    duration: {
      tg: '4 моҳ',
      ru: '4 месяца',
      en: '4 months',
    },
    level: {
      tg: 'Beginner',
      ru: 'Начальный',
      en: 'Beginner',
    },
  },
  {
    id: 'math-olymp',
    title: {
      tg: 'Математикаи амиқ ва олимпиада',
      ru: 'Углублённая математика и олимпиады',
      en: 'Advanced Mathematics & Olympiad Prep',
    },
    description: {
      tg: 'Алгебра, геометрия ва стратегияҳои ҳалли масъалаҳо бо сатҳи баланд.',
      ru: 'Алгебра, геометрия и стратегии решения задач на высоком уровне.',
      en: 'Algebra, geometry, and high-level problem-solving strategies.',
    },
    teacher: {
      tg: 'Устод: Шаҳром Сафаров',
      ru: 'Преподаватель: Шахром Сафаров',
      en: 'Instructor: Shahrom Safarov',
    },
    duration: {
      tg: '8 моҳ',
      ru: '8 месяцев',
      en: '8 months',
    },
    level: {
      tg: 'Пешрафта',
      ru: 'Продвинутый',
      en: 'Advanced',
    },
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    student: { tg: 'Сабрина А.', ru: 'Сабрина А.', en: 'Sabrina A.' },
    role: {
      tg: 'Донишҷӯ, курси Англисӣ',
      ru: 'Студентка, курс английского',
      en: 'Student, English Program',
    },
    quote: {
      tg: 'Усулҳои таълим бисёр равшананд. Ман дар 5 моҳ ба сатҳи B2 расидам.',
      ru: 'Методы обучения очень понятные. За 5 месяцев я достигла уровня B2.',
      en: 'The teaching method is very clear. I reached B2 in 5 months.',
    },
  },
  {
    id: '2',
    student: { tg: 'Муҳаммад Р.', ru: 'Мухаммад Р.', en: 'Muhammad R.' },
    role: {
      tg: 'Донишҷӯ, IT Start',
      ru: 'Студент, IT Start',
      en: 'Student, IT Start',
    },
    quote: {
      tg: 'Баъди курс вебсайти аввалинамро сохтам ва фрилансро оғоз кардам.',
      ru: 'После курса я сделал свой первый сайт и начал фриланс.',
      en: 'After the course, I built my first website and started freelancing.',
    },
  },
]

export const teachers: Teacher[] = [
  {
    id: 't1',
    name: { tg: 'Мадина Раҳмонова', ru: 'Мадина Рахмонова', en: 'Madina Rahmonova' },
    specialty: { tg: 'Англисӣ ва IELTS', ru: 'Английский и IELTS', en: 'English & IELTS' },
  },
  {
    id: 't2',
    name: { tg: 'Фарид Ҷӯраев', ru: 'Фарид Джураев', en: 'Farid Juraev' },
    specialty: { tg: 'Frontend Development', ru: 'Frontend Development', en: 'Frontend Development' },
  },
  {
    id: 't3',
    name: { tg: 'Шаҳром Сафаров', ru: 'Шахром Сафаров', en: 'Shahrom Safarov' },
    specialty: {
      tg: 'Математикаи олимпиадӣ',
      ru: 'Олимпиадная математика',
      en: 'Olympiad Mathematics',
    },
  },
]
