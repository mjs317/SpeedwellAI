// Footer — 3-column layout: brand / quick links / get in touch

import { SpeedwellLogo } from "@/components/SpeedwellLogo";
import { SITE_CONFIG } from "@/lib/config";

const quickLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

// Construct email from parts to avoid Cloudflare email obfuscation
function EmailLink() {
  const user = "hello";
  const domain = "speedwellai.com";
  const email = `${user}@${domain}`;

  return (
    <a
      href={`mailto:${email}`}
      className="text-sm text-[#FAFAF8]/40 hover:text-[#FAFAF8]/80 transition-colors break-all"
    >
      {email}
    </a>
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
              <SpeedwellLogo variant="dark" size="1.5rem" />
            </a>
            <p className="text-xs text-[#FAFAF8]/35 leading-relaxed max-w-[220px]">
              AI automation for small and mid-sized businesses.
            </p>
            <p className="text-xs text-[#FAFAF8]/25 mt-auto">
              © 2025–2026 Speedwell AI. All rights reserved.
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
              {/* Email — rendered via component to avoid Cloudflare obfuscation */}
              <EmailLink />

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
