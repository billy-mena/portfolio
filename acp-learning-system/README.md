# ACP 2025 Learning System

Complete Adobe Certified Professional 2025 certification preparation for **Photoshop**, **Illustrator**, and **InDesign** (in development). Self-contained HTML — no build step, no framework, no CDN dependency at runtime.

---

## Quick start

1. Clone or download this repository
2. Open `index.html` in a browser — that's it
3. No server required for local use (all assets are relative paths)
4. For GitHub Pages deployment: push to `main`, enable Pages from the repo Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`

Live URL pattern: `https://<your-username>.github.io/<repo-name>/`

---

## File tree

```
/
├── index.html                          ← Home page with progress dashboard
├── README.md                           ← This file
├── EXPERT-PROMPT.md                    ← Full ACP objective reference + build guide
│
├── assets/
│   ├── css/
│   │   └── global.css                  ← Design system (dark theme, all tokens)
│   └── js/
│       ├── engine.js                   ← Simulator task runner (shared)
│       ├── scoring.js                  ← Step validation (exact / contains / range)
│       └── progress.js                 ← localStorage progress tracker
│
├── shared/
│   └── theory.html                     ← Design theory MC module (40 Qs, all tools)
│
├── photoshop/
│   ├── index.html                      ← Ps course overview (6 domains)
│   ├── simulator/
│   │   ├── d2-document-setup.html      ← Ps Domain 2: project setup & interface
│   │   ├── d3-layers-masks.html        ← Ps Domain 3: layers, masks, adjustments
│   │   ├── d4-content.html             ← Ps Domain 4: adding content + AI
│   │   ├── d5-modifying.html           ← Ps Domain 5: selections, retouching, transform
│   │   └── d6-publishing.html          ← Ps Domain 6: export, save formats
│   ├── slides/
│   │   └── ps-simulator-slides.html    ← Ps slide deck (30 slides, D2–D6 complete)
│   └── files/
│       └── task-briefs.html            ← Ps briefs + answer keys + 6-criterion rubric (/24)
│
├── illustrator/
│   ├── index.html                      ← Ai course overview (5 domains)
│   ├── simulator/
│   │   ├── d2-document-mgmt.html       ← Ai Domain 2: document management
│   │   ├── d3-workflow.html            ← Ai Domain 3: workflow & interface
│   │   ├── d4-objects-paths.html       ← Ai Domain 4: objects, paths & text
│   │   └── d5-appearance.html          ← Ai Domain 5: appearance & position
│   ├── slides/
│   │   └── ai-simulator-slides.html    ← Ai slide deck (20 slides, D2–D5 complete)
│   └── files/
│       └── ai-task-briefs.html         ← Ai briefs + answer keys + 5-criterion rubric (/20)
│
├── indesign/
│   └── index.html                      ← InDesign placeholder (in development)
│
└── evaluation/
    ├── kirkpatrick-ps.html             ← Photoshop L1–L3 evaluation toolkit
    └── kirkpatrick-ai.html             ← Illustrator L1–L3 evaluation toolkit
```

---

## Asset path convention

All simulator files reference shared assets using **relative paths** from their directory depth:

| File location | Path to assets |
|---|---|
| `photoshop/simulator/*.html` | `../../assets/css/global.css` |
| `illustrator/simulator/*.html` | `../../assets/css/global.css` |
| `photoshop/slides/*.html` | `../../assets/css/global.css` |
| `photoshop/files/*.html` | `../../assets/css/global.css` |
| `shared/theory.html` | `../assets/css/global.css` |
| `evaluation/*.html` | `../assets/css/global.css` |
| `photoshop/index.html` | `../assets/css/global.css` |
| `index.html` | `assets/css/global.css` |

Do not change directory depth when adding new files — keep this convention so existing cross-links keep working.

---

## Simulator architecture

Every task simulation follows an identical pattern so the shared engine works across all tools.

### Task config object

```js
{
  id: 'ps-3-2b',              // tool-domain-objective
  tool: 'photoshop',          // photoshop | illustrator | indesign
  domain: 3,
  objective: '3.2b',
  objectiveText: 'Create a pixel mask',
  bloomsLevel: 'Apply',       // Remember|Understand|Apply|Analyse|Evaluate|Create
  estimatedMinutes: 9,
  uiType: 'pixel-mask',       // maps to a render function in the file
  scenario: '...',            // real-world task brief with exact specifications
  steps: [ /* see below */ ]
}
```

### Step object

```js
{
  id: 1,
  instruction: 'Step text shown to learner in Guided mode',
  expectedAction: 'click',        // click | menu-click | tool-select | input | select
  expectedTarget: 'add-mask-btn', // element ID or action identifier
  expectedValue: '40',            // optional — for input/select validation
  matchType: 'exact',             // exact | contains
  hint1: 'Broad directional hint',
  hint2: 'More specific panel/location hint',
  hint3: 'Explicit step-by-step hint',
  correctFeedback: 'What happened and why it matters',
  incorrectFeedback: 'Corrective instruction',
  acpContext: 'ACP Ps-3.2b: Exam-relevant context note',
  gagneEvent: 6   // 1–9, maps to Gagne's 9 Events
}
```

### Gagne event map

