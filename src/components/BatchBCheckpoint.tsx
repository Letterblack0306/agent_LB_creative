import { useState } from "react";

const testResults = [
  { name: "Autonomy tests", status: "PASS", color: "green" },
  { name: "Scheduler/job/approval tests", status: "PASS", color: "green" },
  { name: "npm test (418 tests)", status: "PASS", color: "green" },
  { name: "npm run verify:readiness", status: "PASS", color: "green" },
  { name: "npm run runtime:truth", status: "PASS", color: "green" },
  { name: "npm run release:postflight", status: "PASS", color: "green" },
];

const liveEvidence = [
  { item: "Chrome process PID", value: "10064", status: "ok" },
  { item: "Remote-debugging port", value: "7430", status: "ok" },
  { item: "Chrome /json/version", value: "reachable", status: "ok" },
  { item: "Chrome /json/list", value: "reachable", status: "ok" },
  { item: "Configured relay 127.0.0.1:9333", value: "connection refused", status: "fail" },
  { item: "Default relay 127.0.0.1:9222", value: "connection refused", status: "fail" },
];

const nextGates = [
  "Brew runtime/orchestrator starts successfully",
  "Canonical relay endpoint becomes reachable and identifies the expected Brew relay service",
  "Existing browser/CDP session remains reachable",
  "Only then run one authorized live ChatGPT posting acceptance through the canonical repaired posting tool",
  "Live PASS requires text insertion, send action, and visible posted message",
];

const doNotActions = [
  "Add a second relay",
  "Guess or hard-code another relay port",
  "Restore deleted autonomy modules",
  "Treat the healthy CDP endpoint itself as Brew relay proof",
  "Claim live ChatGPT posting success from source tests/readiness checks",
  "Patch the posting tool solely because the relay process is absent",
];

