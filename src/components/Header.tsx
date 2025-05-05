
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import MainNav from './navigation/MainNav';
import MobileNav from './navigation/MobileNav';
import AuthButtons from './AuthButtons';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 border-b border-border/40 bg-white/80 backdrop-blur-md z-50 dark:bg-gray-900/80 dark:border-gray-800/40">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="mr-6">
            <Logo />
          </Link>
          <MainNav />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <SearchBar />
          <LanguageSwitcher />
          <ThemeToggle />
          <AuthButtons />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
