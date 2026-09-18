const invariants = [
  {
    id: "A",
    rule: "No channel adapter synthesizes ordinary assistant conversation.",
    category: "Transport Boundary",
    falsifier: "Any channel adapter produces assistant text from its own logic rather than the canonical reasoning model.",
  },
  {
    id: "B",
    rule: "No model/provider result reports success when assistant text is empty AND there is no model tool activity.",
    category: "Empty Response",
    falsifier: "ok:true with empty reply when there is no tool call and no assistant text.",
  },
  {
    id: "C",
    rule: "Runtime/provider/tool/approval failures are never persisted as model-authored assistant messages.",
    category: "Failure Provenance",
    falsifier: "A runtime error appears as if the model said it.",
  },
  {
    id: "D",
    rule: "All supported conversational routes converge on the canonical turn runtime.",
    category: "Authority Convergence",
    falsifier: "Any ordinary natural-language request is semantically routed before the canonical reasoning model.",
  },
  {
    id: "E",
    rule: "Only one subsystem owns durable Session/Turn/Item identity.",
    category: "Lifecycle Authority",
    falsifier: "Two or more subsystems claim to be the durable owner of session/turn/item state.",
  },
  {
    id: "F",
    rule: "Legacy reasoning/dispatch surfaces are either proven reachable, explicitly fail closed, or removed.",
    category: "Legacy Quarantine",
    falsifier: "A legacy surface silently accepts input without being proven reachable or fail-closed.",
  },
  {
    id: "G",
    rule: "New capabilities extend the existing canonical runtime; they do not create a second reasoning authority.",
    category: "Extension Rule",
    falsifier: "A new feature introduces a parallel reasoning path outside the canonical turn.",
  },
  {
    id: "H",
    rule: "Project/workspace memory is explicitly scoped before ranking; unbound sessions cannot retrieve project_fact/decision/solution records.",
    category: "Governed Memory",
    falsifier: "An unbound session returns project-scoped memory records.",
  },
  {
    id: "I",
    rule: "Only explicit user confirmation or runtime validation evidence may establish verified memory authority.",
    category: "Memory Verification",
    falsifier: "Memory becomes 'verified' without explicit user confirmation or runtime validation evidence.",
  },
  {
    id: "J",
    rule: "Cross-project retrieval requires explicit widening and retains visible provenance; foreign-project evidence never becomes active-project self-context.",
    category: "Cross-Project",
    falsifier: "Evidence from another project appears as if it belongs to the active project without provenance.",
  },
];

const categoryColors: Record<string, string> = {
  "Transport Boundary": "text-blue-400",
  "Empty Response": "text-amber-400",
  "Failure Provenance": "text-red-400",
  "Authority Convergence": "text-purple-400",
  "Lifecycle Authority": "text-cyan-400",
  "Legacy Quarantine": "text-gray-400",
  "Extension Rule": "text-emerald-400",
  "Governed Memory": "text-indigo-400",
  "Memory Verification": "text-violet-400",
  "Cross-Project": "text-teal-400",
};

const forbiddenAuthorities = [
  "request_intent_classifier_before_model",
  "scenario_router_for_ordinary_natural_language",
  "heuristic_task_tool_preselection",
  "second_planner_or_controller_outside_canonical_turn",
  "deterministic_completion_judge_replacing_model_reasoning",
];

export default function Invariants() {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
            Cross-Surface Invariants
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          10 regression invariants that must be encoded as tests. Each has an explicit falsifier —
          if the falsifier is observed, the invariant is broken.
        </p>
      </div>

      {/* Invariant cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {invariants.map((inv) => (
          <div key={inv.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                {inv.id}
              </span>
              <span className={`text-xs font-medium ${categoryColors[inv.category]}`}>
                {inv.category}
              </span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed mb-3">{inv.rule}</p>
            <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
              <p className="text-xs text-gray-500">
                <span className="text-red-400 font-medium">Falsifier:</span>{" "}
                <span className="text-gray-400">{inv.falsifier}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Forbidden semantic authorities */}
      <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-6 mb-8">
        <h3 className="font-bold text-red-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-ban"></i>
          Forbidden Semantic Authorities
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          The canonical architecture explicitly forbids these semantic authorities from existing before the model:
        </p>
        <div className="flex flex-wrap gap-2">
          {forbiddenAuthorities.map((auth, i) => (
            <span key={i} className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-mono">
              {auth}
            </span>
          ))}
        </div>
      </div>

      {/* Acceptance falsifiers */}
      <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-6">
        <h3 className="font-bold text-amber-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Acceptance Falsifiers
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          If any of these are observed, the system has not achieved acceptance:
        </p>
        <ul className="space-y-2">
          {[
            "Any ordinary natural-language request is semantically routed before the canonical reasoning model.",
            "Any heuristic request classifier hides otherwise executable tools from the model.",
            "selectedTools telemetry becomes an execution boundary or TOOL_NOT_SELECTED_FOR_TASK-style gate.",
            "Dynamic prompt advertises tools that the native model tool schema marks unavailable.",
            "A second planner/controller decides semantic next actions outside the canonical reasoning turn.",
            "A completion claim after tool use cannot be linked to recorded receipt/evidence identity.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
              <span className="text-amber-400 mt-0.5 shrink-0">⚠</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
