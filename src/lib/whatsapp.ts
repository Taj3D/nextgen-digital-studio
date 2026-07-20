// WhatsApp link helper for NextGen Digital Studio.

import { siteConfig } from '@/lib/site-data'

export const WHATSAPP_NUMBER = siteConfig.whatsapp

const DEFAULT_TEXT = 'Hi NextGen! I want to learn about your AI sales system.'

/**
 * Build a wa.me deep link with an optional pre-filled message.
 * @param text Optional message. Falls back to the default greeting.
 */
export function waLink(text?: string): string {
  const message = typeof text === 'string' && text.trim().length > 0 ? text : DEFAULT_TEXT
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
