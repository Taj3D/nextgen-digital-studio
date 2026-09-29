import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { FloatingButtons } from "@/components/site/floating-buttons";
import { HeroSection } from "@/components/site/sections/hero";
import { WhoWeHelpSection as WhoWeHelp } from "@/components/site/sections/who-we-help";
import { PainPointsSection } from "@/components/site/sections/pain-points";
import { Solution } from "@/components/site/sections/solution";
import { ThreePillarSection } from "@/components/site/sections/three-pillar";
import { BusinessConsultingSection as BusinessConsulting } from "@/components/site/sections/business-consulting";
import { TrainingOverviewSection as TrainingOverview } from "@/components/site/sections/training-overview";
import { Services } from "@/components/site/sections/services";
import { SevenDFrameworkSection as SevenDFramework } from "@/components/site/sections/seven-d-framework";
import { HowItWorks } from "@/components/site/sections/how-it-works";
import { SpeakingWorkshopsSection as SpeakingWorkshops } from "@/components/site/sections/speaking-workshops";
import { FounderGuideSection } from "@/components/site/sections/founder-guide";
import { WhyChooseUs } from "@/components/site/sections/why-choose-us";
import { FreeEnglishSection } from "@/components/site/sections/free-english";
import { HomepageFAQSection as HomepageFaq } from "@/components/site/sections/homepage-faq";
import { LeadForm } from "@/components/site/sections/lead-form";
import { FinalCta } from "@/components/site/sections/final-cta";

// Fully static page — rendered once, served as plain HTML + CSS.
// ERMOS v5.1 Gap-Filler: 18-section architecture per Master Knowledge Library.
// Section flow:
//   01 Navbar → 02 Hero → 03 WhoWeHelp → 04 ProblemRecognition → 05 ThreePillar
//   → 06 BusinessConsulting → 07 TrainingOverview → 08 DigitalSolutions
//   → 09 7DFramework → HowItWorks → 10 SpeakingWorkshops → 11 FounderGuide
//   → 12 WhyNextGen → 13 FreeEnglish → (14 CaseStudies: SKIP - no verified evidence)
//   → 15 FAQ → 16 ChooseYourNextStep (LeadForm+FinalCta) → 17 Footer
export const dynamicParams = false;
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* 01 Navbar */}
        {/* 02 Hero */}
        <HeroSection />
        {/* 03 Who We Help */}
        <WhoWeHelp />
        {/* 04 Problem Recognition */}
        <PainPointsSection />
        {/* 05 What We Do — 3 Pillars (bridge) */}
        <Solution />
        <ThreePillarSection />
        {/* 06 Business Consulting */}
        <BusinessConsulting />
        {/* 07 Training & Education */}
        <TrainingOverview />
        {/* 08 Digital Solutions */}
        <Services />
        {/* 09 NGS Framework / How We Work */}
        <SevenDFramework />
        <HowItWorks />
        {/* 10 Speaking & Workshops */}
        <SpeakingWorkshops />
        {/* 11 Founder / Guide */}
        <FounderGuideSection />
        {/* 12 Why NextGen */}
        <WhyChooseUs />
        {/* 13 Free English Initiative */}
        <FreeEnglishSection />
        {/* 14 Verified Work / Case Studies — SKIPPED: no verified evidence per ERMOS §14 */}
        {/* 15 FAQ */}
        <HomepageFaq />
        {/* 16 Choose Your Next Step */}
        <LeadForm />
        <FinalCta />
      </main>
      {/* 17 Footer */}
      <SiteFooter />
      <FloatingButtons />
    </div>
  );
}
