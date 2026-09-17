export default function InputOutputModel() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            Input / Output Model
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          How the agent detects user input and produces responses — the critical boundary between
          transport and reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Correct Model */}
        <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <i className="fa-solid fa-check text-green-400"></i>
            </div>
            <div>
              <h3 className="font-bold text-green-300 text-lg">Correct: Model Interprets</h3>
              <p className="text-gray-500 text-xs">Natural language reaches model unchanged</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "USER / CHANNEL", icon: "fa-user", color: "blue" },
              { label: "Capture complete turn", icon: "fa-download", color: "indigo" },
              { label: "Verify: source, conversation, session, workspace, provenance", icon: "fa-fingerprint", color: "violet" },
              { label: "Preserve original natural language", icon: "fa-lock-open", color: "purple" },
              { label: "Attach bounded relevant context", icon: "fa-brain", color: "fuchsia" },
              { label: "runTurn()", icon: "fa-play", color: "pink" },
              { label: "MODEL interprets meaning", icon: "fa-microchip", color: "rose" },
              { label: "MODEL decides: answer? ask? inspect? tool? continue?", icon: "fa-code-branch", color: "orange" },
              { label: "Runtime validates/executes tool request", icon: "fa-gears", color: "amber" },
              { label: "Observation / evidence", icon: "fa-file-circle-check", color: "emerald" },
              { label: "MODEL responds or continues", icon: "fa-comment-dots", color: "green" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] text-green-400 font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <i className={`fa-solid ${step.icon} text-green-400/60 text-xs`}></i>
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wrong Model */}
        <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <i className="fa-solid fa-xmark text-red-400"></i>
            </div>
            <div>
              <h3 className="font-bold text-red-300 text-lg">Wrong: Fragmented Authority</h3>
              <p className="text-gray-500 text-xs">Deterministic gates before the model</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "User input", icon: "fa-user", color: "gray" },
              { label: "Keyword detector", icon: "fa-magnifying-glass", color: "red" },
              { label: "Intent classifier", icon: "fa-tags", color: "red" },
              { label: "Scenario router", icon: "fa-code-branch", color: "red" },
              { label: "Mandatory planner", icon: "fa-list-check", color: "red" },
              { label: "Tool selector", icon: "fa-wrench", color: "red" },
              { label: "Model (finally)", icon: "fa-microchip", color: "gray" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full ${
                  step.color === "red" ? "bg-red-500/20" : "bg-gray-500/20"
                } flex items-center justify-center text-[10px] ${
                  step.color === "red" ? "text-red-400" : "text-gray-400"
                } font-bold shrink-0`}>
                  {i + 1}
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  step.color === "red" ? "text-red-300/70 line-through" : "text-gray-400"
                }`}>
                  <i className={`fa-solid ${step.icon} text-xs ${
                    step.color === "red" ? "text-red-400/40" : "text-gray-500"
                  }`}></i>
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-xs text-red-300">
              <i className="fa-solid fa-triangle-exclamation mr-1"></i>
              GPT-K explicitly identifies this pattern as <strong>fragmented reasoning authority</strong>.
              Deterministic infrastructure should own identity, transport, execution, integrity, evidence and safety —
              semantic interpretation stays with the reasoning agent.
            </p>
          </div>
        </div>
      </div>

      {/* Output Model */}
      <div className="mt-8 rounded-2xl bg-white/[0.03] border border-white/10 p-6">
        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <i className="fa-solid fa-arrow-right-from-bracket text-cyan-400"></i>
          Output Model: Same Principle Applies
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          The agent should reason from conversation, workspace evidence, memory and tool observations,
          produce its actual response/result, and then the channel adapter transports it.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "model response", color: "text-purple-300" },
            { label: "≠", color: "text-gray-600" },
            { label: "tool request", color: "text-cyan-300" },
            { label: "≠", color: "text-gray-600" },
            { label: "approval", color: "text-amber-300" },
            { label: "≠", color: "text-gray-600" },
            { label: "execution", color: "text-emerald-300" },
            { label: "≠", color: "text-gray-600" },
            { label: "validation", color: "text-blue-300" },
            { label: "≠", color: "text-gray-600" },
            { label: "completion", color: "text-rose-300" },
          ].map((item, i) => (
            <span key={i} className={`px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono ${item.color}`}>
              {item.label}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-xs mt-4">
          Codex and OpenHands both reinforce this typed lifecycle. Hermes reinforces continuity across channels.
          A browser relay, Telegram gateway or CLI formatter should not rewrite the semantic result.
        </p>
      </div>

      {/* Authority Boundary */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/20 p-6">
        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
          <i className="fa-solid fa-border-all text-purple-400"></i>
          Model-vs-Runtime Authority Boundary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-purple-300 mb-2">Deterministic Infrastructure Owns:</h4>
            <ul className="space-y-1.5">
              {["Identity verification", "Transport mechanics", "Execution safety", "Evidence integrity", "Workspace isolation", "Checkpoint/recovery"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <i className="fa-solid fa-lock text-purple-400/60 text-xs"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-2">Reasoning Agent Owns:</h4>
            <ul className="space-y-1.5">
              {["Semantic interpretation", "Planning choice", "Tool/evidence strategy", "Response generation", "Continuation decisions", "Context relevance"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <i className="fa-solid fa-brain text-cyan-400/60 text-xs"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
