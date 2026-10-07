import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { EditorView } from '@codemirror/view'

const emberTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#1a1612 !important', color: '#f5f0eb' },
    '.cm-scroller': { backgroundColor: '#1a1612' },
    '.cm-content': { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '13px', caretColor: '#f97316' },
    '.cm-line': { padding: '0 8px' },
    '.cm-cursor': { borderLeftColor: '#f97316' },
    '.cm-selectionBackground': { backgroundColor: '#2d2418 !important' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: '#3d3020 !important' },
    '.cm-gutters': { backgroundColor: '#15120f', color: '#8b7355', borderRight: '1px solid #2d2418' },
    '.cm-activeLineGutter': { backgroundColor: '#1e1a14' },
    '.cm-activeLine': { backgroundColor: '#1e1a14' },
  },
  true  // dark variant
)

interface Props {
  value: string
  onChange: (v: string) => void
  onRun: () => void
  disabled?: boolean
}

export function SqlEditor({ value, onChange, onRun, disabled }: Props) {
  const handleKey = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      onRun()
    }
  }

  return (
    <div className="space-y-2" onKeyDown={handleKey}>
      <div className="overflow-hidden rounded-lg border border-ember-border">
        <div className="flex items-center justify-between border-b border-ember-border bg-ember-surface-2 px-3 py-1.5">
          <span className="text-xs text-ember-muted font-mono">SQL</span>
          <span className="text-xs text-ember-muted">⌘↵ to run</span>
        </div>
        <CodeMirror
          value={value}
          onChange={onChange}
          extensions={[sql(), emberTheme]}
          basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true }}
          minHeight="120px"
          editable={!disabled}
        />
      </div>

      <button
        onClick={onRun}
        disabled={disabled || !value.trim()}
        className="w-full rounded-lg bg-ember-surface border border-ember-border px-4 py-2.5 text-sm font-semibold text-ember-orange transition-colors hover:border-ember-orange/40 hover:bg-ember-surface-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ▶ Run
      </button>
    </div>
  )
}
