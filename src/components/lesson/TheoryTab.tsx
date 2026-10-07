import type { TheoryContent } from '../../data/flame1'

interface Props {
  theory: TheoryContent
}

export function TheoryTab({ theory }: Props) {
  return (
    <div className="space-y-8">
      {/* Analogy */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
        <div className="mb-1 text-xs font-mono uppercase tracking-wider text-amber-500/70">
          Real-World Analogy
        </div>
        <div className="mb-2 font-semibold text-ember-text">{theory.analogy.title}</div>
        <p className="text-sm text-ember-text/80 leading-relaxed">{theory.analogy.body}</p>
      </div>

      {/* Key Terms */}
      <div>
        <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-ember-muted">
          Key Terms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {theory.keyTerms.map(({ term, definition }) => (
            <div
              key={term}
              className="rounded-lg border border-ember-border bg-ember-surface p-3"
            >
              <div className="mb-1 font-mono text-sm font-semibold text-ember-orange">{term}</div>
              <div className="text-xs text-ember-muted leading-relaxed">{definition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Walkthrough */}
      <div>
        <h3 className="mb-3 text-xs font-mono uppercase tracking-wider text-ember-muted">
          Walkthrough
        </h3>
        <ol className="space-y-4">
          {theory.walkthrough.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-ember-surface border border-ember-border flex items-center justify-center text-xs font-mono text-ember-orange">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="mb-1 text-sm font-semibold text-ember-text">{step.label}</div>
                {step.code && (
                  <pre className="mb-2 rounded-lg bg-ember-surface border border-ember-border px-3 py-2 text-sm font-mono text-ember-orange overflow-x-auto">
                    {step.code}
                  </pre>
                )}
                <p className="text-sm text-ember-text/75 leading-relaxed">{step.explanation}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Memory Tip */}
      {theory.memoryTip && (
        <div className="rounded-xl border border-ember-orange/20 bg-ember-orange/5 p-4">
          <div className="flex gap-2">
            <span className="text-base">💡</span>
            <p className="text-sm text-ember-text/85 leading-relaxed">{theory.memoryTip}</p>
          </div>
        </div>
      )}
    </div>
  )
}
