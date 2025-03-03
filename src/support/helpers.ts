import { dbTableColumns } from '@/services/db-service'

export const stripNonDigits = (value: string) => value.replace(/\D/g, '')

export const prefixColumns = async (columns: string[] | '*', table: string, prefix: string) => {
  const allColumns = columns === '*' ? await dbTableColumns(table) : columns

  return allColumns.map((column) => `${table}.${column} as ${prefix}_${column}`)
}

export const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+value)
