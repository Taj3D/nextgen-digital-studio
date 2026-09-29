// WhatsApp link helper for NextGen Digital Studio.

export const WHATSAPP_NUMBER = '8801711731354'

// Per ERMOS v4.0 §12: Broad, non-AI-sales-specific message.
// Old message "I want to learn about your AI sales system" REMOVED — conflicts
// with broader NGS Consulting | Training | Digital Solutions positioning.
const DEFAULT_TEXT = 'Hi NextGen! I want to discuss my business/project and explore your consulting or digital solutions.'

// Workshop-specific message (used when workshop CTA is invoked).
const WORKSHOP_TEXT = 'Hi NextGen! I want to invite you for a workshop or speaking engagement. Please share details.'

/**
 * Build a wa.me deep link with an optional pre-filled message.
 * @param text Optional message. Falls back to the default greeting.
 * @param kind Optional 'workshop' for workshop-specific CTAs.
 */
export function waLink(text?: string, kind?: 'default' | 'workshop'): string {
  let message: string
  if (typeof text === 'string' && text.trim().length > 0) {
    message = text
  } else if (kind === 'workshop') {
    message = WORKSHOP_TEXT
  } else {
    message = DEFAULT_TEXT
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

