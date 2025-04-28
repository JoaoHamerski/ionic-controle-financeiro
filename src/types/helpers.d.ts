export type Prefix<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}_${string & K}`]: T[K]
}

export type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
