import { useState } from 'react'

const EMPLOYEES = [
  { id: 1, name: 'Alice', department: 'Engineering', salary: 95000 },
  { id: 2, name: 'Bob', department: 'Marketing', salary: 72000 },
  { id: 3, name: 'Carol', department: 'Engineering', salary: 88000 },
  { id: 4, name: 'David', department: 'HR', salary: 65000 },
]

type Part = 'table' | 'column' | 'row' | 'cell' | null

const LABELS: Record<NonNullable<Part>, { label: string; color: string }> = {
  table: { label: 'Table', color: 'border-purple-500 bg-purple-500/10' },
  column: { label: 'Column', color: 'border-blue-400 bg-blue-400/10' },
  row: { label: 'Row', color: 'border-ember-success bg-ember-success/10' },
  cell: { label: 'Cell', color: 'border-ember-orange bg-ember-orange/10' },
}

interface Props {
  onComplete: () => void
}

export function ConceptualTable({ onComplete }: Props) {
  const [selected, setSelected] = useState<Part>(null)
  const [identified, setIdentified] = useState<Set<Part>>(new Set())

  const identify = (part: Part) => {
    setSelected(part)
    if (part) {
      const next = new Set(identified)
      next.add(part)
      setIdentified(next)
      if (next.size === 4) {
        setTimeout(onComplete, 800)
      }
    }
  }

  const columns = ['id', 'name', 'department', 'salary']

  return (
    <div className="space-y-4">
      <p className="text-sm text-ember-muted">
        Click on different parts of the table to identify them. Find all 4 parts to continue.
      </p>

      <div className="flex gap-2 flex-wrap">
        {(Object.keys(LABELS) as Part[]).map((part) => (
          <button
            key={part}
            onClick={() => identify(part)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs border transition-all ${
              identified.has(part)
                ? LABELS[part!]!.color + ' text-ember-text'
                : 'border-ember-border text-ember-muted hover:border-ember-orange/50'
            }`}
          >
            {identified.has(part) && <span>✓</span>}
            {LABELS[part!]!.label}
          </button>
        ))}
      </div>

      <div
        className={`rounded-lg border-2 transition-all cursor-pointer overflow-hidden ${
          selected === 'table'
            ? LABELS.table.color
            : 'border-ember-border hover:border-ember-border/80'
        }`}
        onClick={() => identify('table')}
      >
        <div className="px-3 py-1.5 text-xs text-ember-muted bg-ember-surface-2 border-b border-ember-border">
          employees
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ember-surface-2">
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={(e) => { e.stopPropagation(); identify('column') }}
                  className={`px-3 py-2 text-left font-mono text-xs uppercase tracking-wider cursor-pointer transition-colors ${
                    selected === 'column'
                      ? 'text-blue-400'
                      : 'text-ember-orange hover:text-blue-400'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((emp, i) => (
              <tr
                key={emp.id}
                onClick={(e) => { e.stopPropagation(); identify('row') }}
                className={`border-t border-ember-border/50 cursor-pointer transition-colors ${
                  selected === 'row' ? 'bg-ember-success/5' : 'hover:bg-ember-success/5'
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (i === 1 && col === 'name') identify('cell')
                    }}
                    className={`px-3 py-2 font-mono text-ember-text/90 ${
                      i === 1 && col === 'name'
                        ? `cursor-pointer rounded ${selected === 'cell' ? 'text-ember-orange bg-ember-orange/10' : 'hover:text-ember-orange hover:bg-ember-orange/10'}`
                        : ''
                    }`}
                  >
                    {i === 1 && col === 'name' && selected !== 'cell' ? (
                      <span className="underline decoration-dotted decoration-ember-muted">
                        {emp[col as keyof typeof emp]}
                      </span>
                    ) : (
                      String(emp[col as keyof typeof emp])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className={`rounded-lg border p-3 text-sm ${LABELS[selected]!.color}`}>
          <span className="font-semibold text-ember-text">{LABELS[selected]!.label}:</span>{' '}
          <span className="text-ember-text/80">
            {selected === 'table' && 'The entire grid of data. This table is called "employees".'}
            {selected === 'column' && 'A named category of data. This table has 4 columns: id, name, department, salary.'}
            {selected === 'row' && 'One complete record — a single employee in this case.'}
            {selected === 'cell' && 'A single value where a row meets a column. This cell contains "Bob".'}
          </span>
        </div>
      )}

      <div className="text-xs text-ember-muted">
        {identified.size}/4 parts identified
        {identified.size === 4 && <span className="text-ember-success ml-2">— moving on!</span>}
      </div>
    </div>
  )
}
