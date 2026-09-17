export default function HeroSection() {
  return (
    <div className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          Source: Letterblack0306/GPT-Knowledge • plan.json + status.json
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Brew Agent System
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
          Plan & Implementation Features
        </p>

        <p className="text-base text-gray-500 max-w-3xl mx-auto mb-8 leading-relaxed">
          One persistent reasoning agent receives user requests, reasons dynamically through the active provider,
          sees truthful capabilities, chooses tools when useful, executes through runtime policy,
          continues from real evidence, and returns the result. Drive plans reconciled against current main at c37205cb.
        </p>

        {/* Classification badge */}
        <div className="inline-block px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8 max-w-2xl">
          <p className="text-xs text-amber-300/80 font-mono leading-relaxed">
            CURRENT: MODEL_OWNED_REASONING_PATH_ESTABLISHED • SEMANTIC_TOOL_PRESELECTION_REMOVED •
            GOVERNED_MEMORY_PROVEN • LIVE_TELEGRAM_AND_CONTINUATION_ACCEPTANCE_OPEN
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-2">
            <i className="fa-solid fa-diagram-project text-purple-400"></i>
            <span className="text-gray-300">12 Plan Nodes</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-green-400"></i>
            <span className="text-gray-300">4 Verified Changes</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-2">
            <i className="fa-solid fa-folder-open text-blue-400"></i>
            <span className="text-gray-300">6 Drive Lanes</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-orange-400"></i>
            <span className="text-gray-300">6 Genuine Gaps</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-amber-400"></i>
            <span className="text-gray-300">10 Invariants</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-2">
            <i className="fa-solid fa-book text-emerald-400"></i>
            <span className="text-gray-300">5 Upstream Refs</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="#plan"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30"
          >
            <i className="fa-solid fa-diagram-project mr-2"></i>
            View Plan Graph
          </a>
          <a
            href="#batch-b"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-all"
          >
            <i className="fa-solid fa-flask mr-2"></i>
            Batch B Checkpoint
          </a>
        </div>
      </div>
    </div>
  );
}
