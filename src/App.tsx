import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Forge } from './pages/Forge'
import { BlazeForge } from './pages/BlazeForge'
import { Lesson } from './pages/Lesson'
import { DsaForge } from './pages/DsaForge'
import { DsaLesson } from './pages/DsaLesson'
import { useEmberStore } from './store/useEmberStore'
import { useEffect } from 'react'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/forge', element: <Forge /> },
  { path: '/lesson/:id', element: <Lesson /> },
  { path: '/blaze', element: <BlazeForge /> },
  { path: '/dsa', element: <DsaForge /> },
  { path: '/dsa/lesson/:id', element: <DsaLesson /> },
])

export default function App() {
  const recordVisit = useEmberStore((s) => s.recordVisit)
  useEffect(() => { recordVisit() }, [recordVisit])
  return <RouterProvider router={router} />
}
