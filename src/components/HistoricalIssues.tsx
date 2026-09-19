import { useState } from "react";

interface Issue {
  id: number;
  title: string;
  type: "architectural" | "config" | "security" | "portability" | "identity" | "dead-auth" | "config-hygiene" | "product-truth" | "config-truth";
  status: "fixed" | "partially-fixed" | "unresolved" | "needs-verification" | "needs-cleanup";
  description: string;
  source: string;
}

interface DriftIssue {
  id: number;
  type: string;
  location: string;
  status: "removed-from-source" | "references-remain" | "present-needs-classification" | "may-be-legitimate" | "unresolved";
  description: string;
}

interface Mistake {
  id: number;
  pattern: string;
  example: string;
  lesson: string;
  category: "agent" | "brew-specific";
}

const brewDefects: Issue[] = [
  {
    id: 1,
    title: "Repository not behaving as one clean consolidated authority",
    type: "architectural",
    status: "partially-fixed",
    description: "Multiple execution concepts, compatibility paths, legacy routes, duplicate runtime responsibilities",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 2,
    title: "Workspace presentation model inconsistent with intended UI model",
    type: "architectural",
    status: "unresolved",
    description: "Source/config contains separate projects, agents, integrations concepts",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 3,
    title: "Configuration authority heavily fragmented",
    type: "config",
    status: "unresolved",
    description: "Many config files exist but unused/partially used/duplicate",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 4,
    title: "file-adapter.json lies about effective policy",
    type: "product-truth",
    status: "unresolved",
    description: "allowedRoots exist declaratively but not used as actual enforcement",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 5,
    title: "command-policy.json not actual runtime policy authority",
    type: "config-truth",
    status: "unresolved",
    description: "JSON is deploy/config material, enforcement hardcoded in JS",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 6,
    title: "Real credentials stored in repository config",
    type: "security",
    status: "fixed",
    description: "config/identity/device-auth.json contained operator token",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 7,
    title: "Hardcoded installation/user paths",
    type: "portability",
    status: "partially-fixed",
    description: "config/brew.json contained specific Windows user path",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 8,
    title: "Static node/device identity in source",
    type: "identity",
    status: "needs-verification",
    description: "config/node.json contained fixed node UUID",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 9,
    title: "Dead Telegram authority remains",
    type: "dead-auth",
    status: "needs-cleanup",
    description: "Hardcoded Telegram identity in config classified as effectively dead",
    source: "Session Artifacts Audit (2026-08-10)"
  },
  {
    id: 10,
    title: "Disabled MCP/A2A example config in active config tree",
    type: "config-hygiene",
    status: "unresolved",
    description: "Present (may be templates, not defects)",
    source: "Session Artifacts Audit (2026-08-10)"
  }
];

const driftIssues: DriftIssue[] = [
  {
    id: 1,
    type: "Legacy brew/start.js references",
    location: "AGENTS.md, README.md, project-operating-profile.mjs, brew-workspace-rules.json",
    status: "references-remain",
    description: "Removed from source, but references remain in docs"
  },
  {
    id: 2,
    type: "agent-loop-checkpoint.mjs",
    location: "brew/runtime/agents/",
    status: "present-needs-classification",
    description: "Needs classification - may be legitimate or legacy"
  },
  {
    id: 3,
    type: "distributed-dispatcher.mjs",
    location: "brew/runtime/cluster/",
    status: "present-needs-classification",
    description: "Needs classification - may be legitimate or legacy"
  },
  {
    id: 4,
    type: "restart-manager.mjs, restart-continuity.mjs",
    location: "brew/runtime/healing/, brew/continuity/",
    status: "present-needs-classification",
    description: "Needs classification - may be legitimate or legacy"
  },
  {
    id: 5,
    type: "qa-dispatcher.mjs",
    location: "brew/agents/browser-agent/",
    status: "present-needs-classification",
    description: "Needs classification - may be legitimate or legacy"
  },
  {
    id: 6,
    type: "restart.mjs, start.mjs CLI commands",
    location: "brew/cli/commands/",
    status: "may-be-legitimate",
    description: "May be legitimate CLI commands"
  },
  {
    id: 7,
    type: "Hardcoded paths in contracts",
    location: "contracts/brew-workspace-rules.json",
    status: "unresolved",
    description: "Contains C:\\Users\\prave\\.Brew paths"
  },
  {
    id: 8,
    type: "Hardcoded paths in docs",
    location: "docs/architecture/BREW_PATH_MAP.json, docs/governance/MANIFEST_REFERENCE.json",
    status: "unresolved",
    description: "Documentation with hardcoded paths"
  },
  {
    id: 9,
    type: "Hardcoded paths in skills",
    location: "docs/operations/skills/brew-ui-ux.skill.json",
    status: "unresolved",
    description: "installed_ui path hardcoded"
  },
  {
    id: 10,
    type: "Hardcoded paths in cron jobs",
    location: "tools/cron/jobs.json",
    status: "unresolved",
    description: "Memory keeper job script with hardcoded user paths"
  }
];

