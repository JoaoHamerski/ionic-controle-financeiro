export type Customer = {
  id: number
  name: string
  phone: string | null
  created_at: string
}

export type Product = {
  id: number
  name: string
  created_at: string
}

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

export type Payment = {
  id: number
  entry_id: number
  value: number
  date: string
  created_at: string
}
