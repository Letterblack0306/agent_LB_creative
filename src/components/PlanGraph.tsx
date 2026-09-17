import { useState } from "react";

interface PlanNode {
  id: string;
  lane: string;
  title: string;
  status: string;
  summary: string;
  priority?: string;
}

const nodes: PlanNode[] = [
  {
    id: "architecture",
    lane: "Authority",
    title: "One reasoning agent and one canonical runtime",
    status: "proven",
    summary: "Semantic reasoning remains model-owned; runtime owns identity, policy, execution, state, evidence, validation and recovery.",
  },
  {
    id: "canonical-query",
    lane: "Authority",
    title: "Canonical conversational turn path",
    status: "proven",
    summary: "Supported HTTP chat aliases converge toward the canonical query/runTurn path; this remains the response authority to preserve.",
  },
  {
    id: "drift-recovery-reference-reuse",
    lane: "Active Gate",
    title: "Recover drift and converge on upstream-proven contracts",
    status: "current",
    priority: "P0",
    summary: "Remove reachable secondary semantic authorities and weaker success/failure contracts. Reuse/adapt Hermes, Cline, Codex, OpenHands and LobeHub patterns instead of recreating agent infrastructure.",
  },
  {
    id: "provider-result-invariant",
    lane: "P0 Correctness",
    title: "One model-turn success invariant",
    status: "warning",
    priority: "P0",
    summary: "Every active adapter must reject empty assistant output when there is no model tool activity and must preserve provider/runtime failures without fabricating assistant text.",
  },
  {
    id: "telegram-transport-only",
    lane: "P0 Correctness",
    title: "Telegram is transport, not a second agent",
    status: "warning",
    priority: "P0",
    summary: "Ordinary natural-language Telegram input must reach the canonical turn exactly once; only explicit runtime/transport commands remain deterministic.",
  },
  {
    id: "legacy-response-quarantine",
    lane: "P0 Correctness",
    title: "Quarantine duplicate response authorities",
    status: "next",
    priority: "P0",
    summary: "Prove consumers before retaining main-agent/direct-response, response-decision, brew-chat-agent, scenario-router and other stale semantic surfaces.",
  },
  {
    id: "session-turn-item",
    lane: "P1 Runtime",
    title: "Canonical Session / Turn / Item lifecycle",
    status: "next",
    priority: "P1",
    summary: "Adopt Codex/OpenHands-style lifecycle separation without creating a second persistence authority.",
  },
  {
    id: "capability-registry",
    lane: "P1 Runtime",
    title: "Canonical capability registry and health",
    status: "next",
    priority: "P1",
    summary: "Extend existing Brew capability ownership using Hermes/LobeHub registry patterns; configured is not equivalent to ready.",
  },
  {
    id: "provider-continuation",
    lane: "P1 Runtime",
    title: "Provider-native tool continuation",
    status: "next",
    priority: "P1",
    summary: "Prove model call -> governed tool -> evidence -> provider continuation -> final non-empty response.",
  },
  {
    id: "recovery",
    lane: "P1 Runtime",
    title: "Cancellation / restart / resume / exactly-once",
    status: "next",
    priority: "P1",
    summary: "Use explicit identity and runtime events; do not infer recovery or completion from loop termination.",
  },
  {
    id: "deferred-capabilities",
    lane: "P2 Recovered Features",
    title: "MCP, skills, scheduler, browser/desktop and knowledge expansion",
    status: "blocked",
    priority: "P2",
    summary: "Recover planned capabilities after canonical response/lifecycle authority is stable; adapt upstream patterns rather than adding parallel managers.",
  },
  {
    id: "ci-release",
    lane: "Release",
    title: "Installed runtime + current-head CI acceptance",
    status: "blocked",
    priority: "LOCKED",
    summary: "No release claim until installed runtime, live acceptance and current-head CI are proven.",
  },
];

const statusColors: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  proven: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", dot: "bg-green-400" },
  current: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", dot: "bg-purple-400" },
  warning: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", dot: "bg-amber-400" },
  next: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", dot: "bg-blue-400" },
  blocked: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", dot: "bg-red-400" },
};

export default function PlanGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>("drift-recovery-reference-reuse");

  const lanes = ["Authority", "Active Gate", "P0 Correctness", "P1 Runtime", "P2 Recovered Features", "Release"];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Plan Graph
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          From <code className="text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded text-sm">plan.json</code> — 
          12 nodes across 6 lanes showing the Brew drift recovery path from proven architecture to release.
        </p>
      </div>

      {/* Flow sequence */}
      <div className="mb-12 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max px-4">
          {nodes.map((node, i) => {
            const colors = statusColors[node.status];
            const isSelected = selectedNode === node.id;
            return (
              <div key={node.id} className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${
                    isSelected
                      ? `${colors.bg} ${colors.border} ${colors.text} scale-105`
                      : "bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full ${colors.dot} mr-2`}></span>
                  {node.title.length > 30 ? node.title.slice(0, 30) + "…" : node.title}
                </button>
                {i < nodes.length - 1 && (
                  <i className="fa-solid fa-chevron-right text-gray-700 text-xs"></i>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected node detail */}
      {selectedNode && (() => {
        const node = nodes.find(n => n.id === selectedNode)!;
        const colors = statusColors[node.status];
        return (
          <div className={`rounded-2xl ${colors.bg} border ${colors.border} p-6 mb-12`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-3 h-3 rounded-full ${colors.dot}`}></span>
              <h3 className={`font-bold text-lg ${colors.text}`}>{node.title}</h3>
              {node.priority && (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-gray-400 text-xs font-mono">
                  {node.priority}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
              <span>Lane: <span className="text-gray-300">{node.lane}</span></span>
              <span>Status: <span className={colors.text}>{node.status.toUpperCase()}</span></span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{node.summary}</p>
          </div>
        );
      })()}

      {/* Lane grid */}
      <div className="space-y-6">
        {lanes.map((lane) => {
          const laneNodes = nodes.filter(n => n.lane === lane);
          if (laneNodes.length === 0) return null;
          return (
            <div key={lane}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-gray-700"></span>
                {lane}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {laneNodes.map((node) => {
                  const colors = statusColors[node.status];
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className={`text-left rounded-xl p-4 border transition-all ${
                        selectedNode === node.id
                          ? `${colors.bg} ${colors.border}`
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                        <span className={`text-xs font-mono ${colors.text}`}>{node.status}</span>
                        {node.priority && (
                          <span className="text-[10px] text-gray-600 font-mono">{node.priority}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-200 font-medium">{node.title}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
