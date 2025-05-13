<script setup lang="ts">
import { Directory } from '@capacitor/filesystem'
import { IonButton, IonModal } from '@ionic/vue'
import { PhDownloadSimple } from '@phosphor-icons/vue'
import { helpers, required } from '@vuelidate/validators'
import { useTemplateRef } from 'vue'

import AppInput from '@/components/AppInput.vue'
import AppModalHeader from '@/components/AppModalHeader.vue'
import { useBackup } from '@/composables/use-backup'
import { useForm } from '@/composables/use-form'
import { presentToast } from '@/support/toast'

const { saveBackupFile } = useBackup()

const emit = defineEmits(['backup-saved'])
const modal = useTemplateRef('modal')
const form = useForm<{ filename: string }>(
  { filename: '' },
  {
    filename: { required: helpers.withMessage('Por favor, informe um nome', required) },
  },
)

const onSaveClick = async () => {
  if (!(await form.validate())) {
    return
  }

  try {
    await saveBackupFile(form.data.filename)
    await presentToast({ color: 'success', message: 'Arquivo salvo!' })

    modal.value?.$el.dismiss()

    emit('backup-saved')
  } catch (e) {
    console.error('Something went wrong', e)
  }
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Salve seus dados"
        :icon="PhDownloadSimple"
        class="text-[var(--ion-color-primary)]"
      >
        <template #subtitle>
          O arquivo será salvo na pasta <b>{{ Directory.Documents }}</b> do seu aparelho
        </template>
      </AppModalHeader>

      <div class="mb-5">
        <form @focus.capture="form.clearErrorOnFocus">
          <AppInput
            v-model="form.data.filename"
            name="filename"
            label="Nome do arquivo"
            placeholder="Digite o nome do arquivo..."
            helper-text='O nome do arquivo sempre termina com ".json"'
            :error="form.errors.filename"
          >
            <div slot="end">.json</div>
          </AppInput>
        </form>
      </div>

      <div class="flex">
        <IonButton
          class="w-full"
          fill="clear"
          shape="round"
          @click="modal?.$el.dismiss()"
        >
          Cancelar
        </IonButton>
        <IonButton
          class="w-full"
          shape="round"
          @click="onSaveClick"
        >
          Salvar
        </IonButton>
      </div>
    </div>
  </IonModal>
</template>
