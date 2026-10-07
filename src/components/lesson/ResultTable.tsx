import type { Row } from '../../lib/sqlRunner'

interface Props {
  columns: string[]
  rows: Row[]
  error: string | null
}

export function ResultTable({ columns, rows, error }: Props) {
  if (error) {
    return (
      <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-3 text-sm text-ember-error font-mono">
        {error}
      </div>
    )
  }

  if (!columns.length) return null

  return (
    <div className="overflow-x-auto rounded-lg border border-ember-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ember-border bg-ember-surface-2">
            {columns.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left font-mono text-ember-orange text-xs uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-ember-border/50 last:border-0 hover:bg-ember-surface-2/50"
            >
              {columns.map((col) => (
                <td key={col} className="px-3 py-2 font-mono text-ember-text/90">
                  {row[col] === null ? (
                    <span className="text-ember-muted italic">null</span>
                  ) : (
                    String(row[col])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5 text-xs text-ember-muted border-t border-ember-border/50">
        {rows.length} row{rows.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