const agentMistakes: Mistake[] = [
  {
    id: 1,
    pattern: "Patch-first behavior",
    example: "Editing before diagnosis creates drift",
    lesson: "Always diagnose first, identify canonical file, then patch",
    category: "agent"
  },
  {
    id: 2,
    pattern: "Overconfidence",
    example: "Presenting speculative fixes as confirmed",
    lesson: "Report unresolved blockers honestly",
    category: "agent"
  },
  {
    id: 3,
    pattern: "No contract memory",
    example: "Forgetting rules like 'no hardcoded paths', 'single authority', 'do not touch BrewRuntimeContext'",
    lesson: "Need repo-local AGENT_RULES.md + context index",
    category: "agent"
  },
  {
    id: 4,
    pattern: "Test blindness",
    example: "Fixing one failing test but breaking hidden contracts",
    lesson: "Run focused validation first, then wider validation",
    category: "agent"
  },
  {
    id: 5,
    pattern: "Bad file selection",
    example: "Reading wrong files, missing real source, patching compiled/generated files",
    lesson: "Always trace imports before creating missing files",
    category: "agent"
  },
  {
    id: 6,
    pattern: "Limited context",
    example: "Cannot hold whole repo, history, contracts, build logs simultaneously",
    lesson: "Need fixed operating contract for agents",
    category: "agent"
  },
  {
    id: 7,
    pattern: "No runtime truth",
    example: "Relying on code text instead of running tests, checking server health, logs, ports",
    lesson: "Validate with actual runtime evidence",
    category: "agent"
  },
  {
    id: 8,
    pattern: "Weak repo map",
    example: "Not knowing which folder is canonical, which files are archived/stale",
    lesson: "Establish canonical repo root first",
    category: "agent"
  },
  {
    id: 9,
    pattern: "Assumption-based conclusions",
    example: "Claiming config files are dead/unused without proving runtime authority",
    lesson: "Prove which files are actual runtime authorities first",
    category: "agent"
  },
  {
    id: 10,
    pattern: "Cross-platform errors",
    example: "Using Unix syntax in PowerShell",
    lesson: "Detect platform and use correct syntax",
    category: "agent"
  }
];

const brewSpecificMistakes: Mistake[] = [
  {
    id: 1,
    pattern: "Multiple historical roots/copies",
    example: "Created confusion about which was canonical",
    lesson: "Maintain single source of truth",
    category: "brew-specific"
  },
  {
    id: 2,
    pattern: "Generated UI builds committed to source",
    example: "Confusing agents about what's source vs generated",
    lesson: "Keep generated files out of source control",
    category: "brew-specific"
  },
  {
    id: 3,
    pattern: "Validator-generated files mixed with source",
    example: "Runtime state files in workspace confusing the repo map",
    lesson: "Separate generated/validated files from source",
    category: "brew-specific"
  },
  {
    id: 4,
    pattern: "Branch-specific rules without documentation",
    example: "Agents don't know branch-specific constraints",
    lesson: "Document branch rules clearly",
    category: "brew-specific"
  },
  {
    id: 5,
    pattern: "Hardcoded path risks in manifests",
    example: "User-specific paths in contracts and configs",
    lesson: "Use environment variables or relative paths",
    category: "brew-specific"
  },
  {
    id: 6,
    pattern: "Old Avaa references left in codebase",
    example: "Legacy references causing confusion",
    lesson: "Clean up legacy references systematically",
    category: "brew-specific"
  },
  {
    id: 7,
    pattern: "Brew vs UI vs workspace path confusion",
    example: "Three different path concepts that agents mixed up",
    lesson: "Clearly document and separate path concepts",
    category: "brew-specific"
  }
];

