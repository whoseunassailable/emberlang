// Copies the Pyodide runtime out of node_modules into public/pyodide so the
// DSA lesson worker can load it from the app's own origin (same idea as
// public/sql-wasm.wasm). Runs on `npm install`; re-run with `npm run sync:pyodide`.
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const from = join(root, 'node_modules', 'pyodide')
const to = join(root, 'public', 'pyodide')

const files = [
  'pyodide.mjs',
  'pyodide.asm.mjs',
  'pyodide.asm.wasm',
  'python_stdlib.zip',
  'pyodide-lock.json',
]

mkdirSync(to, { recursive: true })
for (const file of files) copyFileSync(join(from, file), join(to, file))
console.log(`Synced Pyodide runtime to public/pyodide (${files.length} files)`)
