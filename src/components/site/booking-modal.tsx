'use client'

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { services } from "@/lib/site-data"
import { toast } from "sonner"

type BookingCtx = {
  open: boolean
  setOpen: (v: boolean) => void
  presetService?: string
  openWith: (service?: string) => void
}

const Ctx = React.createContext<BookingCtx | null>(null)

export function useBooking() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [presetService, setPresetService] = React.useState<string | undefined>(undefined)

  const openWith = React.useCallback((service?: string) => {
    setPresetService(service)
    setOpen(true)
  }, [])

  return (
    <Ctx.Provider value={{ open, setOpen, presetService, openWith }}>
      {children}
      <BookingDialog presetService={presetService} open={open} onOpenChange={setOpen} />
    </Ctx.Provider>
  )
}

function BookingDialog({
  presetService,
  open,
  onOpenChange,
}: {
  presetService?: string
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [service, setService] = React.useState<string>(presetService ?? "")

  React.useEffect(() => {
    if (presetService) setService(presetService)
  }, [presetService])

  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setDone(false), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service,
      date: date ? format(date, "yyyy-MM-dd") : "",
      message: formData.get("message"),
    }
    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Request failed")
      setDone(true)
      toast.success("Strategy call requested!", {
        description: "We'll confirm your slot within 2 hours.",
      })
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or WhatsApp us directly.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-2xl overflow-y-auto scroll-area rounded-3xl p-0">
        <div className="relative">
          <div className="h-28 w-full overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/40 blur-3xl" />
          </div>
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl ring-1 ring-border/50 dark:bg-card">
              <CalendarClock className="h-8 w-8 text-blue-600" />
            </div>
            <DialogHeader className="mb-5">
              <DialogTitle className="font-heading text-2xl font-bold">
                Book Your Free Strategy Call
              </DialogTitle>
              <DialogDescription className="text-[15px]">
                Get a custom AI + automation roadmap for your business. 30 minutes, zero obligation.
              </DialogDescription>
            </DialogHeader>

            {done ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-6 py-10 text-center">
                <CheckCircle2 className="mb-3 h-12 w-12 text-emerald-500" />
                <h3 className="font-heading text-xl font-bold">You&apos;re all set!</h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  We&apos;ve received your request. Our team will reach out within 2 hours to confirm your strategy call slot.
                </p>
                <p className="mt-3 max-w-sm text-xs text-muted-foreground">
                  Your details have been saved to our system. You can view all your submissions anytime in our dashboard.
                </p>
                <Button className="mt-5" onClick={() => onOpenChange(false)}>
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="bk-name">Full name *</Label>
                  <Input id="bk-name" name="name" required placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bk-phone">Phone / WhatsApp *</Label>
                  <Input id="bk-phone" name="phone" required placeholder="+880 1XXX-XXXXXX" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bk-email">Email *</Label>
                  <Input id="bk-email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bk-company">Company</Label>
                  <Input id="bk-company" name="company" placeholder="Company name" />
                </div>
                <div className="space-y-1.5">
                  <Label>Service interested in</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {services.map((s) => (
                        <SelectItem key={s.slug} value={s.title}>
                          {s.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Preferred date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="bk-message">What would you like to automate?</Label>
                  <Textarea
                    id="bk-message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your business and what you'd like to achieve..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-[15px] font-semibold shadow-lg shadow-blue-600/25 transition-transform hover:scale-[1.01]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...
                      </>
                    ) : (
                      "Confirm Strategy Call"
                    )}
                  </Button>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    By booking, you agree to be contacted by NextGen Digital Studio.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
