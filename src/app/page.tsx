// ─── Speedwell AI — Single-Page Marketing Site ───────────────────────────────
// Sections: Nav → Hero → Problem → ToolsRow → HowItWorks → Services →
//           EngagementTimeline → WhoWeWorkWith → About → FAQ → Contact → Footer

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ToolsRow from "@/components/ToolsRow";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import EngagementTimeline from "@/components/EngagementTimeline";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky navigation */}
      <Nav />

      <main>
        {/* 1. Hero — animated background, headline, dual CTAs */}
        <Hero />

        {/* 2. Problem / credibility bar */}
        <ProblemSection />

        {/* 3. Tools we work with — pill badges */}
        <ToolsRow />

        {/* 4. How It Works — 3-step process */}
        <HowItWorks />

        {/* 5. Services — 6-card automation use-case grid */}
        <Services />

        {/* 6. Engagement Timeline — 4-stage visual journey */}
        <EngagementTimeline />

        {/* 7. Who We Work With — 3 persona callouts */}
        <WhoWeWorkWith />

        {/* 8. About — founder section */}
        <About />

        {/* 9. FAQ — accordion */}
        <FAQ />

        {/* 10. Contact / CTA — Calendly link + email fallback form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
