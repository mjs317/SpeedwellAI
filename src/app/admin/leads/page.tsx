"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronDown, Download, Lock, LogOut, Mail } from "lucide-react";
import type { AssessmentLeadRow } from "@/lib/supabase/server";

type SortKey = "created_at" | "overall_score" | "company";
type SortDir = "asc" | "desc";

export default function AdminLeadsPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [leads, setLeads] = useState<AssessmentLeadRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  async function fetchLeads() {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch("/api/admin/leads");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load leads");
      setLeads(data.leads as AssessmentLeadRow[]);
      setAuthed(true);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchLeads();
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");
      setPassword("");
      await fetchLeads();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setLeads([]);
  }

  const sorted = useMemo(() => {
    const arr = [...leads];
    arr.sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      if (sortKey === "created_at") {
        av = new Date(a.created_at).getTime();
        bv = new Date(b.created_at).getTime();
      } else if (sortKey === "overall_score") {
        av = a.overall_score ?? 0;
        bv = b.overall_score ?? 0;
      } else {
        av = a.company?.toLowerCase() || "";
        bv = b.company?.toLowerCase() || "";
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [leads, sortKey, sortDir]);

  const stats = useMemo(() => {
    const total = leads.length;
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = leads.filter(
      (l) => new Date(l.created_at).getTime() >= oneWeekAgo
    ).length;
    const avgScore = total
      ? Math.round(
          leads.reduce((sum, l) => sum + (l.overall_score ?? 0), 0) / total
        )
      : 0;
    const painPointCounts = new Map<string, number>();
    const tierCounts = new Map<string, number>();
    leads.forEach((l) => {
      if (l.pain_point)
        painPointCounts.set(
          l.pain_point,
          (painPointCounts.get(l.pain_point) || 0) + 1
        );
      if (l.tier)
        tierCounts.set(l.tier, (tierCounts.get(l.tier) || 0) + 1);
    });
    const topPain = [...painPointCounts.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    const topTier = [...tierCounts.entries()].sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];
    return {
      total,
      thisWeek,
      avgScore,
      topPain: topPain ?? "—",
      topTier: topTier ?? "—",
    };
  }, [leads]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "company" ? "asc" : "desc");
    }
  }

  // ── Login screen ──
  if (authed === false) {
    return (
      <main className="min-h-screen bg-[#0F1B2D] text-[#FAFAF8] flex items-center justify-center px-5">
        <form
          onSubmit={login}
          className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-[#00C9A7]">
            <Lock size={18} />
            <h1 className="font-semibold">Admin Access</h1>
          </div>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-[#FAFAF8] placeholder-[#FAFAF8]/30 text-sm focus:outline-none focus:border-[#00C9A7] focus:ring-1 focus:ring-[#00C9A7]/50 transition"
          />
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full px-5 py-3 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors disabled:opacity-50"
          >
            {loggingIn ? "Signing in…" : "Sign in"}
          </button>
          {authError && (
            <p className="text-sm text-red-400" role="alert">
              {authError}
            </p>
          )}
        </form>
      </main>
    );
  }

  if (authed === null || loading) {
    return (
      <main className="min-h-screen bg-[#0F1B2D] text-[#FAFAF8] flex items-center justify-center">
        <div className="text-sm text-[#FAFAF8]/60">Loading…</div>
      </main>
    );
  }

  // ── Dashboard ──
  return (
    <main className="min-h-screen bg-[#0F1B2D] text-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Assessment Leads</h1>
            <p className="text-sm text-[#FAFAF8]/60 mt-1">
              All AI Readiness Assessment submissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/leads/export"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#00C9A7] text-[#0F1B2D] font-semibold text-sm hover:bg-[#00a88c] transition-colors"
            >
              <Download size={15} />
              Export CSV
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-white/15 text-[#FAFAF8]/70 text-sm hover:text-[#FAFAF8] hover:border-white/30 transition"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <StatCard label="Total leads" value={String(stats.total)} />
          <StatCard label="This week" value={String(stats.thisWeek)} />
          <StatCard label="Avg score" value={`${stats.avgScore}/100`} />
          <StatCard label="Top pain point" value={stats.topPain} small />
          <StatCard label="Most common tier" value={stats.topTier} small />
        </div>

        {loadError && (
          <div className="mb-6 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
            {loadError}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-white/5 text-left text-xs uppercase tracking-wide text-[#FAFAF8]/60">
                <th className="px-4 py-3 font-semibold">
                  <SortableHeader
                    label="Date"
                    active={sortKey === "created_at"}
                    dir={sortDir}
                    onClick={() => toggleSort("created_at")}
                  />
                </th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">
                  <SortableHeader
                    label="Company"
                    active={sortKey === "company"}
                    dir={sortDir}
                    onClick={() => toggleSort("company")}
                  />
                </th>
                <th className="px-4 py-3 font-semibold">Team</th>
                <th className="px-4 py-3 font-semibold">
                  <SortableHeader
                    label="Score"
                    active={sortKey === "overall_score"}
                    dir={sortDir}
                    onClick={() => toggleSort("overall_score")}
                  />
                </th>
                <th className="px-4 py-3 font-semibold">Tier</th>
                <th className="px-4 py-3 font-semibold">Pain point</th>
                <th className="px-4 py-3 font-semibold">Drip</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-12 text-center text-[#FAFAF8]/50"
                  >
                    No leads yet.
                  </td>
                </tr>
              )}
              {sorted.map((lead) => {
                const isOpen = expanded === lead.id;
                return (
                  <Fragment key={lead.id}>
                    <tr
                      className="border-t border-white/10 hover:bg-white/[0.03] cursor-pointer transition-colors"
                      onClick={() => setExpanded(isOpen ? null : lead.id)}
                    >
                      <td className="px-4 py-3 text-[#FAFAF8]/75 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium">{lead.name}</td>
                      <td className="px-4 py-3 text-[#FAFAF8]/75">
                        <a
                          href={`mailto:${lead.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 hover:text-[#00C9A7]"
                        >
                          <Mail size={12} />
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3">{lead.company}</td>
                      <td className="px-4 py-3 text-[#FAFAF8]/75">
                        {lead.team_size || "—"}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#00C9A7]">
                        {lead.overall_score ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-xs">{lead.tier || "—"}</td>
                      <td className="px-4 py-3 text-xs text-[#FAFAF8]/75 max-w-[200px] truncate">
                        {lead.pain_point || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Badge label="D3" on={lead.drip_day3_sent} />
                          <Badge label="D7" on={lead.drip_day7_sent} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#FAFAF8]/50">
                        <ChevronDown
                          size={15}
                          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="border-t border-white/10 bg-white/[0.02]">
                        <td colSpan={10} className="px-6 py-5">
                          <LeadDetail lead={lead} />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <div className="text-[10px] uppercase tracking-wide text-[#FAFAF8]/50 mb-1">
        {label}
      </div>
      <div
        className={`font-bold text-[#FAFAF8] ${small ? "text-sm leading-snug" : "text-xl"}`}
      >
        {value}
      </div>
    </div>
  );
}

function Badge({ label, on }: { label: string; on: boolean }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center text-[10px] font-semibold px-1.5 py-0.5 rounded",
        on
          ? "bg-[#00C9A7]/20 text-[#00C9A7] border border-[#00C9A7]/30"
          : "bg-white/5 text-[#FAFAF8]/30 border border-white/10",
      ].join(" ")}
    >
      {label}
    </span>
  );
}

function SortableHeader({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-xs uppercase tracking-wide ${
        active ? "text-[#00C9A7]" : "text-[#FAFAF8]/60 hover:text-[#FAFAF8]"
      }`}
    >
      {label}
      {active && (
        <span className="text-[9px]">{dir === "asc" ? "▲" : "▼"}</span>
      )}
    </button>
  );
}

function LeadDetail({ lead }: { lead: AssessmentLeadRow }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 text-sm">
      <div>
        <div className="text-xs font-semibold tracking-wide uppercase text-[#FAFAF8]/50 mb-2">
          Dimension scores
        </div>
        <div className="space-y-1.5">
          <DetailRow
            label="Process Maturity"
            value={
              lead.dimension_scores?.process_maturity != null
                ? `${lead.dimension_scores.process_maturity}%`
                : "—"
            }
          />
          <DetailRow
            label="Technical Readiness"
            value={
              lead.dimension_scores?.technical_readiness != null
                ? `${lead.dimension_scores.technical_readiness}%`
                : "—"
            }
          />
          <DetailRow
            label="Organizational Readiness"
            value={
              lead.dimension_scores?.organizational_readiness != null
                ? `${lead.dimension_scores.organizational_readiness}%`
                : "—"
            }
          />
        </div>
        {lead.pain_point_other && (
          <div className="mt-4">
            <div className="text-xs font-semibold tracking-wide uppercase text-[#FAFAF8]/50 mb-1">
              Pain point details
            </div>
            <div className="text-sm text-[#FAFAF8]/85 whitespace-pre-wrap">
              {lead.pain_point_other}
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="text-xs font-semibold tracking-wide uppercase text-[#FAFAF8]/50 mb-2">
          Answers
        </div>
        <div className="space-y-1.5">
          {lead.answers &&
            Object.entries(lead.answers).map(([k, v]) => (
              <DetailRow key={k} label={k.replace(/_/g, " ")} value={String(v)} />
            ))}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-1">
      <span className="text-[#FAFAF8]/60 capitalize">{label}</span>
      <span className="font-semibold text-[#FAFAF8]">{value}</span>
    </div>
  );
}
