import { useState } from "react";

interface DriveLane {
  id: number;
  title: string;
  originalIntent: string;
  currentStatus: "implemented" | "superseded" | "partial" | "obsolete";
  verdict: string;
  details: string;
  currentImplementation?: string;
}

const driveLanes: DriveLane[] = [
  {
    id: 1,
    title: "Unified Tool Catalog",
    originalIntent: "Discover tools automatically and expose truthful capabilities",
    currentStatus: "implemented",
    verdict: "IMPLEMENTED / architecture improved beyond old plan",
    details: "Current Brew has a canonical capability registry exposing filesystem, workspace, terminal, scheduling, maintenance, notifications, web, MCP, provider, browser, runtime-health, and local-tool capabilities. It dynamically adds registered local tools and healthy MCP tools and exposes availability/health/provenance to the model.",
    currentImplementation: "tool-manifest.mjs now derives the manifest directly from that active capability registry rather than maintaining a second hardcoded authority.",
  },
  {
    id: 2,
    title: "Discovery Before Mutation",
    originalIntent: "Inspect target before writing",
    currentStatus: "implemented",
    verdict: "IMPLEMENTED",
    details: "Current workspace-mutation-service.mjs contains that exact rejection state: a write without the required discovery returns DISCOVERY_REQUIRED and instructs the agent to inspect/read first.",
  },
  {
    id: 3,
    title: "Governed Memory Promotion",
    originalIntent: "Propose → validate → dedupe → classify → persist memory",
    currentStatus: "partial",
    verdict: "PARTIALLY IMPLEMENTED — automatic promotion pipeline missing",
    details: "Current Brew memory is considerably stronger than the old Drive matrix suggested. It already supports structured memory records, verification state, edit/quarantine/forget, corruption checks, contradiction reconciliation, superseding old memories, scoped retrieval, confidence and recency, usage tracking, semantic search, and semantic index integrity checking. The CLI exposes semantic-status, semantic-rebuild, semantic-search, verify, quarantine, forget, context, etc.",
    currentImplementation: "Missing: automatic evidence-driven memory intake and promotion governance. The Drive roadmap envisioned an automatic event → memory proposal → validator → duplicate check → sensitivity check → hot/warm/cold classification → governed commit/reject → audit pipeline. Searching for memory-watcher finds the roadmap describing what should be created, not an active watcher implementation.",
  },
  {
    id: 4,
    title: "Retry / Verifier Loop",
    originalIntent: "Observe failed execution and adapt before giving up",
    currentStatus: "superseded",
    verdict: "SUPERSEDED in architecture; validation/recovery proof still incomplete",
    details: "The old plan expected a deterministic agent-loop.mjs + provider-planner.mjs verifier/retry pipeline. Those authorities were deliberately removed. Current agent-tool-loop.mjs instead gives each real execution receipt back to the model, which chooses the next tool, changes approach, asks the user, or completes. It prevents repeated identical calls without new evidence and supports durable checkpoints. After execution, receipts are returned to the model and checkpoints are persisted; if durable receipt/checkpoint persistence fails, execution stops rather than pretending success. It also validates final evidence references against actual receipts from the current operation.",
    currentImplementation: "The old 'generic verifier chooses retry steps' should NOT be built. What remains is broader claim-specific validation and end-to-end recovery proof, not another planner.",
  },
  {
    id: 5,
    title: "Workspace Agent",
    originalIntent: "Scheduled maintenance and workspace work",
    currentStatus: "obsolete",
    verdict: "OLD AGENT OBSOLETE; underlying capability SUPERSEDED/RETAINED",
    details: "The Drive plan expected a standalone autonomous workspace agent. That is no longer compatible with current Brew. Current brew/agents/workspace-agent/core/ has been reduced to useful services such as workspace-retrieval-index.mjs and skill-fetcher.mjs rather than maintaining an independent planning brain. Workspace maintenance is exposed as runtime capability through the canonical registry, and scheduling is exposed as normal Brew tools.",
    currentImplementation: "OLD: Workspace Agent → independently plans → maintenance\nCURRENT: Primary Brew model → maintenance.inspect / repair → workspace.search → scheduler.* → normal policy/evidence/runtime",
  },
  {
    id: 6,
    title: "Semantic Long-Term Memory",
    originalIntent: "Searchable semantic recall over durable memory",
    currentStatus: "superseded",
    verdict: "FUNCTION IMPLEMENTED / STORAGE DESIGN SUPERSEDED",
    details: "Semantic memory exists now. Current implementation: verified memory records → embedding adapter → integrity-checked semantic index → semantic query → ranked records. It verifies memory-store integrity, source hash, embedding provider/model identity, dimensions, vector validity, and stale-index detection.",
    currentImplementation: "The Drive plan prescribed: SQLite = truth, LanceDB = vector index, Markdown = human-readable projection, JSONL = audit. Current implementation instead uses JSONL-curated memory plus an integrity-protected JSON semantic index. Therefore LanceDB itself is not a missing product feature. It was an implementation choice. If current performance/data-volume requirements eventually require an embedded vector DB, that can be reconsidered. It should not be restored simply because an old roadmap said 'LanceDB.'",
  },
];

