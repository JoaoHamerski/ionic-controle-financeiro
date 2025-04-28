import { makeProduct } from '../factories/product-factory'

export const seedDatabase = () => {
  for (let i = 0; i < 50; i++) {
    console.log(makeProduct())
  }
}

seedDatabase()
