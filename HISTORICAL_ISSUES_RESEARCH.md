# Historical Issues, Drift & Mistakes Research Report

**Date:** 2026-09-18  
**Status:** ✅ COMPLETE - Website Updated

---

## Executive Summary

Successfully created a comprehensive **Historical Issues** tracking component that synthesizes information from:
- MCP memory searches (30+ conversations)
- GPT-Knowledge documents (status.json, plan.json, architecture status)
- Session artifacts audit (2026-08-10)
- VS Code Agent Limitations discussion (2026-05-07)
- Browser Automation Review (2026-07-31)
- Current repository state analysis

This component provides a single source of truth for all past issues, architectural drift, and lessons learned.

---

## What Was Researched

### 1. MCP Memory Search Results

**Search Queries Executed:**
- "Brew unresolved issues not solved drift problems mistakes" → 30 hits
- "Brew MCP memory issues problems blockers unresolved" → 20 hits
- "Brew architecture drift legacy code removal duplicate authorities" → 20 hits

**Key Conversations Analyzed:**
- Session Artifacts Review (6a792353-1c30-83eb-bb4f-8ebb64ce2ee3)
- VS Code Agent Limitations (69fc7782-b244-83eb-ae34-c4c09602b8b5)
- Browser Automation Review (6a6cee2d-98fc-83eb-9889-6788220692de)

### 2. GPT-Knowledge Documents

**Documents Retrieved:**
- `project-engineering/projects/brew/status.json` - Current status
- `project-engineering/projects/brew/plan.json` - Execution plan
- `project-engineering/projects/brew-runtime-architecture-status-2026-09-07.md` - Architecture status
- `project-engineering/project-feature-implementation-plan.md` - Feature plan

### 3. Local Repository Analysis

**Checks Performed:**
- Guard validations (logic-ownership, runtime-authority, state-root, resource-policy)
- Hardcoded path scans
- Legacy file detection
- Current git state analysis

---

## What Was Found

### 1. Brew Defects (10 Confirmed)

From Session Artifacts Audit (2026-08-10):

| # | Issue | Type | Status |
|---|-------|------|--------|
| 1 | Repository not behaving as one clean consolidated authority | Architectural | Partially Fixed |
| 2 | Workspace presentation model inconsistent with intended UI model | Architectural | Unresolved |
| 3 | Configuration authority heavily fragmented | Config | Unresolved |
| 4 | file-adapter.json lies about effective policy | Product Truth | Unresolved |
| 5 | command-policy.json not actual runtime policy authority | Config Truth | Unresolved |
| 6 | Real credentials stored in repository config | Security | **FIXED** |
| 7 | Hardcoded installation/user paths | Portability | Partially Fixed |
| 8 | Static node/device identity in source | Identity | Needs Verification |
| 9 | Dead Telegram authority remains | Dead Auth | Needs Cleanup |
| 10 | Disabled MCP/A2A example config in active config tree | Config Hygiene | Unresolved |

**Status Breakdown:**
- ✅ Fixed: 1
- 🟡 Partially Fixed: 2
- 🔴 Unresolved: 5
- 🔵 Needs Verification: 1
- 🟣 Needs Cleanup: 1

### 2. Drift Issues (10 Identified)

From VS Code Agent Limitations discussion and current state analysis:

| # | Type | Location | Status |
|---|------|----------|--------|
| 1 | Legacy brew/start.js references | AGENTS.md, README.md, etc. | References Remain |
| 2 | agent-loop-checkpoint.mjs | brew/runtime/agents/ | Present - Needs Classification |
| 3 | distributed-dispatcher.mjs | brew/runtime/cluster/ | Present - Needs Classification |
| 4 | restart-manager.mjs, restart-continuity.mjs | brew/runtime/healing/, brew/continuity/ | Present - Needs Classification |
| 5 | qa-dispatcher.mjs | brew/agents/browser-agent/ | Present - Needs Classification |
| 6 | restart.mjs, start.mjs CLI commands | brew/cli/commands/ | May Be Legitimate |
| 7 | Hardcoded paths in contracts | contracts/brew-workspace-rules.json | Unresolved |
| 8 | Hardcoded paths in docs | docs/architecture/BREW_PATH_MAP.json | Unresolved |
| 9 | Hardcoded paths in skills | docs/operations/skills/brew-ui-ux.skill.json | Unresolved |
| 10 | Hardcoded paths in cron jobs | tools/cron/jobs.json | Unresolved |

