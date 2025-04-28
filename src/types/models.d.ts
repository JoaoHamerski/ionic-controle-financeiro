import { MakePartial } from './helpers'

export type Customer = {
  id: number
  name: string
  phone: string | null
  created_at: string
}

export type CustomerInsert = MakePartial<Customer, 'id' | 'created_at'>

export type Product = {
  id: number
  name: string
  created_at: string
}

export type ProductInsert = MakePartial<Product, 'id' | 'created_at'>

export type Entry = {
  id: number
  customer_id: number
  product_id: number
  value: number
  quantity: number
  total: number
  note: string | null
  date: string
  created_at: string
}

export type EntryInsert = MakePartial<Entry, 'id' | 'created_at'>

export type Payment = {
  id: number
  entry_id: number
  value: number
  date: string
  created_at: string
}
