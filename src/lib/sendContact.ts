export type ContactMessage = {
  name: string
  email: string
  message: string
  // Honeypot de Web3Forms: los humanos lo dejan vacío; si llega marcado, Web3Forms descarta el envío.
  botcheck: boolean
}

// Web3Forms entrega los mensajes en oscardarce@gmail.com. La access key es pública por diseño
// (solo permite enviar a ese correo), así que puede vivir en el frontend.
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = 'dafb5b89-f91f-4672-9e49-dc45380a2390'

// Único punto de envío del formulario: cambiar de servicio solo requiere tocar esta función.
export async function sendContact(data: ContactMessage): Promise<void> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'New message from oscardarce.com',
      from_name: 'oscardarce.com',
      name: data.name,
      email: data.email,
      message: data.message,
      botcheck: data.botcheck,
    }),
  })

  const result = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null
  if (!response.ok || !result?.success) {
    throw new Error(result?.message ?? `Contact request failed with status ${response.status}.`)
  }
}
