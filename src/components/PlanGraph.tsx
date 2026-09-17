import { useState } from "react";
import { brewPlanMeta, planningSources, primaryPlan, provenFoundations, type PlanState } from "../data/brewPlanning";

const statusColors: Record<PlanState, { bg: string; border: string; text: string; dot: string }> = {
  proven: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", dot: "bg-green-400" },
  current: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", dot: "bg-purple-400" },
  next: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", dot: "bg-blue-400" },
  partial: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", dot: "bg-amber-400" },
  blocked: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", dot: "bg-red-400" },
  historical: { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-400", dot: "bg-gray-400" },
};

export default function PlanGraph() {
  const [selectedId, setSelectedId] = useState("B1");
  const selected = primaryPlan.find((item) => item.id === selectedId) || primaryPlan[0];

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Specific Brew Execution Plan
          </span>
        </h2>
        <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
          Current plan at <code className="text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded">{brewPlanMeta.sourceShort}</code>.
          The active program is <span className="text-cyan-300 font-medium">{brewPlanMeta.activeProgram}</span>.
          Each lane names the question, owner, observable, falsifier, acceptance gate and next action.
        </p>
      </div>

      <div className="rounded-2xl bg-purple-500/5 border border-purple-500/20 p-5 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Brew source</p>
            <p className="text-sm text-gray-200 font-mono">{brewPlanMeta.sourceRepo}@{brewPlanMeta.sourceShort}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">GPT-K reference</p>
            <p className="text-sm text-gray-200 font-mono">{brewPlanMeta.gptkRepo}@{brewPlanMeta.gptkShort}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Architecture</p>
            <p className="text-xs text-gray-300">{brewPlanMeta.architecture}</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Proven foundations — preserve, do not rebuild</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {provenFoundations.map((item) => (
            <div key={item.id} className="rounded-xl bg-green-500/5 border border-green-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-[10px] text-green-400 font-mono">PROVEN</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-200">{item.title}</h4>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.evidence}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max px-1">
          {primaryPlan.map((item, index) => {
            const colors = statusColors[item.state];
            const selectedNow = item.id === selectedId;
            return (
              <div key={item.id} className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedId(item.id)}
                  className={`rounded-xl border px-4 py-3 text-left min-w-[190px] transition-all ${
                    selectedNow ? `${colors.bg} ${colors.border}` : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                    <span className={`text-[10px] font-mono ${colors.text}`}>{item.id} · {item.state.toUpperCase()}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-200">{item.title}</p>
                </button>
                {index < primaryPlan.length - 1 && <i className="fa-solid fa-chevron-right text-gray-700 text-xs"></i>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white/[0.025] border border-white/10 p-6 mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs">
            {selected.id}
          </span>
          <h3 className="font-bold text-xl text-gray-100">{selected.title}</h3>
          <span className="text-xs text-gray-500">Owner: <span className="text-gray-300">{selected.owner}</span></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Exact question</p>
              <p className="text-sm text-gray-200 leading-relaxed">{selected.question}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Authoritative observable</p>
              <p className="text-sm text-cyan-200/90 leading-relaxed">{selected.observable}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">Falsifier</p>
              <p className="text-sm text-red-200/80 leading-relaxed">{selected.falsifier}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Acceptance gate</p>
            <ul className="space-y-2">
              {selected.acceptance.map((gate) => (
                <li key={gate} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>{gate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-blue-500/5 border border-blue-500/20 p-4">
          <p className="text-[10px] uppercase tracking-wider text-blue-400 mb-1">Next justified action</p>
          <p className="text-sm text-gray-200">{selected.nextAction}</p>
        </div>

        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Evidence basis</p>
          <ul className="space-y-1">
            {selected.evidence.map((item) => (
              <li key={item} className="text-xs text-gray-400">• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-cyan-500/5 border border-cyan-500/20 p-5">
        <h3 className="text-sm font-semibold text-cyan-300 mb-3">Planning evidence hierarchy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {planningSources.map((source, index) => (
            <div key={source.label} className="flex gap-3 rounded-lg bg-black/20 border border-white/5 p-3">
              <span className="text-xs text-cyan-400 font-mono">{index + 1}</span>
              <div>
                <p className="text-xs font-medium text-gray-200">{source.label}</p>
                <p className="text-[10px] text-gray-500 font-mono">{source.ref}</p>
                <p className="text-xs text-gray-400 mt-1">{source.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">{brewPlanMeta.evidenceRule}</p>
      </div>
    </div>
  );
}
