import { useState } from "react";

interface Commit {
  date: string;
  hash: string;
  message: string;
  type: "feat" | "fix" | "test" | "docs" | "merge";
}

const commits: Commit[] = [
  { date: "Sep 16, 2026", hash: "dc477b9", message: "test: remove dead MCP contract expectations", type: "test" },
  { date: "Sep 16, 2026", hash: "c22a78e", message: "fix(eyes): reconcile deleted workspace rows", type: "fix" },
  { date: "Sep 16, 2026", hash: "134ebd5", message: "fix(workspace_identity): catch git timeout in workspace_identity/revision_status", type: "fix" },
  { date: "Sep 15, 2026", hash: "ac18e62", message: "fix(eyes): bootstrap missing query projection", type: "fix" },
  { date: "Sep 15, 2026", hash: "6f9eb88", message: "fix(eyes): ignore generated database artifacts", type: "fix" },
  { date: "Sep 15, 2026", hash: "dec1ad0", message: "feat(mcp): add bounded BirdEye inspection", type: "feat" },
  { date: "Sep 1, 2026", hash: "8deeb21", message: "feat: evolve BirdEye ecosystem and generated-index boundaries", type: "feat" },
  { date: "Aug 31, 2026", hash: "7f9ba3c", message: "feat: unify BirdEye Skills and indexed roots", type: "feat" },
  { date: "Aug 31, 2026", hash: "3eeadae", message: "docs: add plan-only hybrid index and vector retrieval design", type: "docs" },
  { date: "Aug 24, 2026", hash: "ac6beca", message: "fix(birdeye): persist terminal trace status", type: "fix" },
  { date: "Aug 24, 2026", hash: "6a14d48", message: "feat(birdeye): index Memory workspace root", type: "feat" },
  { date: "Aug 24, 2026", hash: "9ea7eeb", message: "test(bridge): cover workspace file SHA projection", type: "test" },
  { date: "Aug 24, 2026", hash: "127e8df", message: "feat(bridge): expose read-only workspace file SHA state", type: "feat" },
  { date: "Aug 24, 2026", hash: "8d917b6", message: "fix(config): correct access-browser-agent root to verified path", type: "fix" },
  { date: "Aug 24, 2026", hash: "c7f099a", message: "Merge PR #3: feat: add workspace-scoped diagnostic bridge", type: "merge" },
  { date: "Aug 24, 2026", hash: "427be18", message: "Merge: reconcile parallel add/add implementations into single canonical owners", type: "merge" },
  { date: "Aug 23, 2026", hash: "7ad49b4", message: "fix(test): accept history kwarg in run_sequence test doubles", type: "fix" },
  { date: "Aug 23, 2026", hash: "97f72ba", message: "feat(history): chronological runtime event history persisted per execution with event_history_sha256", type: "feat" },
  { date: "Aug 23, 2026", hash: "f790f1c", message: "fix(evidence): pass cwd to subprocess for test-double compatibility", type: "fix" },
  { date: "Aug 23, 2026", hash: "28732e5", message: "feat(evidence): execution receipts with before/after diff SHAs and side-effect detection", type: "feat" },
  { date: "Aug 23, 2026", hash: "634a647", message: "feat(mcp): resolve project IDs to local paths from GPT-Knowledge local-projects.json", type: "feat" },
  { date: "Aug 23, 2026", hash: "71354ef", message: "feat(projection): register memory, brew, adobe, agent-harness board projects", type: "feat" },
  { date: "Aug 22, 2026", hash: "62d05cd", message: "feat(projection): add local BirdEye project workspace projection layer", type: "feat" },
  { date: "Aug 22, 2026", hash: "3fc2779", message: "Merge PR #1: Add workspace-derived BirdEye watch command", type: "merge" },
  { date: "Aug 9, 2026", hash: "b48832d", message: "test: rename duplicate test functions to unique names", type: "test" },
  { date: "Aug 8, 2026", hash: "ba7c2f6", message: "fix: make _command_allowed fail closed (no permissive fallbacks)", type: "fix" },
  { date: "Aug 8, 2026", hash: "6bc065f", message: "feat: add safe workspace terminal access (workspace_run, workspace_run_sequence, workspace_command_history)", type: "feat" },
  { date: "Aug 8, 2026", hash: "ca24913", message: "test(identity): cover revision evidence states", type: "test" },
  { date: "Aug 8, 2026", hash: "5c2e764", message: "feat(mcp): expose workspace identity and revision status", type: "feat" },
  { date: "Aug 8, 2026", hash: "8620dcf", message: "feat(identity): add read-only workspace revision evidence", type: "feat" },
  { date: "Aug 8, 2026", hash: "f9b2365", message: "feat(mcp): native stdio transport + live incremental watcher", type: "feat" },
  { date: "Aug 8, 2026", hash: "578bfcc", message: "feat(agent): add knowledge root class; add thin MCP surface + config", type: "feat" },
];

