// Footer — minimal, brand-consistent

import { SpeedwellLogo } from "@/components/SpeedwellLogo";
import { SITE_CONFIG } from "@/lib/config";

const footerLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080f1a] border-t border-white/8 py-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top row: logo + nav */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
          {/* Logo — Option 3 Wordmark */}
          <a href="#" className="flex items-center" aria-label="Speedwell AI home">
            <SpeedwellLogo variant="dark" size="2rem" />
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

        {/* Bottom row: copyright + social */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <p className="text-xs text-[#FAFAF8]/30">
            © 2026 Speedwell AI. All rights reserved.
          </p>
          <a
            href={SITE_CONFIG.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Speedwell AI on LinkedIn"
            className="text-[#FAFAF8]/30 hover:text-[#00C9A7] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
