<script setup lang="ts">
import { useForm } from '@/composables/use-form'
import { IonCol, IonContent, IonGrid, IonIcon, IonInput, IonRow, IonText } from '@ionic/vue'

import { basketSharp } from 'ionicons/icons'

const form = useForm({
  price: '',
  quantity: 1,
  customer: {},
  product: {},
  is_paid: false,
  date: '',
})
</script>

<template>
  <form
    action=""
    style="height: 100%"
  >
    <IonContent>
      <IonGrid class="ion-margin-bottom">
        <IonRow class="ion-text-center">
          <IonCol>
            <IonIcon
              :icon="basketSharp"
              :style="{ fontSize: '10rem' }"
              color="success"
            />
          </IonCol>
        </IonRow>
        <IonRow class="ion-text-center ion-margin-bottom">
          <IonCol>
            <IonText>
              <h3>Registre uma nova venda ou despesa</h3>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <IonInput
              v-model="form.data.price"
              :class="{
                'ion-invalid ion-touched': !!form.data.price,
              }"
              :error-text="form.errors.price"
              name="price"
              label-placement="floating"
              fill="outline"
              placeholder="R$ "
              clear-input
              label="Preço"
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </form>
</template>
