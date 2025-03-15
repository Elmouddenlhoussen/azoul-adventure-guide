
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import { Toaster } from '@/components/ui/toaster'
import ScrollToTop from '@/components/ScrollToTop'
import ChatAssistant from '@/components/ChatAssistant'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatAssistant />
      <Toaster />
    </>
  )
}

export default App
