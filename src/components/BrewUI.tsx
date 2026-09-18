import { useState } from "react";

// ============================================================================
// BREW UI - Letterblack Brand-Aligned Design
// Dark, professional, minimal - matching letterblack.net aesthetic
// ============================================================================

export default function BrewUI() {
  const [activeTab, setActiveTab] = useState<"chat" | "tools" | "memory" | "evidence" | "telemetry">("chat");
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Brew UI Design
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Letterblack brand-aligned interface for the Brew agent system. 
          Dark, professional, minimal — matching the Letterblack design language.
        </p>
      </div>

      {/* Brand Badge */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
          <span className="text-white font-medium">Letterblack</span> × <span className="text-gray-300">Brew Agent</span>
        </div>
        <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
          Dubai · 2026
        </div>
      </div>

      {/* Main Panel */}
      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl bg-[#0a0a0a] border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/50">
          
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0d0d0d]">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
                <span className="w-3 h-3 rounded-full bg-[#febc2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#28c840]"></span>
              </div>
              <div className="text-xs font-mono text-gray-500 tracking-wider uppercase">
                BREW AGENT
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                isConnected ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}></span>
                {isConnected ? "Connected" : "Disconnected"}
              </div>
              <button 
                onClick={() => setIsConnected(!isConnected)}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Toggle
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/[0.06] bg-[#0d0d0d]">
            {[
              { id: "chat" as const, label: "Chat", icon: "fa-comments" },
              { id: "tools" as const, label: "Tools", icon: "fa-wrench" },
              { id: "memory" as const, label: "Memory", icon: "fa-brain" },
              { id: "evidence" as const, label: "Evidence", icon: "fa-file-circle-check" },
              { id: "telemetry" as const, label: "Telemetry", icon: "fa-chart-line" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-xs font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "text-white border-white"
                    : "text-gray-500 border-transparent hover:text-gray-300"
                }`}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6 min-h-[500px] bg-[#0a0a0a]">
            
            {/* CHAT TAB */}
            {activeTab === "chat" && (
              <div className="space-y-6">
                {/* Section Label */}
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-4">
                  CONVERSATION
                </div>

                {/* Messages */}
                <div className="space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-white/[0.04] border border-white/[0.08] px-5 py-3">
                      <p className="text-sm text-gray-200">What's the status of the memory promotion pipeline?</p>
                    </div>
                  </div>

                  {/* Agent Message */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-mug-hot text-white/60 text-xs"></i>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-2xl rounded-tl-sm bg-white/[0.02] border border-white/[0.06] px-5 py-4">
                        <p className="text-sm text-gray-300 leading-relaxed mb-3">
                          Memory promotion is <span className="text-amber-400 font-medium">PARTIAL</span>. The curation engine exists with verification and semantic indexing — but the automatic event → proposal → validation pipeline is not yet proven.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-mono">
                            ✓ memory-curation
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] border border-amber-500/20 font-mono">
                            ✗ auto-promotion
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-mono">
                            ✓ semantic-index
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-2 ml-2">
                        <button className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">
                          <i className="fa-regular fa-copy mr-1"></i>Copy
                        </button>
                        <button className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors">
                          <i className="fa-solid fa-arrow-rotate-right mr-1"></i>Regenerate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.08] px-5 py-4">
                    <input
                      type="text"
                      placeholder="Ask Brew anything..."
                      className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
                    />
                    <button className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-colors">
                      <i className="fa-solid fa-arrow-up text-white text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TOOLS TAB */}
            {activeTab === "tools" && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-4">
                  CAPABILITY REGISTRY
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: "workspace.search", status: "ready", icon: "fa-magnifying-glass" },
                    { name: "workspace.read", status: "ready", icon: "fa-file-lines" },
                    { name: "memory.query", status: "ready", icon: "fa-brain" },
                    { name: "terminal.exec", status: "ready", icon: "fa-terminal" },
                    { name: "browser.navigate", status: "waiting", icon: "fa-globe" },
                    { name: "git.status", status: "ready", icon: "fa-code-branch" },
                    { name: "scheduler.create", status: "ready", icon: "fa-clock" },
                    { name: "mcp.connect", status: "ready", icon: "fa-plug" },
                  ].map((tool) => (
                    <div key={tool.name} className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3 hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${tool.icon} text-xs text-gray-500`}></i>
                        <span className="text-xs text-gray-300 font-mono">{tool.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono ${
                        tool.status === "ready" ? "text-emerald-400" : "text-amber-400"
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MEMORY TAB */}
            {activeTab === "memory" && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-4">
                  GOVERNED MEMORY
                </div>
                <div className="space-y-3">
                  {[
                    { id: "mem_01", type: "project_fact", verified: true, content: "Brew uses canonical agent-tool-loop for execution" },
                    { id: "mem_02", type: "decision", verified: true, content: "Semantic tool preselection removed from canonical path" },
                    { id: "mem_03", type: "solution", verified: false, content: "Memory promotion pipeline needs automatic intake" },
                  ].map((mem) => (
                    <div key={mem.id} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-mono">{mem.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 font-mono">{mem.type}</span>
                        </div>
                        <span className={`text-[10px] ${mem.verified ? "text-emerald-400" : "text-amber-400"}`}>
                          {mem.verified ? "✓ verified" : "○ unverified"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">{mem.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVIDENCE TAB */}
            {activeTab === "evidence" && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-4">
                  EXECUTION EVIDENCE
                </div>
                <div className="space-y-3">
                  {[
                    { id: "rcpt_01", tool: "workspace.search", result: "14 matches", time: "2m ago" },
                    { id: "rcpt_02", tool: "workspace.read", result: "3 TODOs", time: "1m ago" },
                    { id: "rcpt_03", tool: "memory.query", result: "2 records", time: "30s ago" },
                  ].map((receipt) => (
                    <div key={receipt.id} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-emerald-400 font-mono">{receipt.id}</span>
                        <span className="text-[10px] text-gray-600">{receipt.time}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        <span className="text-gray-300">{receipt.tool}</span> → {receipt.result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TELEMETRY TAB */}
            {activeTab === "telemetry" && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-4">
                  RUNTIME TELEMETRY
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-center">
                    <div className="text-2xl font-bold text-white">422</div>
                    <div className="text-[10px] text-gray-500 mt-1">Tests Passed</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">11/11</div>
                    <div className="text-[10px] text-gray-500 mt-1">Guards Pass</div>
                  </div>
                  <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-center">
                    <div className="text-2xl font-bold text-white">42ms</div>
                    <div className="text-[10px] text-gray-500 mt-1">Avg Latency</div>
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Recent Activity</div>
                  <div className="space-y-2">
                    {[
                      { status: "success", text: "verify:readiness completed", time: "just now" },
                      { status: "success", text: "memory watcher fix verified", time: "2m ago" },
                      { status: "success", text: "422/422 tests passed", time: "3m ago" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <span className={`w-1.5 h-1.5 rounded-full ${log.status === "success" ? "bg-emerald-400" : "bg-red-400"}`}></span>
                        <span className="text-gray-400 flex-1">{log.text}</span>
                        <span className="text-gray-600">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/[0.06] bg-[#0d0d0d] flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-gray-600 font-mono">
              <span>brew@54673a6</span>
              <span>·</span>
              <span>main branch</span>
              <span>·</span>
              <span>422 tests</span>
            </div>
            <div className="text-[10px] text-gray-600">
              Letterblack · Dubai
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {[
          { title: "Dark & Professional", desc: "Pure black backgrounds with subtle white borders. No color noise.", icon: "fa-moon" },
          { title: "Letterblack Aligned", desc: "Matches letterblack.net aesthetic: minimal, clean, production-ready.", icon: "fa-palette" },
          { title: "Information Dense", desc: "Every pixel serves a purpose. Status, state, and evidence always visible.", icon: "fa-layer-group" },
        ].map((principle, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
            <i className={`fa-solid ${principle.icon} text-white/40 mb-3`}></i>
            <h4 className="text-sm font-medium text-white mb-1">{principle.title}</h4>
            <p className="text-xs text-gray-500">{principle.desc}</p>
          </div>
        ))}
      </div>

      {/* Color Palette */}
      <div className="mt-8 max-w-5xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-4 text-center">
          LETTERBLACK COLOR SYSTEM
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: "Background", color: "#0a0a0a", text: "text-gray-400" },
            { name: "Panel", color: "#0d0d0d", text: "text-gray-400" },
            { name: "Border", color: "rgba(255,255,255,0.06)", text: "text-gray-400" },
            { name: "Text Primary", color: "#ffffff", text: "text-white" },
            { name: "Text Secondary", color: "#a1a1aa", text: "text-gray-400" },
            { name: "Success", color: "#10b981", text: "text-emerald-400" },
            { name: "Warning", color: "#f59e0b", text: "text-amber-400" },
            { name: "Error", color: "#ef4444", text: "text-red-400" },
          ].map((swatch) => (
            <div key={swatch.name} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: swatch.color }}></div>
              <span className="text-[10px] text-gray-400">{swatch.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
