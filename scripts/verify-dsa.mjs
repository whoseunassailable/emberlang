// Checks every DSA lesson against the real grading harness (Pyodide):
//   - reference solutions pass all of their tests and use no banned constructs
//   - starter code does NOT already pass
//   - quizzes and lesson ids are well-formed
// Run with `npm run verify:dsa`.
import { createServer } from 'vite'
import { loadPyodide } from 'pyodide'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { flame4Lessons } = await vite.ssrLoadModule('/src/data/flame4/index.ts')
const { PY_HARNESS, checkForbidden } = await vite.ssrLoadModule('/src/lib/pyHarness.ts')
await vite.close()

const py = await loadPyodide()
py.runPython(PY_HARNESS)
const emberRun = py.globals.get('__ember_run')

function run(lesson, code) {
  const tests = lesson.tests.map((t) => ({ ...t, name: t.name ?? t.call }))
  return JSON.parse(emberRun(code, lesson.setupCode ?? '', JSON.stringify(tests)))
}

const passes = (res) => !res.error && res.tests.length > 0 && res.tests.every((t) => t.passed)

const problems = []
const seen = new Set()
const counts = { conceptual: 0, quiz: 0, code: 0 }

for (const lesson of flame4Lessons) {
  const fail = (msg) => problems.push(`${lesson.id} (${lesson.title}): ${msg}`)
  counts[lesson.exerciseType]++

  if (seen.has(lesson.id)) fail('duplicate id')
  seen.add(lesson.id)

  if (lesson.exerciseType === 'quiz') {
    if (!lesson.quiz?.length) fail('quiz lesson has no questions')
    for (const [i, q] of (lesson.quiz ?? []).entries()) {
      if (q.options.length < 2 || q.answer < 0 || q.answer >= q.options.length) {
        fail(`question ${i + 1} has an invalid answer index`)
      }
    }
  }

  if (lesson.exerciseType !== 'code') continue

  if (!lesson.starterCode || !lesson.solutionCode || !lesson.tests?.length || !lesson.prompt) {
    fail('code lesson needs prompt, starterCode, solutionCode and tests')
    continue
  }

  const banned = checkForbidden(lesson.solutionCode, lesson.forbidden)
  if (banned) fail(`solution uses a banned construct: ${banned}`)

  const solved = run(lesson, lesson.solutionCode)
  if (solved.error) fail(`solution errored: ${solved.error}`)
  for (const t of solved.tests.filter((t) => !t.passed)) {
    fail(`solution fails ${t.name}: ${t.error ?? `expected ${t.expected}, got ${t.actual}`}`)
  }

  if (passes(run(lesson, lesson.starterCode))) fail('starter code already passes every test')
}

console.log(
  `${flame4Lessons.length} lessons: ${counts.code} code, ${counts.quiz} quiz, ${counts.conceptual} conceptual`
)
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n` + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
console.log('All reference solutions pass, and no starter passes on its own.')
