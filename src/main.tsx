
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from '@/hooks/use-auth-context'
import { LanguageProvider } from '@/hooks/use-language'

// Ensure the DOM is ready before mounting
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
)
