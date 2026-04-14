// ─── Server-side PDF Report Generator ───────────────────────────────────────
//
// Uses jsPDF. Runs inside a Next.js API route (Node runtime). Returns a
// Uint8Array that can be attached to a Resend email.

import { jsPDF } from "jspdf";
import { SITE_CONFIG } from "@/lib/config";
import {
  DimensionScores,
  Recommendation,
  getAutomationPotential,
  getOpportunityTier,
  getOpportunityTierDescription,
  getOpportunityDimensions,
} from "./scoring";

export interface PdfInput {
  name: string;
  company: string;
  overall: number;
  dimensions: DimensionScores;
  recommendations: Recommendation[];
  painPoint?: string;
}

// Brand colors matching globals.css
const NAVY = { r: 15, g: 27, b: 45 }; // #0F1B2D
const TEAL = { r: 0, g: 201, b: 167 }; // #00C9A7
const WARM_WHITE = { r: 250, g: 250, b: 248 }; // #FAFAF8
const MUTED = { r: 107, g: 114, b: 128 }; // #6B7280
const LIGHT_GRAY = { r: 230, g: 230, b: 232 };

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateReportPdf(input: PdfInput): Uint8Array {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;

  const automationPotential = getAutomationPotential(input.overall);
  const opportunityTier = getOpportunityTier(automationPotential);
  const tierDescription = getOpportunityTierDescription(automationPotential);
  const displayName = titleCase(input.name.trim());

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ─── PAGE 1 ──────────────────────────────────────────────────────────────

  // Header block (navy)
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

  // Report title
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text("AI AUTOMATION OPPORTUNITY REPORT", margin, 82);

  // Company + date (right side)
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
  doc.text(`Hi ${displayName},`, margin, y);
  y += 18;
  const introLines = doc.splitTextToSize(
    "Thanks for completing the Speedwell AI Readiness Scorecard. Based on your answers, here's a breakdown of where your biggest automation opportunities lie — and the highest-leverage places to start.",
    contentWidth
  );
  doc.text(introLines, margin, y);
  y += introLines.length * 14 + 24;

  // ─── Hero score block ─────────────────────────────────────────────────────
  doc.setFillColor(248, 249, 251);
  doc.roundedRect(margin, y, contentWidth, 120, 6, 6, "F");

  // Teal left accent strip
  doc.setFillColor(TEAL.r, TEAL.g, TEAL.b);
  doc.roundedRect(margin, y, 4, 120, 2, 2, "F");

  // Big score number
  doc.setFont("helvetica", "bold");
  doc.setFontSize(60);
  doc.setTextColor(TEAL.r, TEAL.g, TEAL.b);
  doc.text(`${automationPotential}%`, margin + 24, y + 76);

  // Label under score
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text("Automation Potential", margin + 24, y + 94);

  // Tier area (right of score)
  const tierX = margin + 160;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text(opportunityTier, tierX, y + 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  const tierDescLines = doc.splitTextToSize(
    tierDescription,
    contentWidth - (tierX - margin) - 16
  );
  doc.text(tierDescLines, tierX, y + 62);

  y += 120 + 14;

  // ─── Benchmark line ───────────────────────────────────────────────────────
  const benchmarkLow = 40;
  const benchmarkHigh = 70;
  let benchmarkPosition: string;
  if (automationPotential > benchmarkHigh) {
    benchmarkPosition = "above";
  } else if (automationPotential < benchmarkLow) {
    benchmarkPosition = "below";
  } else {
    benchmarkPosition = "within";
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    `Most small businesses we work with score between ${benchmarkLow}–${benchmarkHigh}% automation potential. You're ${benchmarkPosition} that range.`,
    margin,
    y + 14
  );
  y += 34;

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
  doc.text("Your Top Automation Opportunities", margin, y);
  y += 6;

  // Personalization line (if painPoint known and not "Other")
  if (input.painPoint && input.painPoint !== "Other") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    const painLine = doc.splitTextToSize(
      `Based on your focus area — ${input.painPoint} — here's where to start:`,
      contentWidth
    );
    doc.text(painLine, margin, y + 14);
    y += painLine.length * 14 + 10;
  } else {
    y += 14;
  }

  input.recommendations.forEach((rec) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const bodyLines = doc.splitTextToSize(rec.body, contentWidth - 14);
    const blockHeight = 26 + bodyLines.length * 14 + 16;
    ensureSpace(blockHeight);

    // Teal left accent bar
    doc.setFillColor(TEAL.r, TEAL.g, TEAL.b);
    doc.rect(margin, y, 3, blockHeight - 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text(rec.title, margin + 14, y + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(bodyLines, margin + 14, y + 30);

    y += blockHeight;
  });

  // ─── PAGE 2: Dimension Breakdown + CTA ───────────────────────────────────
  doc.addPage();
  y = 0;

  // Page 2 header strip
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text("AI AUTOMATION OPPORTUNITY REPORT", margin, 26);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 180);
  doc.text(input.company, pageWidth - margin, 26, { align: "right" });
  y = 60;

  // Section heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text("Where Your Opportunities Are Largest", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
  doc.text(
    "Higher scores indicate greater room to capture efficiency gains in each area.",
    margin,
    y + 12
  );
  y += 28;

  // Dimension bars using opportunity framing
  const oppDimensions = getOpportunityDimensions(input.dimensions);
  const dimEntries = [
    oppDimensions.processAutomationPotential,
    oppDimensions.toolIntegrationOpportunity,
    oppDimensions.teamEfficiencyOpportunity,
  ];

  dimEntries.forEach((dim) => {
    // Label + percentage
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text(dim.label, margin, y);
    doc.text(`${dim.pct}%`, margin + contentWidth, y, { align: "right" });
    y += 6;

    // Bar track + fill
    const barHeight = 10;
    doc.setFillColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.roundedRect(margin, y, contentWidth, barHeight, 4, 4, "F");
    const fillWidth = Math.max(6, (dim.pct / 100) * contentWidth);
    doc.setFillColor(TEAL.r, TEAL.g, TEAL.b);
    doc.roundedRect(margin, y, fillWidth, barHeight, 4, 4, "F");
    y += barHeight + 6;

    // Explanation
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(MUTED.r, MUTED.g, MUTED.b);
    doc.text(dim.explanation, margin, y);
    y += 28;
  });

  y += 14;

  // ─── CTA block (single Calendly) ─────────────────────────────────────────
  const ctaHeight = 100;
  doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
  doc.roundedRect(margin, y, contentWidth, ctaHeight, 6, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  doc.text("Ready to capture these opportunities?", margin + 18, y + 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(WARM_WHITE.r, WARM_WHITE.g, WARM_WHITE.b);
  const ctaBodyLines = doc.splitTextToSize(
    "Book a free 30-minute discovery call to walk through your results and map the fastest path to your first automation win.",
    contentWidth - 36
  );
  doc.text(ctaBodyLines, margin + 18, y + 48);

  doc.setTextColor(TEAL.r, TEAL.g, TEAL.b);
  doc.textWithLink(SITE_CONFIG.calendlyUrl, margin + 18, y + ctaHeight - 14, {
    url: SITE_CONFIG.calendlyUrl,
  });

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
