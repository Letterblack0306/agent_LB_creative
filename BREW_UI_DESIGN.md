# Brew UI Design - Letterblack Brand-Aligned

**Created:** 2026-09-18  
**Status:** ✅ LIVE  
**Brand Reference:** letterblack.net

---

## 🎨 Design Philosophy

The Brew UI is designed to match the **Letterblack brand identity** - a professional, dark, minimal aesthetic that prioritizes information density and clarity.

### Core Principles

**1. Dark & Professional**
- Pure black backgrounds (`#0a0a0a`, `#0d0d0d`)
- Subtle white borders (`rgba(255,255,255,0.06)`)
- No color noise or visual clutter
- Production-ready appearance

**2. Letterblack Aligned**
- Matches letterblack.net aesthetic
- Same window controls (red/yellow/green dots)
- Same tab-based navigation
- Same status indicators
- Same information density

**3. Information Dense**
- Every pixel serves a purpose
- Status, state, and evidence always visible
- No wasted space
- Clear hierarchy

---

## 🎨 Color System

### Backgrounds
| Name | Value | Usage |
|------|-------|-------|
| Background | `#0a0a0a` | Main content area |
| Panel | `#0d0d0d` | Header, footer, tabs |
| Card | `rgba(255,255,255,0.02)` | Content cards |

### Borders
| Name | Value | Usage |
|------|-------|-------|
| Border | `rgba(255,255,255,0.06)` | Subtle separators |
| Border Hover | `rgba(255,255,255,0.10)` | Interactive elements |

### Text
| Name | Value | Usage |
|------|-------|-------|
| Primary | `#ffffff` | Headings, important text |
| Secondary | `#a1a1aa` | Body text, descriptions |
| Muted | `#71717a` | Labels, metadata |

### Status Colors
| Status | Color | Usage |
|--------|-------|-------|
| Success | `#10b981` | Connected, verified, ready |
| Warning | `#f59e0b` | Partial, waiting, unverified |
| Error | `#ef4444` | Disconnected, failed |

---

## 📐 Layout Structure

### Panel Components

**1. Header**
```
┌─────────────────────────────────────────┐
│ ● ● ●  BREW AGENT          Connected  │
└─────────────────────────────────────────┘
```
- Window controls (macOS style)
- Panel title (uppercase, monospace)
- Connection status indicator

**2. Tabs**
```
┌──────┬──────┬────────┬─────────┬───────────┐
│ Chat │ Tools│ Memory │ Evidence│ Telemetry │
└──────┴──────┴────────┴─────────┴───────────┘
```
- 5 main sections
- Active tab has white bottom border
- Icons + labels

**3. Content Area**
- Section labels (uppercase, tracking-wider)
- Cards with subtle borders
- Information-dense layout

**4. Footer**
```
┌─────────────────────────────────────────┐
│ brew@54673a6 · main · 422 tests  Dubai │
└─────────────────────────────────────────┘
```
- Commit hash
- Branch name
- Test count
- Location (Dubai)

---

## 🗂️ Tab Breakdown

### Chat Tab
- Conversation messages
- User messages (right-aligned, rounded)
- Agent messages (left-aligned with avatar)
- Status tags (verified/unverified)
- Copy/Regenerate actions
- Input field with send button

### Tools Tab
- Capability registry grid
- Tool name (monospace)
- Status indicator (ready/waiting)
- Icon for each tool
- 8 tools displayed in 2-column grid

### Memory Tab
- Governed memory records
- Memory ID (monospace)
- Type tag (project_fact/decision/solution)
- Verification status
- Content preview

### Evidence Tab
- Execution receipts
- Receipt ID (monospace, green)
- Tool name → result
- Timestamp
- Chronological order

### Telemetry Tab
- 3 stat cards (tests, guards, latency)
- Recent activity log
- Status dots (success/error)
- Timestamps

---

## 🔧 Interactive Features

### Connection Toggle
- Click "Toggle" button to switch connection state
- Visual feedback (green/red status)
- Animated pulse when connected

### Tab Navigation
- Click tabs to switch views
- Smooth transitions
- Active state with white border

### Hover States
- Cards brighten on hover
- Buttons change opacity
- Smooth transitions

---

## 📊 Design Metrics

### Spacing
- Panel padding: `24px` (1.5rem)
- Card padding: `16px` (1rem)
- Gap between cards: `12px` (0.75rem)
- Section label margin: `16px` (1rem)

