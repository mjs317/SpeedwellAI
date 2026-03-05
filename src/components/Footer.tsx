// Footer — 3-column layout: brand / quick links / get in touch

import { SpeedwellLogo } from "@/components/SpeedwellLogo";
import { SITE_CONFIG } from "@/lib/config";

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#080f1a] border-t border-white/8 py-14 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Three-column grid — stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 mb-12">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center" aria-label="Speedwell AI home">
              <SpeedwellLogo variant="dark" size="1rem" />
            </a>
            <p className="text-xs text-[#FAFAF8]/35 leading-relaxed max-w-[220px]">
              AI automation for small and mid-sized businesses.
            </p>
            <p className="text-xs text-[#FAFAF8]/25 mt-auto">
              © 2025 Speedwell AI. All rights reserved.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <p className="text-xs font-semibold text-[#FAFAF8]/50 uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
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
          </div>

          {/* Column 3 — Get in Touch */}
          <div>
            <p className="text-xs font-semibold text-[#FAFAF8]/50 uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm text-[#FAFAF8]/40 hover:text-[#FAFAF8]/80 transition-colors break-all"
              >
                hello@speedwellai.com
              </a>

              {/* LinkedIn */}
              <a
                href={SITE_CONFIG.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Michael Solimini on LinkedIn"
                className="inline-flex items-center gap-2 text-sm text-[#FAFAF8]/40 hover:text-[#00C9A7] transition-colors duration-200"
              >
                <LinkedInIcon size={14} />
                LinkedIn
              </a>

              {/* Book a call CTA */}
              <a
                href={SITE_CONFIG.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex justify-center sm:justify-start items-center px-4 py-2.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] text-sm font-semibold hover:bg-[#00a88c] transition-colors duration-200 w-full sm:w-auto"
              >
                Book a Free Discovery Call
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8" />
      </div>
    </footer>
  );
}
