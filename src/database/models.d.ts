export type Customer = {
  id: number
  name: string
  phone: string | null | undefined
  created_at: string
}

export type Product = {
  id: number
  name: string
  created_at: string
}

export type Sale = {
  id: number
  customer_id: number
  product_id: number
  price: number
  quantity: number
  total: number
  paid_at: string | null
  date: string
  created_at: string
}
