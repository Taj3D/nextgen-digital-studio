/**
 * Feature Flags — centralised toggle system.
 *
 * Existing/shipped features default to `true` so production behaviour is unchanged.
 * New / experimental features default to `false` and can be safely shipped dark.
 *
 * Flags can be overridden at runtime via environment variables:
 *   FEATURE_<FLAG_NAME_UPPER>=true|false
 *
 * Example: FEATURE_NEW_PRICING=false
 */
export type FeatureFlag =
  | 'aiSalesAutomation'
  | 'aiChatAgent'
  | 'aiVoiceAgent'
  | 'crmAutomation'
  | 'whatsappAutomation'
  | 'leadGeneration'
  | 'performanceMarketing'
  | 'salesFunnelDevelopment'
  | 'businessAutomation'
  | 'websiteDevelopment'
  | 'landingPageDesign'
  | 'aiConsultation'
  | 'founderPage'
  | 'threeDPortraitPage'
  | 'cncDesignPage'
  | 'pdfBooksPage'
  | 'aiTrainingPage'
  | 'cncTrainingPage'
  | 'serviceDetailPages'
  | 'trackingApi'
  | 'googleSheetsSync'
  | 'conversionsApi'
  | 'multiLanguage'
  | 'adminDashboard'
  | 'newsletterCapture';

const DEFAULTS: Record<FeatureFlag, boolean> = {
  // Existing, shipped features — ON
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
  // New / experimental features go here and default to OFF, e.g.:
  // newPricingV2: false,
};

function envOverride(flag: FeatureFlag): boolean | undefined {
  const key = `FEATURE_${flag
    .replace(/([A-Z])/g, '_$1')
    .replace(/^_/, '')
    .toUpperCase()}`;
  const raw = process.env[key];
  if (raw === undefined) return undefined;
  return raw === 'true' || raw === '1' || raw === 'yes';
}

/**
 * Returns true if the feature flag is enabled.
 * Server-safe (no React).
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  const override = envOverride(flag);
  if (override !== undefined) return override;
  return DEFAULTS[flag] ?? false;
}

/**
 * Returns the full flag map (with env overrides applied) for client hydration.
 */
export function getAllFeatureFlags(): Record<FeatureFlag, boolean> {
  const result = {} as Record<FeatureFlag, boolean>;
  (Object.keys(DEFAULTS) as FeatureFlag[]).forEach((flag) => {
    result[flag] = isFeatureEnabled(flag);
  });
  return result;
}

export const FEATURE_FLAG_DEFAULTS = DEFAULTS;
