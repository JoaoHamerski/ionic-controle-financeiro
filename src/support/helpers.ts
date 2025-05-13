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
  return +value.replaceAll('.', '').replaceAll(',', '.').replaceAll('R$', '')
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

export const limit = (str: string, limit: number) => {
  if (str.length < limit) {
    return str
  }

  return str.substring(0, limit).trim() + '...'
}

export function humanFileSize(sizeBytes: number | bigint): string {
  const UNITS = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte']
  const BYTES_PER_KB = 1000
  let size = Math.abs(Number(sizeBytes))

  let u = 0
  while (size >= BYTES_PER_KB && u < UNITS.length - 1) {
    size /= BYTES_PER_KB
    ++u
  }

  return new Intl.NumberFormat([], {
    style: 'unit',
    unit: UNITS[u],
    unitDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(size)
}
