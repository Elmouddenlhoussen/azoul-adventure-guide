
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    'welcome': 'Welcome to Azoul',
    'explore': 'Explore Morocco',
    'popular_destinations': 'Popular Destinations',
    'why_choose': 'Why Choose Azoul',
    'get_started': 'Get Started',
    'contact_us': 'Contact Us',
    'ready': 'Ready to Experience the Magic of Morocco?',
    'start_exploring': 'Start Exploring',
    'chat_with': 'Chat with Azoul',
    // Add more translations as needed
  },
  fr: {
    'welcome': 'Bienvenue à Azoul',
    'explore': 'Explorez le Maroc',
    'popular_destinations': 'Destinations Populaires',
    'why_choose': 'Pourquoi Choisir Azoul',
    'get_started': 'Commencer',
    'contact_us': 'Contactez-nous',
    'ready': 'Prêt à Vivre la Magie du Maroc?',
    'start_exploring': 'Commencer à Explorer',
    'chat_with': 'Discuter avec Azoul',
    // Add more translations as needed
  },
  ar: {
    'welcome': 'مرحبًا بك في أزول',
    'explore': 'استكشف المغرب',
    'popular_destinations': 'الوجهات الشعبية',
    'why_choose': 'لماذا تختار أزول',
    'get_started': 'البدء',
    'contact_us': 'اتصل بنا',
    'ready': 'هل أنت مستعد لتجربة سحر المغرب؟',
    'start_exploring': 'ابدأ الاستكشاف',
    'chat_with': 'الدردشة مع أزول',
    // Add more translations as needed
  },
  ber: {
    'welcome': 'ⴰⵣⵓⵍ ⵙ ⴰⵣⵓⵍ',
    'explore': 'ⵙⵙⵓⵊⵊⴷ ⵍⵎⵖⵔⵉⴱ',
    'popular_destinations': 'ⵉⵎⵓⴽⴰⵏ ⵉⵜⵜⵡⴰⵙⵙⵏⵏ',
    'why_choose': 'ⵎⴰⵖⴼ ⴰⴷ ⵜⵅⵜⴰⵔⴷ ⴰⵣⵓⵍ',
    'get_started': 'ⴱⴷⵓ',
    'contact_us': 'ⵏⵔⵎⵙ ⴰⵖ',
    'ready': 'ⵉⵙ ⵜⵙⵓⵊⴷⴷ ⵉ ⵜⴰⵔⵎⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ?',
    'start_exploring': 'ⴱⴷⵓ ⴰⵙⵙⵓⵊⵊⴷ',
    'chat_with': 'ⵙⵉⵡⵍ ⴷ ⴰⵣⵓⵍ',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Optionally set document language for accessibility
    document.documentElement.lang = language;
    // For RTL languages like Arabic
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
