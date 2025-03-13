import { upperFirst } from 'lodash'

import { dbTableColumns } from '@/services/db-service'

export const stripNonDigits = (value: string) => value.replace(/\D/g, '')

export const prefixColumns = async (columns: string[] | '*', table: string, prefix: string) => {
  const allColumns = columns === '*' ? await dbTableColumns(table) : columns

  return allColumns.map((column) => `${table}.${column} as ${prefix}_${column}`)
}

export const formatCurrencyBRL = (value: string | number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(+value)

export const parseCurrencyBRL = (value: string) => {
  return value.replaceAll('.', '').replaceAll(',', '.').replaceAll('R$ ', '')
}

export const titleCase = (value: string, except: string[] = ['de', 'da', 'dos', 'do', 'das']) =>
  value
    .split(' ')
    .map((word) => (except.includes(word) ? word : upperFirst(word)))
    .join(' ')

export const getCssVar = (value: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(value)
