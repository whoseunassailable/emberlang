import type { CodeTest } from '../data/flame4/types'

export interface TestResult {
  name: string
  passed: boolean
  expected: string
  actual: string
  error: string | null
}

export interface PyRunResult {
  error: string | null
  stdout: string
  tests: TestResult[]
}

export type WorkerRequest =
  | { type: 'warm' }
  | { type: 'run'; id: number; userCode: string; setupCode: string; tests: CodeTest[] }

export type WorkerResponse =
  | { type: 'started'; id: number }
  | { type: 'done'; id: number; result: PyRunResult }
  | { type: 'crashed'; id: number; error: string }

const TIME_LIMIT_MS = 6000

let worker: Worker | null = null
let nextId = 0

function getWorker(): Worker {
  if (!worker) {
    worker = new Worker(new URL('./pyWorker.ts', import.meta.url), { type: 'module' })
  }
  return worker
}

// Start loading Python before the learner hits Run.
export function warmPython() {
  getWorker().postMessage({ type: 'warm' } satisfies WorkerRequest)
}

export function runPython(
  userCode: string,
  tests: CodeTest[],
  setupCode = ''
): Promise<PyRunResult> {
  const w = getWorker()
  const id = ++nextId

  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout> | undefined

    const finish = (result: PyRunResult) => {
      clearTimeout(timer)
      w.removeEventListener('message', onMessage)
      w.removeEventListener('error', onError)
      resolve(result)
    }

    // The worker is unusable after a hang or crash, so drop it; the next run
    // starts a fresh one.
    const fail = (error: string) => {
      w.terminate()
      if (worker === w) worker = null
      finish({ error, stdout: '', tests: [] })
    }

    const onMessage = (e: MessageEvent<WorkerResponse>) => {
      const msg = e.data
      if (msg.id !== id) return
      if (msg.type === 'started') {
        // The clock starts once Python is loaded, so a slow first download
        // never counts against the learner's code.
        timer = setTimeout(
          () =>
            fail(
              `Timed out after ${TIME_LIMIT_MS / 1000}s. Look for an infinite loop, or an approach that does far too much work on a large input.`
            ),
          TIME_LIMIT_MS
        )
      } else if (msg.type === 'done') {
        finish(msg.result)
      } else {
        fail(msg.error)
      }
    }

    const onError = (e: ErrorEvent) => fail(`Failed to load Python engine: ${e.message}`)

    w.addEventListener('message', onMessage)
    w.addEventListener('error', onError)
    w.postMessage({ type: 'run', id, userCode, setupCode, tests } satisfies WorkerRequest)
  })
}
