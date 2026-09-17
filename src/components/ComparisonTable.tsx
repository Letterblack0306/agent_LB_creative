const agents = [
  {
    name: "Aider",
    color: "purple",
    role: "Repository Cognition",
    lesson: "Build/select a structural repo map first; progressively inspect only relevant files; protect pre-existing user changes",
    icon: "fa-map",
    details: [
      "Builds structural repository map",
      "Ranks task-relevant structure",
      "Fits to context budget",
      "Model decides which files need deeper inspection",
      "Protects pre-existing dirty work",
      "Distinguishes: mapped → inspected → editable → changed → validated",
    ],
  },
  {
    name: "Codex",
    color: "cyan",
    role: "Execution & Policy",
    lesson: "Model proposes; policy authorizes; runtime executes; observation returns; validation is separate",
    icon: "fa-shield-halved",
    details: [
      "User instruction → thread/turn",
      "Model decision → typed action",
      "Policy + sandbox gate",
      "Approval if needed",
      "Execution → observation",
      "Separates proposal, permission, execution, and success",
    ],
  },
  {
    name: "Hermes",
    color: "emerald",
    role: "Persistent Loop & Memory",
    lesson: "One persistent agent runtime, bounded memory, progressive skills, context discovery, multiple transports",
    icon: "fa-rotate",
    details: [
      "Separates tools, skills, memory, context, plugins",
      "Progressive skill loading",
      "Bounded purpose-specific memory",
      "Discovers project instruction files",
      "Supports checkpoints",
      "One agent → CLI / messaging / desktop / API surfaces",
    ],
  },
  {
    name: "LobeHub",
    color: "amber",
    role: "Provider Registry",
    lesson: "Provider/model registry and capability/readiness are distinct",
    icon: "fa-server",
    details: [
      "Provider/model registry",
      "Capability vs readiness distinction",
      "Knowledge integration",
      "Multi-provider support",
      "Plugin architecture",
      "Model selection abstraction",
    ],
  },
  {
    name: "OpenHands",
    color: "rose",
    role: "Event-Driven SWE Runtime",
    lesson: "Typed actions/observations, explicit lifecycle state, event history, workspace isolation",
    icon: "fa-gears",
    details: [
      "Event history → context check → LLM",
      "Parse response → message or action event",
      "Security/confirmation gate",
      "Tool execution → observation",
      "History → next reasoning step",
      "Durable truth in explicit event/conversation state",
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", badge: "bg-amber-500/20" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", badge: "bg-rose-500/20" },
};

export default function ComparisonTable() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Reference Agent Map
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          GPT-Knowledge assigns each reference agent a specific subsystem role for Brew,
          rather than treating one upstream agent as the template.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const colors = colorMap[agent.color];
          return (
            <div
              key={agent.name}
              className={`rounded-2xl ${colors.bg} border ${colors.border} p-6 hover:scale-[1.02] transition-transform duration-200`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg ${colors.badge} flex items-center justify-center`}>
                  <i className={`fa-solid ${agent.icon} ${colors.text}`}></i>
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${colors.text}`}>{agent.name}</h3>
                  <p className="text-gray-500 text-xs">{agent.role}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                <span className="text-gray-500 font-medium">Brew lesson:</span> {agent.lesson}
              </p>

              <ul className="space-y-1.5">
                {agent.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className={`${colors.text} mt-0.5`}>•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
