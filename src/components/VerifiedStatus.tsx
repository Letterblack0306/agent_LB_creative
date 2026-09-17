import { browserAcceptance, brewPlanMeta, provenFoundations } from "../data/brewPlanning";

const verifiedChanges = [
  {
    commit: "54673a6",
    classification: "PROVEN_SOURCE_AND_TEST",
    change: "Fixed 8 concrete issues: renderer cwd, CSS reset, waiting-state invariant, chat selectors, verification display, approval formatting, user interruption, and semantic observation. Changes across 7 files in electron/, src/agent/executive/, and test/. Branch main and origin/main both at 54673a6 — up to date.",
  },
  {
    commit: "a8f4425c",
    classification: "PROVEN_SOURCE_AND_TEST",
    change: "Removed active request-semantic tool preselection from the runner foundation. The canonical reasoning loop now receives the full governed executable registry instead of a regex/token-scored subset. Deleted the obsolete task-tool-selection module, response-decision-layer, and stale runtime build script.",
  },
  {
    commit: "4a5cb534",
    classification: "PROVEN_SOURCE_AND_REGRESSION_TEST",
    change: "Added regression coverage that rejects semantic tool preselection, semantic router/planner re-entry into the canonical runner, and tool-selection telemetry being used as an execution capability boundary.",
  },
  {
    commit: "39da8df9",
    classification: "PROVEN_SOURCE_AND_TEST",
    change: "Aligned the dynamic prompt tool catalogue with the native tool loop by using describeForModel({ includeUnavailable: false }); the model now sees the governed executable tool set consistently in both context and native tool schemas.",
  },
];

const proofLevels = [
  { area: "One-agent architecture", state: "PROVEN_SOURCE", note: "Canonical source and removal history support one semantic reasoning authority." },
  { area: "Capability registry", state: "PROVEN_SOURCE", note: "Model-visible and executable tool catalogs derive from current capability ownership." },
  { area: "Static regression", state: "PROVEN_TEST", note: "418 tests plus readiness/runtime truth/release postflight reported PASS." },
  { area: "Browser relay/CDP", state: "PROVEN_LIVE", note: "Relay :9333 and Chrome CDP :7430 were both reachable in the latest acceptance run." },
  { area: "ChatGPT posting", state: "PARTIAL", note: browserAcceptance.blocker },
  { area: "Restart/exactly-once", state: "NOT_PROVEN", note: "Checkpoint primitives exist; process-loss rediscovery/revalidation/non-duplication remains an acceptance obligation." },
  { area: "Installed runtime identity", state: "NOT_PROVEN", note: "Needs exact source -> deployed build -> live runtime identity and restart proof." },
];

const stateClass: Record<string, string> = {
  PROVEN_SOURCE: "text-green-400 bg-green-500/10 border-green-500/30",
  PROVEN_TEST: "text-green-400 bg-green-500/10 border-green-500/30",
  PROVEN_LIVE: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  PARTIAL: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  NOT_PROVEN: "text-gray-400 bg-gray-500/10 border-gray-500/30",
  CANONICAL: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  SUPERSEDED: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  OBSOLETE: "text-red-400 bg-red-500/10 border-red-500/30",
};

const reconciledAuthorities = [
  { item: "scenario-router.mjs", status: "OBSOLETE", detail: "Removed; no active semantic router in canonical path" },
  { item: "response-decision-layer.mjs", status: "OBSOLETE", detail: "Removed; model-owned finalization replaces deterministic responder" },
  { item: "agent-loop.mjs", status: "SUPERSEDED", detail: "Replaced by agent-tool-loop.mjs with model-owned continuation" },
  { item: "provider-planner.mjs", status: "SUPERSEDED", detail: "Model decides next action; no separate planner authority" },
  { item: "active-read-agent.mjs", status: "CANONICAL", detail: "Retained as bounded inspection capability under canonical runtime" },
  { item: "workspace-agent/core", status: "CANONICAL", detail: "Reduced to services (retrieval-index, skill-fetcher); no independent planning brain" },
];

export default function VerifiedStatus() {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            Verified Status
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          From <code className="text-green-300 bg-green-500/10 px-1.5 py-0.5 rounded text-sm">status.json</code> — 
          latest verified at commit <code className="text-gray-300">54673a6</code> (2026-09-17).
        </p>
      </div>

      {/* Latest commit banner */}
      <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-5 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-code-commit text-emerald-400"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                54673a6
              </span>
              <span className="text-xs text-gray-500">2026-09-17</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30 font-mono">
                MAIN = ORIGIN/MAIN — UP TO DATE
              </span>
            </div>
            <p className="text-sm text-gray-200 font-medium mb-2">
              Fix 8 concrete issues: renderer cwd, CSS reset, waiting-state invariant, chat selectors, verification display, approval formatting, user interruption, semantic observation
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">7 files changed</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">electron/Index.html</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">electron/agent-activity.css</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">electron/main.js</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">electron/preload.js</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">src/agent/executive/agent-runtime-service.js</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">electron/chrome-launcher.js</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10 font-mono">test/electron-components-smoke.js</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Plan Impact:</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20" title="P0 Correctness: provider-result-invariant">
                  waiting-state → P0 invariant
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20" title="Authority: canonical-query">
                  chat selectors → canonical query
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" title="P1 Runtime: recovery">
                  user interruption → P1 recovery
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" title="Evidence pipeline">
                  semantic observation → evidence
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20" title="Validation">
                  verification display → validation
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20" title="Policy">
                  approval formatting → policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">411+</div>
          <div className="text-xs text-gray-400">Tests Passed</div>
        </div>
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{provenFoundations.length}</div>
          <div className="text-xs text-gray-400">Proven foundations</div>
        </div>
        <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">4</div>
          <div className="text-xs text-gray-400">Verified Changes</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">PARTIAL</div>
          <div className="text-xs text-gray-400">Live posting</div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Proof levels</h3>
        <div className="space-y-3">
          {proofLevels.map((item) => (
            <div key={item.area} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-sm font-medium text-gray-200">{item.area}</h4>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${stateClass[item.state]}`}>{item.state}</span>
              </div>
              <p className="text-xs text-gray-500">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Authority reconciliation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {reconciledAuthorities.map((item) => (
            <div key={item.item} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <code className="text-xs text-gray-300">{item.item}</code>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${stateClass[item.status]}`}>{item.status}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
        <h4 className="font-semibold text-amber-300 text-sm mb-2">Evidence boundary</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          Source/test proof does not imply installed-runtime, provider, browser-delivery or restart proof.
          Any stronger completion claim must be backed by the target-specific observable required by the current B1–B6 plan.
        </p>
      </div>
    </div>
  );
}
