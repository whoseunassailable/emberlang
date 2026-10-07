# Emberlang — Progress Log

## What's been built

### Stack
- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin)
- Zustand v5 with `persist` middleware (localStorage)
- sql.js v1.14 — SQLite in WASM, runs entirely in the browser
- CodeMirror 6 (`@uiw/react-codemirror` + `@codemirror/lang-sql`) — SQL editor
- React Router v7

### Pages
- `/` — Landing page with ember particle animation and "Start Flame I: SQL" CTA
- `/forge` — The Forge: skill track showing all 5 lessons, progress bar, lock/unlock states, streak + spark counter
- `/lesson/:id` — Lesson page with two-column layout (explanation left, exercise right)

### Lesson types implemented
- `conceptual` — Click-to-identify table parts (Table, Column, Row, Cell). Used in Lesson 1.
- `fill-blank` — Fill in the blank with a single input. Used in Lesson 2.
- `free-write` — Full CodeMirror SQL editor with Run button and result table. Used in Lessons 3–5.

### Flame I: SQL — all 5 lessons written
| ID | Title | Concept | XP |
|---|---|---|---|
| flame1-1 | What is a Table? | Tables & rows | 10 |
| flame1-2 | Your First SELECT | SELECT * | 15 |
| flame1-3 | Picking Columns | SELECT col1, col2 | 20 |
| flame1-4 | Filtering Rows | WHERE clause | 20 |
| flame1-5 | Trial: The First Ember | Combined | 50 |

All lessons share the same seed table: `employees (id, name, department, salary)` with 8 rows.

### Progression system
- Lessons unlock sequentially (each lesson requires the previous to be completed)
- Completed lessons show an "Ember" badge with orange glow
- Sparks (XP) accumulate and persist in localStorage
- Streak counter increments once per calendar day
- XP toast slides in on correct answer, auto-navigates to next lesson after 1.8s

### Branding / in-world terms
- XP = Sparks (✦)
- Completed lessons = Embers
- Streaks = Kindling (shown as 🔥 Nd in header)
- Dashboard/course map = The Forge
- Challenges = Trials
- Course naming = Flame I, Flame II, etc.

### Color palette
| Token | Hex |
|---|---|
| `ember-bg` | `#0f0d0b` |
| `ember-surface` | `#1a1612` |
| `ember-surface-2` | `#221e18` |
| `ember-border` | `#2d2418` |
| `ember-orange` | `#f97316` |
| `ember-glow` | `#fb923c` |
| `ember-text` | `#f5f0eb` |
| `ember-muted` | `#8b7355` |
| `ember-success` | `#86efac` |
| `ember-error` | `#fca5a5` |

---

## Key files
```
src/
  data/flame1.ts          — all 5 lesson definitions + seed SQL + validate functions
  store/useEmberStore.ts  — Zustand store (sparks, completed lessons, streak)
  lib/sqlRunner.ts        — sql.js wrapper (lazy WASM load, run query, return rows/error)
  pages/
    Landing.tsx           — hero + particle canvas animation
    Forge.tsx             — course map
    Lesson.tsx            — unified lesson renderer (all 3 exercise types)
  components/
    lesson/SqlEditor.tsx        — CodeMirror dark editor
    lesson/ResultTable.tsx      — query output table
    lesson/FillBlankEditor.tsx  — fill-in-the-blank input
    lesson/ConceptualTable.tsx  — click-to-identify table
    lesson/XpToast.tsx          — success toast
    forge/LessonCard.tsx        — lesson card with lock/complete states
```

---

## Bugs fixed during initial build
- sql.js WASM ESM import error in Vite — fixed by adding `sql.js` to `optimizeDeps.include` in `vite.config.ts`
- CodeMirror rendering with white/light background — fixed by passing `true` (dark variant) to `EditorView.theme()`
- Lesson state (query, result, hint) carrying over between lessons on navigation — fixed with `useEffect([id])` reset in `Lesson.tsx`

---

## What's next (not built yet)
- Auth / user accounts (currently all progress is localStorage only)
- Flame II (next language/topic)
- Mobile layout polish
- Deployment (Vercel or Netlify — pure static, no backend needed)
- Streak reminder / push notifications
- Leaderboard / social features
