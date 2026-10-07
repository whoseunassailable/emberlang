import { Link } from 'react-router-dom'
import { flame1Lessons, flame1Modules } from '../data/flame1'
import { LessonCard } from '../components/forge/LessonCard'
import { useEmberStore } from '../store/useEmberStore'

export function Forge() {
  const { completedLessons, totalSparks, streak } = useEmberStore()
  const completedCount = flame1Lessons.filter((l) => completedLessons.includes(l.id)).length
  const total = flame1Lessons.length

  return (
    <div className="min-h-screen bg-ember-bg px-4 py-10">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="text-ember-muted hover:text-ember-text text-sm transition-colors">
            ← Home
          </Link>
          <div className="flex items-center gap-4 text-sm">
            {streak > 0 && (
              <span className="text-ember-muted">🔥 {streak}d</span>
            )}
            <span className="font-mono text-ember-orange">✦ {totalSparks}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-1 text-xs font-mono text-ember-orange uppercase tracking-widest">
            Flame I
          </div>
          <h1 className="text-3xl font-bold text-ember-text">SQL</h1>
          <p className="mt-1 text-ember-muted text-sm">Master the language of data.</p>
        </div>

        <div className="mb-10">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-ember-muted">{completedCount} / {total} Embers</span>
            <span className="text-ember-muted text-xs">{Math.round((completedCount / total) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-ember-surface-2 border border-ember-border overflow-hidden">
            <div
              className="h-full rounded-full bg-ember-orange transition-all duration-700"
              style={{ width: `${(completedCount / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-10">
          {flame1Modules.map((mod) => (
            <div key={mod.id}>
              <div className="mb-4 pl-1">
                <div className="text-xs font-mono text-ember-orange uppercase tracking-widest mb-0.5">
                  Module {mod.id}
                </div>
                <div className="text-base font-semibold text-ember-text">{mod.name}</div>
                <div className="text-sm text-ember-muted">{mod.description}</div>
              </div>

              <div className="relative space-y-3">
                <div className="absolute left-6 top-5 bottom-5 w-px bg-ember-border/50" />

                {mod.lessons.map((lesson) => {
                  const globalIdx = flame1Lessons.findIndex((l) => l.id === lesson.id)
                  const completed = completedLessons.includes(lesson.id)
                  const locked =
                    globalIdx > 0 &&
                    !completedLessons.includes(flame1Lessons[globalIdx - 1].id)

                  return (
                    <div key={lesson.id} className="relative pl-14">
                      <div
                        className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 transition-all ${
                          completed
                            ? 'border-ember-orange bg-ember-orange shadow-sm shadow-ember-orange/50'
                            : locked
                            ? 'border-ember-border bg-ember-bg'
                            : 'border-ember-orange bg-ember-bg'
                        }`}
                      />
                      <LessonCard
                        lesson={lesson}
                        completed={completed}
                        locked={locked}
                        isFirst={
                          globalIdx === 0 ||
                          completedLessons.includes(flame1Lessons[globalIdx - 1].id)
                        }
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {completedCount === total ? (
          <div className="mt-10 rounded-xl border border-ember-orange/30 bg-ember-surface p-6 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="font-semibold text-ember-text">Kindling Complete!</div>
            <div className="text-sm text-ember-muted mt-1 mb-4">All 27 Kindling Embers earned. Ready to go deeper?</div>
            <Link
              to="/blaze"
              className="inline-block rounded-lg bg-ember-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ember-glow transition-colors"
            >
              Enter Blaze →
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
