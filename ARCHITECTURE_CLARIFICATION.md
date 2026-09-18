# Architecture Decision Clarification

**Date:** 2026-09-18  
**Status:** ✅ CORRECTION APPLIED

---

## Executive Summary

This document corrects a critical misinterpretation in the previous audit. The Cline AgentRuntime integration was **already decided** in the boundary matrix. LM Studio was used as a **test vehicle**, not as the architectural choice. The current implementation diverged from the approved plan.

---

## The Correction

### ❌ Previous Misinterpretation

The audit incorrectly framed the situation as:
> "Should Cline become the coding reasoning owner?"

This implied it was a new decision to be made.

### ✅ Correct Interpretation

The correct framing is:
> "Why did the implemented ACT/coding path diverge from the already-approved Cline AgentRuntime integration plan, and what is the minimum repair required to restore that architecture?"

The decision was **already made**. The work is to **restore** the approved integration path.

---

## Pre-Existing Architecture Decisions

### 1. Cline AgentRuntime Integration
**Status:** PROVEN / PRE-EXISTING DECISION

The boundary matrix explicitly states:
- Reuse Cline AgentRuntime for the professional model/tool continuation loop
- Place an LBE-owned governance adapter between Cline and execution
- Route tool proposals through existing LBE authorization/governed execution
- Return the governed result into the same Cline continuation loop
- Reject Cline-native file mutation and raw shell execution as canonical execution paths
- Keep LBE as the authority for sessions, authorization, receipts/evidence, validation and completion

### 2. Cline Core Reuse Boundary
**Status:** PROVEN / DOCUMENTED

Cline already had the required mechanics at the audited revision:
- Iterative provider calls
- Tool-call parsing
- Execution/result insertion
- Continuation
- Pre-execution hooks
- Events
- Cancellation
- Compaction
- MCP contribution

The intended work was always to **adapt** these mechanics behind LBE, not build a second generic agent loop.

### 3. LBE Authority Boundary
**Status:** PROVEN / DOCUMENTED

LBE is the authority for:
- Sessions
- Authorization
- Receipts/evidence
- Validation
- Completion

---

## Current Implementation Status

### ACT/Coding Implementation
**Status:** NON-CONFORMING

Current ACT/coding uses:
```
GovernedProviderReasoningController → raw OpenAI-compatible loop
```

Instead of the approved:
```
Cline AgentRuntime → LBE adapter
```

### Required Work
**Classification:** RECONNECTION (not new design)

Restore the already-approved Cline AgentRuntime → LBE adapter path.

**New architecture decision needed:** NO

---

## LM Studio Test Clarification

### What LM Studio Proved
✅ LM Studio endpoint/model worked  
✅ Provider could propose a tool  
✅ LBE executed the governed tool  
✅ Receipt/evidence returned  
✅ Provider continued  

### What LM Studio Did NOT Prove
❌ The planned Cline execution architecture

The test happened to exercise the later OpenAI-compatible implementation path, not the approved Cline integration.

### Correct Interpretation
LM Studio was a **behavior/integration test**, not the architectural decision for the final reasoning engine.

---

## Approved Cline Integration Flow

```
Cline AgentRuntime mechanics
        ↓
LBE-owned adapter
        ↓
existing LBE authorization / governed dispatcher
        ↓
LBE workspace/process/tool owners
        ↓
governed tool result
        ↓
Cline continuation loop
```

### Missing Dependency
**LBE-to-Cline AgentRuntime governance adapter**

**Classification:** ADAPT (not "decide whether to use Cline")

---

## Feature Preservation Rule

A feature being outside the current plan/slice does **not** make it obsolete, invalid, or disposable.

### Correct Treatment by Evidence

| Evidence | Correct Treatment |
|----------|------------------|
| Working + Proven | **Keep** |
| Implemented + Disconnected | **Reconnect** |
| Partial / In-Progress | **Continue from existing owner** |
| Planned / Accepted | **Preserve as pending** |
| Historical Reference | **Don't promote to current runtime** |
| Explicitly Superseded | **Only then exclude** |

### Correct Interpretation

**Wrong:**
> "Not in current plan → remove/hide/ignore"

**Correct:**
> "Not in current plan → preserve → check existing owner/history → verify whether it still belongs to the product → reconnect/finish if required"

---

## Examples of Misinterpretation

