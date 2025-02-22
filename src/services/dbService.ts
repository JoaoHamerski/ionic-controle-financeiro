import { useDatabaseStore } from '@/database/database-store'

export const dbInsert = async (table: string, data: { [obj: string]: any }) => {
  const db = useDatabaseStore().db

  const columns = Object.keys(data).join(', ')
  const values = Object.values(data)
  const placeholders = Array(values.length).fill('?').join(', ')

  const result = await db.run(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values)

  console.log(r.changes)
}
