// Footer — minimal, brand-consistent

// TODO: Replace with your actual Calendly link
const CALENDLY_URL = "https://calendly.com/YOUR_LINK_HERE";

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
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" aria-label="Speedwell AI home">
            <span className="w-2 h-2 rounded-full bg-[#00C9A7]" aria-hidden="true" />
            <span className="text-[#FAFAF8] font-semibold text-base tracking-tight">
              Speedwell <span className="text-[#00C9A7]">AI</span>
            </span>
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

        {/* Bottom row: copyright + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#FAFAF8]/30">
            © 2026 Speedwell AI. All rights reserved.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00C9A7] hover:text-[#00a88c] font-medium transition-colors"
          >
            Book a Free Call →
          </a>
        </div>
      </div>
    </footer>
  );
}
