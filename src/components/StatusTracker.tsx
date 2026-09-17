import { useState } from "react";

interface StatusItem {
  id: string;
  category: string;
  description: string;
  status: "done" | "partial" | "pending";
  details: string;
}

const statusItems: StatusItem[] = [
  {
    id: "source-cleanup",
    category: "Source Cleanup",
    description: "Core source cleanup/classification",
    status: "done",
    details: "Largely closed. Source files have been reviewed and classified.",
  },
  {
    id: "gpt-knowledge",
    category: "GPT-Knowledge",
    description: "Agent reference set verification",
    status: "done",
    details: "Confirmed: Aider, Codex, Hermes, LobeHub, OpenHands references checked at agent-reference level. Each assigned a subsystem role.",
  },
  {
    id: "drive-index",
    category: "Google Drive",
    description: "Drive export structure & shared-conversation index",
    status: "done",
    details: "Export manifest confirmed. Historical data split into multiple conversation archives. Shared index contains: Agent Memory Behavior, Workspace Usability Issues, LetterBlack Governance Architecture, LBE Agent Bridge Spec, Brew workspace analysis, Browser Access Tool Strength.",
  },
  {
    id: "drive-bodies",
    category: "Google Drive",
    description: "Full message body extraction from Drive conversations",
    status: "pending",
    details: "Index/history level confirmed, but full message bodies of every relevant conversation have NOT yet been retrieved. This is the remaining memory-evidence pass.",
  },
  {
    id: "project-memory",
    category: "Project Memory",
    description: "Established Brew decisions recovered",
    status: "done",
    details: "Canonical runTurn(), workspace identity, execution journals, evidence binding, checkpoint/recovery, and model-vs-runtime authority boundary all confirmed in project memory.",
  },
  {
    id: "memory-rule",
    category: "Architecture Rule",
    description: "Memory is not evidence",
    status: "done",
    details: "GPT-K explicitly reinforces: current source/runtime truth wins when memory and source disagree. Memory is useful for recovering intent but not authoritative.",
  },
  {
    id: "diagnostic-artifacts",
    category: "Artifacts",
    description: "Untracked diagnostic/report artifacts classification",
    status: "pending",
    details: "Need explicit keep/archive/delete classification for untracked diagnostic and report artifacts outside the core source cleanup.",
  },
  {
    id: "chatgpt-posting",
    category: "Live Integration",
    description: "Live ChatGPT posting to target composer",
    status: "partial",
    details: "PARTIAL — target composer was unavailable during verification. This is a verification gap, not a source-cleanup defect. Needs retry when composer is accessible.",
  },
  {
    id: "input-model",
    category: "Architecture",
    description: "Input detection model (no intent router)",
    status: "done",
    details: "Decision confirmed: natural-language prose reaches reasoning agent unchanged. No special wrappers, OBJECTIVE: prefixes, regex command detection, keyword intent gates, or semantic parsers before the model.",
  },
  {
    id: "output-model",
    category: "Architecture",
    description: "Output model (channel adapter transports only)",
    status: "done",
    details: "Decision confirmed: model response ≠ tool request ≠ approval ≠ execution ≠ validation ≠ completion. Channel adapters transport, not rewrite.",
  },
  {
    id: "authority-boundary",
    category: "Architecture",
    description: "Model-vs-runtime authority boundary",
    status: "done",
    details: "Decision confirmed: deterministic infrastructure owns identity, transport, execution, integrity, evidence, safety. Semantic interpretation, planning, tool strategy stay with reasoning agent.",
  },
];

const statusConfig = {
  done: { label: "DONE", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", icon: "fa-circle-check" },
  partial: { label: "PARTIAL", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "fa-circle-half-stroke" },
  pending: { label: "PENDING", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", icon: "fa-clock" },
};

export default function StatusTracker() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "done" | "partial" | "pending">("all");

  const filtered = filter === "all" ? statusItems : statusItems.filter((item) => item.status === filter);

  const counts = {
    done: statusItems.filter((i) => i.status === "done").length,
    partial: statusItems.filter((i) => i.status === "partial").length,
    pending: statusItems.filter((i) => i.status === "pending").length,
  };

  const progressPercent = Math.round((counts.done / statusItems.length) * 100);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Project Status
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Current verification state of the Brew agent system cleanup and audit.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{counts.done}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">{counts.partial}</div>
          <div className="text-sm text-gray-400">Partial</div>
        </div>
        <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 text-center">
          <div className="text-3xl font-bold text-red-400">{counts.pending}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Overall Progress</span>
          <span className="text-sm font-mono text-purple-300">{progressPercent}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["all", "done", "partial", "pending"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
            }`}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== "all" && (
              <span className="ml-1.5 opacity-60">
                ({f === "done" ? counts.done : f === "partial" ? counts.partial : counts.pending})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Status items */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const config = statusConfig[item.status];
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-xl border ${config.border} ${config.bg} overflow-hidden transition-all duration-200`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <i className={`fa-solid ${config.icon} ${config.color} text-lg`}></i>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${config.bg} ${config.color} border ${config.border}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200 mt-0.5">{item.description}</p>
                </div>
                <i className={`fa-solid fa-chevron-down text-gray-600 text-xs transition-transform ${
                  isExpanded ? "rotate-180" : ""
                }`}></i>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="pl-8 border-l-2 border-white/5 ml-2">
                    <p className="text-sm text-gray-400 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Remaining work note */}
      <div className="mt-8 rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-triangle-exclamation text-amber-400 mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-amber-300 text-sm mb-1">Remaining Work</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Two items remain before declaring the entire Brew cleanup/audit corpus fully closed:
            </p>
            <ol className="mt-2 space-y-1.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono text-xs mt-0.5">1.</span>
                <span>Untracked diagnostic/report artifacts need explicit keep/archive/delete classification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-mono text-xs mt-0.5">2.</span>
                <span>Historical conversation body extraction from Drive (memory-evidence pass) — index confirmed, bodies not yet mined.</span>
              </li>
            </ol>
            <p className="mt-3 text-xs text-gray-500">
              Live ChatGPT posting is PARTIAL due to target composer unavailability — a verification gap, not a source-cleanup defect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
