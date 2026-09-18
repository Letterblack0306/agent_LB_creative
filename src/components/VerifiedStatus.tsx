import { browserAcceptance, brewPlanMeta, provenFoundations } from "../data/brewPlanning";

const verifiedChanges = [
  {
    commit: "2cbb187d",
    classification: "PROVEN_PUSHED",
    change: "docs: record external PR merge boundary — Added PR warning to AGENTS.md, detailed review notes (EXTERNAL_PR_REVIEW_NOTES.md), updated workspace index and changelog. Pushed to origin/main, working tree clean.",
  },
  {
    commit: "54673a6",
    classification: "PROVEN_SOURCE_AND_TEST",
    change: "Fixed 8 concrete issues: renderer cwd, CSS reset, waiting-state invariant, chat selectors, verification display, approval formatting, user interruption, semantic observation.",
  },
  {
    commit: "c37205cb",
    classification: "PROVEN_REMOTE_SOURCE",
    change: "GitHub origin/main is verified at c37205cb: build: refresh runtime UI asset reference. This does not prove a newer local workspace revision.",
  },
  {
    commit: "a8f4425c",
    classification: "PROVEN_SOURCE_AND_TEST",
    change: "Removed active request-semantic tool preselection from the runner foundation so the primary model sees the governed executable registry.",
  },
  {
    commit: "4a5cb534",
    classification: "PROVEN_SOURCE_AND_REGRESSION_TEST",
    change: "Added regression coverage rejecting semantic tool preselection and semantic router/planner re-entry into the canonical runner.",
  },
  {
    commit: "39da8df9",
    classification: "PROVEN_SOURCE_AND_TEST",
    change: "Aligned the model-visible tool catalogue with the native tool loop using the governed executable registry.",
  },
];

const proofLevels = [
  { area: "One-agent architecture", state: "PROVEN_SOURCE", note: "Canonical source and removal history support one semantic reasoning authority." },
  { area: "Capability registry", state: "PROVEN_SOURCE", note: "Model-visible and executable tool catalogs derive from current capability ownership." },
  { area: "Static regression", state: "PROVEN_TEST", note: "422 tests plus readiness/runtime truth/release postflight reported PASS." },
  { area: "Browser relay/CDP", state: "PROVEN_LIVE", note: "Relay :9333 and Chrome CDP :7430 were both reachable in the latest acceptance run." },
  { area: "ChatGPT posting", state: "PARTIAL", note: browserAcceptance.blocker },
  { area: "Restart/exactly-once", state: "NOT_PROVEN", note: "Checkpoint primitives exist; process-loss rediscovery/revalidation/non-duplication remains an acceptance obligation." },
  { area: "Installed runtime identity", state: "NOT_PROVEN", note: "Needs exact source -> deployed build -> live runtime identity and restart proof." },
];

const workspaceScanIssues = [
  {
    id: "memory-guards-stale",
    severity: "DEFINITE",
    title: "Memory guards are stale and broken",
    detail: "Three memory validation scripts still reference the removed legacy file brew/start.js: validate-memory-promotion.mjs, guard-memory-chat.mjs, guard-memory-leakage.mjs. They fail with ENOENT: brew/brew/start.js. Brew's canonical authority is now brew/agent/orchestrator-server.mjs and brew/runtime/server/gateway-server.mjs.",
    action: "Update all three memory guards to reference current gateway/orchestrator authorities.",
  },
  {
    id: "memory-sidecar-obsolete",
    severity: "DEFINITE",
    title: "Obsolete memory sidecar expectation",
    detail: "validate-memory-promotion.mjs expects .brew-sidecar/memory-marks/ which conflicts with the current external state-root design under ~/.Brew/state.",
    action: "Revise validate-memory-promotion.mjs to use current ~/.Brew/state paths.",
  },
  {
    id: "secret-scanner-false-positives",
    severity: "DEFINITE",
    title: "Secret scanner has false-positive blockers",
    detail: "scan-secret-risk.mjs flags test fixtures such as token: 'active-claim-secret' and apiKey: 'sk-secret-value-1234567890'. These are test literals, not live credentials, but the scanner exits with failure instead of classifying them as test fixtures.",
    action: "Update scan-secret-risk.mjs to classify test fixtures correctly and not exit with failure.",
  },
];

