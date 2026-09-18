import { useState } from "react";
import { brewPlanMeta, planningSources, primaryPlan, provenFoundations } from "../data/brewPlanning";

// Simulated BirdEye projection output based on actual plan.json + status.json + birdeye_projection.py
const birdeyeProjection = {
  schemaVersion: 1,
  sources: [
    {
      gateway: "bird-projection-projection",
      owner: "Letterblack0306/Letterblack_BirdEye (feat/workspace-diagnostic-bridge)",
      authority: "feat/local-workspace-change-bridge request/response contract",
      noWebhook: true,
      readOnly: true,
    },
  ],
  attribution: {
    projectId: "brew",
    projectName: "Brew",
    workspaceId: "brew",
    repository: "Letterblack0306/brew",
    workspaceRoot: "G:\\Developments\\38_Brew_Creative_Agent",
    branch: "main",
    head: "c37205cb",
    observedAt: "2026-09-18 (GitHub remote verification only)",
  },
  git: {
    isRepository: true,
    branch: "main",
    head: "c37205cb",
    dirty: null,
    changedPathCount: 0,
    evidenceLevel: "REMOTE_VERIFIED",
    tracking: { upstreamRef: "origin/main", tracked: null, ahead: null, behind: null },
  },
  planStatus: {
    planState: "DOCUMENTED_CURRENT",
    planDocument: "C:\\MCP Local\\GPT-Knowledge\\project-engineering\\projects\\brew\\plan.json",
    statusDocument: "C:\\MCP Local\\GPT-Knowledge\\project-engineering\\projects\\brew\\status.json",
    activeGate: "drift-recovery-reference-reuse",
    documentRevision: "2026-09-08",
    authoritative: true,
    evidenceLevel: "PROVEN",
  },
  alignment: {
    state: "DIVERGED",
    documentedSourceHead: "39da8df909e6e7cc84cf770fcc04c3e959808506",
    observedHead: "c37205cb",
    evidenceLevel: "PROVEN",
    reason: "GitHub remote main is verified at c37205cb; local BirdEye workspace state is not proven by this static PR review",
  },
  verdict: "REVIEW",
  syncState: "REMOTE_VERIFIED_LOCAL_UNKNOWN",
  recentActivity: {
    latestCommit: "c37205cb",
    commitDate: "2026-09-17",
    changes: 1,
    filesChanged: 1,
    branchStatus: "GitHub origin/main = c37205cb; local workspace unknown",
  },
};

// Plan nodes from actual plan.json
const planNodes = [
  { id: "architecture", lane: "Authority", title: "One reasoning agent and one canonical runtime", status: "proven" },
  { id: "canonical-query", lane: "Authority", title: "Canonical conversational turn path", status: "proven" },
  { id: "drift-recovery-reference-reuse", lane: "Active Gate", title: "Recover drift and converge on upstream-proven contracts", status: "current", priority: "P0" },
  { id: "provider-result-invariant", lane: "P0 Correctness", title: "One model-turn success invariant", status: "warning", priority: "P0" },
  { id: "telegram-transport-only", lane: "P0 Correctness", title: "Telegram is transport, not a second agent", status: "warning", priority: "P0" },
  { id: "legacy-response-quarantine", lane: "P0 Correctness", title: "Quarantine duplicate response authorities", status: "next", priority: "P0" },
  { id: "session-turn-item", lane: "P1 Runtime", title: "Canonical Session / Turn / Item lifecycle", status: "next", priority: "P1" },
  { id: "capability-registry", lane: "P1 Runtime", title: "Canonical capability registry and health", status: "next", priority: "P1" },
  { id: "provider-continuation", lane: "P1 Runtime", title: "Provider-native tool continuation", status: "next", priority: "P1" },
  { id: "recovery", lane: "P1 Runtime", title: "Cancellation / restart / resume / exactly-once", status: "next", priority: "P1" },
  { id: "deferred-capabilities", lane: "P2 Recovered Features", title: "MCP, skills, scheduler, browser/desktop and knowledge expansion", status: "blocked", priority: "P2" },
  { id: "ci-release", lane: "Release", title: "Installed runtime + current-head CI acceptance", status: "blocked", priority: "LOCKED" },
];

