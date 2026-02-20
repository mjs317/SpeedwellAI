// ─── Speedwell AI — Single-Page Marketing Site ───────────────────────────────
// Section order:
//   Nav → Hero → Problem → ToolsRow → HowItWorks → Services →
//   EngagementTimeline → WhoWeWorkWith → ComparisonTable →
//   Testimonials → CaseStudies → About → FAQ → ROICalculator → Contact → Footer

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ToolsRow from "@/components/ToolsRow";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import EngagementTimeline from "@/components/EngagementTimeline";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import ComparisonTable from "@/components/ComparisonTable";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import ROICalculator from "@/components/ROICalculator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky nav + mobile bottom CTA bar */}
      <Nav />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. Problem / credibility stats with animated count-up + citations */}
        <ProblemSection />

        {/* 3. Tools we work with */}
        <ToolsRow />

        {/* 4. How It Works — 3 steps with credit badge on Assessment */}
        <HowItWorks />

        {/* 5. Services — 6-card grid */}
        <Services />

        {/* 6. Engagement Timeline — 4-stage journey */}
        <EngagementTimeline />

        {/* 7. Who We Work With — interactive persona tabs */}
        <WhoWeWorkWith />

        {/* 8. Why Speedwell — comparison table */}
        <ComparisonTable />

        {/* 9. Testimonials — 3 detailed client results */}
        <Testimonials />

        {/* 10. Case Studies — 3 outcome cards */}
        <CaseStudies />

        {/* 11. About — 2-col with headshot placeholder */}
        <About />

        {/* 12. FAQ — accordion, first item open */}
        <FAQ />

        {/* 13. ROI Calculator */}
        <ROICalculator />

        {/* 14. Contact / CTA */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
