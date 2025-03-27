<script setup lang="ts">
import { IonButton, IonModal } from '@ionic/vue'
import { helpers, required } from '@vuelidate/validators'
import { kebabCase } from 'lodash'
import { computed, useTemplateRef } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useBackup } from '@/composables/use-backup'
import { useForm } from '@/composables/use-form'

const emit = defineEmits(['submit'])
const modal = useTemplateRef('modal')

const { getBackupFilename } = useBackup()

const form = useForm(
  {
    filename: '',
  },
  {
    filename: { required: helpers.withMessage('Informe um nome de arquivo.', required) },
  },
)

const filename = computed(() => kebabCase(form.data.filename) + '.json')
const filepath = computed(() => (form.data.filename ? `Documents/${filename.value}` : ''))

const onFileNameSubmit = async () => {
  if (!(await form.validate())) {
    return
  }

  emit('submit', { filename: filename.value })
}

const onModalWillPresent = async () => {
  form.data.filename = (await getBackupFilename()).replaceAll('.json', '')
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
    @will-present="onModalWillPresent"
  >
    <div
      class="ion-margin"
      style="display: flex; flex-direction: column; gap: 1.5rem"
    >
      <h5
        class="ion-text-center"
        style="margin-top: 0.5rem"
      >
        Digite um nome para o arquivo
      </h5>

      <div style="color: var(--ion-color-medium); font-size: 0.85rem">
        O arquivo será armazenado no diretório <b>Documents</b> do seu aparelho
      </div>

      <form
        id="filename-form"
        @submit.prevent="onFileNameSubmit"
        @focus.capture="form.clearErrorOnFocus"
      >
        <AppInput
          v-model="form.data.filename"
          name="filename"
          :error="form.errors.filename"
          label="Nome do arquivo"
          placeholder="Digite o nome..."
          :helper-text="filepath"
        />
      </form>

      <div style="display: flex; justify-content: space-between">
        <IonButton
          fill="clear"
          @click="modal?.$el.dismiss()"
        >
          Cancelar
        </IonButton>
        <IonButton
          form="filename-form"
          type="submit"
          >Salvar</IonButton
        >
      </div>
    </div>
  </IonModal>
</template>
