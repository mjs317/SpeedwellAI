// ─── Email HTML templates ───────────────────────────────────────────────────

import { SITE_CONFIG } from "@/lib/config";
import {
  DimensionScores,
  Recommendation,
  getAutomationPotential,
  getOpportunityTier,
  getOpportunityDimensions,
} from "@/lib/assessment/scoring";

const NAVY = "#0F1B2D";
const TEAL = "#00C9A7";
const WARM_WHITE = "#FAFAF8";

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function wrap(bodyHtml: string): string {
  // Head styles defend against mail clients (Apple Mail, Outlook, Gmail
  // dark mode) that auto-invert button text and break contrast.
  // `color-scheme` tells the client the email is designed for both modes.
  return `<!doctype html><html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <style>
      /* Prevent iOS/Apple Mail from auto-linking phone numbers, etc. */
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
      /* Bulletproof CTA button — enforce explicit colors so dark-mode
         inversion cannot wash out the label. */
      .sw-btn, .sw-btn a {
        color: #FAFAF8 !important;
        -webkit-text-fill-color: #FAFAF8 !important;
      }
      .sw-btn {
        background: #0F1B2D !important;
      }
      @media (prefers-color-scheme: dark) {
        .sw-btn, .sw-btn a {
          color: #FAFAF8 !important;
          -webkit-text-fill-color: #FAFAF8 !important;
        }
        .sw-btn {
          background: #0F1B2D !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:${WARM_WHITE};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${NAVY};line-height:1.55;">
    <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
      <div style="font-size:22px;font-weight:700;margin-bottom:24px;">
        <span style="color:${NAVY};">Speedwell</span><span style="color:${TEAL};">.AI</span>
      </div>
      ${bodyHtml}
      <hr style="border:none;border-top:1px solid #e6e6e8;margin:32px 0 16px;" />
      <div style="font-size:12px;color:#6B7280;">Speedwell AI · <a href="https://speedwellai.com" style="color:#6B7280;">speedwellai.com</a></div>
    </div>
  </body></html>`;
}

