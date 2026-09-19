export type PlanState = "proven" | "current" | "next" | "partial" | "blocked" | "historical";

export interface BrewPlanItem {
  id: string;
  order: number;
  lane: string;
  title: string;
  state: PlanState;
  question: string;
  owner: string;
  observable: string;
  falsifier: string;
  acceptance: string[];
  nextAction: string;
  evidence: string[];
  dependsOn?: string[];
}

export interface BrewGap {
  id: string;
  title: string;
  category: "memory" | "recovery" | "provider" | "browser" | "runtime" | "docs";
  severity: "critical" | "high" | "medium";
  state: "partial" | "not_proven" | "blocked" | "cleanup";
  owner: string;
  exactGap: string;
  acceptance: string;
}

export const brewPlanMeta = {
  asOf: "2026-09-18",
  sourceHead: "722fc238",
  sourceShort: "722fc238",
  sourceBranch: "main",
  sourceRepo: "Letterblack0306/brew",
  gptkHead: "66422535a0011f03cf9cda91aae149f7947b3a57",
  gptkShort: "66422535",
  gptkRepo: "Letterblack0306/GPT-Knowledge",
  activeProgram: "REFERENCE-DRIVEN FLOW RECONSTRUCTION",
  architecture: "One persistent reasoning agent using Cline AgentRuntime behind LBE governance; model owns semantic reasoning and tool choice; runtime owns identity, policy, execution, state, evidence, recovery and delivery mechanics.",
  evidenceRule: "Live/runtime evidence outranks source, source outranks docs, docs outrank historical memory/model prior.",
  architectureDecision: {
    clineAgentRuntime: "PROVEN / PRE-EXISTING DECISION",
    clineCoreReuseBoundary: "PROVEN / DOCUMENTED",
    lbeAuthorityBoundary: "PROVEN / DOCUMENTED",
    currentImplementation: "NON-CONFORMING - diverged from approved Cline AgentRuntime integration",
    requiredWork: "Restore the already-approved Cline AgentRuntime → LBE adapter path",
    newDecisionNeeded: false,
  },
  featurePreservationRule: {
    workingProven: "Keep",
    implementedDisconnected: "Reconnect",
    partialInProgress: "Continue from existing owner",
    plannedAccepted: "Preserve as pending",
    historicalReference: "Don't promote to current runtime",
    explicitlySuperseded: "Only then exclude",
  },
  latestCommit: {
    hash: "722fc238",
    date: "2026-09-18",
    message: "Add canonical read-only Git capabilities — git.status and git.diff_summary exposed through capability registry. Shell-safe, workspace/repository-aware, explicitly unavailable outside Git repos. Covered by focused tests. Git write operations intentionally not added (require explicit governance).",
    filesChanged: 5,
    branchStatus: "main = origin/main (up to date), working tree clean",
  },
  previousCommit: {
    hash: "7a16b226",
    date: "2026-09-18",
    message: "docs: classify workspace code health",
    filesChanged: 1,
  },
  readinessVerification: {
    timestamp: "2026-09-18T21:46:00.000Z",
    testCount: 469,
    testPass: 469,
    testFail: 0,
    rootTests: 47,
    readinessGuards: 10,
    readinessGuardsPassed: 10,
    watcherTests: "4/4",
    memoryWatcherFix: "Security-rejected candidates no longer emitted as proposals",
    resourcePolicy: { entries: 48, sensitive: 13, classifications: 8 },
    browserTools: 6,
    fileAdapterTools: 5,
    status: "ALL GUARDS PASS",
    uncommitted: false,
    deepAuditPart2: {
      completed: true,
      telegramTestsReconciled: true,
      logicOwnershipGuard: "PASS",
      importBoundaryGuard: "PASS",
      releasePreflight: "PASS with expected node_modules warning",
    },
  },
};

