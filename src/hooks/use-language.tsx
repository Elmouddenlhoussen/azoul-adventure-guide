
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
    
    // Navigation
    'home': 'Home',
    'destinations': 'Destinations',
    'tours': 'Tours',
    'guides': 'Guides',
    'accommodations': 'Accommodations',
    'about': 'About Us',
    'news': 'News',
    'contact': 'Contact',
    'sign_in': 'Sign In',
    'sign_up': 'Sign Up',
    'profile': 'Profile',
    'admin': 'Admin',
    'logout': 'Logout',
    
    // Destination pages
    'location': 'Location',
    'duration': 'Recommended Duration',
    'best_time': 'Best Time to Visit',
    'group_size': 'Group Size',
    'activities': 'Activities',
    'highlights': 'Highlights',
    'similar_destinations': 'Similar Destinations',
    'plan_visit': 'Plan Your Visit',
    
    // Common UI elements
    'search': 'Search',
    'view_details': 'View Details',
    'book_now': 'Book Now',
    'learn_more': 'Learn More',
    'read_more': 'Read More',
    'coming_soon': 'Coming soon...',
    'back': 'Back',
    
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
    
    // Navigation
    'home': 'Accueil',
    'destinations': 'Destinations',
    'tours': 'Circuits',
    'guides': 'Guides',
    'accommodations': 'Hébergements',
    'about': 'À Propos',
    'news': 'Actualités',
    'contact': 'Contact',
    'sign_in': 'Se Connecter',
    'sign_up': 'S\'inscrire',
    'profile': 'Profil',
    'admin': 'Admin',
    'logout': 'Déconnexion',
    
    // Destination pages
    'location': 'Emplacement',
    'duration': 'Durée Recommandée',
    'best_time': 'Meilleure Période',
    'group_size': 'Taille du Groupe',
    'activities': 'Activités',
    'highlights': 'Points Forts',
    'similar_destinations': 'Destinations Similaires',
    'plan_visit': 'Planifier Votre Visite',
    
    // Common UI elements
    'search': 'Rechercher',
    'view_details': 'Voir les Détails',
    'book_now': 'Réserver',
    'learn_more': 'En Savoir Plus',
    'read_more': 'Lire Plus',
    'coming_soon': 'Bientôt disponible...',
    'back': 'Retour',
    
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
    
    // Navigation
    'home': 'الرئيسية',
    'destinations': 'الوجهات',
    'tours': 'الجولات',
    'guides': 'المرشدون',
    'accommodations': 'أماكن الإقامة',
    'about': 'من نحن',
    'news': 'الأخبار',
    'contact': 'اتصل بنا',
    'sign_in': 'تسجيل الدخول',
    'sign_up': 'التسجيل',
    'profile': 'الملف الشخصي',
    'admin': 'المسؤول',
    'logout': 'تسجيل الخروج',
    
    // Destination pages
    'location': 'الموقع',
    'duration': 'المدة الموصى بها',
    'best_time': 'أفضل وقت للزيارة',
    'group_size': 'حجم المجموعة',
    'activities': 'الأنشطة',
    'highlights': 'أبرز المعالم',
    'similar_destinations': 'وجهات مشابهة',
    'plan_visit': 'خطط لزيارتك',
    
    // Common UI elements
    'search': 'بحث',
    'view_details': 'عرض التفاصيل',
    'book_now': 'احجز الآن',
    'learn_more': 'اعرف المزيد',
    'read_more': 'اقرأ المزيد',
    'coming_soon': 'قريبًا...',
    'back': 'رجوع',
    
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
    
    // Navigation
    'home': 'ⵜⴰⵏⵣⵡⴰⵔⵜ',
    'destinations': 'ⵉⵙⴰⴼⴰⵔⵏ',
    'tours': 'ⵜⵉⴽⴽⵉⵡⵉⵏ',
    'guides': 'ⵉⵎⴷⵍⵉⵍⵏ',
    'accommodations': 'ⵉⵙⴰⴷⴰⴼⵏ',
    'about': 'ⵅⴼⵏⵖ',
    'news': 'ⵉⵏⵖⵎⵉⵙⵏ',
    'contact': 'ⵏⵔⵎⵙ ⴰⵖ',
    'sign_in': 'ⴰⴽⵛⵎ',
    'sign_up': 'ⵣⵎⵎⵎ',
    'profile': 'ⴰⵎⵍⵓⵙ',
    'admin': 'ⴰⵏⵎⵀⴰⵍ',
    'logout': 'ⴼⴼⵖ',
    
    // Destination pages
    'location': 'ⴰⴷⵖⴰⵔ',
    'duration': 'ⵜⴰⵣⵣⵔⵓⵔⵜ',
    'best_time': 'ⴰⴽⵓⴷ ⵉⵎⵥⵢⴰⵏⵏ',
    'group_size': 'ⵜⵉⴷⴷⵉ ⵏ ⵓⴳⵔⵓⴱ',
    'activities': 'ⵜⵉⵎⵙⴽⴰⵔⵉⵏ',
    'highlights': 'ⵉⵙⵓⵍⴰⵏ',
    'similar_destinations': 'ⵉⵙⴰⴼⴰⵔⵏ ⵉⵎⵔⵡⴰⵙⵏ',
    'plan_visit': 'ⵙⵓⵊⴷ ⵜⵉⵔⵣⵉ ⵏⵏⴽ',
    
    // Common UI elements
    'search': 'ⵔⵣⵓ',
    'view_details': 'ⵥⵕ ⵜⵉⴼⵔⴰⵙ',
    'book_now': 'ⴰⵔⴰⵖ ⵖⵉⵍⴰⴷ',
    'learn_more': 'ⵙⵙⵏ ⵓⴳⴳⴰⵔ',
    'read_more': 'ⵖⵔ ⵓⴳⴳⴰⵔ',
    'coming_soon': 'ⴰⵔⴷ ⵢⵉⵍⵉ ⴰⵣⴽⴽⴰ...',
    'back': 'ⴰⵖⵓⵍ',
    
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
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
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
