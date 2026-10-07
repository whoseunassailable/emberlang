import initSqlJs from 'sql.js'
import type { SqlJsStatic, Database } from 'sql.js'

export type Row = Record<string, string | number | null>

let sqlReady: Promise<SqlJsStatic> | null = null

function getSql(): Promise<SqlJsStatic> {
  if (!sqlReady) {
    sqlReady = initSqlJs({ locateFile: () => '/sql-wasm.wasm' })
  }
  return sqlReady
}

function parseExecResult(stmt: ReturnType<Database['exec']>): { columns: string[]; rows: Row[] } {
  if (!stmt.length) return { columns: [], rows: [] }
  const { columns, values } = stmt[0]
  if (!values.length) return { columns, rows: [] }
  const rows: Row[] = values.map((v) =>
    Object.fromEntries(columns.map((col: string, i: number) => [col, v[i] as string | number | null]))
  )
  return { columns, rows }
}

export async function runQuery(
  seedSQL: string,
  userQuery: string,
  validationQuery?: string
): Promise<{ columns: string[]; rows: Row[]; error: string | null }> {
  try {
    const SQL = await getSql()
    const db: Database = new SQL.Database()

    if (seedSQL.trim()) {
      try {
        db.run(seedSQL)
      } catch (e) {
        db.close()
        return { columns: [], rows: [], error: `Seed error: ${(e as Error).message}` }
      }
    }

    try {
      const userResult = db.exec(userQuery)

      if (validationQuery) {
        const valResult = db.exec(validationQuery)
        db.close()
        return { ...parseExecResult(valResult), error: null }
      }

      db.close()
      return { ...parseExecResult(userResult), error: null }
    } catch (e) {
      db.close()
      return { columns: [], rows: [], error: (e as Error).message }
    }
  } catch (e) {
    return { columns: [], rows: [], error: `Failed to load SQL engine: ${(e as Error).message}` }
  }
}
