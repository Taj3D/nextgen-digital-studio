'use client'

import * as React from 'react'
import { getAllFeatureFlags, type FeatureFlag } from '@/lib/feature-flags'

/**
 * Client-side feature flag snapshot.
 *
 * Flags are resolved at build time (server) and embedded as a constant.
 * Override via process.env.NEXT_PUBLIC_FEATURE_* is supported on the client too.
 *
 * Usage:
 *   const aiChat = useFeatureFlag('aiChatAgent')
 *   if (!aiChat) return null
 */
const FLAGS: Record<FeatureFlag, boolean> = (() => {
  // Base defaults baked at build time
  const base: Record<FeatureFlag, boolean> = {
    aiSalesAutomation: true,
    aiChatAgent: true,
    aiVoiceAgent: true,
    crmAutomation: true,
    whatsappAutomation: true,
    leadGeneration: true,
    performanceMarketing: true,
    salesFunnelDevelopment: true,
    businessAutomation: true,
    websiteDevelopment: true,
    landingPageDesign: true,
    aiConsultation: true,
    founderPage: true,
    threeDPortraitPage: true,
    cncDesignPage: true,
    pdfBooksPage: true,
    aiTrainingPage: true,
    cncTrainingPage: true,
    serviceDetailPages: true,
    trackingApi: true,
    googleSheetsSync: true,
    conversionsApi: true,
    multiLanguage: true,
    adminDashboard: true,
    newsletterCapture: true,
  }
  // Apply NEXT_PUBLIC_FEATURE_* overrides if present
  Object.keys(base).forEach((flag) => {
    const envKey = `NEXT_PUBLIC_FEATURE_${flag
      .replace(/([A-Z])/g, '_$1')
      .replace(/^_/, '')
      .toUpperCase()}`
    const raw = process.env[envKey]
    if (raw === 'true' || raw === '1' || raw === 'yes') base[flag as FeatureFlag] = true
    else if (raw === 'false' || raw === '0' || raw === 'no') base[flag as FeatureFlag] = false
  })
  return base
})()

export function useFeatureFlag(flag: FeatureFlag): boolean {
  return React.useMemo(() => FLAGS[flag] ?? false, [flag])
}

export function useAllFeatureFlags(): Record<FeatureFlag, boolean> {
  return React.useMemo(() => ({ ...FLAGS }), [])
}

export { getAllFeatureFlags }