export default function BirdEyeQueryResults() {
  const [tab, setTab] = useState<"projection" | "plan" | "sources" | "mapping" | "rules">("projection");

  const evidenceColors = {
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  };

  const legacyMapping = [
    { old: "35-feature completion matrix", now: "B1–B6 specific plan with falsifiers", disposition: "Replaced by evidence-gated plan items" },
    { old: "BREW_MEMORY_AND_AUTONOMY_IMPL_PLAN.md", now: "B1–B6 + provenFoundations", disposition: "Historical; superseded by specific plan" },
    { old: "Unified Tool Catalog", now: "B3 (Capability truth)", disposition: "Implemented; model-visible governed registry" },
    { old: "Discovery Before Mutation", now: "B3 + workspace policy", disposition: "Implemented; discovery required before mutation" },
    { old: "Governed Memory Promotion", now: "openGap: memory-promotion", disposition: "Partial; curation exists, automatic promotion not proven" },
    { old: "Retry / Verifier Loop", now: "B4 + agent-tool-loop", disposition: "Superseded; model-owned continuation replaces deterministic verifier" },
    { old: "Workspace Agent", now: "scheduler capability + workspace tools", disposition: "Standalone agent obsolete; capabilities retained" },
    { old: "Semantic Long-Term Memory", now: "memory curation + semantic index", disposition: "Implemented; LanceDB not required" },
  ];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            BirdEye Planning Projection
          </span>
        </h2>
        <p className="text-gray-400 max-w-4xl mx-auto">
          Static dashboard projection of the current Brew plan. BirdEye remains the preferred local workspace/index evidence layer when reachable;
          this panel does not claim a live BirdEye query unless a fresh export is wired in.
        </p>
      </div>

      <div className="rounded-xl bg-black/30 border border-white/10 p-4 mb-8 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-400">
          <span>Brew: {brewPlanMeta.sourceRepo}@{brewPlanMeta.sourceShort}</span>
          <span>GPT-K: {brewPlanMeta.gptkRepo}@{brewPlanMeta.gptkShort}</span>
          <span>Program: {brewPlanMeta.activeProgram}</span>
          <span>As of: {brewPlanMeta.asOf}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "plan" as const, label: "Current B1–B6 Plan", icon: "fa-diagram-project" },
          { id: "sources" as const, label: "Evidence Sources", icon: "fa-database" },
          { id: "mapping" as const, label: "Old → Current Mapping", icon: "fa-code-compare" },
          { id: "rules" as const, label: "Evidence Rules", icon: "fa-shield-halved" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === item.id
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
            }`}
          >
            <i className={`fa-solid ${item.icon} mr-2`}></i>{item.label}
          </button>
        ))}
      </div>

      {/* Full Projection */}
      {tab === "projection" && (
        <div className="space-y-6">
          {/* Attribution */}
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Attribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(birdeyeProjection.attribution).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="text-xs text-gray-500 font-mono w-28 shrink-0">{key}:</span>
                  <span className="text-xs text-gray-300 font-mono break-all">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Git Audit */}
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Git Audit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-gray-300">isRepository: <span className="text-green-400">true</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">branch: <span className="text-cyan-300 font-mono">main</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">head: <span className="text-gray-400 font-mono text-[10px]">c37205cb...</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">local dirty state: <span className="text-amber-400">UNKNOWN — query BirdEye/local workspace</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">evidenceLevel: <span className="text-cyan-400">REMOTE_VERIFIED</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">tracking: <span className="text-gray-400">GitHub origin/main verified; local ahead/behind UNKNOWN</span></span>
              </div>
            </div>
          </div>

          {/* Plan Status */}
          <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Plan Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-gray-500">planState:</span>
                <span className="text-xs text-purple-300 font-mono ml-2">DOCUMENTED_CURRENT</span>
              </div>
              <div>
                <span className="text-xs text-gray-500">activeGate:</span>
                <span className="text-xs text-amber-300 font-mono ml-2">drift-recovery-reference-reuse</span>
              </div>
              <div>
                <span className="text-xs text-gray-500">authoritative:</span>
                <span className="text-xs text-green-400 font-mono ml-2">true</span>
              </div>
              <div>
                <span className="text-xs text-gray-500">evidenceLevel:</span>
                <span className="text-xs text-green-400 font-mono ml-2">PROVEN</span>
              </div>
            </div>
          </div>

          {/* Alignment */}
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Alignment</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded border font-mono ${evidenceColors.amber}`}>
                state: DIVERGED
              </span>
              <span className="text-xs text-gray-400">
                documented: <code className="text-gray-300">39da8df9...</code>
              </span>
              <span className="text-xs text-gray-400">
                observed: <code className="text-emerald-300">c37205cb</code>
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              GitHub remote main is verified at c37205cb. A newer local workspace revision, dirty state, or ahead/behind count requires live BirdEye/local evidence.
            </p>
          </div>

          {/* Verdict */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
            <div className="flex items-start gap-3">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold shrink-0">
                verdict: REVIEW
              </span>
              <div className="text-xs text-gray-400">
                <p>Remote Brew main is verified at c37205cb; local workspace state is not proven by this static dashboard.</p>
                <p className="mt-1 text-emerald-300/80">
                  <i className="fa-solid fa-circle-check mr-1"></i>
                  GitHub remote: origin/main = c37205cb • local workspace/ahead/behind require BirdEye evidence
                </p>
                <p className="mt-1 text-gray-500">
                  Historical plan documents should be reconciled against the verified remote revision and any separately proven local BirdEye state.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Nodes */}
      {tab === "plan" && (
        <div className="space-y-3">
          {primaryPlan.map((item) => (
            <div key={item.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">{item.id}</span>
                <span className="text-[10px] font-mono text-gray-500">{item.lane}</span>
                <span className="text-[10px] font-mono text-purple-300">{item.state.toUpperCase()}</span>
              </div>
              <h3 className="font-semibold text-gray-100">{item.title}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Question</p>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.question}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Observable</p>
                  <p className="text-xs text-cyan-200/80 leading-relaxed">{item.observable}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Next action</p>
                  <p className="text-xs text-blue-200/80 leading-relaxed">{item.nextAction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "sources" && (
        <div className="space-y-3">
          {planningSources.map((source, index) => (
            <div key={source.label} className="rounded-xl bg-white/[0.02] border border-white/10 p-4 flex gap-4">
              <span className="text-cyan-400 font-mono text-sm">{index + 1}</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-200">{source.label}</h3>
                <p className="text-xs text-gray-500 font-mono mt-1">{source.ref}</p>
                <p className="text-sm text-gray-400 mt-2">{source.role}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
            <p className="text-xs text-amber-300">
              Local BirdEye unavailability means local workspace state is UNKNOWN; GitHub remote state must not be relabeled as local proof.
            </p>
          </div>
        </div>
      )}

      {tab === "mapping" && (
        <div className="space-y-3">
          {legacyMapping.map((item) => (
            <div key={item.old} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-3 items-start">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Historical planning label</p>
                  <p className="text-sm text-gray-300 mt-1">{item.old}</p>
                </div>
                <i className="fa-solid fa-arrow-right text-gray-600 mt-4 hidden lg:block"></i>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Current specific owner</p>
                  <p className="text-sm text-cyan-300 mt-1">{item.now}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.disposition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "rules" && (
        <div className="space-y-5">
          <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-5">
            <h3 className="font-semibold text-green-300 mb-3">Proven foundations</h3>
            <ul className="space-y-2">
              {provenFoundations.map((item) => (
                <li key={item.id} className="text-sm text-gray-300">
                  <span className="text-green-400">✓</span> <span className="font-medium">{item.title}:</span> <span className="text-gray-500">{item.evidence}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-5">
            <h3 className="font-semibold text-purple-300 mb-3">Diagnostic contract</h3>
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">{`QUESTION
CURRENT HYPOTHESIS
AUTHORITATIVE OWNER/PATH
AUTHORITATIVE OBSERVABLE
EXPECTED OBSERVATION
FALSIFIER
TARGET REPOSITORY / REVISION / RUNTIME
RESULT CLASSIFICATION
EVIDENCE
NEXT ACTION JUSTIFIED BY THIS RESULT`}</pre>
          </div>
          <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-5">
            <p className="text-sm text-gray-300">
              Internal reasoning complete ≠ tool execution complete ≠ validation complete ≠ durable operation complete ≠ external target complete ≠ user-visible delivery complete.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
