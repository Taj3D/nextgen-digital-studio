import Link from "next/link"

/**
 * Logo — visual wordmark for NextGen Digital Studio.
 *
 * Pass `href` to render as a clickable link (renders <a> via next/link).
 * Omit `href` to render as a plain <div> — REQUIRED when this component
 * is placed inside another <a>/<Link> (e.g. inside SheetTitle or any
 * wrapping link) to avoid invalid nested-anchor hydration errors.
 */
export function Logo({
  className = "",
  href,
  ariaLabel = "NextGen Digital Studio home",
}: {
  className?: string
  href?: string
  ariaLabel?: string
}) {
  const inner = (
    <>
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/25 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 64 64" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 44V20h4.6l14.8 16.2V20H44v24h-4.6L24.6 27.8V44H20Z" fill="white" />
        </svg>
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300 ring-2 ring-white/70" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold tracking-tight text-foreground">
          NextGen
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Digital Studio
        </span>
      </span>
    </>
  )

  const classes = `group flex items-center gap-2.5 ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    )
  }

  return (
    <div className={classes} aria-label={ariaLabel}>
      {inner}
    </div>
  )
}
