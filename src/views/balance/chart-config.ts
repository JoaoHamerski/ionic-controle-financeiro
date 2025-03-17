import { ChartDataset } from 'chart.js'

import { getCssVar } from '@/support/helpers'

export const CHART_SALES_DATASET: Partial<ChartDataset> = {
  label: 'Entradas',
  backgroundColor: getCssVar('--ion-color-success-shade'),
  borderColor: `rgba(${getCssVar('--ion-color-success-rgb')}, .5)`,
}

export const CHART_PAYMENTS_DATASET: Partial<ChartDataset> = {
  label: 'Pagamentos',
  backgroundColor: getCssVar('--ion-color-primary-shade'),
  borderColor: `rgba(${getCssVar('--ion-color-primary-rgb')}, .5)`,
}

export const CHART_EXPENSES_DATASET: Partial<ChartDataset> = {
  label: 'Saídas',
  backgroundColor: getCssVar('--ion-color-danger-shade'),
  borderColor: `rgba(${getCssVar('--ion-color-danger-rgb')}, .5)`,
}
