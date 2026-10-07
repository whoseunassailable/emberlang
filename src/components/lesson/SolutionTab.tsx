import type { ExerciseType } from '../../data/flame1'

interface Props {
  solutionQuery?: string
  solutionExplanation?: string
  exerciseType: ExerciseType
  locked: boolean
}

export function SolutionTab({ solutionQuery, solutionExplanation, exerciseType, locked }: Props) {
  if (locked) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 text-3xl">🔒</div>
        <p className="text-sm text-ember-muted">Attempt the exercise to unlock the solution.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="text-xs font-mono uppercase tracking-wider text-ember-muted">Solution</div>

      {exerciseType !== 'conceptual' && solutionQuery && (
        <pre className="rounded-xl border border-ember-border bg-ember-surface px-4 py-3 text-sm font-mono text-ember-orange overflow-x-auto">
          {solutionQuery}
        </pre>
      )}

      {solutionExplanation && (
        <p className="text-sm text-ember-text/80 leading-relaxed">{solutionExplanation}</p>
      )}

      {!solutionQuery && !solutionExplanation && (
        <p className="text-sm text-ember-muted">No solution available for this lesson.</p>
      )}
    </div>
  )
}