**Status Breakdown:**
- 🟢 Removed from Source: 0
- 🟡 References Remain: 1
- 🔵 Present - Needs Classification: 4
- ⚪ May Be Legitimate: 1
- 🔴 Unresolved: 4

### 3. Mistakes Documented (17 Total)

#### Agent Behavior Mistakes (10)

| # | Pattern | Example | Lesson |
|---|---------|---------|--------|
| 1 | Patch-first behavior | Editing before diagnosis creates drift | Always diagnose first, identify canonical file, then patch |
| 2 | Overconfidence | Presenting speculative fixes as confirmed | Report unresolved blockers honestly |
| 3 | No contract memory | Forgetting rules like "no hardcoded paths", "single authority" | Need repo-local AGENT_RULES.md + context index |
| 4 | Test blindness | Fixing one failing test but breaking hidden contracts | Run focused validation first, then wider validation |
| 5 | Bad file selection | Reading wrong files, missing real source | Always trace imports before creating missing files |
| 6 | Limited context | Cannot hold whole repo, history, contracts simultaneously | Need fixed operating contract for agents |
| 7 | No runtime truth | Relying on code text instead of running tests | Validate with actual runtime evidence |
| 8 | Weak repo map | Not knowing which folder is canonical | Establish canonical repo root first |
| 9 | Assumption-based conclusions | Claiming config files are dead/unused without proving | Prove which files are actual runtime authorities first |
| 10 | Cross-platform errors | Using Unix syntax in PowerShell | Detect platform and use correct syntax |

#### Brew-Specific Mistakes (7)

| # | Pattern | Example | Lesson |
|---|---------|---------|--------|
| 1 | Multiple historical roots/copies | Created confusion about which was canonical | Maintain single source of truth |
| 2 | Generated UI builds committed to source | Confusing agents about what's source vs generated | Keep generated files out of source control |
| 3 | Validator-generated files mixed with source | Runtime state files in workspace confusing the repo map | Separate generated/validated files from source |
| 4 | Branch-specific rules without documentation | Agents don't know branch-specific constraints | Document branch rules clearly |
| 5 | Hardcoded path risks in manifests | User-specific paths in contracts and configs | Use environment variables or relative paths |
| 6 | Old Avaa references left in codebase | Legacy references causing confusion | Clean up legacy references systematically |
| 7 | Brew vs UI vs workspace path confusion | Three different path concepts that agents mixed up | Clearly document and separate path concepts |

### 4. Unresolved Items (Categorized)

#### NOT-PROVEN
- Browser live proof (browser not connected)
- Crash-during-mutation proof

#### IN PROGRESS
- Historical architecture documents reconciled

#### RUNTIME PROOF INCOMPLETE
- One correlated ordinary user request through canonical runner
- Native provider tool selection from full governed executable catalogue
- Tool_call_id → receipt_id → verification evidence linkage
- Same-model continuation after tool result
- Truthful failure when execution or verification fails
- No semantic interception by remaining legacy paths

#### P0 ITEMS IN PROGRESS
- Provider result invariant (WARNING) — every adapter must reject empty assistant output
- Telegram transport purity (WARNING) — ordinary Telegram input must reach canonical turn exactly once
- Legacy response quarantine (NEXT) — duplicate response authorities need cleanup

#### P1 ITEMS
- Capability registry (NEXT)
- Provider continuation (NEXT)
- Recovery/cancellation/restart/resume exactly-once (NEXT)

#### BLOCKED
- Deferred capabilities (MCP, skills, scheduler, browser/desktop) — P2, blocked until P0-P1 stable
- CI/release (LOCKED) — no release claim until installed runtime, live acceptance, and current-head CI proven

---

## Website Implementation

### New Component: HistoricalIssues.tsx

**Location:** `src/components/HistoricalIssues.tsx`

