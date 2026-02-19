// Footer — minimal, brand-consistent
// Change 11: redundant "Book a Free Call" CTA removed (contact section above handles it)

import { SpeedwellLogo } from "@/components/SpeedwellLogo";

const footerLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  // TODO: Add Privacy Policy and Terms links once pages are created
];

export default function Footer() {
  return (
    <footer className="bg-[#080f1a] border-t border-white/8 py-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top row: logo + nav */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
          {/* Logo — Option 3 Wordmark */}
          <a href="#" className="flex items-center" aria-label="Speedwell AI home">
            <SpeedwellLogo variant="dark" size="1rem" />
          </a>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#FAFAF8]/40 hover:text-[#FAFAF8]/80 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Tagline */}
        <p className="text-center sm:text-left text-xs text-[#FAFAF8]/25 mb-6">
          AI built for the businesses big consultancies ignore.
        </p>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Bottom row: copyright only */}
        <p className="text-xs text-[#FAFAF8]/30 text-center sm:text-left">
          © 2026 Speedwell AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
