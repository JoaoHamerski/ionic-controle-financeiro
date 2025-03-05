import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core'

const NUM = /\d/

type MaskitoType = MaskitoOptions & {
  elementPredicate?: MaskitoElementPredicate
}

// @ts-expect-error Promise isn't allowed
const elementPredicate: MaskitoElementPredicate = (el: HTMLIonInputElement) => {
  return new Promise((resolve) => {
    requestAnimationFrame(async () => {
      const input = await el.getInputElement()

      resolve(input)
    })
  })
}

export const phoneMask = (phone: string) =>
  ({
    mask: () =>
      phone.length <= 10
        ? ['(', NUM, NUM, ')', ' ', NUM, NUM, NUM, NUM, '-', NUM, NUM, NUM, NUM, NUM]
        : ['(', NUM, NUM, ')', ' ', NUM, ' ', NUM, NUM, NUM, NUM, '-', NUM, NUM, NUM, NUM],
    elementPredicate,
  }) satisfies MaskitoType

export const positiveIntMask = () =>
  ({
    mask: () => [NUM, NUM],
    elementPredicate,
  }) satisfies MaskitoType

export const currencyBrlMask = {
  mask: ({ value }: { value: string }) => {
    const integerPart = value.split(',')[0]
    const digitsCount = integerPart.replaceAll(/\D/g, '').length || 0

    return ['R', '$', ' ', ...Array(digitsCount || 1).fill(NUM), ',', NUM, NUM]
  },
  elementPredicate,
} satisfies MaskitoType
