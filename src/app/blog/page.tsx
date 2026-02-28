import Link from "next/link";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — Speedwell AI",
  description:
    "Practical guides on AI automation for small and mid-sized businesses. No hype — just clear, actionable content.",
  openGraph: {
    title: "Blog — Speedwell AI",
    description:
      "Practical guides on AI automation for small and mid-sized businesses.",
    type: "website",
    url: "https://speedwell-ai.vercel.app/blog",
  },
};

const posts = [
  {
    slug: "automate-invoicing-small-business",
    title:
      "How to Automate Invoicing for Your Small Business (Without Enterprise Software)",
    date: "February 2026",
    description:
      "A practical walkthrough of what invoice automation actually looks like for a 10–50 person business — tools, workflow design, and what to watch out for.",
    readTime: "8 min read",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#FAFAF8] pt-28 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <p className="text-[#00C9A7] text-sm font-semibold tracking-widest uppercase mb-3">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0F1B2D] leading-tight mb-4">
            Practical AI for real businesses.
          </h1>
          <p className="text-[#6B7280] text-lg mb-14 max-w-xl">
            No hype. Just clear, actionable guides on automating the work that
            slows your team down.
          </p>

          {/* Post list */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article className="p-7 rounded-2xl border border-[#0F1B2D]/10 bg-white hover:border-[#00C9A7]/40 transition-colors duration-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-xs text-[#6B7280]">{post.date}</p>
                    <span className="w-1 h-1 rounded-full bg-[#6B7280]/40" />
                    <p className="text-xs text-[#6B7280]">{post.readTime}</p>
                  </div>
                  <h2 className="text-xl font-bold text-[#0F1B2D] mb-2 group-hover:text-[#00C9A7] transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <p className="text-[#00C9A7] text-sm font-semibold">
                    Read more →
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
