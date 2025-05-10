import type { Prefix } from '@/types/helpers'
import type { Customer, Entry, Product } from '@/types/models'

export type EntryRecordHome = { id: string; total_paid: number | null } & Prefix<
  Pick<Customer, 'id' | 'name' | 'phone'>,
  'customer'
> &
  Prefix<Pick<Product, 'id' | 'name'>, 'product'> &
  Prefix<Entry, 'entry'>