export const provenFoundations = [
  {
    id: "one-reasoning-agent",
    title: "One reasoning-agent authority",
    state: "proven" as const,
    evidence: "Canonical query -> runTurn() -> agent-tool-loop; semantic tool preselection and secondary planners removed from the canonical path.",
  },
  {
    id: "capability-registry",
    title: "Canonical capability registry",
    state: "proven" as const,
    evidence: "Model-visible tools and runtime execution derive from the active capability registry; local and MCP tools are composed into the same view.",
  },
  {
    id: "evidence-backed-final",
    title: "Receipt-bound finalization",
    state: "proven" as const,
    evidence: "After tool use, final responses must reference receipts from the current operation; unsupported execution claims are rejected.",
  },
  {
    id: "scheduler-foundation",
    title: "Scheduled/planned/adhoc task foundation",
    state: "proven" as const,
    evidence: "Current capability registry exposes durable scheduler create/list/update/delete/run surfaces through the canonical runtime.",
  },
  {
    id: "memory-curation",
    title: "Governed memory store and retrieval",
    state: "proven" as const,
    evidence: "Memory supports scoped retrieval, curation, verification, contradiction reconciliation, semantic indexing and integrity checks.",
  },
  {
    id: "batch-b-static",
    title: "Batch B static regression",
    state: "proven" as const,
    evidence: "418 tests plus readiness/runtime truth/release postflight passed in the reported Batch B checkpoint.",
  },
];