const stateClass: Record<string, string> = {
  PROVEN_REMOTE_SOURCE: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
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
  { item: "scenario-router.mjs", status: "OBSOLETE", detail: "Removed; no active semantic router in the canonical natural-language path." },
  { item: "response-decision-layer.mjs", status: "OBSOLETE", detail: "Removed; model-owned finalization replaces deterministic response authority." },
  { item: "agent-loop.mjs", status: "SUPERSEDED", detail: "Historical secondary loop; canonical continuation is agent-tool-loop + brew-runner." },
  { item: "provider-planner.mjs", status: "OBSOLETE", detail: "Absent on current Brew main; semantic planning/tool choice remains model-owned." },
  { item: "active-read-agent.mjs", status: "SUPERSEDED", detail: "Absent on current Brew main; read/discovery behavior is retained through current context/read tools and capability execution." },
  { item: "workspace-agent/core", status: "CANONICAL", detail: "Retained only as bounded services such as retrieval/index and skill support, not an independent planning brain." },
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
        <p className="text-gray-400 max-w-3xl mx-auto">
          Verified remote source baseline: <code className="text-green-300 bg-green-500/10 px-1.5 py-0.5 rounded text-sm">{brewPlanMeta.sourceRepo}@{brewPlanMeta.sourceShort}</code>.
          Local/BirdEye workspace state is a separate evidence layer and is not inferred from GitHub.
        </p>
      </div>

      {/* Verified remote baseline */}
      <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-5 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-code-commit text-cyan-400"></i>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {brewPlanMeta.sourceShort}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                GITHUB ORIGIN/MAIN
              </span>
            </div>
            <p className="text-sm text-gray-200">build: refresh runtime UI asset reference</p>
            <p className="text-xs text-gray-500 mt-2">
              This is remote repository truth. A newer local workspace revision must be proven through BirdEye/local Git evidence before the dashboard adopts it.
            </p>
          </div>
        </div>
      </div>

      {/* Readiness verification banner */}
      <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-5 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-shield-check text-green-400"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-mono text-green-300 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30">
                verify:readiness
              </span>
              <span className="text-xs text-gray-500">2026-09-18T00:32:45Z</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/30 font-mono">
                ALL GUARDS PASS
              </span>
            </div>
            <p className="text-sm text-gray-200 font-medium mb-3">
              Memory watcher correctness fix: security-rejected candidates no longer emitted as proposals
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg bg-white/5 p-2">
                <div className="text-gray-500">Test Suite</div>
                <div className="text-green-400 font-mono">422/422</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="text-gray-500">Watcher Tests</div>
                <div className="text-green-400 font-mono">4/4</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="text-gray-500">Resource Policy</div>
                <div className="text-cyan-400 font-mono">48 entries</div>
              </div>
              <div className="rounded-lg bg-white/5 p-2">
                <div className="text-gray-500">Browser Tools</div>
                <div className="text-cyan-400 font-mono">6 registered</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Guards Passed:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "test:readiness",
                  "guard:state-root",
                  "guard:runtime-authority",
                  "guard:secrets-structure",
                  "guard:product-surface",
                  "guard:browser-capability",
                  "guard:file-adapter",
                  "guard:resource-policy",
                  "guard:event-contract",
                  "guard:import-boundaries",
                  "release:preflight",
                ].map((guard) => (
                  <span key={guard} className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-300 border border-green-500/20 font-mono">
                    ✓ {guard}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-xs text-amber-300">
                <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                Status: Changes uncommitted in worktree. No deployment or release performed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">422</div>
          <div className="text-xs text-gray-400">Tests Passed</div>
        </div>
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{provenFoundations.length}</div>
          <div className="text-xs text-gray-400">Proven foundations</div>
        </div>
        <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">11/11</div>
          <div className="text-xs text-gray-400">Readiness Guards</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">PARTIAL</div>
          <div className="text-xs text-gray-400">Live posting</div>
        </div>
        <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">3</div>
          <div className="text-xs text-gray-400">Scan Issues</div>
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

      {/* Workspace Scan Issues */}
      <div className="mt-10 mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Workspace Scan Issues (2026-09-18 5:15 PM)</h3>
        <div className="space-y-3">
          {workspaceScanIssues.map((issue) => (
            <div key={issue.id} className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-sm font-medium text-gray-200">{issue.title}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded border font-mono bg-red-500/10 text-red-400 border-red-500/30">
                  {issue.severity}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{issue.detail}</p>
              <p className="text-xs text-emerald-400">
                <i className="fa-solid fa-arrow-right mr-1"></i>
                {issue.action}
              </p>
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
