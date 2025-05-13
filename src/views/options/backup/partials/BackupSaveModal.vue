<script setup lang="ts">
import { CapacitorException } from '@capacitor/core'
import { Directory } from '@capacitor/filesystem'
import { IonButton, IonModal } from '@ionic/vue'
import { PhUploadSimple } from '@phosphor-icons/vue'
import { helpers, required } from '@vuelidate/validators'
import { useTemplateRef } from 'vue'
import { computed } from 'vue'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import AppModalHeader from '@/components/AppModalHeader.vue'
import { useBackup } from '@/composables/use-backup'
import { useForm } from '@/composables/use-form'
import { presentToast } from '@/support/toast'

const { getBackupFilename, saveBackupFile } = useBackup()

const emit = defineEmits(['backup-saved'])
const modal = useTemplateRef('modal')
const form = useForm<{ filename: string }>(
  { filename: '' },
  {
    filename: { required: helpers.withMessage('Por favor, informe um nome', required) },
  },
)

const error = ref('')
const backupFilename = ref('')
const willOverwriteFile = computed(() => form.data.filename === backupFilename.value)

const onModalPresent = async () => {
  const filename = (await getBackupFilename()).split('.json')[0]

  backupFilename.value = filename
  form.data.filename = filename
}

const onSaveClick = async () => {
  error.value = ''

  if (!(await form.validate())) {
    return
  }

  try {
    await saveBackupFile(form.data.filename)
    modal.value?.$el.dismiss()
    presentToast({ color: 'success', message: 'Backup salvo!' })

    emit('backup-saved')
  } catch (e) {
    if (e instanceof CapacitorException && e.message === 'FILE_NOTCREATED') {
      error.value = e.message
    }
  }
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
    @will-present="onModalPresent"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Salve seus dados"
        :icon="PhUploadSimple"
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

      <div v-auto-animate>
        <div
          v-if="error"
          class="mb-5 text-[var(--ion-color-danger-shade)] text-sm"
        >
          <template v-if="error === 'FILE_NOTCREATED'">
            Já existe um arquivo com o nome <b>{{ form.data.filename }}.json</b> no diretório
            <b>{{ Directory.Documents }}</b
            >. Por favor, escolha outro nome ou remova o arquivo
          </template>
        </div>
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
          {{ willOverwriteFile ? 'Sobrescrever' : 'Salvar' }}
        </IonButton>
      </div>
    </div>
  </IonModal>
</template>
