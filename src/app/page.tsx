import { Navbar } from "@/components/site/navbar"
import { ScrollProgress } from "@/components/site/scroll-progress"
import { Hero } from "@/components/site/sections/hero"
import { ClientLogos } from "@/components/site/sections/client-logos"
import { ProblemStatement } from "@/components/site/sections/problem"
import { Solution } from "@/components/site/sections/solution"
import { Services } from "@/components/site/sections/services"
import { AiDemo } from "@/components/site/sections/ai-demo"
import { Industries } from "@/components/site/sections/industries"
import { WhyChooseUs } from "@/components/site/sections/why-choose-us"
import { HowItWorks } from "@/components/site/sections/how-it-works"
import { ByTheNumbers } from "@/components/site/sections/by-the-numbers"
import { RoiCalculator } from "@/components/site/sections/roi-calculator"
import { AiAudit } from "@/components/site/sections/ai-audit"
import { Configurator } from "@/components/site/sections/configurator"
import { WorkflowBuilder } from "@/components/site/sections/workflow-builder"
import { Testimonials } from "@/components/site/sections/testimonials"
import { VideoTestimonials } from "@/components/site/sections/video-testimonials"
import { Pricing } from "@/components/site/sections/pricing"
import { PricingFaq } from "@/components/site/sections/pricing-faq"
import { Guarantees } from "@/components/site/sections/guarantees"
import { Comparison } from "@/components/site/sections/comparison"
import { CaseStudies } from "@/components/site/sections/case-studies"
import { Awards } from "@/components/site/sections/awards"
import { Team } from "@/components/site/sections/team"
import { PartnerProgram } from "@/components/site/sections/partner-program"
import { TechStack } from "@/components/site/sections/tech-stack"
import { KnowledgeBase } from "@/components/site/sections/knowledge-base"
import { FreeTools } from "@/components/site/sections/free-tools"
import { Integrations } from "@/components/site/sections/integrations"
import { Careers } from "@/components/site/sections/careers"
import { StatusPage } from "@/components/site/sections/status-page"
import { Faq } from "@/components/site/sections/faq"
import { Blog } from "@/components/site/sections/blog"
import { CtaBand } from "@/components/site/sections/cta-band"
import { Contact } from "@/components/site/sections/contact"
import { Footer } from "@/components/site/footer"
import { FloatingButtons } from "@/components/site/floating-buttons"
import { AiChatWidget } from "@/components/site/ai-chat-widget"
import { SocialProofNotifications } from "@/components/site/social-proof"
import { StickyBookBar } from "@/components/site/sticky-book-bar"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClientLogos />
        <ProblemStatement />
        <Solution />
        <Services />
        <AiDemo />
        <Industries />
        <WhyChooseUs />
        <HowItWorks />
        <ByTheNumbers />
        <RoiCalculator />
        <AiAudit />
        <Configurator />
        <WorkflowBuilder />
        <Testimonials />
        <VideoTestimonials />
        <Pricing />
        <Guarantees />
        <PricingFaq />
        <Comparison />
        <CaseStudies />
        <Awards />
        <Team />
        <PartnerProgram />
        <TechStack />
        <KnowledgeBase />
        <FreeTools />
        <Integrations />
        <Careers />
        <StatusPage />
        <Blog />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <AiChatWidget />
      <SocialProofNotifications />
      <StickyBookBar />
    </div>
  )
}
