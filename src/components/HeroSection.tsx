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
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          GPT-Knowledge Verified • Reference Map Complete
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-purple-300 via-white to-cyan-300 bg-clip-text text-transparent">
            Brew Agent System
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
          A persistent agent runtime with normalized ingress, bounded memory,
          progressive skills, and evidence-based execution — synthesized from
          five reference architectures.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
            <span className="text-purple-400 font-mono">Aider</span>
            <span className="text-gray-500 ml-2">→ Repo cognition</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
            <span className="text-cyan-400 font-mono">Codex</span>
            <span className="text-gray-500 ml-2">→ Execution & policy</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
            <span className="text-emerald-400 font-mono">Hermes</span>
            <span className="text-gray-500 ml-2">→ Persistent loop</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
            <span className="text-amber-400 font-mono">LobeHub</span>
            <span className="text-gray-500 ml-2">→ Provider registry</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
            <span className="text-rose-400 font-mono">OpenHands</span>
            <span className="text-gray-500 ml-2">→ Event-driven SWE</span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="#architecture"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/30"
          >
            <i className="fa-solid fa-diagram-project mr-2"></i>
            View Architecture
          </a>
          <a
            href="#status"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-medium hover:bg-white/10 transition-all"
          >
            <i className="fa-solid fa-clipboard-check mr-2"></i>
            Check Status
          </a>
        </div>
      </div>
    </div>
  );
}
