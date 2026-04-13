// ─── Server-side PDF Report Generator ───────────────────────────────────────
//
// Uses jsPDF. Runs inside a Next.js API route (Node runtime). Returns a
// Uint8Array that can be attached to a Resend email.

import { jsPDF } from "jspdf";
import { SITE_CONFIG } from "@/lib/config";
import {
  DimensionScores,
  Recommendation,
  Tier,
  getDimensionLabel,
} from "./scoring";
import { Dimension } from "./questions";

export interface PdfInput {
  name: string;
  company: string;
  overall: number;
  tier: Tier;
  tierDescription: string;
  dimensions: DimensionScores;
  recommendations: Recommendation[];
}

// Brand colors matching globals.css
const NAVY = { r: 15, g: 27, b: 45 }; // #0F1B2D
const TEAL = { r: 0, g: 201, b: 167 }; // #00C9A7
const WARM_WHITE = { r: 250, g: 250, b: 248 }; // #FAFAF8
const MUTED = { r: 107, g: 114, b: 128 }; // #6B7280
const LIGHT_GRAY = { r: 230, g: 230, b: 232 };

export function generateReportPdf(input: PdfInput): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;

  // ─── Header block (navy) ──────────────────────────────────────────────────
  const headerHeight = 120;
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, pageWidth, headerHeight, "F");

  // Wordmark: "Speedwell" in white + ".AI" in teal
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text("Speedwell", margin, 54);
  const speedwellWidth = doc.getTextWidth("Speedwell");
  doc.setTextColor(TEAL.r, TEAL.g, TEAL.b);
  doc.setFontSize(22);
  doc.text(".AI", margin + speedwellWidth + 2, 54);

  // Title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text("AI READINESS REPORT", margin, 82);

  // Company + date (right side)
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(10);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text(input.company, pageWidth - margin, 54, { align: "right" });
  doc.setTextColor(180, 180, 180);
  doc.text(dateStr, pageWidth - margin, 72, { align: "right" });

  // ─── Greeting ─────────────────────────────────────────────────────────────
  let y = headerHeight + 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text(`Hi ${input.name},`, margin, y);
  y += 18;
  const introLines = doc.splitTextToSize(
    "Thanks for taking the Speedwell AI Readiness Assessment. This report breaks down your readiness across three dimensions and highlights the highest-leverage places to start.",
    contentWidth
  );
  doc.text(introLines, margin, y);
  y += introLines.length * 14 + 18;

  // ─── Overall score block ──────────────────────────────────────────────────
  doc.setFillColor(248, 249, 251);
  doc.roundedRect(margin, y, contentWidth, 110, 6, 6, "F");

  // Big score number
  doc.setFont("helvetica", "bold");
  doc.setFontSize(56);
  doc.setTextColor(TEAL.r, TEAL.g, TEAL.b);
  doc.text(`${input.overall}`, margin + 28, y + 70);
  doc.setFontSize(18);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  // Rough width for a 2-digit score at fontSize 56 (pt); good enough for layout.
  const scoreNumberWidth = 60 + (input.overall >= 100 ? 30 : input.overall >= 10 ? 0 : -30);
  doc.setFontSize(18);
  doc.setFont("helvetica", "normal");
  doc.text("/100", margin + 28 + scoreNumberWidth + 10, y + 70);

  // Tier name + description to the right of score
  const tierX = margin + 180;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text(input.tier, tierX, y + 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  const tierDescLines = doc.splitTextToSize(
    input.tierDescription,
    contentWidth - (tierX - margin) - 16
  );
  doc.text(tierDescLines, tierX, y + 58);

  y += 110 + 30;

  // ─── Dimension breakdown ──────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text("Dimension Breakdown", margin, y);
  y += 8;

  const drawBar = (label: string, pct: number) => {
    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "bold");
    doc.text(`${pct}%`, margin + contentWidth, y, { align: "right" });
    y += 6;

    const barHeight = 8;
    const barY = y;
    // Track
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.roundedRect(margin, barY, contentWidth, barHeight, 3, 3, "F");
    // Fill
    const fillWidth = Math.max(4, (pct / 100) * contentWidth);
    doc.setFillColor(TEAL.r, TEAL.g, TEAL.b);
    doc.roundedRect(margin, barY, fillWidth, barHeight, 3, 3, "F");
    y += barHeight + 6;
  };

  (
    [
      "process_maturity",
      "technical_readiness",
      "organizational_readiness",
    ] as Dimension[]
  ).forEach((d) => {
    drawBar(getDimensionLabel(d), input.dimensions[d]);
  });

  y += 22;

  // ─── Top Opportunities ────────────────────────────────────────────────────
  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 72) {
      doc.addPage();
      y = margin + 10;
    }
  };

  ensureSpace(60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text("Your Top Opportunities", margin, y);
  y += 18;

  input.recommendations.forEach((rec) => {
    // Pre-compute height needed for this rec
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const bodyLines = doc.splitTextToSize(rec.body, contentWidth - 14);
    const blockHeight = 24 + bodyLines.length * 14 + 18;
    ensureSpace(blockHeight);

    // Teal left accent bar
    doc.setFillColor(TEAL.r, TEAL.g, TEAL.b);
    doc.rect(margin, y, 3, blockHeight - 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text(rec.title, margin + 14, y + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(bodyLines, margin + 14, y + 28);

    y += blockHeight;
  });

  y += 10;

  // ─── Next Steps ───────────────────────────────────────────────────────────
  ensureSpace(110);
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.roundedRect(margin, y, contentWidth, 100, 6, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text("Next Steps", margin + 18, y + 24);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text(
    "1.  Book a free 30-minute discovery call to talk through your results:",
    margin + 18,
    y + 46
  );
  doc.setTextColor(TEAL.r, TEAL.g, TEAL.b);
  doc.textWithLink(SITE_CONFIG.calendlyUrl, margin + 28, y + 62, {
    url: SITE_CONFIG.calendlyUrl,
  });

  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  const nextLine = doc.splitTextToSize(
    `2.  Or start with our ${SITE_CONFIG.assessmentPrice} AI Readiness Assessment — credited in full toward any implementation project.`,
    contentWidth - 36
  );
  doc.text(nextLine, margin + 18, y + 80);

  y += 110;

  // ─── Footer ───────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    `Speedwell AI  ·  speedwellai.com  ·  ${dateStr}`,
    pageWidth / 2,
    pageHeight - 24,
    { align: "center" }
  );

  return doc.output("arraybuffer") as unknown as Uint8Array;
}
