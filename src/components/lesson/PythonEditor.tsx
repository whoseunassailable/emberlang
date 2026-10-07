import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { HighlightStyle, indentUnit, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'

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
  { dark: true }
)

// CodeMirror's default token colors assume a light background.
const emberHighlight = HighlightStyle.define([
  { tag: [t.keyword, t.operatorKeyword, t.controlKeyword, t.definitionKeyword], color: '#f97316' },
  { tag: t.comment, color: '#8b7355', fontStyle: 'italic' },
  { tag: [t.string, t.special(t.string)], color: '#86efac' },
  { tag: [t.number, t.bool, t.null], color: '#fbbf24' },
  { tag: [t.function(t.variableName), t.function(t.propertyName), t.definition(t.variableName)], color: '#fdba74' },
  { tag: [t.className, t.self], color: '#fcd34d' },
  { tag: [t.operator, t.punctuation], color: '#d6c7b5' },
])

const extensions = [python(), indentUnit.of('    '), emberTheme, syntaxHighlighting(emberHighlight)]

interface Props {
  value: string
  onChange: (v: string) => void
  onRun: () => void
  onReset: () => void
  running?: boolean
  disabled?: boolean
}

export function PythonEditor({ value, onChange, onRun, onReset, running, disabled }: Props) {
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
          <span className="text-xs text-ember-muted font-mono">Python</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onReset}
              disabled={disabled}
              className="text-xs text-ember-muted hover:text-ember-orange transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Reset
            </button>
            <span className="text-xs text-ember-muted">⌘↵ to run</span>
          </div>
        </div>
        <CodeMirror
          value={value}
          onChange={onChange}
          extensions={extensions}
          basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true, tabSize: 4 }}
          minHeight="280px"
          editable={!disabled}
        />
      </div>

      <button
        onClick={onRun}
        disabled={disabled || !value.trim()}
        className="w-full rounded-lg bg-ember-surface border border-ember-border px-4 py-2.5 text-sm font-semibold text-ember-orange transition-colors hover:border-ember-orange/40 hover:bg-ember-surface-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {running ? 'Running…' : '▶ Run Tests'}
      </button>
    </div>
  )
}
