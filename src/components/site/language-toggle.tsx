'use client'

import { useLang } from "./language-provider"
import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"

export function LanguageToggle({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { lang, toggle } = useLang()
  return (
    <button
      type="button"
      aria-label={lang === 'en' ? 'Switch to Bangla' : 'Switch to English'}
      onClick={toggle}
      className={cn(
        "relative inline-flex h-9 items-center gap-1.5 overflow-hidden rounded-full border border-border/60 bg-background/60 px-3 text-xs font-bold transition-colors hover:bg-muted",
        compact && "px-2.5",
        className,
      )}
    >
      {!compact && <Languages className="h-3.5 w-3.5 text-blue-600" />}
      <span className={cn("transition-opacity", lang === 'en' ? 'opacity-100' : 'opacity-50')}>
        EN
      </span>
      <span className="text-muted-foreground/40">/</span>
      <span className={cn("transition-opacity", lang === 'bn' ? 'opacity-100' : 'opacity-50')}>
        বাং
      </span>
    </button>
  )
}
