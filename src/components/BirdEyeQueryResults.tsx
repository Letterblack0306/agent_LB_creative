import { useState } from "react";
import { brewPlanMeta, planningSources, primaryPlan, provenFoundations } from "../data/brewPlanning";

const legacyMapping = [
  { old: "Phase 0 Repository hygiene", now: "Baseline prerequisite", disposition: "Do not use as active sequencing authority; verify local worktree separately from GitHub source." },
  { old: "Phase 1 Runtime authority", now: "Proven foundation + B1/B2", disposition: "One-agent authority is established; remaining work is identity and workspace propagation proof." },
  { old: "Phase 2 Provider platform", now: "Open provider gap + B1/B3", disposition: "Provider expansion continues only through the common provider/runtime identity and evidence contract." },
  { old: "Phase 3 Operation lifecycle/recovery", now: "B1 + B3 + B4", disposition: "Decomposed into identity, evidence ownership and restart/exactly-once continuation." },
  { old: "Phase 4 UI/CLI contracts", now: "B6 + release acceptance", disposition: "UI/CLI proof is external-completion evidence, not a separate reasoning authority." },
  { old: "Phase 5 Browser/repository E2E", now: "B6", disposition: "Current browser blocker is target/composer availability, not relay/CDP or autonomy." },
  { old: "Phase 6 Installed runtime", now: "Open installed-runtime gap", disposition: "Requires exact source/deploy/runtime identity plus restart rediscovery." },
  { old: "Phase 7 Documentation/branch closure", now: "Documentation authority gap", disposition: "Historical plans must be marked historical and this specific plan becomes the dashboard projection." },
];

export default function BirdEyeQueryResults() {
  const [tab, setTab] = useState<"plan" | "sources" | "mapping" | "rules">("plan");

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
