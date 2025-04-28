import { fakerPT_BR as faker } from '@faker-js/faker'

import { ProductInsert } from '@/types/models'

type ProductFactoryOptions = {
  data: Partial<ProductInsert>
}

type MakeProductFn = (options?: Partial<ProductFactoryOptions>) => ProductInsert

export const makeProduct: MakeProductFn = (options = {}) => {
  return {
    name: faker.commerce.productName(),
    ...options.data,
  }
}
