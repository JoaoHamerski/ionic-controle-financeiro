import { faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { chunk } from 'lodash-es'
import { DateTime } from 'luxon'

import { dbSelect, dbStatement } from '@/services/db-service'
import { Entry } from '@/types/models'

export const seedPayments = async (knex: Knex) => {
  const ENTRY_COLUMNS = ['id', 'total', 'created_at'] as const

  const entries: Pick<Entry, (typeof ENTRY_COLUMNS)[number]>[] = await dbSelect(
    knex.select(ENTRY_COLUMNS).from('entries').where('total', '>', 0),
  )

  const payments = []

  for (const entry of entries) {
    const hasPayment = faker.datatype.boolean({ probability: 0.75 })
    const hasFullPayment = faker.datatype.boolean({ probability: 0.45 })

    if (!hasPayment) {
      continue
    }

    let partials = generatePartialValues(entry.total, faker.number.int({ min: 1, max: 8 }))
    const paidAt = faker.date.between({
      from: DateTime.fromSQL(entry.created_at).toISODate()!,
      to: DateTime.now().toISODate(),
    })

    if (!hasFullPayment) {
      partials = partials.slice(0, +(partials.length / 2).toFixed(0))
    }

    payments.push(
      ...partials.map((value) => ({
        value,
        entry_id: entry.id,
        created_at: DateTime.fromJSDate(paidAt).toSQL(),
      })),
    )
  }

  for (const _payments of chunk(payments, 100)) {
    await dbStatement(knex.insert(_payments).into('payments'))
  }
}

const generatePartialValues = (maxValue: number, totalParts: number) => {
  const partials = []
  const avg = +(maxValue / totalParts).toFixed(2)
  let total = 0

  for (let i = 0; i < totalParts; i++) {
    let value = faker.number.float({ min: 1, max: avg * 2, fractionDigits: 2 })

    if (i === totalParts - 1) {
      value = total < maxValue ? +(maxValue - total).toFixed(2) : +(total - maxValue).toFixed(2)
    }

    total += value
    partials.push(value)
  }

  return partials
}
