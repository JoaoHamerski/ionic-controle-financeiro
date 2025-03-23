import { DateTime } from 'luxon'

type Period = {
  label: string
  interval: () => [DateTime, DateTime]
}

type PeriodKey = 'last-7-days' | 'last-14-days'

export const PERIODS: Record<PeriodKey, Period> = {
  'last-7-days': {
    label: 'Últimos 7 dias',
    interval: () => [DateTime.now().minus({ days: 6 }).startOf('day'), DateTime.now().endOf('day')],
  },
  'last-14-days': {
    label: 'Últimos 14 dias',
    interval: () => [
      DateTime.now().minus({ days: 13 }).startOf('day'),
      DateTime.now().endOf('day'),
    ],
  },
}
