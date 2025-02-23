<script setup lang="ts">
import { useDatabaseStore } from '@/database/database-store'
import { dbInsert } from '@/services/db-service'
import { stripNonDigits } from '@/support/helpers'

import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
} from '@ionic/vue'
import type { MaskitoOptions } from '@maskito/core'
import { maskito as vMaskito } from '@maskito/vue'
import { checkmark, peopleCircle } from 'ionicons/icons'
import { computed, ref } from 'vue'

const N = /\d/
const emit = defineEmits(['submitted'])
const dbStore = useDatabaseStore()

const form = ref({
  name: '',
  phone: '',
})

const phoneRaw = computed(() => stripNonDigits(form.value.phone))

const phoneOptions = computed<MaskitoOptions>(() => ({
  mask: () =>
    phoneRaw.value.length <= 10
      ? ['(', N, N, ')', ' ', N, N, N, N, '-', N, N, N, N, N]
      : ['(', N, N, ')', ' ', N, ' ', N, N, N, N, '-', N, N, N, N],
  elementPredicate: (el: HTMLIonInputElement) => {
    return new Promise((resolve) => {
      requestAnimationFrame(async () => {
        const input = await el.getInputElement()

        resolve(input)
      })
    })
  },
}))

const submit = async () => {
  const sql = dbStore.builder('customers').insert({
    name: form.value.name,
    phone: stripNonDigits(form.value.phone),
  })

  await dbInsert(sql)

  emit('submitted')
}
</script>

<template>
  <IonContent>
    <form @submit="submit">
      <IonGrid class="ion-margin-bottom">
        <IonRow class="ion-text-center">
          <IonCol>
            <IonIcon
              class="highlight-icon"
              :icon="peopleCircle"
              color="success"
            />
          </IonCol>
        </IonRow>
        <IonRow class="ion-text-center ion-margin-bottom">
          <IonCol>
            <IonText>
              <h3>Cadastre um novo cliente</h3>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonInput
              v-model="form.name"
              label="Nome"
              label-placement="floating"
              fill="outline"
              placeholder="Digite o nome..."
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonInput
              v-model="form.phone"
              v-maskito="phoneOptions"
              type="text"
              inputmode="numeric"
              fill="outline"
              label="Celular"
              label-placement="floating"
              placeholder="Digite o celular..."
            />
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonFab
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton
          type="submit"
          @click="submit"
        >
          <IonIcon :icon="checkmark" />
        </IonFabButton>
      </IonFab>
    </form>
  </IonContent>
</template>

<style scoped>
ion-icon.highlight-icon {
  font-size: 10rem;
}

ion-fab {
  margin-bottom: var(--ion-safe-area-bottom, 0);
}
</style>
