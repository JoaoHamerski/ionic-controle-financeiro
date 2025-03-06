<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import { arrowBackOutline } from 'ionicons/icons'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { Customer } from '@/database/models'
import { dbInsert, dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

const emit = defineEmits(['customer-selected'])

const modal = ref()
const customers = ref<Customer[]>([])
const customerSearch = ref<string>('')
const isInitFetched = ref<boolean>(false)
const { knex } = useDatabaseStore()

const fetch = async (search?: string) => {
  const sql = knex.select('*').from('customers').orderBy('name')

  if (search) {
    sql.whereLike('name', `%${search}%`)
  }

  const data = await dbSelect(sql)

  customers.value = data
}

const onSearch = (search: string) => {
  fetch(search)
}

const createCustomer = async () => {
  const data = await dbInsert(knex.insert({ name: customerSearch.value }).into('customers'))

  if (!data) {
    throw new Error('Error on creating customer')
  }

  selectCustomer(data as Customer)
}

const selectCustomer = (customer: Customer) => {
  emit('customer-selected', { customer })
}

const onModalWillPresent = async () => {
  await fetch()

  isInitFetched.value = true
}

const onModalDidDismiss = () => {
  customerSearch.value = ''
  isInitFetched.value = false
}
</script>

<template>
  <IonModal
    ref="modal"
    @ion-modal-will-present="onModalWillPresent"
    @ion-modal-did-dismiss="onModalDidDismiss"
  >
    <IonHeader>
      <IonToolbar class="ion-horizontal-padding">
        <IonButtons slot="start">
          <IonButton @click="modal.$el.dismiss()">
            <IonIcon
              slot="icon-only"
              :icon="arrowBackOutline"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div class="ion-text-center">
        <h3>Selecione um cliente</h3>
      </div>

      <div class="ion-padding">
        <AppInput
          v-model="customerSearch"
          placeholder="Digite o nome..."
          label="Busque um cliente"
          helper-text="Ou digite o nome para cadastrar"
          @update:model-value="onSearch"
        />
      </div>

      <IonList lines="full">
        <IonItem
          v-if="!customers.length"
          button
          @click="createCustomer"
        >
          <IonLabel>{{ customerSearch }}</IonLabel>
          <IonLabel
            slot="end"
            color="primary"
            :style="{ fontWeight: 500 }"
          >
            Cadastrar e selecionar
          </IonLabel>
        </IonItem>

        <IonItem
          v-for="customer in customers"
          :key="customer.id"
          button
          @click="selectCustomer(customer)"
        >
          <IonLabel>
            {{ customer.name }}
          </IonLabel>

          <IonLabel
            slot="end"
            color="primary"
            :style="{ fontWeight: 500 }"
          >
            Selecionar
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
</template>

<style scoped>
ion-toolbar ion-button {
  --padding-top: 15px;
  --padding-bottom: 15px;
}
</style>
