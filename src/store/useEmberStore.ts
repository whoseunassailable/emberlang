import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EmberStore {
  completedLessons: string[]
  totalSparks: number
  lastVisitDate: string | null
  streak: number
  completeLesson: (id: string, sparks: number) => void
  isCompleted: (id: string) => boolean
  recordVisit: () => void
}

export const useEmberStore = create<EmberStore>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      totalSparks: 0,
      lastVisitDate: null,
      streak: 0,

      completeLesson: (id, sparks) => {
        const { completedLessons } = get()
        if (completedLessons.includes(id)) return
        set({
          completedLessons: [...completedLessons, id],
          totalSparks: get().totalSparks + sparks,
        })
      },

      isCompleted: (id) => get().completedLessons.includes(id),

      recordVisit: () => {
        const today = new Date().toDateString()
        const { lastVisitDate, streak } = get()
        if (lastVisitDate === today) return

        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const newStreak = lastVisitDate === yesterday ? streak + 1 : 1
        set({ lastVisitDate: today, streak: newStreak })
      },
    }),
    { name: 'emberlang-progress' }
  )
)
