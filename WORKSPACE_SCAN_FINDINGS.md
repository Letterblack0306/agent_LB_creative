# Workspace Scan Findings - 2026-09-18 5:15 PM

**Scan Duration:** 1m 23s  
**Status:** ✅ Complete with 3 definite issues identified

---

## 🚨 Definite Issues (3)

### 1. Memory Guards Are Stale and Broken

**Severity:** DEFINITE  
**Impact:** Memory validation scripts fail with ENOENT errors

**Affected Files:**
- `scripts/validate-memory-promotion.mjs`
- `scripts/guard-memory-chat.mjs`
- `scripts/guard-memory-leakage.mjs`

**Problem:**
These checks still reference the removed legacy file `brew/start.js`. They fail with:
```
ENOENT: brew/brew/start.js
```

**Current Reality:**
Brew's canonical authority is now:
- `brew/agent/orchestrator-server.mjs`
- `brew/runtime/server/gateway-server.mjs`

**Required Action:**
Update all three memory guards to reference current gateway/orchestrator authorities instead of the removed `brew/start.js`.

---

### 2. Obsolete Memory Sidecar Expectation

**Severity:** DEFINITE  
**Impact:** Memory promotion validation expects wrong path structure

**Affected File:**
- `scripts/validate-memory-promotion.mjs`

**Problem:**
The script expects:
```
.brew-sidecar/memory-marks/
```

**Current Reality:**
This conflicts with the current external state-root design under:
```
~/.Brew/state
```

**Required Action:**
Revise `validate-memory-promotion.mjs` to use current `~/.Brew/state` paths instead of the obsolete `.brew-sidecar/memory-marks/` structure.

---

### 3. Secret Scanner Has False-Positive Blockers

**Severity:** DEFINITE  
**Impact:** Secret scanner incorrectly flags test fixtures as real secrets

**Affected File:**
- `scripts/scan-secret-risk.mjs`

**Problem:**
The scanner flags test fixtures such as:
```javascript
token: 'active-claim-secret'
apiKey: 'sk-secret-value-1234567890'
```

These are test literals, not live credentials, but the scanner exits with failure instead of classifying them as test fixtures.

**Required Action:**
Update `scan-secret-risk.mjs` to:
1. Recognize test fixture patterns
2. Classify them correctly as test data
3. Not exit with failure for test fixtures

---

## ✅ Informational Findings (No Action Required)

### Route Scan
- Reports literal `/logs/failed-tasks` and provider route strings for contract comparison
- **Status:** No failure

### Runtime UI Validation
- Passes validation checks
- **Note:** Live runtime was not running during the scan, so live UI proof was skipped
- **Status:** Pass (with caveat)

### Runtime Reachability
- 178 reachable modules
- No unresolved imports
- **Status:** ✅ Pass

### Workspace Index Validation
- **Status:** ✅ Pass

### Path-Drift and Fake-Status Scans
- **Status:** ✅ Pass

### Runtime Truth Validation
- **Status:** ✅ Pass

---

## 📊 Scan Summary

| Category | Count | Status |
|----------|-------|--------|
| Definite Issues | 3 | 🔴 Action Required |
| Informational | 6 | ✅ No Action |
| Total Scans | 9 | ✅ Complete |

---

## 🎯 Priority Actions

### Immediate (Critical)
1. **Fix memory guards** - Update 3 scripts to use current authorities
2. **Fix memory sidecar path** - Update to use `~/.Brew/state`
3. **Fix secret scanner** - Add test fixture recognition

### Why These Matter
- Memory guards are part of the readiness verification pipeline
- Incorrect paths cause false failures in CI/CD
- False-positive secret scans block legitimate commits

---

## 🔗 Related Components

### Memory System
- Governed memory store and retrieval (proven foundation)
- Memory curation with verification and semantic indexing
- Automatic promotion pipeline (partial - needs implementation)

### State Management
- External state-root: `~/.Brew/state`
- Canonical authorities: `orchestrator-server.mjs`, `gateway-server.mjs`
- Removed legacy: `brew/start.js`

### Security
- Secret scanning in CI/CD pipeline
- Test fixture patterns need proper classification
- Balance between security and developer experience

---

## 📝 Implementation Notes

### Memory Guard Updates
```javascript
// OLD (broken)
const legacyPath = 'brew/start.js';

// NEW (correct)
const orchestratorPath = 'brew/agent/orchestrator-server.mjs';
const gatewayPath = 'brew/runtime/server/gateway-server.mjs';
```

### Memory Sidecar Path
```javascript
// OLD (obsolete)
const sidecarPath = '.brew-sidecar/memory-marks/';

// NEW (current)
const statePath = '~/.Brew/state/memory-marks/';
```

### Secret Scanner
```javascript
// Add test fixture patterns
const testFixturePatterns = [
  /active-claim-secret/,
  /sk-secret-value-/,
  /test-token-/,
  // ... more patterns
];

// Classify before flagging
if (testFixturePatterns.some(p => p.test(value))) {
  return { type: 'test-fixture', risk: 'none' };
}
```

---

## ✅ Website Updates

The following components have been updated to reflect these findings:

1. **VerifiedStatus.tsx**
   - Added `workspaceScanIssues` array with 3 definite issues
   - Added new section displaying scan findings
   - Updated summary cards to show "3 Scan Issues"

2. **Build Status**
   - ✅ Build passing
   - ✅ All components rendering correctly
   - ✅ Data consistent

---

## 📈 Progress Tracking

### Before Scan
- ✅ 422 tests passing
- ✅ 11/11 readiness guards
- ✅ Memory curation proven
- ⚠️ Memory promotion partial

### After Scan
- ✅ 422 tests passing
- ✅ 11/11 readiness guards
- ✅ Memory curation proven
- ⚠️ Memory promotion partial
- 🔴 3 definite scan issues identified

### Next Steps
1. Fix memory guards (3 scripts)
2. Fix memory sidecar path
3. Fix secret scanner
4. Re-run scan to verify fixes
5. Update website with resolved status

---

## 🎯 Acceptance Criteria

### Memory Guards
- [ ] `validate-memory-promotion.mjs` references current authorities
- [ ] `guard-memory-chat.mjs` references current authorities
- [ ] `guard-memory-leakage.mjs` references current authorities
- [ ] All three scripts pass without ENOENT errors

### Memory Sidecar
- [ ] `validate-memory-promotion.mjs` uses `~/.Brew/state` paths
- [ ] No references to `.brew-sidecar/memory-marks/`
- [ ] Validation passes with current state structure

### Secret Scanner
- [ ] `scan-secret-risk.mjs` recognizes test fixtures
- [ ] Test fixtures classified correctly
- [ ] Scanner does not exit with failure for test data
- [ ] Real secrets still detected and flagged

---

**Status:** 🔴 3 DEFINITE ISSUES IDENTIFIED  
**Action Required:** Update 3 memory guards, 1 sidecar path, 1 secret scanner  
**Priority:** HIGH - Blocks CI/CD pipeline  
**Estimated Effort:** 1-2 hours
