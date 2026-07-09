import { Navbar } from "@/components/site/navbar"
import { ScrollProgress } from "@/components/site/scroll-progress"
import { Hero } from "@/components/site/sections/hero"
import { PainPoints } from "@/components/site/sections/pain-points"
import { CostOfInaction } from "@/components/site/sections/cost-of-inaction"
import { Solution } from "@/components/site/sections/solution"
import { HowItWorks } from "@/components/site/sections/how-it-works"
import { Services } from "@/components/site/sections/services"
import { ByTheNumbers } from "@/components/site/sections/by-the-numbers"
import { WhyChooseUs } from "@/components/site/sections/why-choose-us"
import { Testimonials } from "@/components/site/sections/testimonials"
import { Pricing } from "@/components/site/sections/pricing"
import { Faq } from "@/components/site/sections/faq"
import { Contact } from "@/components/site/sections/contact"
import { CtaBand } from "@/components/site/sections/cta-band"
import { Footer } from "@/components/site/footer"
import { FloatingButtons } from "@/components/site/floating-buttons"
import { AiChatWidget } from "@/components/site/ai-chat-widget"
import { SocialProofNotifications } from "@/components/site/social-proof"
import { StickyBookBar } from "@/components/site/sticky-book-bar"

// Fully static page — rendered once, served as plain HTML + CSS.
// No DB calls, no per-request work. Handles 1500 visitors/day effortlessly.
export const dynamicParams = false;
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        {/*
          Sales funnel order — PADA psychology:
          1. PAIN      → "we feel your pain"               (pain-points, cost-of-inaction)
          2. AWARENESS → "this is exactly what you need"   (solution, how-it-works, services)
          3. DESIRE    → proof it works                     (numbers, why-choose-us, testimonials)
          4. ACTION    → "connect now"                      (pricing, faq, contact, cta-band)
        */}
        <Hero />
        <PainPoints />
        <CostOfInaction />
        <Solution />
        <HowItWorks />
        <Services />
        <ByTheNumbers />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
      <FloatingButtons />
      <AiChatWidget />
      <SocialProofNotifications />
      <StickyBookBar />
    </div>
  )
}