const typeColors = {
  feat: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  fix: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  test: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  docs: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  merge: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/30" },
};

const capabilities = [
  { name: "workspace_query", description: "Query workspace state, identity, and revision evidence", icon: "fa-folder-tree" },
  { name: "memory_query", description: "Access canonical historical conversations/messages/provenance", icon: "fa-brain" },
  { name: "skills_query", description: "Consolidated skills retrieval from curated corpus", icon: "fa-wand-magic-sparkles" },
  { name: "workspace_run", description: "Safe workspace terminal access with command policy", icon: "fa-terminal" },
  { name: "workspace_run_sequence", description: "Ordered multi-command execution with stop_on_failure", icon: "fa-list-check" },
  { name: "workspace_command_history", description: "Bounded JSONL execution journal with secret redaction", icon: "fa-clock-rotate-left" },
  { name: "birdeye_search", description: "Search across indexed workspace and knowledge roots", icon: "fa-magnifying-glass" },
  { name: "birdeye_inspect", description: "Bounded inspection of indexed content", icon: "fa-eye" },
  { name: "birdeye_roots", description: "List registered workspace and knowledge roots", icon: "fa-sitemap" },
  { name: "birdeye_status", description: "System health and index status", icon: "fa-heart-pulse" },
  { name: "workspace_identity", description: "Read-only workspace revision evidence and git state", icon: "fa-fingerprint" },
  { name: "revision_status", description: "Repository HEAD, branch, dirty state, and provenance", icon: "fa-code-branch" },
];

const governanceRules = [
  "Read-only git access restricted to subcommand allowlist",
  "Command policy: allow git status/diff/log/branch, npm test/run, python -m pytest",
  "Block shell wrappers (powershell/cmd/bash/sh/wsl)",
  "Block dangerous executables (reg/diskpart/bcdedit/format/shutdown)",
  "Block destructive git (reset --hard, clean -fd, push --force)",
  "Block path escapes and secret paths",
  "Structured execution receipts with before/after HEAD for mutations",
  "Fail-closed: no permissive fallbacks for unknown commands",
  "argv-array enforcement: rejects free-form command strings",
  "No webhook, no new runtime authority",
];

