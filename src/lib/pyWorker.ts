import { PY_HARNESS } from './pyHarness'
import type { WorkerRequest, WorkerResponse } from './pyRunner'

// Runs learner Python in Pyodide off the main thread, so pyRunner.ts can stop
// an infinite loop by terminating this worker.

type RunFn = (userCode: string, setupCode: string, testsJson: string) => string

interface Pyodide {
  runPython: (code: string) => unknown
  globals: { get: (name: string) => RunFn }
}

// Pyodide is served from public/pyodide (see scripts/sync-pyodide.mjs).
const indexURL = new URL(`${import.meta.env.BASE_URL}pyodide/`, self.location.origin).href

let harness: Promise<RunFn> | null = null

function getHarness(): Promise<RunFn> {
  if (!harness) {
    harness = import(/* @vite-ignore */ `${indexURL}pyodide.mjs`).then(async (mod) => {
      const py: Pyodide = await mod.loadPyodide({ indexURL })
      py.runPython(PY_HARNESS)
      return py.globals.get('__ember_run')
    })
    harness.catch(() => {
      harness = null
    })
  }
  return harness
}

const post = (msg: WorkerResponse) => self.postMessage(msg)

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
  const msg = e.data
  if (msg.type === 'warm') {
    getHarness().catch(() => {})
    return
  }

  const { id } = msg
  let run: RunFn
  try {
    run = await getHarness()
  } catch (err) {
    post({ type: 'crashed', id, error: `Failed to load Python engine: ${(err as Error).message}` })
    return
  }

  post({ type: 'started', id })
  try {
    const tests = msg.tests.map((t) => ({ ...t, name: t.name ?? t.call }))
    post({ type: 'done', id, result: JSON.parse(run(msg.userCode, msg.setupCode, JSON.stringify(tests))) })
  } catch (err) {
    post({ type: 'crashed', id, error: `Python crashed: ${(err as Error).message}` })
  }
}
