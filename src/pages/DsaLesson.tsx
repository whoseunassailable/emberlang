import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FLAME4_LESSON_MAP, flame4Lessons } from '../data/flame4'
import type { DsaLesson as DsaLessonData } from '../data/flame4/types'
import { checkForbidden } from '../lib/pyHarness'
import { runPython, warmPython } from '../lib/pyRunner'
import type { PyRunResult } from '../lib/pyRunner'
import { useEmberStore } from '../store/useEmberStore'
import { PythonEditor } from '../components/lesson/PythonEditor'
import { Quiz } from '../components/lesson/Quiz'
import { RichText } from '../components/lesson/RichText'
import { TestResults } from '../components/lesson/TestResults'
import { TheoryTab } from '../components/lesson/TheoryTab'
import { XpToast } from '../components/lesson/XpToast'

const HOME_ROUTE = '/dsa'

type RunState = 'idle' | 'running' | 'correct' | 'incorrect'

export function DsaLesson() {
  const { id } = useParams<{ id: string }>()
  const lesson = id ? FLAME4_LESSON_MAP[id] : null

  if (!lesson) {
    return (
      <div className="min-h-screen bg-ember-bg flex items-center justify-center text-ember-muted">
        Lesson not found.{' '}
        <Link to={HOME_ROUTE} className="text-ember-orange ml-1 hover:underline">
          Back to The Forge
        </Link>
      </div>
    )
  }

  // Keyed so every lesson starts with fresh editor, results and hint state.
  return <LessonView key={lesson.id} lesson={lesson} />
}

