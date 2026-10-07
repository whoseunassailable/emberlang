import type { PyRunResult } from '../../lib/pyRunner'

interface Props {
  result: PyRunResult
}

export function TestResults({ result }: Props) {
  const passedCount = result.tests.filter((t) => t.passed).length

  return (
    <div className="space-y-3">
      {result.error && (
        <div className="rounded-lg border border-red-900/30 bg-red-950/20 px-3 py-2">
          <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-ember-error/70">Error</div>
          <pre className="text-xs font-mono text-ember-error whitespace-pre-wrap break-words">{result.error}</pre>
        </div>
      )}

      {result.stdout && (
        <div>
          <div className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-ember-muted">Printed</div>
          <pre className="max-h-40 overflow-auto rounded-lg border border-ember-border bg-ember-surface px-3 py-2 text-xs font-mono text-ember-text/80 whitespace-pre-wrap break-words">
            {result.stdout}
          </pre>
        </div>
      )}

      {result.tests.length > 0 && (
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-ember-muted">
            <span>Tests</span>
            <span>
              {passedCount} / {result.tests.length} passed
            </span>
          </div>
          <ul className="space-y-1.5">
            {result.tests.map((t, i) => (
              <li
                key={i}
                className={`rounded-lg border px-3 py-2 ${
                  t.passed ? 'border-ember-success/20 bg-ember-success/5' : 'border-red-900/30 bg-red-950/20'
                }`}
              >
                <div className="flex gap-2">
                  <span className={`shrink-0 text-xs ${t.passed ? 'text-ember-success' : 'text-ember-error'}`}>
                    {t.passed ? '✓' : '✗'}
                  </span>
                  <code className="min-w-0 text-xs font-mono text-ember-text/85 break-words">{t.name}</code>
                </div>
                {!t.passed && (
                  <div className="mt-1.5 pl-5 text-xs font-mono space-y-0.5">
                    {t.error ? (
                      <div className="text-ember-error break-words">{t.error}</div>
                    ) : (
                      <>
                        <div className="text-ember-muted break-words">
                          expected <span className="text-ember-success">{t.expected}</span>
                        </div>
                        <div className="text-ember-muted break-words">
                          got <span className="text-ember-error">{t.actual}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