### Commands Returning `unsupported_real_request(...)`

Features like:
- `/close`
- `/provider-config`
- `/provider-remove`
- `/checkpoint`
- `/memory`
- `/compact`
- `/browser-attach`
- `/browser-send`

**What this proves:**
- UI/request contract exists
- Real adapter is not currently connected

**What this does NOT prove:**
- Feature is unwanted
- Feature was abandoned
- Feature should be deleted

**Correct action:** Check historical/current feature intent first, then reconnect/finish.

### Cline Implementation

The earlier Cline work, worker, stdio bridge, continuation contract, provider work, tool mediation, etc. are **existing project assets**.

A missing connection in today's call graph means:
- **Connect/reconcile the existing pieces**
- NOT discard everything and redesign it

---

## Active Plan vs. Whole Product

The active plan is a **bounded work slice**, not the definition of the whole product.

### Correct Rule

```
existing implemented feature      → preserve it
partially wired feature           → preserve it and finish/reconnect it
previously accepted/planned feature → preserve its contract
currently unsupported path        → classify the missing seam
explicitly superseded/deprecated  → only then consider removal
```

---

## Website Updates

### New Section Added
**Architecture Decision Clarification**

Located after "Verified Status" in the navigation.

**Content:**
1. Pre-Existing Architecture Decisions (green section)
   - Cline AgentRuntime Integration: PROVEN / PRE-EXISTING DECISION
   - Cline Core Reuse Boundary: PROVEN / DOCUMENTED
   - LBE Authority Boundary: PROVEN / DOCUMENTED

2. Current Implementation Status (amber section)
   - ACT/Coding Implementation: NON-CONFORMING
   - Required Work: RECONNECTION

3. LM Studio Test Clarification (purple section)
   - What it proved
   - What it did NOT prove
   - Correct interpretation

4. Approved Cline Integration Flow
   - Visual diagram
   - Missing dependency
   - Classification: ADAPT

5. Feature Preservation Rule (emerald section)
   - Treatment by evidence table
   - Correct interpretation
   - Examples

### Data Updates
**brewPlanning.ts**

Added:
```typescript
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
```

Updated:
```typescript
architecture: "One persistent reasoning agent using Cline AgentRuntime behind LBE governance; ..."
```

---

## Build Status

```
✓ 44 modules transformed
✓ Build completed in 2.68s
✓ Output: 306.68 KB (JS) + 61.40 KB (CSS)
✓ No errors or warnings
```

---

## Key Takeaways

### 1. No New Decision Needed
The Cline integration was already decided. The work is reconnection, not redesign.

### 2. LM Studio Was a Test
It proved provider connectivity and behavior, not the Cline architecture.

### 3. Preserve Existing Features
"Not in current plan" ≠ "obsolete". Check history, verify ownership, reconnect.

### 4. Implementation Divergence
Current ACT/coding diverged from the approved plan. Restore the approved path.

### 5. Feature Preservation Rule
Working features stay. Disconnected features get reconnected. Only explicitly superseded features are removed.

---

## Next Steps

### Immediate
- ✅ Architecture clarification section added to website
- ✅ Data updated with correct interpretation
- ✅ Build passing

### Short-term
- Restore Cline AgentRuntime → LBE adapter path
- Reconnect disconnected features
- Verify all existing features

### Long-term
- Complete the approved architecture
- Maintain feature preservation discipline
- Document all architecture decisions clearly

---

## Files Modified

1. `src/data/brewPlanning.ts` - Added architectureDecision and featurePreservationRule
2. `src/components/ArchitectureClarification.tsx` - **NEW** - Clarification section
3. `src/App.tsx` - Added import, section type, nav item, and section rendering

**Total:** 3 files modified/created

---

## Conclusion

The correction has been successfully applied to the website. The architecture decision clarification section now clearly states:

1. **Cline AgentRuntime integration was already decided**
2. **LM Studio was a test vehicle**
3. **Current implementation diverged from the approved plan**
4. **Required work is reconnection, not redesign**
5. **Features outside the current plan should be preserved, not discarded**

This provides the correct foundation for future work and prevents the misinterpretation that led to suggesting feature removal.

---

**Status:** ✅ CORRECTION COMPLETE  
**Build:** ✅ PASSING (2.68s)  
**Data:** ✅ UPDATED  
**Website:** ✅ NEW SECTION ADDED
