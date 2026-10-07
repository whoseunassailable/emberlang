import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LESSON_MAP, flame1Lessons } from '../data/flame1'
import { BLAZE_LESSON_MAP, flame1BlazeLessons } from '../data/flame1Blaze'
import { runQuery } from '../lib/sqlRunner'
import { useEmberStore } from '../store/useEmberStore'
import { SqlEditor } from '../components/lesson/SqlEditor'
import { FillBlankEditor } from '../components/lesson/FillBlankEditor'
import { ResultTable } from '../components/lesson/ResultTable'
import { XpToast } from '../components/lesson/XpToast'
import { TheoryTab } from '../components/lesson/TheoryTab'

const COMBINED_MAP = { ...LESSON_MAP, ...BLAZE_LESSON_MAP }
const ALL_LESSONS = [...flame1Lessons, ...flame1BlazeLessons]

function getNextLesson(id: string) {
  const i = ALL_LESSONS.findIndex((l) => l.id === id)
  return i >= 0 && i < ALL_LESSONS.length - 1 ? ALL_LESSONS[i + 1] : null
}

function getPrevLesson(id: string) {
  const i = ALL_LESSONS.findIndex((l) => l.id === id)
  return i > 0 ? ALL_LESSONS[i - 1] : null
}

function getHomeRoute(id: string) {
  return id.startsWith('flame1b-') ? '/blaze' : '/forge'
}

type RunState = 'idle' | 'running' | 'correct' | 'incorrect'

