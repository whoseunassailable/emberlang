import type { Difficulty, TheoryContent } from '../flame1'

export type DsaExerciseType = 'conceptual' | 'quiz' | 'code'

export interface CodeTest {
  call: string       // Python expression run against the learner's code
  expected: string   // Python expression for the expected value
  name?: string      // label shown to the learner; defaults to `call`
  approx?: boolean   // compare numbers with a small tolerance
}

export interface ForbiddenPattern {
  pattern: string    // regex source, matched against the code with comments stripped
  message: string
}

export interface QuizQuestion {
  question: string
  code?: string
  options: string[]
  answer: number
  explanation: string
}

export interface DsaLesson {
  id: string
  title: string
  concept: string
  difficulty: Difficulty
  exerciseType: DsaExerciseType
  xpReward: number
  theory: TheoryContent
  prompt?: string
  explanation?: string
  hint?: string
  // code exercises
  starterCode?: string
  setupCode?: string  // hidden Python (fixtures, helpers) run before the learner's code and before each test
  tests?: CodeTest[]
  forbidden?: ForbiddenPattern[]
  solutionCode?: string
  solutionExplanation?: string
  complexity?: string
  // quiz exercises
  quiz?: QuizQuestion[]
}

export interface DsaModule {
  id: number
  name: string
  description: string
  lessons: DsaLesson[]
}
