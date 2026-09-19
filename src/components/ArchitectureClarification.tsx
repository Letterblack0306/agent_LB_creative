import { brewPlanMeta } from "../data/brewPlanning";

export default function ArchitectureClarification() {
  const { architectureDecision, featurePreservationRule } = brewPlanMeta;

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Architecture Decision Clarification
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Correcting the interpretation: Cline AgentRuntime integration was already decided. 
          LM Studio was a test vehicle. Current implementation diverged from the approved plan.
        </p>
      </div>

      {/* Architecture Decision Status */}
      <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-6 mb-8">
        <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-circle-check"></i>
          Pre-Existing Architecture Decisions
        </h3>
        <div className="space-y-3">
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-200">Cline AgentRuntime Integration</span>
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/30 font-mono">
                {architectureDecision.clineAgentRuntime}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Decision made in boundary matrix: Reuse Cline AgentRuntime for professional model/tool continuation loop behind LBE governance.
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-200">Cline Core Reuse Boundary</span>
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/30 font-mono">
                {architectureDecision.clineCoreReuseBoundary}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Cline mechanics already audited: iterative provider calls, tool-call parsing, execution/result insertion, continuation, pre-execution hooks, events, cancellation, compaction, MCP contribution.
            </p>
          </div>

          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-200">LBE Authority Boundary</span>
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/30 font-mono">
                {architectureDecision.lbeAuthorityBoundary}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              LBE is the authority for sessions, authorization, receipts/evidence, validation and completion. Cline-native file mutation and raw shell execution rejected as canonical paths.
            </p>
          </div>
        </div>
      </div>

      {/* Current Implementation Status */}
      <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Current Implementation Status
        </h3>
        <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-200">ACT/Coding Implementation</span>
            <span className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
              {architectureDecision.currentImplementation}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Current ACT/coding uses GovernedProviderReasoningController → raw OpenAI-compatible loop instead of Cline AgentRuntime.
          </p>
          <div className="text-xs text-gray-500">
            <strong className="text-gray-400">Correct interpretation:</strong> This is an implementation divergence from the already-approved architecture, not a new design decision.
          </div>
        </div>

        <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-200">Required Work</span>
            <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono">
              RECONNECTION
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {architectureDecision.requiredWork}
          </p>
          <div className="mt-3 text-xs text-gray-500">
            <strong className="text-gray-400">No new architecture decision needed.</strong> The decision was already made. The work is to restore the approved integration path.
          </div>
        </div>
      </div>

      {/* LM Studio Clarification */}
      <div className="rounded-2xl bg-purple-500/5 border border-purple-500/20 p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-flask"></i>
          LM Studio Test Clarification
        </h3>
        <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
          <p className="text-sm text-gray-300 mb-3">
            The LM Studio run was a <strong className="text-purple-300">behavior/integration test</strong>, not the architectural decision for the final reasoning engine.
          </p>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-check text-green-400 mt-0.5"></i>
              <span>LM Studio endpoint/model worked</span>
            </div>
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-check text-green-400 mt-0.5"></i>
              <span>Provider could propose a tool</span>
            </div>
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-check text-green-400 mt-0.5"></i>
              <span>LBE executed the governed tool</span>
            </div>
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-check text-green-400 mt-0.5"></i>
              <span>Receipt/evidence returned</span>
            </div>
            <div className="flex items-start gap-2">
              <i className="fa-solid fa-check text-green-400 mt-0.5"></i>
              <span>Provider continued</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-white/5 text-xs text-gray-500">
            <strong className="text-amber-400">However:</strong> It does not prove the planned Cline execution architecture, because the test happened to exercise the later OpenAI-compatible implementation path.
          </div>
        </div>
      </div>

      {/* Cline Integration Flow */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-diagram-project text-cyan-400"></i>
          Approved Cline Integration Flow
        </h3>
        <div className="rounded-xl bg-black/30 border border-white/5 p-4 font-mono text-xs text-gray-300 overflow-x-auto">
          <pre>{`Cline AgentRuntime mechanics
        ↓
LBE-owned adapter
        ↓
existing LBE authorization / governed dispatcher
        ↓
LBE workspace/process/tool owners
        ↓
governed tool result
        ↓
Cline continuation loop`}</pre>
        </div>
        <div className="mt-4 text-xs text-gray-400">
          <strong className="text-gray-300">Missing dependency:</strong> LBE-to-Cline AgentRuntime governance adapter
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <strong className="text-gray-400">Classification:</strong> ADAPT (not "decide whether to use Cline")
        </div>
      </div>

      {/* Feature Preservation Rule */}
      <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-6">
        <h3 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          Feature Preservation Rule
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          A feature being outside the current plan/slice does <strong className="text-emerald-300">not</strong> make it obsolete, invalid, or disposable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(featurePreservationRule).map(([key, value]) => {
            const labels: Record<string, string> = {
              workingProven: "Working + Proven",
              implementedDisconnected: "Implemented + Disconnected",
              partialInProgress: "Partial / In-Progress",
              plannedAccepted: "Planned / Accepted",
              historicalReference: "Historical Reference",
              explicitlySuperseded: "Explicitly Superseded",
            };
            return (
              <div key={key} className="rounded-xl bg-white/[0.02] border border-white/10 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-200">{labels[key]}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                    {value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
          <p className="text-xs text-amber-300">
            <i className="fa-solid fa-lightbulb mr-1"></i>
            <strong>Correct interpretation:</strong> "Not in current plan" → preserve → check existing owner/history → verify whether it still belongs to the product → reconnect/finish if required.
          </p>
        </div>
      </div>
    </div>
  );
}
