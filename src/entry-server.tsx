import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

// Solo se usa en el build (scripts/prerender.mjs): genera el HTML de la página para que buscadores y
// previsualizaciones de enlaces vean el contenido sin ejecutar JavaScript. En el navegador, main.tsx lo hidrata.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
