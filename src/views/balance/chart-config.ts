import { ChartDataset } from 'chart.js'

import { getCssVar } from '@/support/helpers'

export const CHART_SHARED_DATASET: Partial<ChartDataset> = {
  borderWidth: 2,
  pointHitRadius: 10,
  pointRadius: 3,
}

export const CHART_SALES_DATASET: Partial<ChartDataset> = {
  label: 'Entradas',
  backgroundColor: getCssVar('--ion-color-success-shade'),
  borderColor: `rgba(${getCssVar('--ion-color-success-rgb')}, .5)`,
}

export const CHART_EXPENSES_DATASET: Partial<ChartDataset> = {
  label: 'Saídas',
  backgroundColor: getCssVar('--ion-color-danger-shade'),
  borderColor: `rgba(${getCssVar('--ion-color-danger-rgb')}, .5)`,
}
