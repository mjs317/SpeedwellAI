// ─── Email HTML templates ───────────────────────────────────────────────────

import { SITE_CONFIG } from "@/lib/config";
import { DimensionScores, Recommendation, Tier } from "@/lib/assessment/scoring";

const NAVY = "#0F1B2D";
const TEAL = "#00C9A7";
const WARM_WHITE = "#FAFAF8";

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
  tier: Tier;
  dimensions: DimensionScores;
}

export function reportEmail(input: ReportEmailInput): {
  subject: string;
  html: string;
} {
  const subject = `Your AI Readiness Report — ${input.company}`;
  const html = wrap(`
    <p>Hi ${escapeHtml(input.name)},</p>
    <p>Thanks for taking the Speedwell AI Readiness Assessment. Here's your snapshot:</p>
    <div style="background:#fff;border:1px solid #e6e6e8;border-radius:10px;padding:18px 20px;margin:16px 0;">
      <div style="font-size:14px;margin-bottom:10px;"><strong>Overall Score:</strong> ${input.overall}/100 — <span style="color:${TEAL};font-weight:600;">${input.tier}</span></div>
      <div style="font-size:13px;margin:4px 0;">Process Maturity: <strong>${input.dimensions.process_maturity}%</strong></div>
      <div style="font-size:13px;margin:4px 0;">Technical Readiness: <strong>${input.dimensions.technical_readiness}%</strong></div>
      <div style="font-size:13px;margin:4px 0;">Organizational Readiness: <strong>${input.dimensions.organizational_readiness}%</strong></div>
    </div>
    <p>Your full report is attached.</p>
    <p>Want to talk through your results?</p>
    <p>${ctaButton("Book a Free Discovery Call", SITE_CONFIG.calendlyUrl)}</p>
    <p style="margin-top:32px;">— Speedwell AI</p>
  `);
  return { subject, html };
}

export interface Day3EmailInput {
  name: string;
  overall: number;
  tier: Tier;
  lowestDimensionLabel: string;
  topRecommendation: Recommendation;
}

export function day3Email(input: Day3EmailInput): {
  subject: string;
  html: string;
} {
  const subject = "A quick thought on your AI readiness results";
  const html = wrap(`
    <p>Hi ${escapeHtml(input.name)},</p>
    <p>A few days ago you took our AI Readiness Assessment and scored <strong>${input.overall}/100 (${input.tier})</strong>.</p>
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
    <p style="margin-top:32px;">— Speedwell AI</p>
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
  const subject = `Quick question about ${input.company}`;
  const html = wrap(`
    <p>Hi ${escapeHtml(input.name)},</p>
    <p>Last week you scored <strong>${input.overall}/100</strong> on our AI Readiness Assessment. I wanted to check in — has anything changed in how you're thinking about automating <strong>${escapeHtml(input.painPointArea)}</strong>?</p>
    <p>If you're still exploring, our ${SITE_CONFIG.assessmentPrice} AI Readiness Sprint might be a good fit. It's a deep-dive audit of your actual workflows with a prioritized roadmap showing exactly where to start — and the ${SITE_CONFIG.assessmentPrice} is credited in full if you move forward with an implementation.</p>
    <p>Happy to chat if it would help:</p>
    <p>${ctaButton("Book a Call", SITE_CONFIG.calendlyUrl)}</p>
    <p>Either way, no pressure. Just wanted to make sure the report was useful.</p>
    <p style="margin-top:32px;">— Speedwell AI</p>
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
  tier: Tier;
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
  const subject = `[Assessment Lead] ${input.company} — ${input.overall}/100 (${input.tier})`;

  const rows = (obj: Record<string, string | number | undefined>) =>
    Object.entries(obj)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#6B7280;">${escapeHtml(k)}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(String(v))}</td></tr>`
      )
      .join("");

  const html = wrap(`
    <h2 style="font-size:18px;margin:0 0 12px;">New AI Readiness Assessment lead</h2>
    <table style="border-collapse:collapse;font-size:14px;">
      ${rows({
        Name: input.name,
        Email: input.email,
        Company: input.company,
        "Team size": input.teamSize,
        "Overall score": `${input.overall}/100`,
        Tier: input.tier,
        "Process Maturity": `${input.dimensions.process_maturity}%`,
        "Technical Readiness": `${input.dimensions.technical_readiness}%`,
        "Organizational Readiness": `${input.dimensions.organizational_readiness}%`,
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