export const primaryPlan: BrewPlanItem[] = [
  {
    id: "B1",
    order: 1,
    lane: "Identity",
    title: "Operation / Session / Turn identity",
    state: "current",
    question: "What exact IDs bind the accepted user objective, model turn, provider attempt, tool call, receipt, checkpoint and final response end to end?",
    owner: "brew-runner + agent-tool-loop + session/journal/checkpoint owners",
    observable: "One correlated trace showing the same operation identity across ingress, model event, tool call, receipt, continuation and terminal result.",
    falsifier: "Any active path emits a model/tool/result event that cannot be correlated to the originating operation or creates a competing turn authority.",
    acceptance: [
      "One ordinary user request produces one durable operation identity.",
      "Every provider/tool/receipt event is attributable to that operation.",
      "Turn/session identifiers have one documented owner and stable lifecycle.",
      "A final response can be traced back to the originating user turn without heuristic matching.",
    ],
    nextAction: "Trace one real canonical request from ingress through provider/tool continuation and record the exact identity handoffs before changing code.",
    evidence: [
      "CURRENT_POSITION.md names B1 as the first flow-reconstruction lane.",
      "Current tool loop already carries operationId, jobId, toolCallId and receiptId but end-to-end ownership still needs proof.",
    ],
  },
  {
    id: "B2",
    order: 2,
    lane: "Workspace",
    title: "Workspace / project authority",
    state: "next",
    question: "Where is workspace identity selected, frozen and revalidated for one operation, including retries and resume?",
    owner: "workspace selection/state resolver + operation creation + capability execution",
    observable: "Every consequential tool receipt/checkpoint identifies the same workspace/project/revision unless an explicit transition is recorded.",
    falsifier: "A retry, checkpoint restore, capability call or multi-repo step can silently target a different workspace/revision.",
    acceptance: [
      "Workspace identity is explicit at operation creation.",
      "Consequential capability calls receive the operation workspace identity.",
      "Resume rejects foreign/stale workspace or revision state.",
      "Multi-repository work records each target explicitly instead of relying on mutable global workspace.",
    ],
    nextAction: "Map workspace selection and propagation from ingress to each consequential capability and checkpoint.",
    evidence: [
      "CURRENT_POSITION.md B2 requires immutable workspace/project identity and stale-state rejection.",
      "BirdEye is the preferred local evidence layer when Brew is registered and reachable.",
    ],
    dependsOn: ["B1"],
  },
  {
    id: "B3",
    order: 3,
    lane: "Evidence",
    title: "Evidence ownership and claim matching",
    state: "next",
    question: "Which authoritative observable proves each class of claim, and who owns that evidence?",
    owner: "operation journal + tool receipts + validators + external delivery evidence",
    observable: "Claim -> required evidence type -> producer -> target identity -> operation/revision binding -> evaluator is explicit and machine-checkable.",
    falsifier: "An unrelated successful receipt can satisfy a stronger claim such as browser delivery, file mutation, restart recovery or deployment.",
    acceptance: [
      "Execution claims reference receipts from the same operation.",
      "Repository/browser/delivery claims require target-specific evidence.",
      "Evidence records include subject/target identity and revision where relevant.",
      "Validation distinguishes internal execution success from external completion.",
    ],
    nextAction: "Build a claim/evidence matrix for file, terminal, browser, provider, Telegram and installed-runtime outcomes and test one mismatch case.",
    evidence: [
      "agent-tool-loop already validates receipt identity and operation membership.",
      "CURRENT_POSITION.md B3 requires claim-specific evidence ownership rather than generic green receipts.",
    ],
    dependsOn: ["B1", "B2"],
  },
  {
    id: "B4",
    order: 4,
    lane: "Recovery",
    title: "Retry / checkpoint / cancel / restart continuation",
    state: "next",
    question: "After interruption or restart, how is the one valid continuation found and how are repeated consequential effects prevented?",
    owner: "agent-tool-loop checkpointing + run supervisor + checkpoint store + scheduler/jobs + operation journal",
    observable: "Kill/restart trace: persisted state -> rediscovery -> workspace/revision revalidation -> canonical model continuation -> no duplicate side effect -> correlated terminal result.",
    falsifier: "Checkpoint existence is treated as recovery proof without restart discovery/re-entry, or a completed mutation repeats after resume.",
    acceptance: [
      "Cancellation reaches provider, tool/child/browser execution and job state.",
      "Restart discovers unfinished eligible work.",
      "Checkpoint restore verifies operation/workspace/revision compatibility.",
      "Completed consequential actions are not repeated.",
      "Recovery keeps evidence correlation intact through terminal completion.",
    ],
    nextAction: "Run one bounded process-loss scenario on a reversible operation and record pre-crash receipt, restart discovery, revalidation and post-restart continuation.",
    evidence: [
      "Durable checkpoints and receipts exist in the current loop.",
      "Full restart/resume/exactly-once behavior remains an explicit proof obligation.",
    ],
    dependsOn: ["B1", "B2", "B3"],
  },
  {
    id: "B5",
    order: 5,
    lane: "Context",
    title: "Context-on-demand and memory freshness",
    state: "next",
    question: "What context is always present, what is retrieved on demand, and how are stale memories corrected or excluded?",
    owner: "memory service + context service + BirdEye/GPT-K routing + session history",
    observable: "A turn can show provenance, scope, freshness and retrieval path for each injected memory/project/skill/history item.",
    falsifier: "A remembered conclusion overrides newer source/runtime truth, or missing retrieval is reported as true absence without checking the authoritative source.",
    acceptance: [
      "Memory records carry scope, provenance and verification state.",
      "Context is bounded and task-relevant instead of a hidden giant startup payload.",
      "Retrieval failure is distinguishable from absence.",
      "Stale/contradicted memories are excluded or corrected.",
      "BirdEye, GPT-K and Drive roles remain distinct rather than becoming duplicate authorities.",
    ],
    nextAction: "Trace one turn that needs prior project context and record which context came from session, Brew memory, BirdEye, GPT-K and historical Drive evidence.",
    evidence: [
      "Current memory service supports scoped relevance, confidence, verification and contradiction reconciliation.",
      "Automatic governed intake/promotion is still partial and remains a separate gap.",
    ],
    dependsOn: ["B1", "B2", "B3"],
  },
  {
    id: "B6",
    order: 6,
    lane: "Completion",
    title: "External completion and delivery truth",
    state: "next",
    question: "What proves the requested consequence reached the intended external target rather than merely completing internally?",
    owner: "channel/browser/UI/deployment adapters + operation evidence",
    observable: "Target-specific observable (rendered browser state, Telegram delivery, repository revision, deployed runtime identity) correlated to the originating operation.",
    falsifier: "The runtime reports success because a local step finished while the requested external consequence is absent.",
    acceptance: [
      "Internal reasoning, execution, validation, durable completion and external delivery are separately represented.",
      "Browser tasks require rendered/target-page evidence.",
      "Messaging tasks require delivery evidence.",
      "Deployment requires installed-runtime identity and live behavior.",
      "Partial/blocked outcomes are reported truthfully when delivery fails after execution.",
    ],
    nextAction: "Complete the currently blocked ChatGPT posting acceptance by proving exact target binding and composer/page state, without patching selectors unless the composer is visibly available and the tool still fails.",
    evidence: [
      "Latest Batch B run: relay :9333 PASS, Chrome CDP :7430 PASS, posting PARTIAL, blocker BROWSER_TARGET_COMPOSER_UNAVAILABLE.",
      "No source patch is justified by the current browser evidence.",
    ],
    dependsOn: ["B1", "B2", "B3", "B4"],
  },
];

