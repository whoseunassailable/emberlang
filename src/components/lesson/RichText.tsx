import type { ReactNode } from 'react'

// Lesson copy uses a tiny markdown subset: blank-line paragraphs, ``` fenced
// code blocks, **bold** and `inline code`. Rendered as React nodes (not
// innerHTML) because Python snippets are full of < and > characters.

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*.+?\*\*|`.+?`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="text-ember-text font-semibold">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={i}
          className="rounded bg-ember-surface border border-ember-border px-1.5 py-0.5 text-xs font-mono text-ember-orange"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

interface Props {
  text: string
  className?: string
}

export function RichText({ text, className = 'text-sm text-ember-text/80 leading-relaxed' }: Props) {
  return (
    <>
      {text.split('\n\n').map((para, i) => {
        if (para.startsWith('```')) {
          const code = para.replace(/^```\w*\n?/, '').replace(/\n?```$/, '')
          return (
            <pre
              key={i}
              className="rounded-lg bg-ember-surface border border-ember-border p-3 overflow-x-auto text-xs font-mono text-ember-orange"
            >
              {code}
            </pre>
          )
        }
        return (
          <p key={i} className={className}>
            {renderInline(para)}
          </p>
        )
      })}
    </>
  )
}
