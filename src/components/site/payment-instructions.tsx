'use client'

import * as React from 'react'
import { siteConfig } from '@/lib/site-data'
import { Copy, Check, Smartphone, Wallet, Clock, ShieldCheck } from 'lucide-react'

/**
 * PaymentInstructions — reusable payment info block for Bangladesh mobile banking.
 * Shown after lead form submission on paid landing pages (training, design bundles).
 *
 * Flow: Customer fills form → Lead saved → This block shows payment instructions
 * → Customer sends money via bKash/Nagad → Team confirms → Access granted.
 */
export function PaymentInstructions({
  isBn,
  amount,
  label,
  note,
}: {
  isBn: boolean
  amount: number
  label?: string
  note?: string
}) {
  const [copied, setCopied] = React.useState<string | null>(null)

  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const bkashNumber = siteConfig.phone.replace(/\s/g, '').replace('+', '')
  const nagadNumber = bkashNumber // same number for Nagad

  return (
    <div className="mt-6 rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-50 to-orange-50 p-5 dark:from-amber-950/30 dark:to-orange-950/20">
      <div className="flex items-center gap-2 border-b border-amber-300/40 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold">
            {label ?? (isBn ? 'পেমেন্ট নির্দেশনা' : 'Payment Instructions')}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isBn ? 'নিচের নাম্বারে টাকা পাঠান, তারপর অ্যাক্সেস পাবেন' : 'Send money to the number below to get access'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs font-medium text-muted-foreground">
            {isBn ? 'পরিশোধযোগ্য মূল্য' : 'Amount to pay'}
          </div>
          <div className="text-4xl font-extrabold text-amber-600 dark:text-amber-400">
            ৳{amount.toLocaleString('en-US')}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* bKash */}
        <button
          type="button"
          onClick={() => copy(bkashNumber, 'bkash')}
          className="flex items-center justify-between rounded-xl border border-pink-300/50 bg-pink-50 px-4 py-3 text-left transition-colors hover:bg-pink-100 dark:bg-pink-950/30 dark:hover:bg-pink-950/50"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-pink-600" />
            <div>
              <div className="text-xs font-bold text-pink-700 dark:text-pink-400">bKash</div>
              <div className="text-sm font-mono font-semibold">{bkashNumber}</div>
            </div>
          </div>
          {copied === 'bkash' ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4 text-pink-600/60" />
          )}
        </button>

        {/* Nagad */}
        <button
          type="button"
          onClick={() => copy(nagadNumber, 'nagad')}
          className="flex items-center justify-between rounded-xl border border-orange-300/50 bg-orange-50 px-4 py-3 text-left transition-colors hover:bg-orange-100 dark:bg-orange-950/30 dark:hover:bg-orange-950/50"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-orange-600" />
            <div>
              <div className="text-xs font-bold text-orange-700 dark:text-orange-400">Nagad</div>
              <div className="text-sm font-mono font-semibold">{nagadNumber}</div>
            </div>
          </div>
          {copied === 'nagad' ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4 text-orange-600/60" />
          )}
        </button>
      </div>

      <div className="mt-4 space-y-2 rounded-xl bg-white/60 p-3 text-xs dark:bg-black/20">
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
          <span>
            {isBn
              ? `পেমেন্ট সম্পন্ন হলে আপনার ট্রানজেকশন আইডি (TrxID) WhatsApp-এ ${siteConfig.phone}-এ পাঠান।`
              : `After payment, send your TrxID to ${siteConfig.phone} on WhatsApp.`}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
          <span>
            {isBn
              ? 'টিম যাচাই করে ২ ঘন্টার মধ্যে আপনাকে অ্যাক্সেস/লিংক পাঠাবে।'
              : 'Our team verifies and sends you access/link within 2 hours.'}
          </span>
        </div>
        {note && (
          <div className="flex items-start gap-2">
            <Wallet className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
            <span className="font-medium">{note}</span>
          </div>
        )}
      </div>
    </div>
  )
}
