import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML viene prerenderizado (scripts/prerender.mjs) y se hidrata; en desarrollo el root está vacío.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
