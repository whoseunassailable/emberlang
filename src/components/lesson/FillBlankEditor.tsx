import { useState } from 'react'

interface Props {
  template: string
  onSubmit: (query: string) => void
  disabled?: boolean
}

export function FillBlankEditor({ template, onSubmit, disabled }: Props) {
  const [value, setValue] = useState('')

  const parts = template.split('___')
  const fullQuery = parts[0] + value + (parts[1] ?? '')

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-ember-border bg-ember-surface p-4 font-mono text-sm">
        <span className="text-ember-muted">{parts[0]}</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="???"
          className="inline-block w-24 border-b-2 border-ember-orange bg-transparent text-center text-ember-text outline-none placeholder:text-ember-muted/50 focus:border-ember-glow disabled:opacity-50"
          autoFocus
        />
        <span className="text-ember-muted">{parts[1]}</span>
      </div>

      <button
        onClick={() => onSubmit(fullQuery)}
        disabled={disabled || !value.trim()}
        className="w-full rounded-lg bg-ember-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-glow disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Check Answer
      </button>
    </div>
  )
}