const unresolvedItems = [
  {
    category: "NOT-PROVEN",
    items: [
      "Browser live proof (browser not connected)",
      "Crash-during-mutation proof"
    ]
  },
  {
    category: "IN PROGRESS",
    items: [
      "Historical architecture documents reconciled"
    ]
  },
  {
    category: "RUNTIME PROOF INCOMPLETE",
    items: [
      "One correlated ordinary user request through canonical runner",
      "Native provider tool selection from full governed executable catalogue",
      "Tool_call_id → receipt_id → verification evidence linkage",
      "Same-model continuation after tool result",
      "Truthful failure when execution or verification fails",
      "No semantic interception by remaining legacy paths"
    ]
  },
  {
    category: "P0 ITEMS IN PROGRESS",
    items: [
      "Provider result invariant (WARNING) — every adapter must reject empty assistant output, preserve failures without fabricating text",
      "Telegram transport purity (WARNING) — ordinary Telegram input must reach canonical turn exactly once",
      "Legacy response quarantine (NEXT) — duplicate response authorities need cleanup"
    ]
  },
  {
    category: "P1 ITEMS",
    items: [
      "Capability registry (NEXT)",
      "Provider continuation (NEXT)",
      "Recovery/cancellation/restart/resume exactly-once (NEXT)"
    ]
  },
  {
    category: "BLOCKED",
    items: [
      "Deferred capabilities (MCP, skills, scheduler, browser/desktop) — P2, blocked until P0-P1 stable",
      "CI/release (LOCKED) — no release claim until installed runtime, live acceptance, and current-head CI proven"
    ]
  }
];

const statusColors: Record<string, string> = {
  fixed: "bg-green-500/10 text-green-400 border-green-500/30",
  "partially-fixed": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  unresolved: "bg-red-500/10 text-red-400 border-red-500/30",
  "needs-verification": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "needs-cleanup": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "removed-from-source": "bg-green-500/10 text-green-400 border-green-500/30",
  "references-remain": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "present-needs-classification": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "may-be-legitimate": "bg-gray-500/10 text-gray-400 border-gray-500/30"
};

