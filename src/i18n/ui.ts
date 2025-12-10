export const languages = ['fr', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLang = 'fr';

export const ui = {
  en: {
    about: 'About',
    contact: 'Contact',
    skills: 'Skills',
    'experience.title': 'Work Experience',
    '404.back': 'Back Home',
    'theme.switch': ({ theme }: { theme: string | null }) =>
      `Switch to ${
        !theme ? 'dark' : theme === 'dark' ? 'light' : 'system'
      } theme`,
    'lang.switch': 'Change language',
    'home.title': 'Home',
    'posts.title': 'Posts',
    'posts.latest': 'Latest posts',
    'posts.back': 'Back to articles',
  },
  fr: {
    about: 'À propos',
    contact: 'Contact',
    skills: 'Compétences',
    'experience.title': 'Expérience',
    '404.back': "Retour à l'accueil",
    'theme.switch': ({ theme }: { theme: string | null }) =>
      `Basculer sur le thème ${
        !theme ? 'sombre' : theme === 'dark' ? 'clair' : 'système'
      }`,
    'lang.switch': 'Changer de langue',
    'home.title': 'Accueil',
    'posts.title': 'Articles',
    'posts.latest': 'Derniers articles',
    'posts.back': 'Retour aux articles',
  },
} as const satisfies Record<
  Language,
  Record<string, string | null | ((params: any) => string)>
>;