export const openGaps: BrewGap[] = [
  {
    id: "memory-promotion",
    title: "Automatic governed memory intake",
    category: "memory",
    severity: "high",
    state: "partial",
    owner: "current memory curation/promotion layer",
    exactGap: "Storage, curation, verification and semantic retrieval exist; automatic event -> proposal -> validation -> dedupe/sensitivity -> governed commit/reject is not proven.",
    acceptance: "A new candidate memory is proposed from an eligible event, evaluated against policy/freshness/duplicates, committed or rejected with audit evidence, and becomes retrievable only when allowed.",
  },
  {
    id: "recovery-e2e",
    title: "Restart/resume/exactly-once live proof",
    category: "recovery",
    severity: "critical",
    state: "not_proven",
    owner: "checkpoint/supervisor/jobs/operation journal",
    exactGap: "Checkpoint primitives exist, but process-loss rediscovery, revalidation, continuation and non-duplication are not yet proven end to end.",
    acceptance: "A reversible operation survives process death, resumes through the canonical model loop, preserves correlation and does not repeat a completed side effect.",
  },
  {
    id: "provider-e2e",
    title: "Provider breadth and provider-native tool continuation",
    category: "provider",
    severity: "high",
    state: "not_proven",
    owner: "provider registry/manager/adapters",
    exactGap: "Provider foundations exist; broader provider readiness/secret lifecycle and live cloud/local tool-call round trips remain incomplete.",
    acceptance: "At least one cloud and one local provider complete real turns, and one tool-capable provider completes tool call -> governed execution -> observation -> same-turn continuation.",
  },
  {
    id: "browser-e2e",
    title: "Browser / ChatGPT posting E2E",
    category: "browser",
    severity: "medium",
    state: "blocked",
    owner: "canonical browser relay + posting tool + target binding",
    exactGap: "Relay and CDP are proven healthy; live send remains unproven because the bound target did not expose a usable composer.",
    acceptance: "Exact intended conversation is bound, composer is present and usable, insertion/send succeeds, and the submitted message is visibly observable.",
  },
  {
    id: "installed-runtime",
    title: "Installed-runtime identity and restart proof",
    category: "runtime",
    severity: "critical",
    state: "not_proven",
    owner: "release/deploy/runtime identity path",
    exactGap: "Source tests/readiness do not establish exact deployed source identity, restart rediscovery or installed-runtime behavior.",
    acceptance: "Clean source -> deployed build -> runtime identity match -> smoke tests -> restart rediscovery -> source tree remains clean.",
  },
  {
    id: "docs-authority",
    title: "Roadmap/document authority consolidation",
    category: "docs",
    severity: "high",
    state: "cleanup",
    owner: "current-position + consolidated execution packet",
    exactGap: "Historical plans still describe removed planner/workspace-agent mechanisms and must not appear as active implementation authority.",
    acceptance: "One active roadmap names current owners/paths; contradictory plans are explicitly historical; dashboard data cites current source revision and evidence level.",
  },
];

export const browserAcceptance = {
  status: "PARTIAL",
  blocker: "BROWSER_TARGET_COMPOSER_UNAVAILABLE",
  sourceHead: brewPlanMeta.sourceShort,
  tests: "418 tests + readiness PASS",
  relay: "127.0.0.1:9333 PASS",
  cdp: "127.0.0.1:7430 PASS",
  posting: "Attempted; no visible submitted message proven",
  sourcePatchJustified: false,
  nextEvidence: "Prove exact ChatGPT conversation binding and concrete composer DOM/page state. Patch posting selectors only if the correct loaded/authenticated target visibly has a usable composer and the canonical tool still cannot detect/use it.",
};

export const planningSources = [
  {
    label: "Brew current source",
    ref: brewPlanMeta.sourceShort,
    role: "implementation truth",
  },
  {
    label: "docs/status/CURRENT_POSITION.md",
    ref: brewPlanMeta.sourceShort,
    role: "current flow-reconstruction questions and evidence hierarchy",
  },
  {
    label: "docs/next-phase/NEXT_PHASE_CONSOLIDATED_EXECUTION_PACKET.md",
    ref: brewPlanMeta.sourceShort,
    role: "remaining product-alignment and acceptance gates",
  },
  {
    label: "GPT-Knowledge main",
    ref: brewPlanMeta.gptkShort,
    role: "reference methods, agent comparisons and reusable design evidence",
  },
  {
    label: "BirdEye",
    ref: "local MCP/index",
    role: "preferred local workspace/index evidence when reachable",
  },
  {
    label: "Google Drive / historical export",
    ref: "historical",
    role: "past plans, conversations and design decisions; never overrides current source/runtime",
  },
];
