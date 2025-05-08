import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AppRoutes/>
      <Toaster/>
    </Router>
  </StrictMode>,
)
