
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './hooks/use-language'
import { ThemeProvider } from './hooks/use-theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <App />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
