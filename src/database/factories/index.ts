import { faker } from '@faker-js/faker'

export const parseChances = <T extends Record<string, number>>(chances: T) => {
  const parsed = {} as Record<keyof T, boolean>

  for (const key in chances) {
    parsed[key] = faker.datatype.boolean({ probability: chances[key] })
  }

  return parsed
}
