import { useState } from "react";

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  color: string;
  description: string;
  reference?: string;
}

const flowNodes: FlowNode[] = [
  {
    id: "user",
    label: "USER INPUT",
    icon: "fa-user",
    color: "from-blue-500 to-blue-600",
    description: "Natural language input from any channel — CLI, browser, Telegram, desktop, API.",
  },
  {
    id: "ingress",
    label: "Normalized Ingress",
    sublabel: "Capture complete turn",
    icon: "fa-download",
    color: "from-indigo-500 to-indigo-600",
    description: "Capture the complete user turn. Preserve original natural language unchanged.",
  },
  {
    id: "identity",
    label: "Identity & Provenance",
    sublabel: "Source / Session / Workspace",
    icon: "fa-fingerprint",
    color: "from-violet-500 to-violet-600",
    description: "Verify: source, conversation, session, workspace, provenance, transport identity. Deterministic infrastructure owns identity.",
  },
  {
    id: "context",
    label: "Bounded Context",
    sublabel: "Memory + Repo Map + Skills",
    icon: "fa-brain",
    color: "from-purple-500 to-purple-600",
    description: "Attach bounded relevant context: memory/history (Hermes), repo map/context (Aider), skills/tools (Hermes).",
    reference: "Hermes + Aider",
  },
  {
    id: "model",
    label: "Primary Brew Model",
    sublabel: "MODEL interprets meaning",
    icon: "fa-microchip",
    color: "from-fuchsia-500 to-fuchsia-600",
    description: "The reasoning agent receives original natural language. Model determines: answer? ask? inspect? use tool? continue previous objective?",
  },
  {
    id: "policy",
    label: "Policy / Approval",
    sublabel: "Permission gate",
    icon: "fa-shield-halved",
    color: "from-cyan-500 to-cyan-600",
    description: "Model proposes action → policy authorizes → approval if needed. Separates proposal, permission, execution, and success.",
    reference: "Codex + OpenHands",
  },
  {
    id: "runtime",
    label: "Brew Tool Runtime",
    sublabel: "Execution",
    icon: "fa-gears",
    color: "from-teal-500 to-teal-600",
    description: "Runtime executes the approved action. Typed actions with explicit lifecycle state.",
    reference: "OpenHands",
  },
  {
    id: "evidence",
    label: "Observation / Evidence",
    sublabel: "Durable truth",
    icon: "fa-file-circle-check",
    color: "from-emerald-500 to-emerald-600",
    description: "Observation/evidence returns. Durable truth belongs in explicit event/conversation state, not invisible controller variables.",
    reference: "OpenHands",
  },
  {
    id: "response",
    label: "Final Response",
    icon: "fa-comment-dots",
    color: "from-green-500 to-green-600",
    description: "Model responds or continues reasoning. The semantic result is the model's output — not rewritten by channel adapters.",
  },
  {
    id: "channel",
    label: "Channel Adapter",
    sublabel: "Transport only",
    icon: "fa-paper-plane",
    color: "from-lime-500 to-lime-600",
    description: "Browser relay, Telegram gateway, or CLI formatter transports the result. Does NOT rewrite semantics.",
    reference: "Hermes",
  },
];

export default function ArchitectureFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Architecture Flow
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The target architecture: agents reason, bridges transport. Natural language reaches the
          model unchanged. Deterministic infrastructure owns identity, execution, and safety.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-emerald-500/50 -translate-x-1/2"></div>

        <div className="space-y-4">
          {flowNodes.map((node, index) => (
            <div
              key={node.id}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Node card */}
              <div
                className={`w-[calc(50%-2rem)] cursor-pointer transition-all duration-300 ${
                  activeNode === node.id ? "scale-105" : "hover:scale-[1.02]"
                }`}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              >
                <div
                  className={`rounded-xl p-4 border transition-all duration-300 ${
                    activeNode === node.id
                      ? "bg-white/10 border-white/20 shadow-lg"
                      : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center shrink-0`}
                    >
                      <i className={`fa-solid ${node.icon} text-white text-xs`}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">{node.label}</h4>
                      {node.sublabel && (
                        <p className="text-xs text-gray-500">{node.sublabel}</p>
                      )}
                    </div>
                    {node.reference && (
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-medium">
                        {node.reference}
                      </span>
                    )}
                  </div>

                  {activeNode === node.id && (
                    <p className="text-xs text-gray-400 leading-relaxed mt-2 pt-2 border-t border-white/5">
                      {node.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 border-2 border-[#0a0e1a] z-10"></div>

              {/* Spacer for other side */}
              <div className="w-[calc(50%-2rem)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Principle */}
      <div className="mt-16 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-lightbulb text-purple-400"></i>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Core Principle</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-purple-300 font-medium">Agents reason; bridges transport.</span>{" "}
                The transport layer should detect a new transport event, verify mechanical facts
                (source, target, conversation/session/workspace identity), and pass the original
                user message and relevant context to the reasoning agent. It should{" "}
                <span className="text-red-300">not</span> decide semantically what the user means.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-red-500/10 text-red-300 text-xs border border-red-500/20">
                  ✗ No keyword detector
                </span>
                <span className="px-2 py-1 rounded bg-red-500/10 text-red-300 text-xs border border-red-500/20">
                  ✗ No intent classifier
                </span>
                <span className="px-2 py-1 rounded bg-red-500/10 text-red-300 text-xs border border-red-500/20">
                  ✗ No scenario router
                </span>
                <span className="px-2 py-1 rounded bg-green-500/10 text-green-300 text-xs border border-green-500/20">
                  ✓ Model interprets meaning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