export default function BatchBCheckpoint() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
            Batch B Browser Relay Checkpoint
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          2026-09-17 — Current Brew workspace browser relay status.
          Source commit: <code className="text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded text-xs">1a34fe5b</code>
        </p>
      </div>

      {/* Current verdict */}
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <i className="fa-solid fa-circle-xmark text-red-400"></i>
          </div>
          <div>
            <h3 className="font-bold text-red-300 text-lg">Current Verdict</h3>
            <p className="text-xs text-gray-500 font-mono">BREW CHATGPT POSTING LIVE PROOF</p>
          </div>
        </div>
        <div className="rounded-xl bg-black/30 border border-white/5 p-4">
          <p className="text-sm font-mono text-red-300">
            BLOCKED_CDP_RUNNING_RELAY_MISSING
          </p>
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Browser/CDP health: <span className="text-green-400">PASS</span>. 
          Relay health: <span className="text-red-400">BLOCKED</span>. 
          Live posting acceptance: <span className="text-gray-500">NOT ATTEMPTED</span> because the relay health gate failed.
        </p>
      </div>

      {/* Classification */}
      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 mb-8">
        <p className="text-xs text-amber-300 font-mono">
          Classification: CDP_RUNNING_RELAY_MISSING
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Source/readiness evidence only — does not prove live browser posting.
        </p>
      </div>

      {/* Test results */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Source/Readiness Test Results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {testResults.map((test, i) => (
            <div key={i} className="rounded-xl bg-green-500/5 border border-green-500/20 p-3 flex items-center gap-3">
              <i className="fa-solid fa-circle-check text-green-400"></i>
              <div>
                <p className="text-sm text-gray-200">{test.name}</p>
                <p className="text-xs text-green-400">{test.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live evidence */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Live Browser/Relay Evidence
        </h3>
        <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
          {liveEvidence.map((ev, i) => (
            <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? "border-t border-white/5" : ""}`}>
              <span className="text-sm text-gray-300">{ev.item}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono ${ev.status === "ok" ? "text-green-400" : "text-red-400"}`}>
                  {ev.value}
                </span>
                <span className={`w-2 h-2 rounded-full ${ev.status === "ok" ? "bg-green-400" : "bg-red-400"}`}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canonical relay config */}
      <div className="mb-8">
        <button
          onClick={() => setExpanded(expanded === "config" ? null : "config")}
          className="w-full rounded-xl bg-white/[0.03] border border-white/10 p-4 text-left hover:bg-white/[0.05] transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-300">
              <i className="fa-solid fa-gear mr-2 text-cyan-400"></i>
              Canonical Relay Configuration
            </span>
            <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${expanded === "config" ? "rotate-180" : ""}`}></i>
          </div>
        </button>
        {expanded === "config" && (
          <div className="mt-2 rounded-xl bg-black/30 border border-white/5 p-4">
            <pre className="text-xs text-gray-300 font-mono leading-relaxed">
{`Configuration owners:
  brew/runtime/core/runtime-defaults.mjs
  brew/agent/orchestrator-server.mjs

Default relay endpoint: 127.0.0.1:9333

Override families:
  BREW_BROWSER_RELAY_*
  BROWSER_RELAY_*
  BREW_RELAY_*

Canonical startup:
  package.json start/dev -> node brew/agent/orchestrator-server.mjs
  brew/agent/orchestrator-server.mjs = canonical process/lifecycle owner
  browser relay lifecycle owned by orchestrator + brew/runtime/browser-relay/server.mjs
  bin/brew.cjs = thin CLI launcher -> brew/cli/main.mjs`}
            </pre>
          </div>
        )}
      </div>

      {/* Next bounded gate */}
      <div className="rounded-2xl bg-blue-500/5 border border-blue-500/20 p-6 mb-8">
        <h3 className="font-bold text-blue-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-arrow-right"></i>
          Next Bounded Gate
        </h3>
        <p className="text-sm text-gray-400 mb-3">
          Use the existing documented Brew runtime startup path so the orchestrator owns relay startup. Then prove:
        </p>
        <ol className="space-y-2">
          {nextGates.map((gate, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] text-blue-400 font-bold shrink-0">
                {i + 1}
              </span>
              {gate}
            </li>
          ))}
        </ol>
        <p className="text-xs text-gray-500 mt-4 italic">
          If orchestrator startup does not produce the relay, classify the startup/lifecycle defect at the existing owner before modifying source.
        </p>
      </div>

      {/* Do not */}
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6">
        <h3 className="font-bold text-red-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-ban"></i>
          Do Not
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {doNotActions.map((action, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-red-400 mt-0.5 shrink-0">✗</span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prioritized sequence */}
      <div className="mt-8 rounded-xl bg-white/[0.02] border border-white/10 p-6">
        <h3 className="font-bold text-gray-200 mb-4 text-sm uppercase tracking-wider">
          Prioritized Implementation Sequence
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
            <h4 className="text-sm font-bold text-red-300 mb-2">P0 — Correctness & Authority</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Rerun Telegram ordinary-language acceptance against current build</li>
              <li>• Prove exactly-one visible completion per Telegram input</li>
              <li>• Prove real tool receipt → provider continuation → grounded Telegram result</li>
              <li>• Prove explicit cross-project comparison keeps both provenance labels</li>
              <li>• Preserve governed-memory exclusions and verification-authority falsifiers</li>
            </ul>
          </div>
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
            <h4 className="text-sm font-bold text-amber-300 mb-2">P1 — Architectural Convergence</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• Establish one durable Session/Turn/Item owner if current runtime lacks one</li>
              <li>• Reconcile operation/tool-call identity with that owner</li>
              <li>• Normalize runtime event vocabulary where an actual gap is proven</li>
              <li>• Prove provider-native continuation, cancellation, restart, resume, exactly-once</li>
            </ul>
          </div>
          <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-4">
            <h4 className="text-sm font-bold text-blue-300 mb-2">P2 — Recovered Planned Capabilities</h4>
            <ul className="space-y-1 text-xs text-gray-400">
              <li>• MCP/plugin lifecycle</li>
              <li>• Deeper browser/desktop capabilities</li>
              <li>• Project knowledge lifecycle expansion</li>
              <li>• Skill/context expansion</li>
              <li>• Git/workspace typed capabilities</li>
              <li>• Installed-runtime acceptance and CI/release proof</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
