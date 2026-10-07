import { useState } from 'react'
import type { QuizQuestion } from '../../data/flame4/types'
import { RichText } from './RichText'

interface Props {
  questions: QuizQuestion[]
  onAllCorrect: () => void
}

export function Quiz({ questions, onAllCorrect }: Props) {
  // Per question: every option the learner has tried so far.
  const [tried, setTried] = useState<number[][]>(() => questions.map(() => []))

  const pick = (q: number, option: number) => {
    if (tried[q].includes(questions[q].answer) || tried[q].includes(option)) return
    const next = tried.map((t, i) => (i === q ? [...t, option] : t))
    setTried(next)
    if (next.every((t, i) => t.includes(questions[i].answer))) onAllCorrect()
  }

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => {
        const solved = tried[qi].includes(q.answer)
        const missed = !solved && tried[qi].length > 0

        return (
          <div key={qi} className="rounded-xl border border-ember-border bg-ember-surface p-5">
            <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-ember-orange">
              Question {qi + 1} of {questions.length}
            </div>
            <div className="space-y-2">
              <RichText text={q.question} className="text-sm font-medium text-ember-text leading-relaxed" />
            </div>
            {q.code && (
              <pre className="mt-3 rounded-lg bg-ember-bg border border-ember-border p-3 overflow-x-auto text-xs font-mono text-ember-orange">
                {q.code}
              </pre>
            )}

            <div className="mt-4 space-y-2">
              {q.options.map((option, oi) => {
                const wasTried = tried[qi].includes(oi)
                const isAnswer = oi === q.answer
                const state = wasTried ? (isAnswer ? 'right' : 'wrong') : solved ? 'idle-locked' : 'idle'

                return (
                  <button
                    key={oi}
                    onClick={() => pick(qi, oi)}
                    disabled={solved || wasTried}
                    className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${
                      state === 'right'
                        ? 'border-ember-success/40 bg-ember-success/10 text-ember-success'
                        : state === 'wrong'
                        ? 'border-red-900/40 bg-red-950/20 text-ember-error/80 line-through'
                        : state === 'idle-locked'
                        ? 'border-ember-border/50 text-ember-muted/60 cursor-default'
                        : 'border-ember-border text-ember-text/85 hover:border-ember-orange/40 hover:bg-ember-surface-2'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {missed && <p className="mt-3 text-xs text-ember-error">Not quite. Try another option.</p>}
            {solved && (
              <div className="mt-4 rounded-lg border border-ember-success/20 bg-ember-success/5 px-4 py-3 space-y-2">
                <RichText text={q.explanation} className="text-xs text-ember-text/85 leading-relaxed" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