function LessonView({ lesson }: { lesson: DsaLessonData }) {
  const navigate = useNavigate()
  const { completeLesson, isCompleted, totalSparks } = useEmberStore()

  const [code, setCode] = useState(lesson.starterCode ?? '')
  const [result, setResult] = useState<PyRunResult | null>(null)
  const [runState, setRunState] = useState<RunState>('idle')
  const [showHint, setShowHint] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [hasAttempted, setHasAttempted] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [quizDone, setQuizDone] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const isCode = lesson.exerciseType === 'code'

  useEffect(() => {
    if (isCode) warmPython()
  }, [isCode])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowSolution(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const index = flame4Lessons.findIndex((l) => l.id === lesson.id)
  const prevLesson = index > 0 ? flame4Lessons[index - 1] : null
  const nextLesson = index < flame4Lessons.length - 1 ? flame4Lessons[index + 1] : null
  const nextRoute = nextLesson ? `/dsa/lesson/${nextLesson.id}` : HOME_ROUTE

  const alreadyCompleted = isCompleted(lesson.id)
  const solutionUnlocked = hasAttempted || alreadyCompleted

  const award = () => {
    if (alreadyCompleted) return
    completeLesson(lesson.id, lesson.xpReward)
    setToastVisible(true)
    timers.current.push(setTimeout(() => setToastVisible(false), 1800))
  }

  const handleConceptualComplete = () => {
    if (alreadyCompleted) return
    award()
    timers.current.push(setTimeout(() => navigate(nextRoute), 2200))
  }

  const handleQuizComplete = () => {
    setQuizDone(true)
    award()
  }

  const handleRun = async () => {
    if (!code.trim() || runState === 'running') return
    setHasAttempted(true)

    const banned = checkForbidden(code, lesson.forbidden)
    if (banned) {
      setResult({ error: banned, stdout: '', tests: [] })
      setRunState('idle')
      return
    }

    setRunState('running')
    const res = await runPython(code, lesson.tests ?? [], lesson.setupCode)
    setResult(res)

    if (res.error) {
      setRunState('idle')
    } else if (res.tests.length > 0 && res.tests.every((t) => t.passed)) {
      setRunState('correct')
      award()
    } else {
      setRunState('incorrect')
    }
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  const header = (
    <header className="shrink-0 flex items-center justify-between border-b border-ember-border bg-ember-bg/95 px-4 py-3 backdrop-blur-sm z-10">
      <Link
        to={HOME_ROUTE}
        className="text-ember-muted hover:text-ember-text text-sm transition-colors shrink-0"
      >
        ← Back
      </Link>
      <div className="text-center min-w-0 px-3">
        <div className="text-[10px] font-mono text-ember-muted uppercase tracking-wider truncate">
          {lesson.concept}
        </div>
        <div className="text-sm font-semibold text-ember-text truncate">{lesson.title}</div>
      </div>
      <div className="font-mono text-sm text-ember-orange shrink-0">✦ {totalSparks}</div>
    </header>
  )

  // ── Footer nav ───────────────────────────────────────────────────────────────
  const footer = (
    <footer className="shrink-0 flex items-center justify-between gap-3 border-t border-ember-border bg-ember-bg/95 px-4 py-3 backdrop-blur-sm z-10">
      {prevLesson ? (
        <Link
          to={`/dsa/lesson/${prevLesson.id}`}
          className="flex items-center gap-1.5 text-sm text-ember-muted hover:text-ember-text transition-colors min-w-0"
        >
          <span className="shrink-0">←</span>
          <span className="hidden sm:inline truncate">{prevLesson.title}</span>
        </Link>
      ) : (
        <Link
          to={HOME_ROUTE}
          className="flex items-center gap-1.5 text-sm text-ember-muted hover:text-ember-text transition-colors"
        >
          ← <span className="hidden sm:inline">Course Map</span>
        </Link>
      )}

      {isCode ? (
        <button
          onClick={() => setShowSolution(true)}
          disabled={!solutionUnlocked}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors shrink-0 ${
            solutionUnlocked
              ? 'border-ember-border text-ember-muted hover:text-ember-text hover:border-ember-orange/40 cursor-pointer'
              : 'border-ember-border/30 text-ember-muted/30 cursor-not-allowed'
          }`}
        >
          {solutionUnlocked ? 'Show Solution' : '🔒 Solution'}
        </button>
      ) : (
        <div />
      )}

      {nextLesson ? (
        <Link
          to={nextRoute}
          className="flex items-center gap-1.5 text-sm text-ember-muted hover:text-ember-text transition-colors min-w-0 text-right"
        >
          <span className="hidden sm:inline truncate">{nextLesson.title}</span>
          <span className="shrink-0">→</span>
        </Link>
      ) : (
        <Link
          to={HOME_ROUTE}
          className="flex items-center gap-1.5 text-sm font-medium text-ember-orange hover:text-ember-glow transition-colors"
        >
          <span className="hidden sm:inline">Course Map</span> →
        </Link>
      )}
    </footer>
  )

  // ── Solution overlay ─────────────────────────────────────────────────────────
  const solutionOverlay = showSolution && solutionUnlocked && (
    <div className="fixed inset-0 z-50 flex flex-col bg-ember-bg/98 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="shrink-0 flex items-center justify-between border-b border-ember-border px-5 py-4">
        <div className="text-xs font-mono uppercase tracking-wider text-ember-muted">Solution</div>
        <button
          onClick={() => setShowSolution(false)}
          className="w-7 h-7 flex items-center justify-center rounded-full border border-ember-border text-ember-muted hover:text-ember-text hover:border-ember-orange/30 transition-colors text-sm"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-6 max-w-2xl mx-auto w-full space-y-6">
        {lesson.solutionCode && (
          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-wider text-ember-muted">Code</div>
            <pre className="rounded-xl border border-ember-border bg-ember-surface px-4 py-3 text-sm font-mono text-ember-orange overflow-x-auto leading-relaxed">
              {lesson.solutionCode}
            </pre>
          </div>
        )}
        {lesson.complexity && (
          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-wider text-ember-muted">Complexity</div>
            <p className="text-sm font-mono text-ember-text/85">{lesson.complexity}</p>
          </div>
        )}
        {lesson.solutionExplanation && (
          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-wider text-ember-muted">Why it works</div>
            <div className="space-y-2">
              <RichText text={lesson.solutionExplanation} className="text-sm text-ember-text/85 leading-relaxed" />
            </div>
          </div>
        )}
        {!lesson.solutionCode && !lesson.solutionExplanation && (
          <p className="text-sm text-ember-muted">No solution written for this lesson yet.</p>
        )}
      </div>
    </div>
  )

  // ── CONCEPTUAL + QUIZ LAYOUT ─────────────────────────────────────────────────
  if (!isCode) {
    const isQuiz = lesson.exerciseType === 'quiz'

    return (
      <div className="min-h-dvh flex flex-col bg-ember-bg">
        {header}
        <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-8">
          <TheoryTab theory={lesson.theory} />
          {lesson.prompt && (
            <div className="mt-6 rounded-lg border border-ember-orange/20 bg-ember-orange/5 px-4 py-3">
              <p className="text-sm text-ember-text/90">{lesson.prompt}</p>
            </div>
          )}

          {isQuiz ? (
            <div className="mt-8 pb-4 space-y-5">
              <Quiz questions={lesson.quiz ?? []} onAllCorrect={handleQuizComplete} />
              {quizDone && (
                <Link
                  to={nextRoute}
                  className="block w-full rounded-xl bg-ember-orange py-3.5 text-center text-sm font-semibold text-white hover:bg-ember-glow shadow-md shadow-ember-orange/20 transition-all"
                >
                  {nextLesson ? `Next: ${nextLesson.title} →` : 'Back to Course Map →'}
                </Link>
              )}
            </div>
          ) : (
            <div className="mt-8 pb-4">
              <button
                onClick={handleConceptualComplete}
                disabled={alreadyCompleted}
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-all ${
                  alreadyCompleted
                    ? 'bg-ember-surface border border-ember-border text-ember-muted cursor-default'
                    : 'bg-ember-orange text-white hover:bg-ember-glow shadow-md shadow-ember-orange/20'
                }`}
              >
                {alreadyCompleted ? '✓ Completed' : 'Got it! →'}
              </button>
            </div>
          )}
        </main>
        {footer}
        <XpToast sparks={lesson.xpReward} visible={toastVisible} />
      </div>
    )
  }

  // ── CODE LAYOUT ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh md:h-dvh flex flex-col bg-ember-bg md:overflow-hidden">
      {header}

      <main className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

        {/* LEFT — Theory */}
        <aside className="md:w-80 xl:w-96 shrink-0 border-b md:border-b-0 md:border-r border-ember-border md:overflow-y-auto">
          <div className="p-5 space-y-5">

            {/* Analogy */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-amber-500/70">
                Think of it like...
              </div>
              <div className="mb-1.5 text-sm font-semibold text-ember-text">
                {lesson.theory.analogy.title}
              </div>
              <p className="text-xs text-ember-text/75 leading-relaxed">
                {lesson.theory.analogy.body}
              </p>
            </div>

            {/* Key terms */}
            {lesson.theory.keyTerms.length > 0 && (
              <div>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-wider text-ember-muted">
                  Key Terms
                </div>
                <div className="space-y-1.5">
                  {lesson.theory.keyTerms.map(({ term, definition }) => (
                    <div
                      key={term}
                      className="rounded-lg border border-ember-border bg-ember-surface px-3 py-2"
                    >
                      <span className="font-mono text-xs font-semibold text-ember-orange">{term}</span>
                      <span className="mx-1.5 text-ember-border text-xs">—</span>
                      <span className="text-xs text-ember-muted leading-relaxed">{definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Walkthrough */}
            {lesson.theory.walkthrough.length > 0 && (
              <div>
                <div className="mb-2 text-[10px] font-mono uppercase tracking-wider text-ember-muted">
                  How It Works
                </div>
                <ol className="space-y-3">
                  {lesson.theory.walkthrough.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-ember-surface border border-ember-border flex items-center justify-center text-[10px] font-mono text-ember-orange">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 text-xs font-semibold text-ember-text">{step.label}</div>
                        {step.code && (
                          <pre className="mb-1.5 rounded-lg bg-ember-surface border border-ember-border px-3 py-2 text-xs font-mono text-ember-orange overflow-x-auto">
                            {step.code}
                          </pre>
                        )}
                        <p className="text-xs text-ember-text/75 leading-relaxed">{step.explanation}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {lesson.explanation && (
              <>
                <div className="border-t border-ember-border" />
                <div className="space-y-2">
                  <RichText text={lesson.explanation} />
                </div>
              </>
            )}

            {/* Memory tip */}
            {lesson.theory.memoryTip && (
              <div className="rounded-xl border border-ember-orange/20 bg-ember-orange/5 p-3">
                <div className="flex gap-2">
                  <span className="text-sm shrink-0">💡</span>
                  <p className="text-xs text-ember-text/80 leading-relaxed">{lesson.theory.memoryTip}</p>
                </div>
              </div>
            )}

            {/* Hint */}
            {lesson.hint && showHint && (
              <div className="rounded-lg border border-ember-border bg-ember-surface-2 p-3 text-xs text-ember-muted leading-relaxed">
                💡 {lesson.hint}
              </div>
            )}
            {lesson.hint && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="text-xs text-ember-muted hover:text-ember-orange transition-colors"
              >
                Need a hint?
              </button>
            )}
          </div>
        </aside>

        {/* CENTER — Task + editor */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-ember-border min-w-0 md:overflow-y-auto">
          <div className="p-4 flex flex-col gap-4">
            {lesson.prompt && (
              <div className="rounded-lg border border-ember-orange/20 bg-ember-orange/5 px-4 py-3">
                <div className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-ember-orange">
                  Your Task
                </div>
                <div className="space-y-2">
                  <RichText text={lesson.prompt} className="text-sm font-medium text-ember-text leading-snug" />
                </div>
              </div>
            )}
            <PythonEditor
              value={code}
              onChange={setCode}
              onRun={handleRun}
              onReset={() => setCode(lesson.starterCode ?? '')}
              running={runState === 'running'}
              disabled={runState === 'running'}
            />
          </div>
        </div>

        {/* RIGHT — Test results */}
        <aside className="md:w-72 xl:w-80 shrink-0 md:overflow-y-auto">
          <div className="p-4 space-y-3 h-full flex flex-col">
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] text-center">
                <div className="text-3xl mb-2 opacity-20">▶</div>
                <p className="text-xs text-ember-muted">
                  {runState === 'running' ? 'Running your code…' : <>Run your code<br />to see test results here</>}
                </p>
              </div>
            ) : (
              <>
                <TestResults result={result} />
                {runState === 'correct' && (
                  <div className="rounded-lg border border-ember-success/30 bg-ember-success/10 px-3 py-3 space-y-2">
                    <div className="text-xs font-semibold text-ember-success">✓ All tests passed!</div>
                    <Link
                      to={nextRoute}
                      className="block rounded-lg bg-ember-orange px-3 py-2 text-center text-xs font-semibold text-white hover:bg-ember-glow transition-colors"
                    >
                      {nextLesson ? `Next: ${nextLesson.title} →` : 'Back to Course Map →'}
                    </Link>
                    <button
                      onClick={() => setShowSolution(true)}
                      className="block w-full text-center text-xs text-ember-muted hover:text-ember-text transition-colors"
                    >
                      Compare with the reference solution
                    </button>
                  </div>
                )}
                {runState === 'incorrect' && (
                  <div className="rounded-lg border border-red-900/30 bg-red-950/20 px-3 py-2 text-xs text-ember-error">
                    Not quite — check the failing tests and try again.
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </main>

      {footer}
      {solutionOverlay}
      <XpToast sparks={lesson.xpReward} visible={toastVisible} />
    </div>
  )
}
