<script setup lang="ts">
import { seedDatabase } from '@/database/seed'
import { useDatabaseStore } from '@/stores/database-store'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { dbSelect, dbTableColumns } from './services/db-service'

const databaseStore = useDatabaseStore()

const prefixColumns = async (columns: string[] | '*', table: string, prefix: string) => {
  const allColumns = columns === '*' ? await dbTableColumns(table) : columns

  return allColumns.map((column) => `${table}.${column} as ${prefix}_${column}`)
}

onMounted(async () => {
  await databaseStore.initDatabase()
  await seedDatabase()

  const sql = databaseStore.builder
    .select([
      ...(await prefixColumns('*', 'customers', 'customer')),
      ...(await prefixColumns('*', 'products', 'product')),
      ...(await prefixColumns('*', 'sales', 'sale')),
    ])
    .from('sales')
    .join('customers', 'sales.customer_id', '=', 'customers.id')
    .join('products', 'sales.product_id', '=', 'products.id')

  const data = await dbSelect(sql)

  console.log(data)
})
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
