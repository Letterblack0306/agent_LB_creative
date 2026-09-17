import { useState } from "react";

interface Gap {
  id: number;
  title: string;
  description: string;
  category: "memory" | "recovery" | "provider" | "browser" | "runtime" | "docs";
  severity: "critical" | "high" | "medium";
}

const gaps: Gap[] = [
  {
    id: 1,
    title: "Automatic governed memory intake",
    description: "Brew has strong storage, curation and retrieval, but the automatic promotion/watch pipeline envisaged in Drive is not yet proven. The curation engine is the right foundation, but the event → memory proposal → validator → duplicate check → sensitivity check → classification → governed commit/reject → audit pipeline is missing.",
    category: "memory",
    severity: "high",
  },
  {
    id: 2,
    title: "End-to-end restart/recovery proof",
    description: "The tool loop has durable checkpoints and receipts, but current authoritative planning still calls for process-loss recovery, cancellation propagation, stale-checkpoint rejection and exactly-once consequential side effects. Current agent-tool-loop.mjs gives receipts to the model and persists checkpoints, but full lifecycle/recovery proof is incomplete.",
    category: "recovery",
    severity: "critical",
  },
  {
    id: 3,
    title: "Provider platform breadth + real proof",
    description: "The active next-phase plan still calls for broader provider support, truthful capabilities, secret lifecycle and real cloud/local/tool-call round trips. Current architecture is close (model tool call → policy → runtime → receipt), but provider expansion and live E2E proof remain open.",
    category: "provider",
    severity: "high",
  },
  {
    id: 4,
    title: "Browser/repository E2E proof",
    description: "Source capability exists. Recent live run proved relay/CDP health but did not prove ChatGPT posting because the composer was unavailable. Browser capability exists; final live acceptance remains partial. Classification: CDP_RUNNING_RELAY_MISSING.",
    category: "browser",
    severity: "medium",
  },
  {
    id: 5,
    title: "Installed-runtime proof",
    description: "Current plan still calls for exact source→deployed→runtime identity, restart rediscovery, tool persistence, provider/capability smoke tests and confirmation that runtime generates no source-tree state. This is the final acceptance gate before release claims.",
    category: "runtime",
    severity: "critical",
  },
  {
    id: 6,
    title: "Documentation/roadmap consolidation",
    description: "BREW_MEMORY_AND_AUTONOMY_IMPL_PLAN.md is still labeled active while telling developers to extend files that current ADR-0001 says must remain removed. The consolidated packet explicitly requires contradictory historical architecture docs to be historicalized or removed and says there should be no duplicated active roadmap.",
    category: "docs",
    severity: "high",
  },
];