**Features:**
- 4 tabbed sections: Defects, Drift, Mistakes, Unresolved
- Summary cards showing counts by status
- Color-coded status badges
- Detailed descriptions with sources
- Key insights section highlighting patterns

**Statistics Displayed:**
- Unresolved Defects: 5
- Active Drift: 5
- Mistakes Documented: 17
- Issues Fixed: 1

### Integration

**Added to:**
- `src/App.tsx` - Import, type definition, navigation, section rendering
- Navigation: "Historical Issues" with clock-rotate-left icon
- Position: After "Architecture Decision" section

**Build Status:**
```
✓ 45 modules transformed
✓ Build completed in 2.69s
✓ Output: 325.85 KB (JS) + 61.61 KB (CSS)
✓ No errors or warnings
```

---

## Key Insights from Research

### 1. Root Cause Pattern

**Most issues stem from patch-first behavior** — editing before diagnosis creates drift.

**Lesson:** Always diagnose first, identify canonical file, then patch.

### 2. Architecture Drift Source

Multiple historical roots/copies, generated UI builds, and validator-generated files mixed with source created confusion about what's canonical vs generated.

### 3. What's Been Fixed

- ✅ Credentials removed from config
- ✅ One-agent architecture established
- ✅ Semantic tool preselection removed
- ✅ Scripts categorized (252 files across 13 directories)
- ✅ Dead scripts removed
- ✅ Guards passing (logic-ownership, runtime-authority, state-root, resource-policy)

### 4. Critical Path Forward

Per plan.json active node "drift-recovery-reference-reuse":

1. **P0 - Remove reachable secondary semantic authorities**
2. **P0 - Prove provider result invariant** (reject empty output, preserve failures)
3. **P0 - Quarantine duplicate response authorities** after proving consumers
4. **P1 - Advance to capability registry and recovery**
5. **P2 - Deferred capabilities** (MCP, skills, scheduler, browser/desktop) remain blocked until P0-P1 stable

### 5. Main Risk

The main risk is no longer "missing features" but **changing connected runtime seams faster than understanding their shared authority, identity, state, evidence, recovery, context, and external-completion contracts**.

---

## Files Created/Modified

### Created
1. `src/components/HistoricalIssues.tsx` - New component (500+ lines)
2. `HISTORICAL_ISSUES_RESEARCH.md` - This documentation

### Modified
1. `src/App.tsx` - Added import, type, nav item, section rendering

**Total:** 3 files

---

## Data Sources Summary

| Source | Type | Content |
|--------|------|---------|
| MCP Memory | Conversations | 30+ hits from semantic search |
| GPT-Knowledge | Documents | status.json, plan.json, architecture status |
| Session Artifacts | Audit | 10 confirmed defects (2026-08-10) |
| VS Code Agent Limitations | Discussion | Drift sources and patterns (2026-05-07) |
| Browser Automation Review | Review | Additional context (2026-07-31) |
| Local Repository | Analysis | Guard checks, path scans, git state |

---

## Verification

### Build Status
```
✓ 45 modules transformed
✓ Build completed in 2.69s
✓ No TypeScript errors
✓ No linting errors
```

### Component Verification
- ✅ All 4 tabs render correctly
- ✅ Summary cards display correct counts
- ✅ Status badges color-coded properly
- ✅ Navigation works correctly
- ✅ Responsive design maintained

---

## Conclusion

The Historical Issues component successfully synthesizes information from multiple sources to provide a comprehensive view of:

1. **What went wrong** - 10 Brew defects, 10 drift issues, 17 documented mistakes
2. **What's been fixed** - Credentials removed, architecture established, scripts organized
3. **What's still unresolved** - Runtime proof incomplete, P0/P1 items in progress
4. **What we learned** - Key patterns and lessons to prevent future issues

This provides a single source of truth for understanding the project's history and making informed decisions about future work.

---

**Status:** ✅ COMPLETE  
**Build:** ✅ PASSING (2.69s)  
**Component:** ✅ INTEGRATED  
**Documentation:** ✅ COMPLETE

---

**Research Completed:** 2026-09-18  
**Next Steps:** Address P0 items, prove runtime behavior, quarantine legacy authorities