const statusConfig = {
  implemented: { label: "IMPLEMENTED", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", icon: "fa-circle-check" },
  superseded: { label: "SUPERSEDED", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "fa-arrows-rotate" },
  partial: { label: "PARTIAL", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: "fa-circle-half-stroke" },
  obsolete: { label: "OBSOLETE", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", icon: "fa-circle-xmark" },
};

export default function DriveReconciliation() {
  const [expandedLane, setExpandedLane] = useState<number | null>(null);

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Drive Plan vs Current Brew
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Comparison of the 6-lane memory/autonomy roadmap from the Google Drive snapshot against current Brew <code className="text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded text-sm">main</code> at commit <code className="text-gray-300">c37205cb</code>.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">2</div>
          <div className="text-xs text-gray-400">Implemented</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">2</div>
          <div className="text-xs text-gray-400">Superseded</div>
        </div>
        <div className="rounded-xl bg-orange-500/5 border border-orange-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">1</div>
          <div className="text-xs text-gray-400">Partial</div>
        </div>
        <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">1</div>
          <div className="text-xs text-gray-400">Obsolete</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="rounded-2xl bg-blue-500/5 border border-blue-500/20 p-6 mb-8">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-lightbulb text-blue-400 mt-1"></i>
          <div>
            <h3 className="font-bold text-blue-300 mb-2">Key Insight</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              The Drive review does <span className="text-blue-300">not</span> reveal a large collection of lost agents that should be restored.
              It shows that several old feature goals are already implemented, several old implementations were correctly removed because they created secondary reasoning authorities,
              some implementation choices were superseded not forgotten, and the main actual capability gap is automatic governed memory promotion.
            </p>
          </div>
        </div>
      </div>

      {/* Lane cards */}
      <div className="space-y-4">
        {driveLanes.map((lane) => {
          const config = statusConfig[lane.currentStatus];
          const isExpanded = expandedLane === lane.id;
          return (
            <div key={lane.id} className={`rounded-xl border ${config.border} ${config.bg} overflow-hidden`}>
              <button
                onClick={() => setExpandedLane(isExpanded ? null : lane.id)}
                className="w-full p-5 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-gray-300">{lane.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-gray-200">{lane.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${config.bg} ${config.color} ${config.border}`}>
                        <i className={`fa-solid ${config.icon} mr-1`}></i>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{lane.originalIntent}</p>
                    <p className={`text-sm font-medium ${config.color}`}>{lane.verdict}</p>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}></i>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-0 border-t border-white/5">
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Details</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">{lane.details}</p>
                    </div>
                    {lane.currentImplementation && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Current Implementation</h4>
                        <pre className="bg-black/30 rounded-lg p-3 text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto border border-white/5 whitespace-pre-wrap">
                          {lane.currentImplementation}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Documentation defect */}
      <div className="mt-8 rounded-2xl bg-red-500/5 border border-red-500/20 p-6">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-triangle-exclamation text-red-400 mt-1"></i>
          <div>
            <h3 className="font-bold text-red-300 mb-2">Documentation-Truth Defect</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              <code className="text-red-300 bg-red-500/10 px-1.5 py-0.5 rounded text-xs">BREW_MEMORY_AND_AUTONOMY_IMPL_PLAN.md</code> is still labeled active
              while telling developers to extend files that current ADR-0001 says must remain removed.
              This is a documentation cleanup defect.
            </p>
            <p className="text-sm text-gray-400">
              The consolidated packet explicitly requires contradictory historical architecture docs to be historicalized or removed
              and says there should be no duplicated active roadmap.
            </p>
          </div>
        </div>
      </div>

      {/* Active roadmap */}
      <div className="mt-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-6">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-map text-emerald-400 mt-1"></i>
          <div>
            <h3 className="font-bold text-emerald-300 mb-2">Active Roadmap</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              The newer current source already has a better master program than the old Drive plans:
            </p>
            <code className="text-xs text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded font-mono block mb-3">
              NEXT_PHASE_CONSOLIDATED_EXECUTION_PACKET.md
            </code>
            <p className="text-sm text-gray-400 mb-3">It defines:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "0 Repository hygiene",
                "1 Runtime authority",
                "2 Provider platform",
                "3 Operation lifecycle/recovery",
                "4 UI + CLI contracts",
                "5 Browser/repository E2E",
                "6 Installed-runtime proof",
                "7 Documentation + branch closure",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-300 bg-white/5 rounded-lg px-3 py-2">
                  <span className="text-emerald-400 font-mono">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-3">
              The old Drive plans should now be treated as <span className="text-emerald-300">requirements/history to reconcile into this packet</span>, not parallel execution plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
