# oscardarce.com

Landing page personal de Oscar Darce. Es una sola página con las secciones Hero, About, Skills, Experience, Education y Contact.

**Stack:** React 19, TypeScript, Vite y Tailwind CSS v4. No usa librerías de UI, animación ni iconos. Se despliega en Vercel.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:5173`. |
| `npm run build` | Type-check, build del cliente, build SSR y prerender del HTML (ver [SEO](#seo)). |
| `npm run preview` | Sirve `dist/` para revisar el build. |
| `npm run lint` | ESLint. |

## Estructura

```
index.html              <head>: title, meta, Open Graph, JSON-LD, favicons y fuentes
vercel.json             Cabeceras de seguridad (CSP, HSTS…) y caché de /assets
public/                 Favicons, manifest, og-image, robots.txt, sitemap.xml
scripts/prerender.mjs   Último paso del build: escribe el HTML de la página en dist/index.html
src/
  main.tsx              Arranque: hidrata el HTML prerenderizado (o renderiza en dev)
  entry-server.tsx      Render a string para el prerender
  App.tsx               Composición de la página
  data/profile.ts       TODO el contenido (textos del CV, enlaces, orden de secciones)
  components/
    layout/             Header, MobileDrawer, Navigation, Footer, Backdrop
    sections/           Una por sección de la página
    ui/                 Piezas reutilizables: Button, Chip, GlassCard, Section, SocialLinks, Icons
  hooks/                useActiveSection, useSectionScroll, usePointerGlow
  lib/sendContact.ts    Envío del formulario (Web3Forms)
  styles/transitions.css  Transición entre secciones (desktop)
  index.css             Tokens (@theme), estilos base, fondo y vidrio
_referencias/           CV, capturas de Stitch y originales del logo (en .gitignore, no se publica)
```

## Cómo cambiar cosas

- **Textos, experiencia, skills o enlaces:** solo `src/data/profile.ts`. Los componentes no tienen textos del CV.
- **Añadir una sección:** agrégala a `sections` en `profile.ts` (la navegación y la rueda la toman de ahí), crea su componente en `components/sections/` y colócala en `App.tsx` dentro de `<Section>`.
- **Colores, fuentes, radios, sombras:** tokens en el bloque `@theme` de `src/index.css`. Se usan como clases de Tailwind (`bg-primary`, `text-title`, `rounded-card`, `shadow-glass`…).
- **Formulario:** `src/lib/sendContact.ts`. La access key de Web3Forms es pública por diseño (solo permite enviar a `oscardarce@gmail.com`). Para cambiar de servicio basta con reescribir esa función.

## Comportamiento del scroll

- **Desktop (≥ 1024 px):** scroll snap `mandatory`. Un gesto de rueda lleva a la sección siguiente o anterior (`useSectionScroll`). La transición entre secciones (`styles/transitions.css`) usa *scroll-driven animations* de CSS: el contenido queda quieto y se desvanece. Al bajar, la sección que sale se aleja hacia el fondo; al subir, la que vuelve entra desde los bordes.
- **Móvil y tablet:** scroll nativo, sin snap ni transición (las secciones miden más que la pantalla), y menú lateral (`MobileDrawer`).
- **Sin la transición:** navegadores sin `animation-timeline` y equipos con *reduced motion* activado (en Windows, "Efectos de animación" desactivado) muestran el scroll normal. El contenido es el mismo.

## SEO

- `npm run build` prerenderiza la página (`entry-server.tsx` + `scripts/prerender.mjs`). El HTML servido ya trae todo el contenido y React lo hidrata en el navegador. No hay dependencias extra: usa `react-dom/server`.
- `index.html`: title, description, canonical, Open Graph, Twitter card y datos estructurados `Person` (JSON-LD).
- `public/robots.txt` y `public/sitemap.xml`. Actualiza `<lastmod>` del sitemap cuando cambie el contenido.
- Google Search Console: dominio verificado y sitemap enviado desde ahí.

## Deploy

Vercel despliega automáticamente cada push a `main`. Dominios del proyecto: `oscardarce.com` (principal) y `www.oscardarce.com`, que redirige al principal. `vercel.json` añade las cabeceras de seguridad. Si se agrega un servicio externo (analytics, otra API), hay que permitirlo en la `Content-Security-Policy`.
