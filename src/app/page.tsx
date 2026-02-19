// ─── Speedwell AI — Single-Page Marketing Site ───────────────────────────────
// Sections: Nav → Hero → Problem → HowItWorks → Services →
//           WhoWeWorkWith → About → Contact → Footer

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import About from "@/components/About";
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

        {/* 3. How It Works — 3-step process with pricing */}
        <HowItWorks />

        {/* 4. Services — 6-card automation use-case grid */}
        <Services />

        {/* 5. Who We Work With — 3 persona callouts */}
        <WhoWeWorkWith />

        {/* 6. About — founder section */}
        <About />

        {/* 7. Contact / CTA — Calendly link + email fallback form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
