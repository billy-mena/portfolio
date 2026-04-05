# ACP 2025 Learning System — Expert Prompt v2
**Last updated: Session 9 (final)**

## Project status: COMPLETE (v1.0)

| Tool | Domains | Simulators | Slides | Briefs | Kirkpatrick | Status |
|---|---|---|---|---|---|---|
| Photoshop | D2–D6 | 5 files | 30 slides | /24 rubric, 14 MC | ✓ | ✅ |
| Illustrator | D2–D5 | 4 files | 20 slides | /20 rubric, 13 MC | ✓ | ✅ |
| InDesign | D2–D6 | 5 files | 24 slides | /20 rubric, 12 MC | ✓ | ✅ |

---

## Canonical file tree

```
acp-2025-learning-system/
├── index.html
├── README.md
├── EXPERT-PROMPT.md
├── assets/css/global.css
├── assets/js/engine.js | progress.js | scoring.js
├── shared/theory.html                  (40-Q MC, all tools Domain 1)
├── photoshop/
│   ├── index.html
│   ├── simulator/ d2–d6-*.html
│   ├── slides/ps-simulator-slides.html (30 slides)
│   └── files/task-briefs.html          (/24 rubric, 14 MC)
├── illustrator/
│   ├── index.html
│   ├── simulator/ d2–d5-*.html
│   ├── slides/ai-simulator-slides.html (20 slides)
│   └── files/ai-task-briefs.html       (/20 rubric, 13 MC)
├── indesign/
│   ├── index.html
│   ├── simulator/ d2–d6-*.html
│   ├── slides/id-simulator-slides.html (24 slides)
│   └── files/id-task-briefs.html       (/20 rubric, 12 MC)
└── evaluation/
    ├── kirkpatrick-ps.html
    ├── kirkpatrick-ai.html
    └── kirkpatrick-id.html
```

---

## Asset path convention — DO NOT BREAK

| Location | Path to assets |
|---|---|
| `index.html` (root) | `assets/css/global.css` |
| `photoshop/index.html` (depth 1) | `../assets/css/global.css` |
| `photoshop/simulator/*.html` (depth 2) | `../../assets/css/global.css` |
| `evaluation/*.html` (depth 1) | `../assets/css/global.css` |
| `shared/theory.html` (depth 1) | `../assets/css/global.css` |

---

## CSS design tokens

```css
--ps-blue: #31A8FF;   /* Photoshop */
--ai-orange: #FF9A00; /* Illustrator */
--id-green: #00C896;  /* InDesign */
--correct: #00D68F;
--incorrect: #FF4D6D;
--partial: #FFB800;
```

---

## Simulator task schema

```js
// Task config
{
  id: 'ps-3-2b', tool: 'photoshop', domain: 3,
  objective: '3.2b', objectiveText: 'Create a pixel mask',
  bloomsLevel: 'Apply', estimatedMinutes: 9, uiType: 'pixel-mask',
  scenario: '...',
  steps: [{
    id: 1, instruction: '...',
    expectedAction: 'click', expectedTarget: 'add-mask', expectedValue: '',
    matchType: 'exact',
    hint1: '...', hint2: '...', hint3: '...',
    correctFeedback: '...', incorrectFeedback: '...',
    acpContext: 'ACP Ps-3.2b: ...', gagneEvent: 6
  }]
}
```

Gagne events: 1=Gain attention · 2=Inform objectives · 3=Stimulate recall · 4=Present content · 5=Provide guidance · 6=Elicit performance · 7=Provide feedback · 8=Assess · 9=Enhance retention

---

## localStorage keys

All prefixed `acp_` — safe to clear with `Object.keys(localStorage).filter(k=>k.startsWith('acp_')).forEach(k=>localStorage.removeItem(k))`

| Key | Content |
|---|---|
| `acp_ps_d{n}_{id}` | `{pct, correct, incorrect, mode, date}` |
| `acp_ai_d{n}_{id}` | Same, Illustrator |
| `acp_id_d{n}_{id}` | Same, InDesign |
| `acp_theory_score` | `{correct, total, date}` |
| `acp_onboarded` | `'1'` (dismisses welcome modal) |
| `kirk_l2_pre_ps/ai/id` | `{score, date}` |
| `kirk_l2_post_ps/ai/id` | `{score, date}` |

---

## Complete ACP 2025 objective codes

### Photoshop (Ps)
Ps-1.x MC: design industry, copyright, non-destructive, colour modes
Ps-2.1a new doc · Ps-2.2a workspace · Ps-2.3a Smart Objects · Ps-2.4a guides · Ps-2.5a artboards
Ps-3.1a layers · Ps-3.1b layer types · Ps-3.1c Smart Objects · Ps-3.2a/b masks · Ps-3.3a adjustment layers
Ps-4.1a painting · Ps-4.1b healing · Ps-4.1c Generative Fill+Sky Replacement (AI✦) · Ps-4.2a pen · Ps-4.3a/b type
Ps-5.1a/b/c selections · Ps-5.2a retouching+Remove tool (AI✦) · Ps-5.3a/b transforms · Ps-5.4a/b layer styles
Ps-6.1a/b export · Ps-6.2a/b save formats

### Illustrator (Ai)
Ai-1.x MC: vector vs raster, design industry, copyright
Ai-2.1 new doc · Ai-2.2 workspace · Ai-2.3 artboards · Ai-2.4 colour
Ai-3.1 selection · Ai-3.2 align · Ai-3.3 transform · Ai-3.4 layers · Ai-3.5 symbols
Ai-4.1a pen · Ai-4.1b pencil/curvature · Ai-4.1c Shape Builder/Pathfinder · Ai-4.1d width tool · Ai-4.1e Generate Vectors (AI✦) · Ai-4.2a outlines · Ai-4.3a type
Ai-5.1 Appearance · Ai-5.2a/b gradients · Ai-5.2c Generative Shape Fill (AI✦) · Ai-5.3 transparency · Ai-5.4 Image Trace

### InDesign (Id)
Id-1.x MC: bleed/trim/slug/live area, copyright, print concepts
Id-2.1 new doc · Id-2.2 workspace · Id-2.3 links · Id-2.4 swatches
Id-3.1 master pages · Id-3.2 page numbers · Id-3.3 layers · Id-3.4 object styles
Id-4.1 threading · Id-4.2 styles · Id-4.3 tables · Id-4.4 Story Editor
Id-5.1 image frames · Id-5.2 effects · Id-5.3 shapes · Id-5.5 Text-to-Image+Generative Expand (AI✦)
Id-6.1 preflight · Id-6.2 package · Id-6.3 export PDF/EPUB · Id-6.4 print dialog

---

## SCORM packaging (quick reference)

1. Create `imsmanifest.xml` at root (see README for spec)
2. `<resource href="photoshop/slides/ps-simulator-slides.html" />` as launch file
3. Zip the ENTIRE folder with manifest at root
4. Upload zip to LMS as SCORM 1.2 activity

---

## Known limitations (v1.0)

- Simulators are concept simulators, not live Adobe app embeds
- Progress persists per browser/device via localStorage only — no server sync
- SCORM reports completion on final slide only — no individual task score reporting to LMS gradebook
- Ai slide deck covers D2–D5 only (Ai has no Domain 6 simulator — publishing is covered by InDesign)
