// ─── Speedwell AI — Single-Page Marketing Site ───────────────────────────────
// Section order:
//   Nav → Hero → Problem → ToolsRow → HowItWorks → WhatWeBuild (services) →
//   WhoWeWorkWith → Results → ComparisonTable →
//   About → FAQ → ROICalculator → Contact → Footer

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ToolsRow from "@/components/ToolsRow";
import HowItWorks from "@/components/HowItWorks";
import WhatWeBuild from "@/components/WhatWeBuild";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Results from "@/components/Results";
import ComparisonTable from "@/components/ComparisonTable";
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

        {/* 4. How It Works — 3 steps with timing + credit badge on Assessment */}
        <HowItWorks />

        {/* 5. What We Build — merged services section (detailed cards with build times) */}
        <WhatWeBuild />

        {/* 6. Who We Work With — 3 always-visible persona cards */}
        <WhoWeWorkWith />

        {/* 7. Results — real client testimonials */}
        <Results />

        {/* 8. Why Speedwell — comparison table */}
        <ComparisonTable />

        {/* 9. About — team narrative */}
        <About />

        {/* 10. FAQ — accordion, first item open */}
        <FAQ />

        {/* 11. ROI Calculator */}
        <ROICalculator />

        {/* 12. Contact / Final CTA */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
