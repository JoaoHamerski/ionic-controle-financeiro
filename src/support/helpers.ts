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

export const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64)

  const bytes = new Uint8Array(binaryString.length)

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  return new TextDecoder('utf-8').decode(bytes)
}