export default function HistoricalIssues() {
  const [activeTab, setActiveTab] = useState<"defects" | "drift" | "mistakes" | "unresolved">("defects");

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">
            Historical Issues, Drift & Mistakes
          </span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Comprehensive tracking of past issues, architectural drift, and lessons learned from MCP memory and session audits.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{brewDefects.filter(d => d.status === "unresolved").length}</div>
          <div className="text-xs text-gray-400">Unresolved Defects</div>
        </div>
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-amber-400">{driftIssues.filter(d => d.status === "unresolved" || d.status === "references-remain").length}</div>
          <div className="text-xs text-gray-400">Active Drift</div>
        </div>
        <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{agentMistakes.length + brewSpecificMistakes.length}</div>
          <div className="text-xs text-gray-400">Mistakes Documented</div>
        </div>
        <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{brewDefects.filter(d => d.status === "fixed").length}</div>
          <div className="text-xs text-gray-400">Issues Fixed</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        {[
          { id: "defects" as const, label: "Brew Defects", count: brewDefects.length },
          { id: "drift" as const, label: "Drift Issues", count: driftIssues.length },
          { id: "mistakes" as const, label: "Mistakes & Lessons", count: agentMistakes.length + brewSpecificMistakes.length },
          { id: "unresolved" as const, label: "Unresolved Items", count: unresolvedItems.reduce((sum, cat) => sum + cat.items.length, 0) }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "text-purple-300 border-b-2 border-purple-400"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab.label} <span className="text-gray-600">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Defects Tab */}
      {activeTab === "defects" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4 mb-4">
            <p className="text-xs text-gray-400">
              <i className="fa-solid fa-circle-info text-blue-400 mr-2"></i>
              Source: Session Artifacts Audit (2026-08-10) — 10 confirmed Brew defects identified
            </p>
          </div>
          {brewDefects.map((defect) => (
            <div key={defect.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-600">#{defect.id}</span>
                  <h3 className="text-sm font-medium text-gray-200">{defect.title}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${statusColors[defect.status]}`}>
                  {defect.status.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{defect.description}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{defect.type}</span>
                <span>•</span>
                <span>{defect.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drift Tab */}
      {activeTab === "drift" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4 mb-4">
            <p className="text-xs text-gray-400">
              <i className="fa-solid fa-triangle-exclamation text-amber-400 mr-2"></i>
              Architectural drift identified from VS Code Agent Limitations discussion (2026-05-07) and current state analysis
            </p>
          </div>
          {driftIssues.map((drift) => (
            <div key={drift.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-600">#{drift.id}</span>
                  <h3 className="text-sm font-medium text-gray-200">{drift.type}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${statusColors[drift.status]}`}>
                  {drift.status.toUpperCase().replace(/-/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{drift.description}</p>
              <div className="text-[10px] text-gray-500">
                <span className="font-mono text-gray-400">{drift.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mistakes Tab */}
      {activeTab === "mistakes" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-robot text-purple-400"></i>
              Agent Behavior Mistakes
            </h3>
            <div className="space-y-3">
              {agentMistakes.map((mistake) => (
                <div key={mistake.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-600">#{mistake.id}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-200 mb-1">{mistake.pattern}</h4>
                      <p className="text-xs text-gray-400 mb-2">
                        <span className="text-gray-500">Example:</span> {mistake.example}
                      </p>
                      <p className="text-xs text-emerald-400">
                        <i className="fa-solid fa-lightbulb mr-1"></i>
                        <span className="text-gray-500">Lesson:</span> {mistake.lesson}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-mug-hot text-amber-400"></i>
              Brew-Specific Mistakes
            </h3>
            <div className="space-y-3">
              {brewSpecificMistakes.map((mistake) => (
                <div key={mistake.id} className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-600">#{mistake.id}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-200 mb-1">{mistake.pattern}</h4>
                      <p className="text-xs text-gray-400 mb-2">
                        <span className="text-gray-500">Example:</span> {mistake.example}
                      </p>
                      <p className="text-xs text-emerald-400">
                        <i className="fa-solid fa-lightbulb mr-1"></i>
                        <span className="text-gray-500">Lesson:</span> {mistake.lesson}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Unresolved Tab */}
      {activeTab === "unresolved" && (
        <div className="space-y-6">
          {unresolvedItems.map((category, idx) => (
            <div key={idx} className="rounded-xl bg-white/[0.02] border border-white/10 p-5">
              <h3 className="text-sm font-bold text-gray-200 mb-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  category.category === "NOT-PROVEN" ? "bg-red-400" :
                  category.category === "IN PROGRESS" ? "bg-amber-400" :
                  category.category === "RUNTIME PROOF INCOMPLETE" ? "bg-orange-400" :
                  category.category === "P0 ITEMS IN PROGRESS" ? "bg-red-400" :
                  category.category === "P1 ITEMS" ? "bg-blue-400" :
                  "bg-gray-400"
                }`}></span>
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-xs text-gray-400">
                    <i className="fa-solid fa-circle text-[4px] text-gray-600 mt-1.5"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Key Insights */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/20 p-6">
        <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb text-yellow-400"></i>
          Key Insights from Historical Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <h4 className="text-sm font-medium text-purple-300 mb-2">Root Cause Pattern</h4>
            <p className="text-xs text-gray-400">
              Most issues stem from <span className="text-purple-300">patch-first behavior</span> — editing before diagnosis creates drift. 
              The lesson: always diagnose first, identify canonical file, then patch.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <h4 className="text-sm font-medium text-cyan-300 mb-2">Architecture Drift Source</h4>
            <p className="text-xs text-gray-400">
              Multiple historical roots/copies, generated UI builds, and validator-generated files mixed with source 
              created confusion about what's canonical vs generated.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <h4 className="text-sm font-medium text-emerald-300 mb-2">What's Been Fixed</h4>
            <p className="text-xs text-gray-400">
              Credentials removed from config, one-agent architecture established, semantic tool preselection removed, 
              scripts categorized, dead scripts removed, guards passing.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/10 p-4">
            <h4 className="text-sm font-medium text-amber-300 mb-2">Critical Path Forward</h4>
            <p className="text-xs text-gray-400">
              Remove reachable secondary semantic authorities (P0), prove provider result invariant (P0), 
              quarantine duplicate response authorities (P0), then advance to capability registry and recovery (P1).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