| # | Event |
|---|---|
| 1 | Gain attention |
| 2 | Inform objectives |
| 3 | Stimulate recall |
| 4 | Present content |
| 5 | Provide guidance |
| 6 | Elicit performance |
| 7 | Provide feedback |
| 8 | Assess performance |
| 9 | Enhance retention |

---

## localStorage schema

The progress system writes to localStorage with these key patterns. All keys are prefixed `acp_` so a single `localStorage.clear()` does not accidentally wipe other app data.

| Key pattern | Content | Written by |
|---|---|---|
| `acp_ps_d{n}_{taskid}` | `{pct, correct, incorrect, mode, date}` | Ps simulator on task complete |
| `acp_ai_d{n}_{taskid}` | `{pct, correct, incorrect, mode, date}` | Ai simulator on task complete |
| `acp_theory_score` | `{correct, total, date}` | theory.html on quiz complete |
| `acp_onboarded` | `'1'` | index.html on modal dismiss |
| `kirk_l2_pre_ps` | `{score, date}` | kirkpatrick-ps.html |
| `kirk_l2_post_ps` | `{score, date}` | kirkpatrick-ps.html |
| `kirk_l2_pre_ai` | `{score, date}` | kirkpatrick-ai.html |
| `kirk_l2_post_ai` | `{score, date}` | kirkpatrick-ai.html |

The home page progress dashboard reads `acp_ps_*` and `acp_ai_*` keys to render per-domain dots and overall percentage.

---

## Instructional design frameworks

Every piece of content is mapped to four frameworks:

| Framework | Implementation |
|---|---|
| **ADDIE** | Objectives stated before each domain → guided practice → formative MC → summative Kirkpatrick |
| **Bloom's Taxonomy** | Task `bloomsLevel` field — MC = Remember/Understand, Live tasks = Apply, rubric = Evaluate |
| **Gagne's 9 Events** | Each step tagged with `gagneEvent` number — displayed as coloured badge in Guided mode |
| **Mayer's Multimedia** | Spatial contiguity (instruction next to UI), segmenting (step-by-step), coherence (no decorative elements) |

---

## SCORM packaging

The slide decks include a SCORM API stub (both SCORM 1.2 and SCORM 2004):

```js
// In each slides/*.html — already present:
const SCORM = {
  init: () => {
    try { if (window.API) window.API.LMSInitialize(''); } catch(e) {}
    try { if (window.API_1484_11) window.API_1484_11.Initialize(''); } catch(e) {}
  },
  complete: () => { /* sets lesson_status = completed */ }
};
```

To package for an LMS (Moodle, Canvas, Blackboard, etc.):

1. Create `imsmanifest.xml` at the repo root (see SCORM 1.2 spec)
2. Set `<resource href="photoshop/slides/ps-simulator-slides.html" />` as the launch file
3. Zip the entire repo (including `imsmanifest.xml`) — do **not** nest the folder
4. Upload the zip to your LMS SCORM activity
5. The slide deck reports `completed` when the learner reaches the final slide

For SCORM 2004, replace `imsmanifest.xml` with a `manifest.xml` using the SCORM 2004 schema namespace.

---

## ACP exam facts

| | Photoshop | Illustrator | InDesign |
|---|---|---|---|
| Full name | ACP Visual Design Using Adobe Photoshop | ACP Graphic Design & Illustration Using Adobe Illustrator | ACP Print & Digital Media Publication Using Adobe InDesign |
| Version | v26.x | v29.x | v20.x |
| Exam time | 50 min | 50 min | 50 min |
| Delivered by | Certiport / NCS Pearson | Certiport / NCS Pearson | Certiport / NCS Pearson |
| Domains | 6 | 5 | 6 |
| Objectives | 22 | 21 | 22 |
| Target experience | ~150 hrs | ~150 hrs | ~150 hrs |
| 2025 AI objectives | Generative Fill, Sky Replacement | Generate Vectors, Generative Shape Fill | Text-to-image, Generative Expand |

---

## Adding InDesign (when resources allow)

The full build plan is documented in `EXPERT-PROMPT.md`. Summary:

**Session A** — Build `indesign/simulator/d2-document-setup.html` and `d3-master-pages.html`

**Session B** — Build `d4-text-tables.html` and `d5-visual-elements.html`

**Session C** — Build `d6-publishing.html` + `indesign/slides/id-simulator-slides.html` + `indesign/files/id-task-briefs.html` + `evaluation/kirkpatrick-id.html`

**Integration checklist:**
- [ ] Replace `indesign/index.html` placeholder with full domain-mapped overview
- [ ] Update `index.html` tool card: remove opacity, change "Coming soon" → "Complete" badge
- [ ] Update `index.html` Ai stat card: Id task count from `—` to actual number
- [ ] Add `acp_id_d*` pattern to progress dashboard `buildDashboard()` function
- [ ] No changes to Ps or Ai content required — integration is purely additive

---

## Browser compatibility

Tested in Chrome 120+, Firefox 121+, Safari 17+, Edge 120+.

Requires: `localStorage` (all modern browsers), CSS custom properties, ES6+ JS. No polyfills needed for any targeted environment.

---

*ACP 2025 Learning System — built with ADDIE, Bloom's, Gagne's 9 Events, Mayer's Multimedia Principles, and Kirkpatrick L1–L3 evaluation.*
