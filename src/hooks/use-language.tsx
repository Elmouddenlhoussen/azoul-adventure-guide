
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
    
    // Chat translations
    'morocco_guide': 'Morocco Guide',
    'ready_to_assist': 'Ready to assist you',
    'ask_about_morocco': 'Ask me about Morocco...',
    'chat_error': 'Chat Issue',
    'chat_error_description': 'I had trouble understanding that. Let\'s try something else.',
    'chat_connection_error': 'Connection Error',
    'chat_connection_error_description': 'Couldn\'t reach the assistant. Please check your connection.',
    'chat_connection_error_message': 'I\'m having trouble understanding right now. Could you try asking your question differently?',
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
    
    // Chat translations
    'morocco_guide': 'Guide du Maroc',
    'ready_to_assist': 'Prêt à vous aider',
    'ask_about_morocco': 'Demandez-moi à propos du Maroc...',
    'chat_error': 'Problème de Chat',
    'chat_error_description': 'J\'ai eu du mal à comprendre. Essayons autre chose.',
    'chat_connection_error': 'Erreur de Connexion',
    'chat_connection_error_description': 'Impossible de joindre l\'assistant. Veuillez vérifier votre connexion.',
    'chat_connection_error_message': 'J\'ai du mal à comprendre en ce moment. Pourriez-vous reformuler votre question?',
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
    
    // Chat translations
    'morocco_guide': 'دليل المغرب',
    'ready_to_assist': 'جاهز لمساعدتك',
    'ask_about_morocco': 'اسألني عن المغرب...',
    'chat_error': 'مشكلة في المحادثة',
    'chat_error_description': 'واجهت صعوبة في الفهم. دعنا نجرب شيئًا آخر.',
    'chat_connection_error': 'خطأ في الاتصال',
    'chat_connection_error_description': 'تعذر الوصول إلى المساعد. يرجى التحقق من اتصالك.',
    'chat_connection_error_message': 'أواجه صعوبة في الفهم الآن. هل يمكنك إعادة صياغة سؤالك؟',
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
    
    // Chat translations
    'morocco_guide': 'ⴰⵎⴷⴰⵡ ⵏ ⵍⵎⵖⵔⵉⴱ',
    'ready_to_assist': 'ⵡⵊⴷⵖ ⴰⴷ ⴽ ⵄⴰⵡⵏⵖ',
    'ask_about_morocco': 'ⵙⵇⵙⴰⵢⵉ ⵅⴼ ⵍⵎⵖⵔⵉⴱ...',
    'chat_error': 'ⵜⴰⵎⵓⴽⵔⵉⵙⵜ ⵏ ⵓⵙⵉⵡⵍ',
    'chat_error_description': 'ⵓⴼⵉⵖ ⵜⴰⵎⴰⵔⴰ ⴰⴷ ⵙⵙⵏⵖ. ⴰⴷ ⵏⴰⵔⵎ ⴽⵔⴰ ⵢⴰⴹⵏ.',
    'chat_connection_error': 'ⵜⴰⵎⵓⴽⵔⵉⵙⵜ ⵏ ⵓⵣⴷⴰⵢ',
    'chat_connection_error_description': 'ⵓⵔ ⵣⵎⵉⵔⵖ ⴰⴷ ⵍⴽⵎⵖ ⴰⵎⴰⵡⴰⵙ. ⵜⵜⵅⵇⵇⴰ ⴰⵣⴷⴰⵢ ⵏⵏⴽ.',
    'chat_connection_error_message': 'ⴳⴰⵏⵖ ⵜⵉⵣⵉ ⴷⴰ ⵓⴼⵉⵖ ⵜⴰⵎⴰⵔⴰ ⴰⴷ ⵙⵙⵏⵖ. ⵉⵙ ⵜⵣⵎⵔⴷ ⴰⴷ ⵜⴱⴷⴷⵍⴷ ⴰⵙⵇⵙⵉ ⵏⵏⴽ?',
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