export function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { completeLesson, isCompleted, totalSparks } = useEmberStore()

  const lesson = id ? COMBINED_MAP[id] : null
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<{
    columns: string[]
    rows: { [k: string]: string | number | null }[]
    error: string | null
  } | null>(null)
  const [runState, setRunState] = useState<RunState>('idle')
  const [showHint, setShowHint] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [hasAttempted, setHasAttempted] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    setQuery('')
    setResult(null)
    setRunState('idle')
    setShowHint(false)
    setToastVisible(false)
    setHasAttempted(false)
    setShowSolution(false)
  }, [id])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowSolution(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-ember-bg flex items-center justify-center text-ember-muted">
        Lesson not found.{' '}
        <Link to="/forge" className="text-ember-orange ml-1 hover:underline">
          Back to The Forge
        </Link>
      </div>
    )
  }

  const alreadyCompleted = isCompleted(lesson.id)
  const solutionUnlocked = hasAttempted || alreadyCompleted
  const nextLesson = getNextLesson(lesson.id)
  const prevLesson = getPrevLesson(lesson.id)
  const homeRoute = getHomeRoute(lesson.id)
  const isConceptual = lesson.exerciseType === 'conceptual'

  const handleRun = async (q?: string) => {
    const queryToRun = q ?? query
    if (!queryToRun.trim()) return
    setHasAttempted(true)
    setRunState('running')
    const res = await runQuery(lesson.seedSQL, queryToRun, lesson.validationQuery)
    setResult(res)

    if (!res.error) {
      const correct = lesson.validate(res.columns, res.rows)
      if (correct) {
        setRunState('correct')
        if (!alreadyCompleted) {
          completeLesson(lesson.id, lesson.xpReward)
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
            setTimeout(() => navigate(nextLesson ? `/lesson/${nextLesson.id}` : homeRoute), 400)
          }, 1800)
        }
      } else {
        setRunState('incorrect')
      }
    } else {
      setRunState('idle')
    }
  }

  const handleConceptualComplete = () => {
    if (!alreadyCompleted) {
      completeLesson(lesson.id, lesson.xpReward)
      setToastVisible(true)
      setTimeout(() => {
        setToastVisible(false)
        setTimeout(() => navigate(nextLesson ? `/lesson/${nextLesson.id}` : homeRoute), 400)
      }, 1800)
    }
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  const header = (
    <header className="shrink-0 flex items-center justify-between border-b border-ember-border bg-ember-bg/95 px-4 py-3 backdrop-blur-sm z-10">
      <Link
        to={homeRoute}
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
          to={`/lesson/${prevLesson.id}`}
          className="flex items-center gap-1.5 text-sm text-ember-muted hover:text-ember-text transition-colors min-w-0"
        >
          <span className="shrink-0">←</span>
          <span className="hidden sm:inline truncate">{prevLesson.title}</span>
        </Link>
      ) : (
        <Link
          to={homeRoute}
          className="flex items-center gap-1.5 text-sm text-ember-muted hover:text-ember-text transition-colors"
        >
          ← <span className="hidden sm:inline">Course Map</span>
        </Link>
      )}

      {!isConceptual ? (
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
          to={`/lesson/${nextLesson.id}`}
          className="flex items-center gap-1.5 text-sm text-ember-muted hover:text-ember-text transition-colors min-w-0 text-right"
        >
          <span className="hidden sm:inline truncate">{nextLesson.title}</span>
          <span className="shrink-0">→</span>
        </Link>
      ) : (
        <Link
          to={homeRoute}
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
        {lesson.exerciseType !== 'conceptual' && lesson.solutionQuery && (
          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-wider text-ember-muted">Query</div>
            <pre className="rounded-xl border border-ember-border bg-ember-surface px-4 py-3 text-sm font-mono text-ember-orange overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {lesson.solutionQuery}
            </pre>
          </div>
        )}
        {lesson.solutionExplanation && (
          <div>
            <div className="mb-2 text-xs font-mono uppercase tracking-wider text-ember-muted">Why it works</div>
            <p className="text-sm text-ember-text/85 leading-relaxed">{lesson.solutionExplanation}</p>
          </div>
        )}
        {!lesson.solutionQuery && !lesson.solutionExplanation && (
          <p className="text-sm text-ember-muted">No solution written for this lesson yet.</p>
        )}
      </div>
    </div>
  )

  // ── CONCEPTUAL LAYOUT ────────────────────────────────────────────────────────
  if (isConceptual) {
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
        </main>
        {footer}
        {solutionOverlay}
        <XpToast sparks={lesson.xpReward} visible={toastVisible} />
      </div>
    )
  }

  // ── EXERCISE LAYOUT (fill-blank | free-write) ────────────────────────────────
  const renderExplanation = (text: string) =>
    text.split('\n\n').map((para, i) => {
      if (para.startsWith('```')) {
        const code = para.replace(/^```sql\n?/, '').replace(/\n?```$/, '')
        return (
          <pre key={i} className="rounded-lg bg-ember-surface border border-ember-border p-3 overflow-x-auto text-xs font-mono text-ember-orange">
            {code}
          </pre>
        )
      }
      return (
        <p
          key={i}
          className="text-sm text-ember-text/80 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: para
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-ember-text font-semibold">$1</strong>')
              .replace(/`(.+?)`/g, '<code class="rounded bg-ember-surface border border-ember-border px-1.5 py-0.5 text-xs font-mono text-ember-orange">$1</code>'),
          }}
        />
      )
    })

  return (
    <div className="min-h-dvh md:h-dvh flex flex-col bg-ember-bg md:overflow-hidden">
      {header}

      <main className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

        {/* LEFT — Instructions & context */}
        <aside className="md:w-72 xl:w-80 shrink-0 border-b md:border-b-0 md:border-r border-ember-border md:overflow-y-auto">
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

            <div className="border-t border-ember-border" />

            {/* Task */}
            {lesson.prompt && (
              <div>
                <div className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-ember-orange">
                  Your Task
                </div>
                <p className="text-sm font-medium text-ember-text leading-snug">{lesson.prompt}</p>
              </div>
            )}

            {/* Explanation */}
            <div className="space-y-2">{renderExplanation(lesson.explanation)}</div>

            {/* Example */}
            {lesson.exampleQuery && (
              <div className="rounded-lg border border-ember-border bg-ember-surface p-3">
                <div className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-ember-muted">
                  Example
                </div>
                <pre className="text-xs font-mono text-ember-muted overflow-x-auto whitespace-pre-wrap">
                  {lesson.exampleQuery}
                </pre>
              </div>
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

        {/* CENTER — Editor */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-ember-border min-w-0 md:overflow-y-auto">
          <div className="p-4 flex flex-col gap-4 h-full">
            {lesson.exerciseType === 'fill-blank' ? (
              <FillBlankEditor
                key={lesson.id}
                template={lesson.fillBlankTemplate!}
                onSubmit={handleRun}
                disabled={runState === 'running' || runState === 'correct'}
              />
            ) : (
              <SqlEditor
                key={lesson.id}
                value={query}
                onChange={setQuery}
                onRun={() => handleRun()}
                disabled={runState === 'running' || runState === 'correct'}
              />
            )}
          </div>
        </div>

        {/* RIGHT — Output */}
        <aside className="md:w-64 xl:w-72 shrink-0 md:overflow-y-auto">
          <div className="p-4 space-y-3 h-full flex flex-col">
            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center min-h-[120px] text-center">
                <div className="text-3xl mb-2 opacity-20">▶</div>
                <p className="text-xs text-ember-muted">Run your query<br />to see results here</p>
              </div>
            ) : (
              <>
                <div className="text-[10px] font-mono uppercase tracking-wider text-ember-muted">
                  Output
                </div>
                <ResultTable
                  columns={result.columns}
                  rows={result.rows}
                  error={result.error}
                />
                {runState === 'correct' && (
                  <div className="rounded-lg border border-ember-success/30 bg-ember-success/10 px-3 py-2 text-xs font-semibold text-ember-success">
                    ✓ Correct!
                  </div>
                )}
                {runState === 'incorrect' && !result.error && (
                  <div className="rounded-lg border border-red-900/30 bg-red-950/20 px-3 py-2 text-xs text-ember-error">
                    Not quite — check the result and try again.
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
