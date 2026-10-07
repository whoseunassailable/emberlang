import { Link } from 'react-router-dom'
import type { Difficulty, Lesson } from '../../data/flame1'

const difficultyConfig: Record<Difficulty, { label: string; classes: string }> = {
  kindling: { label: 'Kindling', classes: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
  blaze:    { label: 'Blaze',    classes: 'bg-ember-orange/10 border-ember-orange/30 text-ember-orange' },
  pyre:     { label: 'Pyre',     classes: 'bg-red-900/20 border-red-700/40 text-red-400' },
}

interface Props {
  lesson: Pick<Lesson, 'id' | 'title' | 'concept' | 'difficulty' | 'xpReward'>
  href?: string
  completed: boolean
  locked: boolean
  isFirst: boolean
}

export function LessonCard({ lesson, href, completed, locked, isFirst }: Props) {
  const content = (
    <div
      className={`relative rounded-xl border p-5 transition-all ${
        completed
          ? 'border-ember-orange/40 bg-ember-surface shadow-ember-orange/5 shadow-lg'
          : locked
          ? 'border-ember-border/40 bg-ember-surface/40 opacity-50'
          : 'border-ember-border bg-ember-surface hover:border-ember-orange/30 hover:shadow-ember-orange/5 hover:shadow-lg'
      }`}
    >
      {completed && (
        <div className="absolute -top-2 -right-2 rounded-full bg-ember-orange px-2 py-0.5 text-xs font-semibold text-white shadow">
          ✓ Ember
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-1 text-xs font-mono text-ember-muted uppercase tracking-wider">
            {lesson.concept}
          </div>
          <div className="mb-1.5">
            <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${difficultyConfig[lesson.difficulty].classes}`}>
              {difficultyConfig[lesson.difficulty].label}
            </span>
          </div>
          <div className="font-semibold text-ember-text truncate">{lesson.title}</div>
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="rounded-full bg-ember-surface-2 border border-ember-border px-2.5 py-0.5 text-xs font-mono text-ember-orange">
            +{lesson.xpReward} ✦
          </div>
          {locked && <span className="text-ember-muted text-xs">🔒</span>}
        </div>
      </div>

      {!locked && !completed && isFirst && (
        <div className="mt-3 text-xs text-ember-orange">Start →</div>
      )}
    </div>
  )

  if (locked) return content

  return <Link to={href ?? `/lesson/${lesson.id}`} className="block no-underline">{content}</Link>
}
