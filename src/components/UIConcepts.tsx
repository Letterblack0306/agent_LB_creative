import { useState, useEffect, useRef } from "react";

// ============================================================================
// CONCEPT 1: TERMINAL HUD
// Minimal sci-fi terminal with streaming output and ambient glow
// ============================================================================
function TerminalHUD() {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const script = [
    "> brew connect --provider lm-studio",
    "  ✓ provider authenticated",
    "  ✓ model: qwen/qwen3-vl-8b",
    "",
    "> user: inspect the workspace and find any TODO comments",
    "",
    "  [thinking] analyzing workspace structure...",
    "  [tool] workspace.search(pattern='TODO', recursive=true)",
    "  [evidence] 14 matches across 8 files",
    "  [tool] workspace.read(path='src/agent/executive.mjs')",
    "  [evidence] 3 TODO items in executive layer",
    "",
    "  Agent found 14 TODO comments across the workspace.",
    "  3 are in the executive layer and may need priority review.",
    "  Want me to create a task list for these?",
    "",
    "> _",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < script.length) {
        setLines((prev) => [...prev, script[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="rounded-2xl bg-black/60 border border-cyan-500/20 overflow-hidden shadow-lg shadow-cyan-500/5">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-cyan-500/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
        </div>
        <span className="text-[10px] text-cyan-400/60 font-mono ml-2">brew :: terminal</span>
        <span className="ml-auto text-[10px] text-gray-600 font-mono">session: 0x4a2f</span>
      </div>

      {/* Terminal */}
      <div ref={terminalRef} className="p-4 h-80 overflow-y-auto font-mono text-xs leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className={`${
            line.startsWith(">") ? "text-cyan-300" :
            line.includes("[thinking]") ? "text-purple-400/80" :
            line.includes("[tool]") ? "text-amber-400/80" :
            line.includes("[evidence]") ? "text-emerald-400/80" :
            line.includes("✓") ? "text-green-400" :
            "text-gray-400"
          }`}>
            {line}
          </div>
        ))}
        <span className={`inline-block w-2 h-4 bg-cyan-400 ${cursor ? "opacity-100" : "opacity-0"}`}></span>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-t border-cyan-500/10 text-[10px] font-mono">
        <span className="text-green-400">● connected</span>
        <span className="text-gray-500">qwen3-vl-8b · 422 tests · 11 guards</span>
        <span className="text-cyan-400/60">latency: 42ms</span>
      </div>
    </div>
  );
}

// ============================================================================
// CONCEPT 2: AMBIENT CONVERSATION
// Chat-first with thinking visualization and ambient background
// ============================================================================
function AmbientConversation() {
  const [activeOrb, setActiveOrb] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOrb((o) => (o + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#0d1117] to-[#0a0e1a] border border-purple-500/20 overflow-hidden relative">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-1/4 w-32 h-32 rounded-full blur-3xl transition-opacity duration-1000 ${activeOrb === 0 ? "bg-purple-500/20 opacity-100" : "opacity-0"}`}></div>
        <div className={`absolute top-20 right-1/4 w-40 h-40 rounded-full blur-3xl transition-opacity duration-1000 ${activeOrb === 1 ? "bg-cyan-500/15 opacity-100" : "opacity-0"}`}></div>
        <div className={`absolute bottom-10 left-1/2 w-36 h-36 rounded-full blur-3xl transition-opacity duration-1000 ${activeOrb === 2 ? "bg-emerald-500/10 opacity-100" : "opacity-0"}`}></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Thinking indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 animate-ping opacity-20"></div>
          </div>
          <div>
            <p className="text-sm text-gray-200 font-medium">Brew is thinking...</p>
            <div className="flex gap-1 mt-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {/* User */}
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-white/5 border border-white/10 px-4 py-3">
              <p className="text-sm text-gray-200">What's the current status of the memory promotion pipeline?</p>
            </div>
          </div>

          {/* Agent thinking */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 shrink-0 flex items-center justify-center">
              <i className="fa-solid fa-mug-hot text-white text-xs"></i>
            </div>
            <div className="flex-1">
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.03] border border-white/10 px-4 py-3">
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Memory promotion is <span className="text-amber-300">PARTIAL</span>. The curation engine exists with verification, contradiction reconciliation, and semantic indexing — but the automatic event → proposal → validation pipeline is not yet proven.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] border border-purple-500/20">memory-curation ✓</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] border border-amber-500/20">auto-promotion ✗</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20">semantic-index ✓</span>
                </div>
              </div>
              <div className="flex gap-2 mt-2 ml-2">
                <button className="text-[10px] text-gray-500 hover:text-purple-300 transition-colors">
                  <i className="fa-regular fa-copy mr-1"></i>copy
                </button>
                <button className="text-[10px] text-gray-500 hover:text-purple-300 transition-colors">
                  <i className="fa-solid fa-arrow-rotate-right mr-1"></i>regenerate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
          <input
            type="text"
            placeholder="Ask Brew anything..."
            className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 outline-none"
          />
          <button className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center hover:opacity-80 transition-opacity">
            <i className="fa-solid fa-arrow-up text-white text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONCEPT 3: NODE GRAPH
// Agent reasoning visualized as connected nodes
// ============================================================================
function NodeGraph() {
  const [activeNode, setActiveNode] = useState<string | null>("input");

  const nodes = [
    { id: "input", label: "User Input", x: 50, y: 20, icon: "fa-user", color: "blue" },
    { id: "ingress", label: "Ingress", x: 50, y: 40, icon: "fa-download", color: "indigo" },
    { id: "model", label: "Reasoning", x: 50, y: 60, icon: "fa-brain", color: "purple" },
    { id: "tool1", label: "workspace.search", x: 25, y: 75, icon: "fa-magnifying-glass", color: "cyan" },
    { id: "tool2", label: "memory.query", x: 75, y: 75, icon: "fa-database", color: "emerald" },
    { id: "evidence", label: "Evidence", x: 50, y: 88, icon: "fa-file-circle-check", color: "amber" },
    { id: "response", label: "Response", x: 50, y: 100, icon: "fa-comment", color: "green" },
  ];

  const connections = [
    { from: "input", to: "ingress" },
    { from: "ingress", to: "model" },
    { from: "model", to: "tool1" },
    { from: "model", to: "tool2" },
    { from: "tool1", to: "evidence" },
    { from: "tool2", to: "evidence" },
    { from: "evidence", to: "response" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-500/20 border-blue-500/40 text-blue-300",
    indigo: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300",
    purple: "bg-purple-500/20 border-purple-500/40 text-purple-300",
    cyan: "bg-cyan-500/20 border-cyan-500/40 text-cyan-300",
    emerald: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    amber: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    green: "bg-green-500/20 border-green-500/40 text-green-300",
  };

  return (
    <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono">reasoning graph</span>
        <span className="text-[10px] text-gray-600 font-mono">turn: 0x7f2a</span>
      </div>

      <div className="relative h-80">
        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, i) => {
            const from = nodes.find((n) => n.id === conn.from)!;
            const to = nodes.find((n) => n.id === conn.to)!;
            const isActive = activeNode === conn.from || activeNode === conn.to;
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={isActive ? "rgba(168, 85, 247, 0.6)" : "rgba(255, 255, 255, 0.1)"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "0" : "4 4"}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition-all ${
              activeNode === node.id ? "scale-110" : "hover:scale-105"
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[node.color]} ${
              activeNode === node.id ? "ring-2 ring-purple-400/50" : ""
            }`}>
              <i className={`fa-solid ${node.icon} text-xs`}></i>
            </div>
            <span className="text-[9px] text-gray-500 whitespace-nowrap">{node.label}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="px-4 py-3 border-t border-white/5 bg-black/20">
        {activeNode ? (
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${colorMap[nodes.find(n => n.id === activeNode)!.color]}`}>
              <i className={`fa-solid ${nodes.find(n => n.id === activeNode)!.icon} text-xs`}></i>
            </div>
            <div>
              <p className="text-xs text-gray-200 font-medium">{nodes.find(n => n.id === activeNode)!.label}</p>
              <p className="text-[10px] text-gray-500">
                {activeNode === "model" ? "Model-owned semantic reasoning" :
                 activeNode === "tool1" ? "Governed workspace search" :
                 activeNode === "tool2" ? "Scoped memory retrieval" :
                 activeNode === "evidence" ? "Receipt-bound evidence" :
                 "Click nodes to inspect"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-[10px] text-gray-600">Click any node to inspect</p>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// CONCEPT 4: COMMAND DECK
// Split pane with agent state, tools, and conversation
// ============================================================================
function CommandDeck() {
  const [activePanel, setActivePanel] = useState<"tools" | "state" | "evidence">("tools");

  const tools = [
    { name: "workspace.search", status: "ready", icon: "fa-magnifying-glass" },
    { name: "workspace.read", status: "ready", icon: "fa-file-lines" },
    { name: "memory.query", status: "ready", icon: "fa-brain" },
    { name: "terminal.exec", status: "ready", icon: "fa-terminal" },
    { name: "browser.navigate", status: "waiting", icon: "fa-globe" },
    { name: "git.status", status: "ready", icon: "fa-code-branch" },
  ];

  const stateItems = [
    { key: "session", value: "0x4a2f", color: "text-cyan-400" },
    { key: "turn", value: "7", color: "text-purple-400" },
    { key: "operation", value: "op_8f2a", color: "text-emerald-400" },
    { key: "provider", value: "lm-studio", color: "text-amber-400" },
    { key: "model", value: "qwen3-vl-8b", color: "text-blue-400" },
    { key: "evidence", value: "3 receipts", color: "text-green-400" },
  ];

  return (
    <div className="rounded-2xl bg-[#0d1117] border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-cyan-500"></div>
          <span className="text-xs text-gray-300 font-medium">Brew Command Deck</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-[10px] text-gray-500 font-mono">LIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_200px] h-80">
        {/* Main panel */}
        <div className="border-r border-white/5 p-4 overflow-y-auto">
          <div className="flex gap-2 mb-4">
            {(["tools", "state", "evidence"] as const).map((panel) => (
              <button
                key={panel}
                onClick={() => setActivePanel(panel)}
                className={`px-3 py-1 rounded text-[10px] font-medium transition-all ${
                  activePanel === panel
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {panel}
              </button>
            ))}
          </div>

          {activePanel === "tools" && (
            <div className="space-y-2">
              {tools.map((tool) => (
                <div key={tool.name} className="flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <i className={`fa-solid ${tool.icon} text-xs text-gray-500`}></i>
                    <span className="text-xs text-gray-300 font-mono">{tool.name}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${tool.status === "ready" ? "text-green-400" : "text-amber-400"}`}>
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activePanel === "state" && (
            <div className="space-y-2">
              {stateItems.map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.key}</span>
                  <span className={`text-xs font-mono ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {activePanel === "evidence" && (
            <div className="space-y-2">
              {[
                { id: "rcpt_01", tool: "workspace.search", result: "14 matches" },
                { id: "rcpt_02", tool: "workspace.read", result: "3 TODOs" },
                { id: "rcpt_03", tool: "memory.query", result: "2 records" },
              ].map((receipt) => (
                <div key={receipt.id} className="rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-emerald-400 font-mono">{receipt.id}</span>
                    <i className="fa-solid fa-circle-check text-emerald-400 text-[10px]"></i>
                  </div>
                  <p className="text-[10px] text-gray-400">{receipt.tool} → {receipt.result}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side panel - mini conversation */}
        <div className="p-3 flex flex-col">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">conversation</p>
          <div className="flex-1 space-y-2 overflow-y-auto">
            <div className="rounded-lg bg-blue-500/10 px-2 py-1.5">
              <p className="text-[10px] text-gray-300">Find TODO comments</p>
            </div>
            <div className="rounded-lg bg-purple-500/10 px-2 py-1.5">
              <p className="text-[10px] text-gray-300">Found 14 across 8 files...</p>
            </div>
            <div className="rounded-lg bg-blue-500/10 px-2 py-1.5">
              <p className="text-[10px] text-gray-300">Show me the executive ones</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1.5">
            <input className="flex-1 bg-transparent text-[10px] text-gray-300 outline-none placeholder-gray-600" placeholder="..." />
            <i className="fa-solid fa-arrow-up text-[10px] text-purple-400"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONCEPT 5: VOICE WAVEFORM
// Voice-first with waveform visualization
// ============================================================================
function VoiceWaveform() {
  const [bars, setBars] = useState<number[]>(Array(32).fill(0.1));
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isListening) return;
    const interval = setInterval(() => {
      setBars(Array(32).fill(0).map(() => Math.random() * 0.8 + 0.2));
    }, 100);
    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#0d1117] to-[#0a0e1a] border border-emerald-500/20 overflow-hidden">
      <div className="p-6">
        {/* Waveform */}
        <div className="flex items-center justify-center gap-[2px] h-24 mb-6">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-emerald-500 to-cyan-400 transition-all duration-100"
              style={{
                height: `${height * 100}%`,
                opacity: isListening ? 1 : 0.3,
              }}
            ></div>
          ))}
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <p className={`text-sm font-medium ${isListening ? "text-emerald-300" : "text-gray-400"}`}>
            {isListening ? "Listening..." : "Tap to speak"}
          </p>
          <p className="text-[10px] text-gray-600 mt-1">
            {isListening ? "Processing natural language" : "Voice-first interaction"}
          </p>
        </div>

        {/* Mic button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? "bg-emerald-500/20 border-2 border-emerald-400 shadow-lg shadow-emerald-500/20"
                : "bg-white/5 border border-white/10 hover:bg-white/10"
            }`}
          >
            <i className={`fa-solid fa-microphone text-xl ${isListening ? "text-emerald-400" : "text-gray-400"}`}></i>
          </button>
        </div>

        {/* Transcript */}
        <div className="mt-6 rounded-xl bg-white/[0.02] border border-white/5 p-3">
          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">transcript</p>
          <p className="text-xs text-gray-300 italic">
            {isListening ? '"What is the status of the memory..."' : "No transcript yet"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function UIConcepts() {
  const [activeConcept, setActiveConcept] = useState(0);

  const concepts = [
    { name: "Terminal HUD", icon: "fa-terminal", description: "CLI-style with streaming output" },
    { name: "Ambient Chat", icon: "fa-comments", description: "Chat-first with thinking visualization" },
    { name: "Node Graph", icon: "fa-diagram-project", description: "Agent reasoning as connected nodes" },
    { name: "Command Deck", icon: "fa-gauge-high", description: "Split pane with agent state" },
    { name: "Voice Wave", icon: "fa-microphone", description: "Voice-first with waveform" },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            UI Concepts for Brew
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Trending minimal sci-fi interactive agent UI patterns. Each concept is a live interactive demo.
        </p>
      </div>

      {/* Concept selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {concepts.map((concept, i) => (
          <button
            key={i}
            onClick={() => setActiveConcept(i)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              activeConcept === i
                ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white"
                : "bg-white/[0.02] border border-white/10 text-gray-400 hover:bg-white/[0.05]"
            }`}
          >
            <i className={`fa-solid ${concept.icon} ${activeConcept === i ? "text-purple-300" : "text-gray-500"}`}></i>
            <div className="text-left">
              <p className="text-xs font-medium">{concept.name}</p>
              <p className="text-[10px] text-gray-500">{concept.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Active concept demo */}
      <div className="max-w-3xl mx-auto">
        {activeConcept === 0 && <TerminalHUD />}
        {activeConcept === 1 && <AmbientConversation />}
        {activeConcept === 2 && <NodeGraph />}
        {activeConcept === 3 && <CommandDeck />}
        {activeConcept === 4 && <VoiceWaveform />}
      </div>

      {/* Design principles */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Minimal", desc: "Dark backgrounds, subtle borders, focused typography. No visual noise.", icon: "fa-minus" },
          { title: "Sci-Fi", desc: "HUD elements, monospace fonts, status indicators, ambient glow.", icon: "fa-rocket" },
          { title: "Interactive", desc: "Live streaming, clickable nodes, responsive feedback, real-time state.", icon: "fa-hand-pointer" },
        ].map((principle, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
            <i className={`fa-solid ${principle.icon} text-purple-400 mb-3`}></i>
            <h4 className="text-sm font-bold text-gray-200 mb-1">{principle.title}</h4>
            <p className="text-xs text-gray-500">{principle.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
