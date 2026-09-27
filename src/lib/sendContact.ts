export type ContactMessage = {
  name: string
  email: string
  message: string
}

// Único punto de envío del formulario. Reemplazar esta función al decidir el mecanismo
// (Formspree, mailto o función serverless) sin tocar el componente.
// TODO: definir VITE_CONTACT_ENDPOINT (p. ej. https://formspree.io/f/<id>) en .env.local.
export async function sendContact(data: ContactMessage): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
  if (!endpoint) {
    throw new Error('Contact endpoint is not configured.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Contact request failed with status ${response.status}.`)
  }
}
