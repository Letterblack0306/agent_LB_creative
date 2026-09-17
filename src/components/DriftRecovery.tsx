import { useState } from "react";

const legacySurfaces = [
  { path: "brew/behavior/response-decision-layer.mjs", classification: "ORPHANED_HARDCODED_RESPONDER", treatment: "Prove no supported consumer, then quarantine/remove. Do not reconnect." },
  { path: "brew/runtime/chat/brew-chat-agent.mjs", classification: "ORPHANED_KEYWORD_RESPONDER", treatment: "Prove no supported consumer, then quarantine/remove." },
  { path: "brew/runtime/agents/scenario-router.mjs", classification: "REMOVED", treatment: "Do not recreate." },
  { path: "brew/runtime/agents/dispatch-handlers.mjs", classification: "LEGACY_DIRECT_HANDLER_SURFACE", treatment: "Keep disabled/unreachable unless explicit supported consumer is proven." },
  { path: "subagent-engine.mjs / team-coordinator.mjs", classification: "LEGACY / fail-closed-or-absent", treatment: "Do not revive multi-agent authority." },
];

const doNotRecreate = [
  "Channel-specific natural-language agents",
  "Provider-specific conversational routers",
  "Custom empty-response conventions",
  "A second Session/Turn/Item system",
  "Another planner/controller outside the canonical turn",
  "Another tool registry if the canonical capability registry can be extended",
  "Another memory store/retrieval authority when the governed memory owners can be hardened",
  "Another messaging gateway core",
  "A new skills format when AgentSkills/Codex/Hermes-compatible progressive disclosure is sufficient",
  "A new generic provider abstraction where Cline/LobeHub patterns can be adapted",
  "Revived multi-agent/subagent/team orchestration without a newly proven requirement",
  "Status prose that substitutes for typed runtime state",
  "Completion based on loop termination or successful HTTP status alone",
];

const architecture = `UI / CLI / Telegram / WhatsApp / API
        |
        v
channel / transport adapter
        |
        v
canonical ingress
        |
        v
Session -> Turn -> ordered runtime items/events
        |
        v
provider/model reasoning
        |
        +--> assistant message
        |
        +--> governed tool request
                  |
                  v
          policy / approval / capability
                  |
                  v
             execution
                  |
                  v
           evidence/observation
                  |
                  +----> provider continuation
        |
        v
normalized final result
        |
        v
channel-specific renderer`;

export default function DriftRecovery() {
  const [showArch, setShowArch] = useState(false);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Drift Recovery
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Brew does not primarily need another end-to-end agent framework. Its canonical architecture already
          converges toward one persistent reasoning agent. The continuing drift is concentrated in secondary/legacy
          surfaces that retained their own response, routing, provider, or lifecycle semantics.
        </p>
      </div>

      {/* Dominant anti-pattern */}
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6 mb-8">
        <h3 className="font-bold text-red-300 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Dominant Anti-Pattern
        </h3>
        <pre className="bg-black/30 rounded-xl p-4 text-sm text-gray-300 font-mono leading-relaxed">
{`canonical runtime has the correct invariant
+
secondary adapter reimplements a weaker version
=
split authority and false-success drift`}
        </pre>
      </div>

      {/* End-state goal */}
      <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-6 mb-8">
        <h3 className="font-bold text-green-300 mb-3 flex items-center gap-2">
          <i className="fa-solid fa-bullseye"></i>
          Brew End-State Goal
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-green-300 font-medium">One persistent Brew agent</span> receives the user request,
          reasons dynamically through the active provider, sees truthful capabilities, chooses tools when useful,
          executes through runtime policy, continues from real evidence, and returns the result. Features are
          capabilities available to Brew — <span className="text-red-300">never separate personalities, routers,
          supervisors, keyword workflows, or decision-makers</span>. Roadmaps are candidate lists; live one-agent
          behavior is the authority.
        </p>
      </div>

      {/* Architecture toggle */}
      <button
        onClick={() => setShowArch(!showArch)}
        className="w-full rounded-xl bg-white/[0.03] border border-white/10 p-4 text-left hover:bg-white/[0.05] transition-all mb-8"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            <i className="fa-solid fa-code-branch mr-2 text-purple-400"></i>
            Recovered Intended Architecture
          </span>
          <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${showArch ? "rotate-180" : ""}`}></i>
        </div>
      </button>
      {showArch && (
        <pre className="bg-black/30 rounded-xl p-4 text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto mb-8 border border-white/5">
          {architecture}
        </pre>
      )}

      {/* Legacy surfaces */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-ghost text-gray-500"></i>
          Legacy / Stale Surfaces
        </h3>
        <div className="space-y-3">
          {legacySurfaces.map((surface, i) => (
            <div key={i} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <code className="text-xs text-gray-300 bg-white/5 px-2 py-0.5 rounded font-mono">
                  {surface.path}
                </code>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-mono">
                  {surface.classification}
                </span>
              </div>
              <p className="text-xs text-gray-400">{surface.treatment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Do not recreate */}
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6">
        <h3 className="font-bold text-red-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-ban"></i>
          Do Not Recreate
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {doNotRecreate.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-red-400 mt-0.5 shrink-0">✗</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
