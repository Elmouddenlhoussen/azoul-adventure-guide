
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar' | 'ber';

interface TranslationMap {
  [key: string]: {
    en: string;
    fr: string;
    ar: string;
    ber: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: TranslationMap = {
  discover_services: {
    en: 'Discover Our Services',
    fr: 'Découvrez Nos Services',
    ar: 'اكتشف خدماتنا',
    ber: 'ⴰⵎⵓⴷ ⵏⵏⵖ',
  },
  experience_best: {
    en: 'Experience the best of Morocco with our curated services and authentic local experiences',
    fr: 'Découvrez le meilleur du Maroc avec nos services sélectionnés et nos expériences locales authentiques',
    ar: 'اختبر أفضل ما في المغرب من خلال خدماتنا المختارة والتجارب المحلية الأصيلة',
    ber: 'ⵜⴰⵎⵓⵏⵜ ⵏ ⵜⵎⵓⵔⵜ ⵏⵏⵖ ⵜⴰⵎⵓⵔⵜ ⵏⵏⵖ ⵜⴰⵎⵓⵔⵜ ⵏⵏⵖ',
  },
  popular_destinations: {
    en: 'Popular Destinations',
    fr: 'Destinations Populaires',
    ar: 'الوجهات الشعبية',
    ber: 'ⵉⵎⵛⴰⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ',
  },
  enchanting_places: {
    en: 'Discover enchanting places across Morocco that will take your breath away',
    fr: 'Découvrez des lieux enchanteurs à travers le Maroc qui vous couperont le souffle',
    ar: 'اكتشف أماكن ساحرة في جميع أنحاء المغرب ستأسرك بجمالها',
    ber: 'ⴰⵢⵜ ⵉⵎⴰⵍⴰⵙⵏ ⴷⴳ ⵜⵎⵓⵔⵜ ⵏ ⵍⵎⵖⵔⵉⴱ',
  },
  explore: {
    en: 'Explore Morocco',
    fr: 'Explorez le Maroc',
    ar: 'استكشف المغرب',
    ber: 'ⵜⴰⵎⵓⵔⵜ ⵏ ⵍⵎⵖⵔⵉⴱ',
  },
  interactive_map: {
    en: 'Plan your journey with our interactive map showcasing key attractions and hidden gems',
    fr: "Planifiez votre voyage avec notre carte interactive présentant les principales attractions et joyaux cachés",
    ar: 'خطط لرحلتك باستخدام خريطتنا التفاعلية التي تعرض المعالم الرئيسية والكنوز الخفية',
    ber: 'ⵜⵉⴷⵙⵉ ⵏⵏⴽ ⴷⴳ ⵜⵎⵓⵔⵜ ⵏ ⵍⵎⵖⵔⵉⴱ',
  },
  explore_all: {
    en: 'Explore All Experiences',
    fr: 'Explorez Toutes Les Expériences',
    ar: 'استكشف جميع التجارب',
    ber: 'ⴰⵎⵓⴷ ⴰⵎⵏ ⵏⵏⵖ',
  },
  view_all: {
    en: 'View All Destinations',
    fr: 'Voir Toutes Les Destinations',
    ar: 'عرض كل الوجهات',
    ber: 'ⵉⵎⵛⴰⵏ ⵎⴰⵕⵕⴰ',
  },
  // New translations for community experiences section
  community_experiences: {
    en: 'Community Experiences',
    fr: 'Expériences Communautaires',
    ar: 'تجارب المجتمع',
    ber: 'ⵜⵉⵎⵓⵏⵉⵏ',
  },
  community_experiences_desc: {
    en: 'Real stories and tips shared by travelers who have experienced the magic of Morocco',
    fr: 'Histoires et conseils partagés par des voyageurs qui ont vécu la magie du Maroc',
    ar: 'قصص ونصائح حقيقية يشاركها المسافرون الذين عاشوا سحر المغرب',
    ber: 'ⵜⵉⵎⵓⵏⵉⵏ ⵏ ⵉⵎⵓⴷⴰⵏ ⴷⴳ ⵍⵎⵖⵔⵉⴱ',
  },
  share_your_experience: {
    en: 'Share Your Experience',
    fr: 'Partagez Votre Expérience',
    ar: 'شارك تجربتك',
    ber: 'ⴼⴽ ⵜⴰⵎⵓⵏⵜ ⵏⵏⴽ',
  },
  view_all_experiences: {
    en: 'View All Experiences',
    fr: 'Voir Toutes Les Expériences',
    ar: 'عرض كل التجارب',
    ber: 'ⵉⵎⵓⵏⵏ ⵎⴰⵕⵕⴰ',
  },
  read_more: {
    en: 'Read More',
    fr: 'Lire Plus',
    ar: 'اقرأ المزيد',
    ber: 'ⵖⵔ ⵓⴳⴳⴰⵔ',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    // Only update text direction without changing full layout
    document.body.classList.remove('arabic-text');
    if (lang === 'ar') {
      document.body.classList.add('arabic-text');
    }
  };

  useEffect(() => {
    // Apply initial language settings
    const savedLang = localStorage.getItem('language') as Language || 'en';
    setLanguage(savedLang);
  }, []);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
