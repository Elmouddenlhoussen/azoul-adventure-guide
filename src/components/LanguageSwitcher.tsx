
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/use-language';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'ber', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦' }
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Force re-render of the page when language changes
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    // Force re-render by refreshing the window
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="flex items-center gap-1 px-2 py-1 rounded-md text-sm hover:bg-morocco-red/10 dark:hover:bg-morocco-red/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Globe className="h-4 w-4 text-morocco-green dark:text-morocco-sand" />
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="hidden sm:inline-block">{currentLanguage.name}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] dark:bg-gray-800">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={`flex items-center gap-2 cursor-pointer ${
              lang.code === language ? 'bg-morocco-green/10 text-morocco-green dark:bg-morocco-green/20 dark:text-morocco-sand font-medium' : ''
            }`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
