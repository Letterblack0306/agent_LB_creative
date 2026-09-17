import { useState } from "react";
import { openGaps } from "../data/brewPlanning";

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

export default function GenuineGaps() {
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium">("all");
  const filtered = filter === "all" ? openGaps : openGaps.filter((gap) => gap.severity === filter);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
            Genuine Gaps & Acceptance Gates
          </span>
        </h2>
        <p className="text-gray-400 max-w-4xl mx-auto">
          Only gaps that survive comparison against current Brew source, the reconciled Drive plan and GPT-K reference architecture.
          Each gap names its current owner and the exact condition required to close it.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {[
          { id: "all" as const, label: "All", count: openGaps.length },
          { id: "critical" as const, label: "Critical", count: openGaps.filter((gap) => gap.severity === "critical").length },
          { id: "high" as const, label: "High", count: openGaps.filter((gap) => gap.severity === "high").length },
          { id: "medium" as const, label: "Medium", count: openGaps.filter((gap) => gap.severity === "medium").length },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === item.id
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
            }`}
          >
            {item.label} <span className="text-gray-600">({item.count})</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((gap, index) => {
          const category = categoryConfig[gap.category];
          const severity = severityConfig[gap.severity];
          return (
            <div key={gap.id} className="rounded-2xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${category.bg} border ${category.border} flex items-center justify-center shrink-0`}>
                  <i className={`fa-solid ${category.icon} ${category.color}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-xs font-mono text-gray-600">G{index + 1}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${category.bg} ${category.color} ${category.border}`}>
                      {category.label}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${severity.bg} ${severity.color} ${severity.border}`}>
                      {severity.label}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-gray-400 font-mono">
                      {gap.state.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-100 mb-3">{gap.title}</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Exact gap</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{gap.exactGap}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Acceptance predicate</p>
                      <p className="text-sm text-green-200/80 leading-relaxed">{gap.acceptance}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    Owner: <span className="text-gray-300">{gap.owner}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl bg-blue-500/5 border border-blue-500/20 p-5">
        <h3 className="text-sm font-semibold text-blue-300 mb-2">Interpretation rule</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          A historical module is not a gap by itself. A gap is listed here only when a current product requirement remains unproven or incomplete after comparison with current source/runtime architecture.
          Recovery work must target the current owner, not restore a removed secondary reasoning authority.
        </p>
      </div>
    </div>
  );
}
