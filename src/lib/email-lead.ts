/**
 * Email notification for leads — sends lead details to the business email
 * via a simple API. No external setup required.
 *
 * Uses the /api/send-email internal endpoint which forwards to
 * nextgendigitalstudio1@gmail.com.
 */

export type EmailLead = {
  name: string
  email: string
  phone: string
  company?: string
  service?: string
  message?: string
  source: string
}

export async function sendLeadEmail(lead: EmailLead): Promise<boolean> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'nextgendigitalstudio1@gmail.com',
        subject: `New Lead: ${lead.source} — ${lead.name}`,
        body: [
          `New lead received!`,
          ``,
          `Name: ${lead.name}`,
          `Email: ${lead.email}`,
          `Phone: ${lead.phone}`,
          lead.company ? `Company: ${lead.company}` : '',
          lead.service ? `Service: ${lead.service}` : '',
          lead.message ? `Message: ${lead.message}` : '',
          `Source: ${lead.source}`,
          `Time: ${new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka' })}`,
        ].filter(Boolean).join('\n'),
      }),
    })
    return res.ok
  } catch (err) {
    console.error('[email-lead] send failed:', err instanceof Error ? err.message : err)
    return false
  }
}
