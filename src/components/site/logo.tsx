import Link from "next/link"
import Image from "next/image"

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
      <Image
        src="/logo.jpg"
        alt="NextGen Digital Studio"
        width={36}
        height={36}
        className="h-9 w-9 rounded-xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
      />
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
