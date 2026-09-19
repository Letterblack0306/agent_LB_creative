import { useState } from "react";

interface UpstreamRef {
  name: string;
  repo: string;
  color: string;
  icon: string;
  useFor: string[];
  doNotCopy: string[];
  adoptionBoundary: string;
  brewPath: string;
}

const refs: UpstreamRef[] = [
  {
    name: "Hermes Agent",
    repo: "NousResearch/hermes-agent",
    color: "emerald",
    icon: "fa-rotate",
    useFor: [
      "One agent core across CLI/messaging/TUI/desktop",
      "Platform adapters as edge integrations",
      "Messaging gateway architecture",
      "Skills, memory, MCP/toolset registration patterns",
      "Interruption/stop/retry and persistent-agent ergonomics",
    ],
    doNotCopy: ["Multi-agent/subagent authority that conflicts with Brew's single reasoning-agent decision"],
    adoptionBoundary: `Telegram / WhatsApp adapter
-> normalized ingress
-> canonical Brew turn
-> normalized result
-> renderer`,
    brewPath: "Messaging adapters + persistent memory + skills",
  },
  {
    name: "Cline",
    repo: "cline/cline",
    color: "cyan",
    icon: "fa-terminal",
    useFor: [
      "Provider response normalization",
      "Genuine empty-response retry/failure semantics",
      "Distinction between empty assistant output and tool-call-only turns",
      "Provider/model adapters and capability-aware model handling",
    ],
    doNotCopy: ["Cline internals directly — adapt the invariant, not the implementation"],
    adoptionBoundary: `assistant text empty AND no model tool activity
=> failure / retryable provider outcome
=> never ok:true assistant success

tool call present with empty text
=> valid tool turn`,
    brewPath: "Provider/model adapters + empty response semantics",
  },
  {
    name: "OpenAI Codex",
    repo: "openai/codex",
    color: "purple",
    icon: "fa-shield-halved",
    useFor: [
      "Thread/session/turn/item identity",
      "Model messages separated from runtime/tool/approval events",
      "Typed execution lifecycle",
      "Approval and sandbox policy",
      "Interruption/cancellation",
      "Observable event protocol",
    ],
    doNotCopy: [],
    adoptionBoundary: `agent_message != runtime_status != provider_error
!= tool_result != approval != turn_completed`,
    brewPath: "Session/Turn/Item lifecycle + operation identity + recovery",
  },
  {
    name: "OpenHands",
    repo: "OpenHands/OpenHands",
    color: "rose",
    icon: "fa-gears",
    useFor: [
      "Persistent event history as lifecycle authority",
      "Typed actions and observations",
      "Workspace abstraction",
      "Explicit RUNNING / WAITING / FAILED / FINISHED states",
      "Context/skills separation",
      "Remote execution as transport, not semantic authority",
    ],
    doNotCopy: ["Another opaque planner/controller state machine alongside the canonical Brew turn"],
    adoptionBoundary: `event history -> context check -> LLM
-> parse response -> action event
-> security/confirmation -> execution
-> observation -> history
-> next reasoning step`,
    brewPath: "Canonical reasoning loop + workspace + validation",
  },
  {
    name: "LobeHub",
    repo: "lobehub/lobehub",
    color: "amber",
    icon: "fa-server",
    useFor: [
      "Provider metadata separate from provider runtime behavior",
      "Model registry and capability metadata",
      "Configured vs usable/readiness distinction",
      "Normalized provider errors",
      "MCP/integration lifecycle",
      "Channel/provider independence",
    ],
    doNotCopy: [],
    adoptionBoundary: `configured != reachable != authenticated
!= capable != healthy`,
    brewPath: "Capability registry + health + provider lifecycle",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", badge: "bg-rose-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", badge: "bg-amber-500/20" },
};

export default function UpstreamReuse() {
  const [activeRef, setActiveRef] = useState<string>("Hermes Agent");
  const current = refs.find(r => r.name === activeRef);
  if (!current) return <div className="text-center text-gray-500">Reference not found</div>;
  const colors = colorMap[current.color];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            Upstream Reference Reuse
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Reuse/adapt proven patterns from 5 upstream agent repositories instead of recreating agent infrastructure.
          Each reference maps to specific Brew responsibility areas.
        </p>
      </div>

      {/* Reference tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {refs.map((ref) => {
          const cs = colorMap[ref.color];
          return (
            <button
              key={ref.name}
              onClick={() => setActiveRef(ref.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeRef === ref.name
                  ? `${cs.bg} ${cs.border} border ${cs.text}`
                  : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
              }`}
            >
              <i className={`fa-solid ${ref.icon} mr-2`}></i>
              {ref.name}
            </button>
          );
        })}
      </div>

      {/* Active reference detail */}
      <div className={`rounded-2xl ${colors.bg} border ${colors.border} p-6 sm:p-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg ${colors.badge} flex items-center justify-center`}>
                <i className={`fa-solid ${current.icon} ${colors.text}`}></i>
              </div>
              <div>
                <h3 className={`font-bold text-xl ${colors.text}`}>{current.name}</h3>
                <p className="text-xs text-gray-500 font-mono">{current.repo}</p>
              </div>
            </div>

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Use for:</h4>
            <ul className="space-y-1.5 mb-6">
              {current.useFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className={`${colors.text} mt-0.5`}>▸</span>
                  {item}
                </li>
              ))}
            </ul>

            {current.doNotCopy.length > 0 && (
              <>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Do not copy:</h4>
                <ul className="space-y-1.5">
                  {current.doNotCopy.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-300/70">
                      <span className="text-red-400 mt-0.5">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Adoption Boundary:</h4>
            <pre className="bg-black/30 rounded-xl p-4 text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto border border-white/5 mb-6">
              {current.adoptionBoundary}
            </pre>

            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Brew Responsibility Path:</h4>
            <div className={`rounded-xl p-4 ${colors.badge} border ${colors.border}`}>
              <p className="text-sm text-gray-200">{current.brewPath}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsibility matrix summary */}
      <div className="mt-8 rounded-xl bg-white/[0.02] border border-white/10 p-6">
        <h3 className="font-bold text-gray-200 mb-4 text-sm uppercase tracking-wider">
          Responsibility → Upstream First Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { resp: "Canonical reasoning loop", ref: "OpenHands + Codex", action: "PRESERVE_AND_CONVERGE" },
            { resp: "Provider/model adapters", ref: "Cline + LobeHub", action: "PRESERVE_AND_VALIDATE_LIVE" },
            { resp: "Empty response semantics", ref: "Cline", action: "PRESERVE_INVARIANT" },
            { resp: "Session/Turn/Item", ref: "Codex", action: "TRACE_OWNER_BEFORE_IMPL" },
            { resp: "Tool registry/health", ref: "Hermes + LobeHub", action: "PRESERVE" },
            { resp: "Workspace/files", ref: "Codex/OpenHands", action: "PRESERVE" },
            { resp: "Persistent memory", ref: "Hermes", action: "PRESERVE_GOVERNED" },
            { resp: "Checkpoints/recovery", ref: "Codex/OpenHands/Hermes", action: "ADAPT_EVENT_MODEL" },
            { resp: "Approvals/sandbox", ref: "Codex/OpenHands", action: "PRESERVE_TYPED_POLICY" },
            { resp: "Messaging adapters", ref: "Hermes", action: "VALIDATE_LIVE" },
            { resp: "Multi-agent/subagent", ref: "none needed", action: "DO_NOT_RECREATE" },
            { resp: "Validation/evidence", ref: "Codex/OpenHands", action: "PRESERVE_EVIDENCE" },
          ].map((item, i) => (
            <div key={i} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
              <p className="text-xs text-gray-300 font-medium">{item.resp}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                <span className="text-purple-400">{item.ref}</span>
              </p>
              <p className="text-[10px] text-emerald-400/70 font-mono mt-0.5">{item.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