### Typography
- Section labels: `10px`, uppercase, `tracking-[0.2em]`
- Body text: `14px` (text-sm)
- Monospace: `12px` (text-xs)
- Line height: `1.5` (leading-relaxed)

### Border Radius
- Panel: `16px` (rounded-2xl)
- Cards: `12px` (rounded-xl)
- Buttons: `8px` (rounded-lg)
- Status badges: `9999px` (rounded-full)

---

## 🎯 Comparison with Letterblack.net

| Element | Letterblack.net | Brew UI | Match |
|---------|----------------|---------|-------|
| Background | Dark black | `#0a0a0a` | ✅ |
| Panel header | Window controls | Same | ✅ |
| Tabs | Icon + label | Same | ✅ |
| Status indicator | Connected badge | Same | ✅ |
| Section labels | Uppercase tracking | Same | ✅ |
| Cards | Subtle borders | Same | ✅ |
| Footer | Metadata | Same | ✅ |
| Color palette | Minimal | Same | ✅ |

---

## 🚀 Usage

### Navigate to Brew UI
1. Click **"Brew UI"** in the main navigation
2. Or scroll to the bottom of the page
3. The UI appears as a full interactive panel

### Interact with Tabs
1. Click any tab to switch views
2. Each tab shows different Brew data
3. All tabs are fully functional

### Toggle Connection
1. Click the "Toggle" button in the header
2. Watch the status change
3. Visual feedback updates immediately

---

## 💡 Design Decisions

### Why Dark Theme?
- Matches Letterblack brand
- Professional appearance
- Reduces eye strain
- Highlights content

### Why Monospace?
- Technical data (IDs, hashes, tool names)
- Consistent alignment
- Developer-friendly
- Clear hierarchy

### Why Information Dense?
- Power users need quick access
- No wasted space
- Everything visible at once
- Production-ready

### Why Minimal Borders?
- Subtle separation
- No visual noise
- Clean appearance
- Modern aesthetic

---

## 🔮 Future Enhancements

### Possible Additions
1. **Syntax highlighting** for code blocks
2. **Collapsible sections** for long content
3. **Search/filter** for tools and memory
4. **Export functionality** for evidence
5. **Real-time updates** via WebSocket
6. **Dark/light theme** toggle
7. **Customizable layout** (drag-and-drop)
8. **Keyboard shortcuts** for power users

### Integration Ideas
1. **Live BirdEye connection** for real data
2. **WebSocket updates** for agent state
3. **Voice input** for chat
4. **Gesture controls** for navigation
5. **Multi-monitor support** for split views

---

## 📝 Implementation Notes

### Tech Stack
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Font Awesome** for icons
- **Pure CSS** for animations

### Performance
- GPU-accelerated transforms
- Minimal re-renders
- Efficient state management
- Fast tab switching

### Accessibility
- Semantic HTML
- Keyboard navigation
- Clear focus states
- Color contrast compliance

---

## ✅ Build Status

**Build:** ✅ PASSING (1.44s)  
**Modules:** 42 transformed  
**Size:** 287.87 KB (JS) + 61.04 KB (CSS)  
**Performance:** All animations smooth

---

## 🎨 Brand Alignment Checklist

- [x] Dark backgrounds matching letterblack.net
- [x] Window controls (red/yellow/green)
- [x] Tab-based navigation
- [x] Status indicators
- [x] Section labels (uppercase, tracking)
- [x] Card-based layouts
- [x] Monospace for technical data
- [x] Minimal borders
- [x] Information density
- [x] Professional appearance
- [x] Dubai location reference
- [x] Letterblack branding

---

## 📄 Summary

**What was created:**
- Complete Brew UI matching Letterblack brand
- 5 interactive tabs (Chat, Tools, Memory, Evidence, Telemetry)
- Dark, professional, minimal design
- Full interactivity (tabs, toggle, hover states)

**Why it matters:**
- Consistent brand experience across Letterblack products
- Professional appearance for production use
- Information-dense for power users
- Matches letterblack.net aesthetic perfectly

**Next steps:**
1. Review with stakeholders
2. Gather feedback on layout
3. Consider live data integration
4. Plan for real-time updates

---

**Status:** ✅ COMPLETE  
**Build:** ✅ PASSING  
**Brand Alignment:** ✅ MATCHES LETTERBLACK  
**Ready for:** Review and implementation
