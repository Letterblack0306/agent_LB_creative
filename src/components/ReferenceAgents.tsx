import { useState } from "react";

interface AgentDetail {
  name: string;
  color: string;
  icon: string;
  description: string;
  architecture: string;
  keyInsights: string[];
  brewApplication: string;
}

const agents: AgentDetail[] = [
  {
    name: "Hermes",
    color: "emerald",
    icon: "fa-rotate",
    description:
      "A particularly useful reference for persistent agents. Separates tools, skills, memory, context and plugins.",
    architecture: `CLI / messaging / desktop / API
        ↓
normalized session ingress
        ↓
same agent runtime
        ↓
normalized response/events
        ↓
channel adapter`,
    keyInsights: [
      "Progressive skill loading",
      "Bounded purpose-specific memory",
      "Discovers project instruction files",
      "Supports checkpoints",
      "One agent → multiple surfaces (CLI, Telegram, browser, desktop)",
      "Channels should not become different 'brains'",
    ],
    brewApplication:
      "Hermes provides the persistence model: one agent runtime exposed through multiple channel adapters. Memory is bounded and purpose-specific, not unbounded conversation history.",
  },
  {
    name: "OpenHands",
    color: "rose",
    icon: "fa-gears",
    description:
      "An event-driven loop with typed actions/observations, explicit lifecycle state, and workspace isolation.",
    architecture: `event history
→ context/confirmation check
→ LLM
→ parse response
→ message or action event
→ security/confirmation
→ tool execution
→ observation
→ history
→ next reasoning step`,
    keyInsights: [
      "Durable truth in explicit event/conversation state",
      "Not in invisible controller variables",
      "Typed actions and observations",
      "Explicit lifecycle state",
      "Event history as source of truth",
      "Workspace isolation",
    ],
    brewApplication:
      "OpenHands reinforces that durable truth belongs in explicit event/conversation state rather than invisible controller variables. The event loop pattern maps directly to Brew's runTurn().",
  },
  {
    name: "Codex",
    color: "cyan",
    icon: "fa-shield-halved",
    description:
      "Explicitly separates proposal, permission, execution and success. Model proposes; policy authorizes; runtime executes.",
    architecture: `user instruction
→ thread / turn
→ model decision
→ typed action
→ policy + sandbox
→ approval if needed
→ execution
→ observation
→ next model step / completion`,
    keyInsights: [
      "Separates proposal, permission, execution, success",
      "Policy + sandbox gate",
      "Approval if needed",
      "Typed actions throughout",
      "Observation returns to model",
      "Validation is separate from execution",
    ],
    brewApplication:
      "Codex's separation of proposal → permission → execution → success is directly relevant to Brew's evidence and approval design. The model decides what to do; policy decides whether it may.",
  },
  {
    name: "Aider",
    color: "purple",
    icon: "fa-map",
    description:
      "The repository-awareness reference. Builds structural repo maps and progressively inspects relevant files.",
    architecture: `build structural repo map
→ rank task-relevant structure
→ fit to context budget
→ model decides inspection depth
→ protect pre-existing changes
→ mapped → inspected → editable
→ changed → validated`,
    keyInsights: [
      "Builds structural repository map first",
      "Ranks task-relevant structure",
      "Fits to context budget",
      "Protects pre-existing dirty work",
      "Distinguishes file states: mapped, inspected, editable, changed, validated",
    ],
    brewApplication:
      "Aider's repo cognition pattern maps to Brew's context assembly: build the map, rank relevance, fit to budget, then let the model decide what needs deeper inspection.",
  },
];

const colorStyles: Record<string, { bg: string; border: string; text: string; badge: string; glow: string }> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20", glow: "shadow-emerald-500/20" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", badge: "bg-rose-500/20", glow: "shadow-rose-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20", glow: "shadow-cyan-500/20" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20", glow: "shadow-purple-500/20" },
};

export default function ReferenceAgents() {
  const [activeAgent, setActiveAgent] = useState<string>("Hermes");
  const current = agents.find((a) => a.name === activeAgent)!;
  const colors = colorStyles[current.color];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Deep Dive: Reference Agents
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Detailed architecture patterns from each reference agent and how they apply to Brew.
        </p>
      </div>

      {/* Agent tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {agents.map((agent) => {
          const cs = colorStyles[agent.color];
          return (
            <button
              key={agent.name}
              onClick={() => setActiveAgent(agent.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeAgent === agent.name
                  ? `${cs.bg} ${cs.border} border ${cs.text}`
                  : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
              }`}
            >
              <i className={`fa-solid ${agent.icon} mr-2`}></i>
              {agent.name}
            </button>
          );
        })}
      </div>

      {/* Agent detail */}
      <div className={`rounded-2xl ${colors.bg} border ${colors.border} p-6 sm:p-8 transition-all duration-300`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Description + Architecture */}
          <div>
            <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
              <i className={`fa-solid ${current.icon} mr-3`}></i>
              {current.name}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{current.description}</p>

            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Architecture Pattern
            </h4>
            <pre className="bg-black/30 rounded-xl p-4 text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto border border-white/5">
              {current.architecture}
            </pre>
          </div>

          {/* Right: Insights + Application */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Key Insights
            </h4>
            <ul className="space-y-2 mb-6">
              {current.keyInsights.map((insight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className={`${colors.text} mt-1`}>▸</span>
                  {insight}
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Application to Brew
            </h4>
            <div className={`rounded-xl p-4 ${colors.badge} border ${colors.border}`}>
              <p className="text-sm text-gray-300 leading-relaxed">{current.brewApplication}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