// Navy-background / white-text button with teal left accent. This reads
// cleanly in both light and dark email clients — dark-mode inversion can't
// hide white text on near-black.
function ctaButton(label: string, url: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;">
    <tr>
      <td class="sw-btn" style="background:${NAVY};border-radius:8px;border-left:3px solid ${TEAL};mso-padding-alt:12px 22px;">
        <a href="${url}" style="display:inline-block;padding:12px 22px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:${WARM_WHITE};text-decoration:none;letter-spacing:0.01em;" target="_blank" rel="noopener">${label}</a>
      </td>
    </tr>
  </table>`;
}

export interface ReportEmailInput {
  name: string;
  company: string;
  overall: number;
  dimensions: DimensionScores;
}

export function reportEmail(input: ReportEmailInput): {
  subject: string;
  html: string;
} {
  const automationPotential = getAutomationPotential(input.overall);
  const opportunityTier = getOpportunityTier(automationPotential);
  const oppDimensions = getOpportunityDimensions(input.dimensions);
  const displayName = titleCase(input.name.trim());

  const subject = `Your AI Automation Opportunity Report — Speedwell AI`;
  const html = wrap(`
    <p>Hi ${escapeHtml(displayName)},</p>
    <p>Your AI Automation Opportunity Report is attached. Here's a quick snapshot of your results:</p>
    <div style="background:#fff;border:1px solid #e6e6e8;border-radius:10px;padding:18px 20px;margin:16px 0;">
      <div style="font-size:28px;font-weight:700;color:${TEAL};margin-bottom:2px;">${automationPotential}%</div>
      <div style="font-size:12px;color:#6B7280;margin-bottom:12px;text-transform:uppercase;letter-spacing:0.05em;">Automation Potential</div>
      <div style="font-size:15px;font-weight:600;color:${NAVY};margin-bottom:14px;">${escapeHtml(opportunityTier)}</div>
      <div style="font-size:13px;margin:4px 0;">${escapeHtml(oppDimensions.processAutomationPotential.label)}: <strong>${oppDimensions.processAutomationPotential.pct}%</strong></div>
      <div style="font-size:13px;margin:4px 0;">${escapeHtml(oppDimensions.toolIntegrationOpportunity.label)}: <strong>${oppDimensions.toolIntegrationOpportunity.pct}%</strong></div>
      <div style="font-size:13px;margin:4px 0;">${escapeHtml(oppDimensions.teamEfficiencyOpportunity.label)}: <strong>${oppDimensions.teamEfficiencyOpportunity.pct}%</strong></div>
    </div>
    <p>Your full report is attached — it includes your top automation recommendations and a detailed breakdown of where the biggest opportunities are.</p>
    <p>Want to talk through what this means for your business?</p>
    <p>${ctaButton("Book a Free Discovery Call", SITE_CONFIG.calendlyUrl)}</p>
    <p style="margin-top:32px;">— Michael, Speedwell AI</p>
  `);
  return { subject, html };
}

export interface Day3EmailInput {
  name: string;
  overall: number;
  lowestDimensionLabel: string;
  topRecommendation: Recommendation;
}

export function day3Email(input: Day3EmailInput): {
  subject: string;
  html: string;
} {
  const automationPotential = getAutomationPotential(input.overall);
  const opportunityTier = getOpportunityTier(automationPotential);
  const displayName = titleCase(input.name.trim());

  const subject = "A quick thought on your automation results";
  const html = wrap(`
    <p>Hi ${escapeHtml(displayName)},</p>
    <p>A few days ago you completed our AI Readiness Scorecard. Your results showed <strong>${automationPotential}% Automation Potential</strong> — rated <span style="color:${TEAL};font-weight:600;">${escapeHtml(opportunityTier)}</span>.</p>
    <p>Based on your results, your biggest opportunity is in <strong>${escapeHtml(
      input.lowestDimensionLabel
    )}</strong>. Here's what that looks like in practice:</p>
    <div style="background:#fff;border-left:3px solid ${TEAL};padding:14px 18px;margin:16px 0;border-radius:4px;">
      <div style="font-weight:700;margin-bottom:6px;">${escapeHtml(input.topRecommendation.title)}</div>
      <div style="font-size:14px;color:#333;">${escapeHtml(input.topRecommendation.body)}</div>
    </div>
    <p>Most businesses at your stage see results within the first 2–3 weeks of implementation. The key is starting with one high-impact workflow rather than trying to automate everything at once.</p>
    <p>If you want to explore what that first workflow could be, I'd be happy to walk through it:</p>
    <p>${ctaButton("Book a Discovery Call", SITE_CONFIG.calendlyUrl)}</p>
    <p style="margin-top:32px;">— Michael, Speedwell AI</p>
  `);
  return { subject, html };
}

export interface Day7EmailInput {
  name: string;
  company: string;
  overall: number;
  painPointArea: string;
}

export function day7Email(input: Day7EmailInput): {
  subject: string;
  html: string;
} {
  const automationPotential = getAutomationPotential(input.overall);
  const displayName = titleCase(input.name.trim());

  const subject = `Quick question about ${input.company}`;
  const html = wrap(`
    <p>Hi ${escapeHtml(displayName)},</p>
    <p>Last week you scored <strong>${automationPotential}% Automation Potential</strong> on our AI Readiness Scorecard. I wanted to check in — has anything changed in how you're thinking about automating <strong>${escapeHtml(input.painPointArea)}</strong>?</p>
    <p>If you're still exploring, a free 30-minute discovery call is a good place to start. We'll walk through your results, identify your highest-leverage workflow, and map out what a first automation could look like — no commitment required.</p>
    <p>Happy to chat if it would help:</p>
    <p>${ctaButton("Book a Free Discovery Call", SITE_CONFIG.calendlyUrl)}</p>
    <p>Either way, no pressure. Just wanted to make sure the report was useful.</p>
    <p style="margin-top:32px;">— Michael, Speedwell AI</p>
  `);
  return { subject, html };
}

// ─── Internal notification (always sent, fallback if DB is down) ──────────

export interface InternalNotificationInput {
  name: string;
  email: string;
  company: string;
  teamSize?: string;
  overall: number;
  tier: string;
  dimensions: DimensionScores;
  painPoint: string;
  painPointOther?: string;
  answers: Record<string, number>;
  dbStored: boolean;
  dbError?: string;
  emailError?: string;
}

export function internalNotificationEmail(
  input: InternalNotificationInput
): { subject: string; html: string } {
  const automationPotential = getAutomationPotential(input.overall);
  const opportunityTier = getOpportunityTier(automationPotential);
  const subject = `[Assessment Lead] ${input.company} — ${automationPotential}% potential (${opportunityTier})`;

  const rows = (obj: Record<string, string | number | undefined>) =>
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#6B7280;">${escapeHtml(k)}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(String(v))}</td></tr>`
      )
      .join("");

  const oppDimensions = getOpportunityDimensions(input.dimensions);

  const html = wrap(`
    <h2 style="font-size:18px;margin:0 0 12px;">New AI Readiness Scorecard lead</h2>
    <table style="border-collapse:collapse;font-size:14px;">
      ${rows({
        Name: input.name,
        Email: input.email,
        Company: input.company,
        "Team size": input.teamSize,
        "Automation Potential": `${automationPotential}%`,
        "Opportunity Tier": opportunityTier,
        "Readiness Score (raw)": `${input.overall}/100`,
        "Process Automation Potential": `${oppDimensions.processAutomationPotential.pct}%`,
        "Tool Integration Opportunity": `${oppDimensions.toolIntegrationOpportunity.pct}%`,
        "Team Efficiency Opportunity": `${oppDimensions.teamEfficiencyOpportunity.pct}%`,
        "Pain point": input.painPoint,
        "Pain point (other)": input.painPointOther,
      })}
    </table>
    <h3 style="font-size:14px;margin:20px 0 8px;">Answers</h3>
    <pre style="background:#fff;border:1px solid #e6e6e8;padding:12px;border-radius:6px;font-size:12px;white-space:pre-wrap;">${escapeHtml(
      JSON.stringify(input.answers, null, 2)
    )}</pre>
    <h3 style="font-size:14px;margin:20px 0 8px;">System status</h3>
    <div style="font-size:13px;">DB stored: <strong>${input.dbStored ? "yes" : "no"}</strong>${
      input.dbError ? ` <span style="color:#b00;">(${escapeHtml(input.dbError)})</span>` : ""
    }</div>
    ${
      input.emailError
        ? `<div style="font-size:13px;color:#b00;">Report email error: ${escapeHtml(input.emailError)}</div>`
        : ""
    }
  `);

  return { subject, html };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
