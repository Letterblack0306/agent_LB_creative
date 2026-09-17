import { browserAcceptance, brewPlanMeta, provenFoundations } from "../data/brewPlanning";

const reconciledAuthorities = [
  { item: "agent-tool-loop", status: "CANONICAL", detail: "Model receives governed tools, chooses tool calls, receives receipts, continues reasoning and must evidence tool-backed final claims." },
  { item: "agent-loop.mjs", status: "SUPERSEDED", detail: "Historical secondary loop is not the current canonical reasoning authority." },
  { item: "active-read-agent.mjs", status: "SUPERSEDED", detail: "Read/discovery behavior is retained through current operating context, read tools and capability execution rather than a second agent." },
  { item: "provider-planner.mjs", status: "OBSOLETE", detail: "Provider routing remains runtime/provider infrastructure; semantic planning/tool choice stays with the primary reasoning model." },
  { item: "legacy autonomy 5-module set", status: "OBSOLETE", detail: "Historical autonomy-engine/goal-queue/goal-selector/safety-gate/scheduler set was removed; current scheduler/jobs/policy foundations own mechanical execution." },
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
          Current dashboard checkpoint for <code className="text-green-300 bg-green-500/10 px-1.5 py-0.5 rounded">{brewPlanMeta.sourceRepo}@{brewPlanMeta.sourceShort}</code>.
          Source/test/live proof levels remain separate.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">418</div>
          <div className="text-xs text-gray-400">Tests passed</div>
        </div>
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{provenFoundations.length}</div>
          <div className="text-xs text-gray-400">Proven foundations</div>
        </div>
        <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-cyan-400">PASS</div>
          <div className="text-xs text-gray-400">Relay + CDP</div>
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
