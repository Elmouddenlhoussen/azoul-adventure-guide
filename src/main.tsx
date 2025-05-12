
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from '@/hooks/use-auth-context'
import { LanguageProvider } from '@/hooks/use-language'

// Set initial language based on saved preference
const savedLanguage = localStorage.getItem('language') || 'en';
document.documentElement.lang = savedLanguage;

// We're intentionally not setting document.dir to preserve layout
// Instead we'll use CSS for text directional changes

// Add style for Arabic text without changing the entire layout
const style = document.createElement('style');
style.textContent = `
  .arabic-text * {
    text-align: right;
  }
  
  /* Keep specific elements like headers, buttons, etc. with their original layout */
  .preserve-layout-rtl {
    direction: ltr !important;
    text-align: left !important;
  }
`;
document.head.appendChild(style);

// Ensure the DOM is ready before mounting
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
)