const categoryConfig = {
  memory: { label: "Memory", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", icon: "fa-brain" },
  recovery: { label: "Recovery", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", icon: "fa-rotate-left" },
  provider: { label: "Provider", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "fa-server" },
  browser: { label: "Browser", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", icon: "fa-globe" },
  runtime: { label: "Runtime", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: "fa-gears" },
  docs: { label: "Documentation", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", icon: "fa-file-lines" },
};

const severityConfig = {
  critical: { label: "CRITICAL", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  high: { label: "HIGH", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  medium: { label: "MEDIUM", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
};

interface AgentComparison {
  name: string;
  strength: string;
  brewComparison: string;
  icon: string;
  color: string;
}

const agentComparisons: AgentComparison[] = [
  {
    name: "Aider",
    strength: "Repository cognition",
    brewComparison: "Brew now has workspace retrieval/index/search, but deeper symbol/dependency-ranked repo cognition can still be evaluated against Aider. Aider emphasizes structural repository model before full reads: repo map → relationships → rank relevant structure → model chooses deeper inspection. Brew's workspace retrieval index is directionally aligned, but Aider is still a useful benchmark for improving large-repo context selection without adding another planner.",
    icon: "fa-map",
    color: "purple",
  },
  {
    name: "Codex",
    strength: "Execution, approvals, sandbox, validation",
    brewComparison: "Brew is close architecturally: model tool call → policy → runtime → receipt. Remaining weakness is full lifecycle/recovery proof. Codex extracts: user turn → model decision → typed action → policy/sandbox → approval → execution → observation → model continues, with proposal ≠ permission ≠ execution ≠ success. Current Brew's model/tool/receipt flow aligns closely with this.",
    icon: "fa-shield-halved",
    color: "cyan",
  },
  {
    name: "Hermes",
    strength: "Persistent memory, skills, toolsets, multiple channels",
    brewComparison: "Brew now has memory, skills, dynamic tools/MCP and multiple surfaces. Automatic memory promotion and continuity quality are the main comparison areas. Hermes remains the best reference for persistent context, memory and skill loading. GPT-K highlights bounded purpose-specific memory, searchable session history, progressive skill disclosure, one underlying agent across CLI/messaging/desktop/API, checkpointing, and contextual project instruction discovery. This reinforces that Brew should improve its memory promotion/context loading—not restore a separate memory agent.",
    icon: "fa-rotate",
    color: "emerald",
  },
  {
    name: "LobeHub",
    strength: "Providers/models/knowledge/integrations",
    brewComparison: "This is the strongest reference for Brew's still-open provider expansion program. LobeHub's provider metadata separate from provider runtime behavior, model registry and capability metadata, configured vs usable/readiness distinction, normalized provider errors, MCP/integration lifecycle, and channel/provider independence are all directly relevant to Brew's provider platform breadth gap.",
    icon: "fa-server",
    color: "amber",
  },
  {
    name: "OpenHands",
    strength: "Event-driven autonomous SWE runtime",
    brewComparison: "Brew's receipts/checkpoints/operation journal are moving in this direction. Replayable lifecycle/crash recovery/exactly-once behavior still needs stronger live proof. OpenHands makes durable event history the state authority: history → model → typed actions → policy → execution → observations → history, and stresses that loop termination is not completion. That directly supports Brew's current operation journal/checkpoint direction.",
    icon: "fa-gears",
    color: "rose",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400" },
};

export default function GenuineGaps() {
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium">("all");
  const [showComparisons, setShowComparisons] = useState(false);

  const filteredGaps = filter === "all" ? gaps : gaps.filter(g => g.severity === filter);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
            Genuine Gaps & Open Areas
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          After removing stale mechanisms from the Drive comparison, these are the <span className="text-orange-300 font-medium">6 meaningful open areas</span> that remain.
          This is the reference-backed gap set for the next Brew work.
        </p>
      </div>

      {/* Severity filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {[
          { id: "all" as const, label: "All Gaps", count: gaps.length },
          { id: "critical" as const, label: "Critical", count: gaps.filter(g => g.severity === "critical").length },
          { id: "high" as const, label: "High", count: gaps.filter(g => g.severity === "high").length },
          { id: "medium" as const, label: "Medium", count: gaps.filter(g => g.severity === "medium").length },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f.id
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
            }`}
          >
            {f.label} <span className="text-gray-600">({f.count})</span>
          </button>
        ))}
      </div>

      {/* Gap cards */}
      <div className="space-y-4 mb-12">
        {filteredGaps.map((gap) => {
          const catConfig = categoryConfig[gap.category];
          const sevConfig = severityConfig[gap.severity];
          return (
            <div key={gap.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5 hover:bg-white/[0.04] transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg ${catConfig.bg} border ${catConfig.border} flex items-center justify-center shrink-0`}>
                  <i className={`fa-solid ${catConfig.icon} ${catConfig.color}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-gray-500">#{gap.id}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${catConfig.bg} ${catConfig.color} ${catConfig.border}`}>
                      {catConfig.label}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${sevConfig.bg} ${sevConfig.color} ${sevConfig.border}`}>
                      {sevConfig.label}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-200 mb-2">{gap.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{gap.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent comparisons toggle */}
      <button
        onClick={() => setShowComparisons(!showComparisons)}
        className="w-full rounded-xl bg-white/[0.03] border border-white/10 p-4 text-left hover:bg-white/[0.05] transition-all mb-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            <i className="fa-solid fa-code-compare mr-2 text-cyan-400"></i>
            Comparison with GPT-K Reference Agents
          </span>
          <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${showComparisons ? "rotate-180" : ""}`}></i>
        </div>
      </button>

      {showComparisons && (
        <div className="space-y-4 mb-8">
          {agentComparisons.map((agent) => {
            const colors = colorMap[agent.color];
            return (
              <div key={agent.name} className={`rounded-xl ${colors.bg} border ${colors.border} p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center`}>
                    <i className={`fa-solid ${agent.icon} ${colors.text}`}></i>
                  </div>
                  <div>
                    <h3 className={`font-bold ${colors.text}`}>{agent.name}</h3>
                    <p className="text-xs text-gray-400">{agent.strength}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{agent.brewComparison}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom line */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/20 p-6">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-bullseye text-purple-400 mt-1"></i>
          <div>
            <h3 className="font-bold text-purple-300 mb-2">Bottom Line</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              The Drive review does <span className="text-purple-300">not</span> reveal a large collection of lost agents that should be restored.
              It shows something more useful:
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Several old feature goals are <span className="text-green-300">already implemented</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Several old implementations were <span className="text-green-300">correctly removed</span> because they created secondary reasoning authorities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">→</span>
                <span>Some implementation choices were <span className="text-amber-300">superseded</span>, not forgotten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">!</span>
                <span>The main actual capability gap is <span className="text-orange-300">automatic governed memory promotion</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">!</span>
                <span>The main engineering-proof gaps are <span className="text-red-300">restart/exactly-once recovery, provider E2E, browser E2E, installed-runtime identity/restart proof</span></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">!</span>
                <span>There is a clear <span className="text-rose-300">documentation cleanup defect</span> because an old active roadmap still names removed architecture</span>
              </li>
            </ul>
            <p className="text-sm text-gray-300 mt-4 leading-relaxed">
              That is the reference-backed gap set to use for the next Brew work, rather than the raw "21 RECOVER" inventory or the old Drive roadmap verbatim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
