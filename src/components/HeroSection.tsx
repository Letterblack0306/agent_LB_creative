import { brewPlanMeta, openGaps, primaryPlan } from "../data/brewPlanning";

export default function HeroSection() {
  const currentLane = primaryPlan.find((item) => item.state === "current");
  const criticalGaps = openGaps.filter((gap) => gap.severity === "critical").length;

  return (
    <div className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}></div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          <span>Brew {brewPlanMeta.sourceShort}</span>
          <span className="text-gray-600">•</span>
          <span>GPT-K {brewPlanMeta.gptkShort}</span>
          <span className="text-gray-600">•</span>
          <span>as of {brewPlanMeta.asOf}</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Brew Agent System
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-3 leading-relaxed">
          Specific execution plan, proof state and acceptance gates
        </p>

        <p className="text-base text-gray-500 max-w-4xl mx-auto mb-8 leading-relaxed">
          {brewPlanMeta.architecture}
        </p>

        <div className="rounded-2xl bg-purple-500/5 border border-purple-500/20 p-5 mb-8 max-w-4xl mx-auto text-left">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              ACTIVE PROGRAM
            </span>
            <span className="text-sm font-semibold text-gray-100">{brewPlanMeta.activeProgram}</span>
          </div>
          <p className="text-sm text-gray-300">
            Current lane: <span className="text-cyan-300 font-medium">{currentLane?.id} — {currentLane?.title}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Next code change is not pre-authorized by the roadmap: each lane must first name the owner, observable and falsifier, then pass its bounded diagnostic.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-bold text-purple-300">{primaryPlan.length}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Specific lanes</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-bold text-orange-300">{openGaps.length}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Open gaps</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-bold text-red-300">{criticalGaps}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Critical proof gaps</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-bold text-green-300">418</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Tests passed</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-bold text-cyan-300">PASS</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Relay + CDP</div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xl font-bold text-amber-300">PARTIAL</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Browser posting</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#plan"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30"
          >
            <i className="fa-solid fa-diagram-project mr-2"></i>
            Open Specific Plan
          </a>
          <a
            href="#gaps"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-all"
          >
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
            Open Gaps & Gates
          </a>
        </div>
      </div>
    </div>
  );
}