export default function BirdEyeSection() {
  const [showCommits, setShowCommits] = useState(false);
  const [commitFilter, setCommitFilter] = useState<"all" | "feat" | "fix" | "test" | "docs">("all");

  const filteredCommits = commitFilter === "all" 
    ? commits 
    : commits.filter(c => c.type === commitFilter);

  const stats = {
    total: commits.length,
    features: commits.filter(c => c.type === "feat").length,
    fixes: commits.filter(c => c.type === "fix").length,
    tests: commits.filter(c => c.type === "test").length,
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            BirdEye MCP
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          The consolidated client-facing Letterblack MCP route. Provides workspace query, memory query,
          skills query, governed local execution, and GPT-Knowledge route/read access.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Repository: <code className="text-cyan-300 bg-cyan-500/10 px-1.5 py-0.5 rounded">Letterblack0306/Letterblack_BirdEye</code>
          {" • "}48 commits • Python 100%
        </p>
      </div>

      {/* Role in ecosystem */}
      <div className="rounded-2xl bg-cyan-500/5 border border-cyan-500/20 p-6 mb-8">
        <h3 className="font-bold text-cyan-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-diagram-project"></i>
          Role in Letterblack MCP Ecosystem
        </h3>
        <pre className="bg-black/30 rounded-xl p-4 text-xs text-gray-300 font-mono leading-relaxed overflow-x-auto">
{`Codex / Cline / OpenCode / Gemini / Antigravity / Claude
                            │
                            └──> BirdEye MCP
                                  ├── workspace query
                                  ├── memory query
                                  └── skills query

Skills
  -> canonical curated reasoning/workflow corpus
  -> skill-gallery-router may guide where to look
  -> actual curated retrieval uses BirdEye MCP skills(query/fetch/status)

GPT-Knowledge
  -> durable project/method/status/reference projection and routing

BirdEye MCP
  -> consolidated client-facing Letterblack MCP route
  -> current local evidence/index
  -> GPT-Knowledge route/read access
  -> Memory query/read access
  -> consolidated Skills retrieval
  -> workspace/revision identity
  -> governed local execution
  -> EYES/derived query health where active

Memory
  -> canonical historical conversations/messages/provenance
  -> accessed through BirdEye in the validated client topology

GitHub
  -> canonical remote repository/branch/commit/PR/check truth

Runtime / Browser / Provider
  -> live behavior proof`}
        </pre>
        <p className="text-sm text-gray-400 mt-4">
          BirdEye may expose a capability without becoming the canonical owner of the underlying source.
          Memory remains the historical owner, Skills remain the curated methodology/content owner,
          GPT-Knowledge remains the durable project/method projection owner, and GitHub remains remote repository truth.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{stats.features}</div>
          <div className="text-xs text-gray-400">Features</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{stats.fixes}</div>
          <div className="text-xs text-gray-400">Fixes</div>
        </div>
        <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.tests}</div>
          <div className="text-xs text-gray-400">Tests</div>
        </div>
        <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.total}</div>
          <div className="text-xs text-gray-400">Total Commits</div>
        </div>
      </div>

      {/* MCP Tools */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-toolbox text-cyan-400"></i>
          MCP Tools (12 unique tools)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {capabilities.map((cap, i) => (
            <div key={i} className="rounded-xl bg-white/[0.02] border border-white/10 p-4 hover:bg-white/[0.04] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <i className={`fa-solid ${cap.icon} text-cyan-400 text-sm`}></i>
                <code className="text-xs text-cyan-300 font-mono">{cap.name}</code>
              </div>
              <p className="text-xs text-gray-400">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Governance */}
      <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-6 mb-8">
        <h3 className="font-bold text-amber-300 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-shield-halved"></i>
          Governance & Safety Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {governanceRules.map((rule, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <i className="fa-solid fa-lock text-amber-400/60 text-xs mt-1"></i>
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key features timeline */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 mb-8">
        <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-timeline text-emerald-400"></i>
          Key Feature Evolution
        </h3>
        <div className="space-y-4">
          {[
            { date: "Aug 8", title: "Foundation", items: ["Native stdio MCP transport", "Live incremental watcher", "Knowledge root class", "Workspace identity & revision evidence", "Fail-closed command policy"] },
            { date: "Aug 8-9", title: "Safe Terminal Access", items: ["workspace_run with argv-array enforcement", "workspace_run_sequence with stop_on_failure", "Command policy allowlist", "28 regression tests for workspace_run"] },
            { date: "Aug 22-24", title: "Projection Layer", items: ["Config-driven project workspace registry", "Read-only git audit", "Plan/status projection", "Documented-vs-observed HEAD alignment", "Execution receipts with before/after SHAs", "Event history with SHA256 integrity"] },
            { date: "Aug 31 - Sep 1", title: "Skills & Ecosystem", items: ["Unified BirdEye Skills and indexed roots", "Hybrid index and vector retrieval design", "Evolved ecosystem boundaries"] },
            { date: "Sep 15-16", title: "Refinement", items: ["Bounded BirdEye inspection", "Bootstrap missing query projection", "Git timeout handling", "Deleted workspace row reconciliation", "Dead MCP contract cleanup"] },
          ].map((phase, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-16 shrink-0">
                <span className="text-xs font-mono text-cyan-400">{phase.date}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-200 mb-1">{phase.title}</h4>
                <ul className="space-y-0.5">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commit history toggle */}
      <button
        onClick={() => setShowCommits(!showCommits)}
        className="w-full rounded-xl bg-white/[0.03] border border-white/10 p-4 text-left hover:bg-white/[0.05] transition-all mb-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">
            <i className="fa-solid fa-code-commit mr-2 text-purple-400"></i>
            Commit History ({commits.length} commits)
          </span>
          <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${showCommits ? "rotate-180" : ""}`}></i>
        </div>
      </button>

      {showCommits && (
        <div className="rounded-xl bg-white/[0.02] border border-white/10 overflow-hidden">
          {/* Filter */}
          <div className="flex gap-2 p-3 border-b border-white/5">
            {(["all", "feat", "fix", "test", "docs"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setCommitFilter(f)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  commitFilter === f
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>

          {/* Commits list */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommits.map((commit, i) => {
              const colors = typeColors[commit.type];
              return (
                <div key={i} className="flex items-start gap-3 p-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <span className="text-xs text-gray-500 w-24 shrink-0">{commit.date}</span>
                  <code className="text-xs text-gray-400 font-mono w-16 shrink-0">{commit.hash}</code>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} ${colors.border} border shrink-0`}>
                    {commit.type}
                  </span>
                  <span className="text-xs text-gray-300 truncate">{commit.message}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Connection to Brew */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/20 p-6">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-link text-purple-400 mt-1"></i>
          <div>
            <h3 className="font-bold text-purple-300 mb-2">Connection to Brew</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              BirdEye serves as the consolidated MCP route for Brew and other Letterblack projects.
              It provides the local evidence/index layer that Brew can query for workspace state,
              memory provenance, and skills retrieval without creating duplicate authorities.
            </p>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">▸</span>
                Brew's workspace retrieval/index/search can be enhanced by BirdEye's proven projection patterns
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">▸</span>
                BirdEye's execution receipts with before/after SHAs align with Brew's evidence/receipt model
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">▸</span>
                The governed terminal access pattern (fail-closed, allowlist, argv-array) mirrors Brew's tool governance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">▸</span>
                BirdEye's event history with SHA256 integrity supports Brew's durability requirements
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
