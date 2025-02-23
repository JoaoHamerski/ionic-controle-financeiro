const NUM = /\d/

export const phoneMask = (phone: string) => ({
  mask: () =>
    phone.length <= 10
      ? ['(', NUM, NUM, ')', ' ', NUM, NUM, NUM, NUM, '-', NUM, NUM, NUM, NUM, NUM]
      : ['(', NUM, NUM, ')', ' ', NUM, ' ', NUM, NUM, NUM, NUM, '-', NUM, NUM, NUM, NUM],
  elementPredicate: (el: HTMLIonInputElement) => {
    return new Promise((resolve) => {
      requestAnimationFrame(async () => {
        const input = await el.getInputElement()

        resolve(input)
      })
    })
  },
})
