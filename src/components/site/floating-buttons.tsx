'use client'

import * as React from 'react'
import { MessageCircle } from 'lucide-react'

import { useLang } from '@/components/site/language-provider'
import { waLink } from '@/lib/whatsapp'

export function FloatingButtons() {
  const { t } = useLang()
  const [hovered, setHovered] = React.useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 safe-bottom">
      {/* Tooltip */}
      <div
        role="tooltip"
        className={`pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-popover/95 px-3 py-2 text-xs font-medium text-popover-foreground shadow-md backdrop-blur transition-all duration-200 ${
          hovered
            ? 'translate-x-0 opacity-100'
            : 'translate-x-2 opacity-0'
        }`}
      >
        {t('float.whatsapp')}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-popover/95" />
      </div>

      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('float.whatsapp')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="animate-pulse-glow grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d]"
      >
        <MessageCircle className="h-7 w-7" />
        {/* Online indicator */}
        <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background bg-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
        </span>
      </a>
    </div>
  )
}

export default FloatingButtons
