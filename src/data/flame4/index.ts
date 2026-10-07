import type { DsaLesson, DsaModule } from './types'
import { module1 } from './module1'

// Flame IV: DSA — Kindling tier.

export const flame4Modules: DsaModule[] = [
  { id: 1, name: 'Search & Big O', description: 'Two ways to search a list, and a language for comparing them', lessons: module1 },
]

export const flame4Lessons: DsaLesson[] = flame4Modules.flatMap((m) => m.lessons)

export const FLAME4_LESSON_MAP: Record<string, DsaLesson> = Object.fromEntries(
  flame4Lessons.map((l) => [l.id, l])
)
