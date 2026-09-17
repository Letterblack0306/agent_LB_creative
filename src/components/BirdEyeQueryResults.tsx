import { useState } from "react";

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
    head: "54673a6",
    observedAt: "2026-09-17T16:00:00Z",
  },
  git: {
    isRepository: true,
    branch: "main",
    head: "54673a6",
    dirty: false,
    changedPathCount: 0,
    evidenceLevel: "PROVEN",
    tracking: { upstreamRef: "origin/main", tracked: true, ahead: 0, behind: 0 },
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
    observedHead: "54673a6",
    evidenceLevel: "PROVEN",
    reason: "Workspace has advanced 2 commits past documented source_head with 8 concrete fixes",
  },
  verdict: "REVIEW",
  syncState: "LOCAL_ONLY",
  recentActivity: {
    latestCommit: "54673a6",
    commitDate: "2026-09-17",
    changes: 8,
    filesChanged: 7,
    branchStatus: "main = origin/main (up to date)",
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

// Planned implementation sequence from brew-complete-planned-structure
const plannedSequence = [
  { phase: "P0", task: "Prove exact operation-correlation loss boundary", status: "unknown" },
  { phase: "P1", task: "Repair and runtime-prove operation correlation", status: "unknown" },
  { phase: "P2", task: "Establish one canonical Session / Turn / Item lifecycle", status: "unknown" },
  { phase: "P3", task: "Finish provider/model capability negotiation and active consumption", status: "unknown" },
  { phase: "P4", task: "Prove one real provider-native tool-call turn", status: "unknown" },
  { phase: "P5", task: "Prove governed host tool execution", status: "unknown" },
  { phase: "P6", task: "Prove tool-result -> provider continuation", status: "unknown" },
  { phase: "P7", task: "Prove full operation event/evidence trajectory", status: "unknown" },
  { phase: "P8", task: "Prove cancellation + error attribution", status: "unknown" },
  { phase: "P9", task: "Prove crash/restart/resume + exactly-once behavior", status: "unknown" },
  { phase: "P10", task: "Establish typed professional workspace + Git capabilities", status: "unknown" },
  { phase: "P11", task: "Establish PTY/background processes + live output events", status: "unknown" },
  { phase: "P12", task: "Prove active user steering / interrupt / cancel", status: "unknown" },
  { phase: "P13", task: "Prove dynamic tool create/register/restart/reuse lifecycle", status: "unknown" },
  { phase: "P14", task: "Prove browser real E2E", status: "unknown" },
  { phase: "P15", task: "Prove Telegram real E2E", status: "unknown" },
  { phase: "P16", task: "Establish bidirectional agent-control API", status: "unknown" },
  { phase: "P17", task: "Prove persistent session replay/resume/fork", status: "unknown" },
  { phase: "P18", task: "Build high-fidelity CLI/TUI client over the runtime", status: "unknown" },
  { phase: "P19", task: "Prove UI composition acceptance", status: "unknown" },
  { phase: "P20", task: "Prove installed-runtime acceptance", status: "unknown" },
  { phase: "P21", task: "Prove full CI / release acceptance", status: "unknown" },
  { phase: "P22", task: "Remove/reconcile remaining legacy and duplicate authorities", status: "unknown" },
];

// Evidence position from brew-complete-planned-structure
const evidencePosition = [
  { area: "One reasoning-agent model", state: "ACTIVE_PROJECT_CONTRACT", color: "green" },
  { area: "LM Studio provider selection through Brew", state: "RUNTIME_PROVEN", color: "green" },
  { area: "qwen/qwen3-vl-8b selection through Brew", state: "RUNTIME_PROVEN", color: "green" },
  { area: "Brew -> LM Studio connectivity", state: "RUNTIME_PROVEN", color: "green" },
  { area: "Canonical provider-backed /query text response", state: "RUNTIME_PROVEN", color: "green" },
  { area: "Provider/model/session attribution in model events", state: "RUNTIME_PROVEN", color: "green" },
  { area: "Operation correlation in observed model events", state: "RUNTIME_DISPROVEN", color: "red" },
  { area: "Exact operation-correlation loss boundary", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Proven correlation patch owner", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Durable canonical turnId semantics", state: "UNVERIFIED", color: "amber" },
  { area: "Live provider tool call -> host execution -> continuation", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Interactive/background terminal runtime", state: "INCOMPLETE", color: "amber" },
  { area: "Exactly-once crash/restart recovery", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Dynamic tool lifecycle E2E", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Browser E2E", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Telegram live delivery E2E", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Installed runtime acceptance", state: "NOT_YET_PROVEN", color: "gray" },
  { area: "Current-head full CI/release acceptance", state: "NOT_YET_PROVEN", color: "gray" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  proven: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  current: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  warning: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  next: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  blocked: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
};

const evidenceColors: Record<string, string> = {
  green: "text-green-400 bg-green-500/10 border-green-500/30",
  red: "text-red-400 bg-red-500/10 border-red-500/30",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  gray: "text-gray-400 bg-gray-500/10 border-gray-500/30",
};

export default function BirdEyeQueryResults() {
  const [activeTab, setActiveTab] = useState<"projection" | "plan" | "sequence" | "evidence">("projection");

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            BirdEye Query: Brew Plans
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Simulated output of <code className="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">python birdeye_projection.py projection brew</code>
          {" "}— what BirdEye returns when querying Brew's plans, status, and workspace state.
        </p>
      </div>

      {/* Command */}
      <div className="rounded-xl bg-black/40 border border-white/10 p-4 mb-8 font-mono text-sm">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <span className="text-green-400">$</span>
          <span>python birdeye_projection.py projection brew</span>
        </div>
        <div className="text-xs text-gray-600">
          # Reads: C:\MCP Local\GPT-Knowledge\project-engineering\projects\brew\plan.json
          <br />
          # Reads: C:\MCP Local\GPT-Knowledge\project-engineering\projects\brew\status.json
          <br />
          # Audits: G:\Developments\38_Brew_Creative_Agent (git read-only)
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: "projection" as const, label: "Full Projection", icon: "fa-eye" },
          { id: "plan" as const, label: "Plan Nodes (12)", icon: "fa-diagram-project" },
          { id: "sequence" as const, label: "Implementation Sequence (23)", icon: "fa-list-ol" },
          { id: "evidence" as const, label: "Evidence Position (18)", icon: "fa-microscope" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
            }`}
          >
            <i className={`fa-solid ${tab.icon} mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Full Projection */}
      {activeTab === "projection" && (
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
                <span className="text-xs text-gray-300">dirty: <span className="text-green-400">false</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">evidenceLevel: <span className="text-green-400">PROVEN</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">tracking: <span className="text-gray-400">origin/main, ahead:0, behind:0</span></span>
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
                observed: <code className="text-emerald-300">54673a6</code>
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Workspace has advanced past documented source_head with 8 concrete fixes (renderer cwd, CSS reset, waiting-state invariant, chat selectors, verification display, approval formatting, user interruption, semantic observation)
            </p>
          </div>

          {/* Verdict */}
          <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
            <div className="flex items-start gap-3">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold shrink-0">
                verdict: REVIEW
              </span>
              <div className="text-xs text-gray-400">
                <p>Workspace HEAD has advanced past documented source_head with 8 concrete fixes.</p>
                <p className="mt-1 text-emerald-300/80">
                  <i className="fa-solid fa-circle-check mr-1"></i>
                  Branch status: main = origin/main (up to date) • 7 files changed • Temporary bat scripts cleaned
                </p>
                <p className="mt-1 text-gray-500">
                  Plan documents may need reconciliation to reflect the new commit.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Nodes */}
      {activeTab === "plan" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-400 mb-4">
            From <code className="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs">plan.json</code> — 
            12 nodes across 6 lanes. Active gate: <span className="text-purple-300">drift-recovery-reference-reuse</span>
          </p>
          {planNodes.map((node) => {
            const colors = statusColors[node.status];
            return (
              <div key={node.id} className={`rounded-xl ${colors.bg} border ${colors.border} p-4`}>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${colors.text}`}>
                    {node.status.toUpperCase()}
                  </span>
                  {node.priority && (
                    <span className="text-[10px] text-gray-500 font-mono">{node.priority}</span>
                  )}
                  <span className="text-xs text-gray-500">{node.lane}</span>
                </div>
                <p className="text-sm text-gray-200 mt-2 font-medium">{node.title}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Implementation Sequence */}
      {activeTab === "sequence" && (
        <div>
          <p className="text-sm text-gray-400 mb-4">
            From <code className="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs">brew-complete-planned-structure-2026-08-17.md</code> — 
            23 planned phases. Phase labels are planning notation, not evidence.
          </p>
          <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
            {plannedSequence.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 border-b border-white/5 last:border-0">
                <span className="text-xs font-mono text-cyan-400 w-8 shrink-0">{item.phase}</span>
                <span className="text-sm text-gray-300 flex-1">{item.task}</span>
                <span className="text-[10px] text-gray-500 font-mono">NOT_STARTED</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidence Position */}
      {activeTab === "evidence" && (
        <div>
          <p className="text-sm text-gray-400 mb-4">
            From <code className="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded text-xs">brew-complete-planned-structure-2026-08-17.md</code> — 
            current evidence position at architecture checkpoint.
          </p>
          <div className="space-y-2">
            {evidencePosition.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/[0.02] border border-white/5 p-3">
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono shrink-0 ${evidenceColors[item.color]}`}>
                  {item.state}
                </span>
                <span className="text-sm text-gray-300">{item.area}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
              <div className="text-2xl font-bold text-green-400">6</div>
              <div className="text-xs text-gray-400">RUNTIME_PROVEN</div>
            </div>
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">2</div>
              <div className="text-xs text-gray-400">INCOMPLETE/UNVERIFIED</div>
            </div>
            <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 text-center">
              <div className="text-2xl font-bold text-red-400">10</div>
              <div className="text-xs text-gray-400">NOT_YET_PROVEN</div>
            </div>
          </div>
        </div>
      )}

      {/* Other BirdEye commands */}
      <div className="mt-12 rounded-xl bg-white/[0.02] border border-white/10 p-6">
        <h3 className="font-bold text-gray-200 mb-4 text-sm uppercase tracking-wider">
          Other BirdEye Commands for Brew
        </h3>
        <div className="space-y-3 font-mono text-xs">
          {[
            { cmd: "python birdeye_projection.py projects", desc: "List all registered projects (brew, memory, lbe, looptool, etc.)" },
            { cmd: "python birdeye_projection.py audit brew", desc: "Read-only git audit for brew workspace" },
            { cmd: "python birdeye_projection.py audit brew --compare c37205cb", desc: "Compare brew HEAD against specific commit" },
            { cmd: "python birdeye_projection.py export brew", desc: "Write evidence snapshot for UI rendering" },
            { cmd: "python birdeye_projection.py history --limit 50", desc: "Show bounded request/response history" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/[0.02]">
              <code className="text-cyan-300 shrink-0">{item.cmd}</code>
              <span className="text-gray-500">// {item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
