export type Prefix<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}_${string & K}`]: T[K]
}
