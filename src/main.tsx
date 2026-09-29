import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Modo ligero para equipos modestos (≤ 4 núcleos, ≤ 4 GB de RAM o ahorro de datos): vidrio sin blur y sin
// brillo del puntero. Las transiciones se mantienen: solo animan transform y opacity. Ver index.css.
const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
if (navigator.hardwareConcurrency <= 4 || (device.deviceMemory ?? 8) <= 4 || device.connection?.saveData) {
  document.documentElement.dataset.lite = ''
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML viene prerenderizado (scripts/prerender.mjs) y se hidrata; en desarrollo el root está vacío.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
