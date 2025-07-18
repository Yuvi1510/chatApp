import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AppRoutes from './config/AppRoutes.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppRoutes />
    <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)
