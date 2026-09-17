import { useState } from "react";

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

const runtimeFindings = [
  {
    id: "agent-tool-loop-model-owned",
    classification: "PROVEN_SOURCE",
    detail: "brew/runtime/agents/agent-tool-loop.mjs sends the governed tool catalogue to the provider, accepts native model tool actions, executes through the registry, returns receipts/evidence to the same loop, and requires evidence-backed finalization after tool use.",
  },
  {
    id: "runner-foundation-no-semantic-preselection",
    classification: "PROVEN_SOURCE_AND_REGRESSION_TEST",
    detail: "prepareRunnerFoundationTurn no longer calls createTaskToolRegistryView or requestHints. It returns the governed executable registry and selectedTools is compatibility telemetry representing all exposed executable tools, not heuristic semantic selection.",
  },
  {
    id: "project-registry-governance",
    classification: "PROVEN_SOURCE",
    detail: "Project registry filtering remains a deterministic permission/configuration boundary over allowed or disabled tools and does not interpret user request semantics.",
  },
  {
    id: "plugin-registry-governance",
    classification: "PROVEN_SOURCE",
    detail: "Plugin registry composition exposes active plugin tools and delegates execution without taking semantic request ownership.",
  },
  {
    id: "subagent-runtime",
    classification: "LEGACY_FAIL_CLOSED",
    detail: "The legacy subagent runtime remains intentionally disabled and fail-closed; it is not a live second reasoning authority in the canonical path.",
  },
  {
    id: "scenario-router-natural-language-path",
    classification: "RUNTIME_DEAD_FOR_CANONICAL_NL",
    detail: "The natural-language classifyScenario path was found only in tests. Canonical start.js uses classifyExplicitCommand for explicit slash/URL syntax and ordinary natural language falls through to the LLM reasoning loop.",
  },
];

const remainingAuditTargets = [
  { id: "active-read-agent", status: "REACHABILITY_NOT_YET_CLASSIFIED", evidence: "Full test suite still contains 'active read agent owns supported inspection intents'.", next: "Trace imports/callers from canonical runner before changing or deleting." },
  { id: "provider-planner", status: "REACHABILITY_NOT_YET_CLASSIFIED", evidence: "Full test suite still contains provider-planner behavior tests.", next: "Determine whether this is canonical, compatibility-only, or dead code." },
  { id: "deterministic-fallback", status: "REACHABILITY_NOT_YET_CLASSIFIED", evidence: "Full test suite still exercises bounded deterministic workspace inspection and repeated-provider-action fallback behavior.", next: "Separate safety/recovery mechanics from semantic next-action ownership." },
  { id: "planner-target-sanitization", status: "REACHABILITY_NOT_YET_CLASSIFIED", evidence: "Planner target sanitization remains covered by tests.", next: "Classify whether it is a path-safety normalization boundary or part of an active semantic planner." },
];

const classColors: Record<string, string> = {
  "PROVEN_SOURCE": "text-green-400 bg-green-500/10 border-green-500/30",
  "PROVEN_SOURCE_AND_TEST": "text-green-400 bg-green-500/10 border-green-500/30",
  "PROVEN_SOURCE_AND_REGRESSION_TEST": "text-green-400 bg-green-500/10 border-green-500/30",
  "LEGACY_FAIL_CLOSED": "text-gray-400 bg-gray-500/10 border-gray-500/30",
  "RUNTIME_DEAD_FOR_CANONICAL_NL": "text-amber-400 bg-amber-500/10 border-amber-500/30",
  "REACHABILITY_NOT_YET_CLASSIFIED": "text-blue-400 bg-blue-500/10 border-blue-500/30",
};

export default function VerifiedStatus() {
  const [tab, setTab] = useState<"changes" | "findings" | "audit">("changes");

  return (
    <div>
      <div className="text-center mb-12">
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
          <div className="text-2xl font-bold text-green-400">0</div>
          <div className="text-xs text-gray-400">Tests Failed</div>
        </div>
        <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">4</div>
          <div className="text-xs text-gray-400">Verified Changes</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">4</div>
          <div className="text-xs text-gray-400">Audit Targets Open</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "changes" as const, label: "Verified Changes", count: verifiedChanges.length },
          { id: "findings" as const, label: "Runtime Findings", count: runtimeFindings.length },
          { id: "audit" as const, label: "Audit Targets", count: remainingAuditTargets.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
            }`}
          >
            {t.label} <span className="text-gray-600">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "changes" && (
        <div className="space-y-4">
          {verifiedChanges.map((change, i) => (
            <div key={i} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-2">
                <code className="text-xs text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded font-mono">
                  {change.commit}
                </code>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${classColors[change.classification]}`}>
                  {change.classification}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{change.change}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "findings" && (
        <div className="space-y-4">
          {runtimeFindings.map((finding) => (
            <div key={finding.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <code className="text-xs text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded font-mono">
                  {finding.id}
                </code>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${classColors[finding.classification]}`}>
                  {finding.classification}
                </span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{finding.detail}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "audit" && (
        <div className="space-y-4">
          {remainingAuditTargets.map((target) => (
            <div key={target.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <code className="text-xs text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded font-mono">
                  {target.id}
                </code>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${classColors[target.status]}`}>
                  {target.status}
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Evidence:</span>
                  <p className="text-sm text-gray-400 mt-0.5">{target.evidence}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Next check:</span>
                  <p className="text-sm text-gray-300 mt-0.5">{target.next}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Evidence boundary */}
      <div className="mt-8 rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
        <h4 className="font-semibold text-amber-300 text-sm mb-2 flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Evidence Boundary
        </h4>
        <p className="text-sm text-gray-400 leading-relaxed mb-3">
          Repository/source and test evidence establish the current architecture and regressions at commit 39da8df9,
          but do not by themselves prove installed-runtime, real-provider, browser, adapter, restart/resume,
          or user-visible end-to-end behavior.
        </p>
        <h5 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Next required runtime proof:</h5>
        <ul className="space-y-1">
          {[
            "One correlated ordinary user request through the canonical runner",
            "Native provider tool selection from the full governed executable catalogue",
            "tool_call_id to receipt_id to verification evidence linkage",
            "Same-model continuation after the tool result",
            "Truthful failure when execution or verification fails",
            "No semantic interception by remaining legacy paths",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <span className="text-amber-400 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
