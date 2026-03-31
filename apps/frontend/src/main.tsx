import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@repo/ui/index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home/Home.tsx'
import Chat from './pages/Chat/Chat.tsx'
import { ThemeProvider } from '@repo/ui/components/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
