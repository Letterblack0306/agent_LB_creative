# Brew Agent System Website — PR #1 Reconciliation Report

**Date:** 2026-09-18  
**Repository:** `Letterblack0306/agent_LB_creative`  
**PR:** #1  
**Evidence boundary:** GitHub remote repository truth only unless explicitly labeled otherwise.

## Current verified source baselines

- Brew GitHub `origin/main`: `c37205cbd96d5e0836f95032bddd3a314cee8063` (`c37205cb`)
- GPT-Knowledge `main`: `66422535a0011f03cf9cda91aae149f7947b3a57`
- Dashboard branch: `brew-agent-system-design-2c6cb`

A previously displayed Brew revision `54673a6` was **not present on the verified Brew GitHub main branch** during this PR review. It is therefore not used as remote source truth. If that revision exists in a local workspace, BirdEye/local Git evidence is required before the dashboard may present it as local state.

## PR review defects corrected

1. `index.html` now loads the tracked Vite entry `/src/main.tsx` instead of missing `/src/main.jsx`.
2. The Hero root now has `id="overview"`, so the Overview navigation item has a real scroll target.
3. Dashboard source metadata is returned to the verified Brew remote baseline `c37205cb`.
4. BirdEye projection explicitly distinguishes remote GitHub evidence from unknown local workspace state.
5. Verified Status restores the accepted authority classifications:
   - `agent-loop.mjs` → SUPERSEDED
   - `active-read-agent.mjs` → SUPERSEDED
   - `provider-planner.mjs` → OBSOLETE
   - removed autonomy modules remain absent/obsolete
6. The Browser/Batch B result remains evidence-bounded: relay/CDP healthy, live posting PARTIAL, blocker `BROWSER_TARGET_COMPOSER_UNAVAILABLE`.

## Planning model

The dashboard uses the specific B1–B6 program:

1. B1 — Operation / Session / Turn identity
2. B2 — Workspace / project authority
3. B3 — Evidence ownership and claim matching
4. B4 — Retry / checkpoint / cancel / restart continuation
5. B5 — Context-on-demand and memory freshness
6. B6 — External completion and delivery truth

Each lane records the exact question, current owner, authoritative observable, falsifier, acceptance gate, dependencies and next justified action.

## Validation status

- GitHub PR metadata: inspected
- PR review threads: inspected
- Brew remote main revision: verified
- Removed legacy module paths: verified absent on Brew main
- GitHub commit status contexts on the inspected PR head: none attached
- Local workspace/BirdEye state: **not proven by this PR review**
- Fresh post-fix build: must be established by CI/local build evidence; repository metadata alone is not a build proof.

## Authority hierarchy used by this dashboard

```text
live runtime / target evidence
  > current checked-out source when locally proven
  > GitHub remote repository truth
  > current Brew architecture/status documents
  > GPT-K reusable research/methods
  > Google Drive historical plans/conversations
  > archived reports / model prior
```

BirdEye remains the preferred local workspace/index evidence layer when reachable. Google Drive remains historical decision context. Neither is silently substituted for current runtime or GitHub source truth.
