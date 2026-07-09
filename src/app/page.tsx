import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { HeroSection } from "@/components/site/sections/hero";
import { PainPointsSection } from "@/components/site/sections/pain-points";
import { CostOfInactionSection } from "@/components/site/sections/cost-of-inaction";
import { Solution } from "@/components/site/sections/solution";
import { HowItWorks } from "@/components/site/sections/how-it-works";
import { Services } from "@/components/site/sections/services";
import { Numbers } from "@/components/site/sections/numbers";
import { WhyChooseUs } from "@/components/site/sections/why-choose-us";
import { Testimonials } from "@/components/site/sections/testimonials";
import { Pricing } from "@/components/site/sections/pricing";
import { FAQ } from "@/components/site/sections/faq";
import { LeadForm } from "@/components/site/sections/lead-form";
import { FinalCta } from "@/components/site/sections/final-cta";
import { AiChatWidget } from "@/components/site/ai-chat-widget";

// Fully static page — rendered once, served as plain HTML + CSS.
// No DB calls, no per-request work. Handles 1500 visitors/day effortlessly
// on a 4GB container.
export const dynamicParams = false;
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/*
          Sales funnel order — PADA psychology:
          1. PAIN      → "we feel your pain"               (pain-points, cost-of-inaction)
          2. AWARENESS → "this is exactly what you need"   (solution, how-it-works, services)
          3. DESIRE    → proof it works                     (numbers, why-choose-us, testimonials)
          4. ACTION    → "connect now"                      (pricing, faq, lead-form, final-cta)
        */}
        <HeroSection />
        <PainPointsSection />
        <CostOfInactionSection />
        <Solution />
        <HowItWorks />
        <Services />
        <Numbers />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <LeadForm />
        <FinalCta />
      </main>
      <SiteFooter />
      <FloatingButtons />
      <AiChatWidget />
    </div>
  );
}
