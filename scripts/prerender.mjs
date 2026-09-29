// Paso final del build: inserta en dist/index.html el HTML que genera src/entry-server.tsx.
// Así la página llega con su contenido (SEO, previsualizaciones) y React la hidrata en el navegador.
import { readFile, rm, writeFile } from 'node:fs/promises'

const indexPath = new URL('../dist/index.html', import.meta.url)
const serverDir = new URL('../dist-server/', import.meta.url)
const placeholder = '<div id="root"></div>'

const { render } = await import(new URL('entry-server.js', serverDir))
const html = await readFile(indexPath, 'utf8')
if (!html.includes(placeholder)) throw new Error(`prerender: no se encontró ${placeholder} en dist/index.html`)

await writeFile(indexPath, html.replace(placeholder, `<div id="root">${render()}</div>`))
await rm(serverDir, { recursive: true, force: true })
console.log('prerender: dist/index.html generado con el contenido de la página')
