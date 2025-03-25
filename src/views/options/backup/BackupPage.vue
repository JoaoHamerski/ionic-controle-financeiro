<script setup lang="ts">
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { FilePicker } from '@capawesome/capacitor-file-picker'
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  onIonViewDidEnter,
} from '@ionic/vue'
import humanizeDuration from 'humanize-duration'
import { saveSharp } from 'ionicons/icons'
import { upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { ref } from 'vue'

import { useDatabaseStore } from '@/stores/database-store'

import OptionsHeader from '../_partials/OptionsHeader.vue'

const FILENAME = 'controle-financeiro-dados.json'
const { database } = useDatabaseStore()

const lastBackupAt = ref<DateTime | null>(null)

const fetchFileInfo = async () => {
  try {
    const stat = await Filesystem.stat({
      path: FILENAME,
      directory: Directory.Documents,
    })

    lastBackupAt.value = DateTime.fromMillis(stat.mtime)
  } catch (e) {
    console.error(e)
  }
}

const recoverData = async () => {
  await FilePicker.pickFiles()
}

onIonViewDidEnter(async () => {
  await fetchFileInfo()
})
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Backup"
      has-back-button
    />

    <IonContent class="ion-padding">
      <IonGrid style="display: flex; flex-direction: column; height: 100%">
        <IonRow>
          <IonCol class="ion-text-center">
            <IonIcon
              color="primary"
              :icon="saveSharp"
              style="font-size: 5rem"
            />
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h3 class="ion-text-center">Salve ou recupere seus dados</h3>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <p
              class="ion-text-center"
              style="color: var(--ion-color-medium)"
            >
              O arquivo de dados ficarão somente no seu aparelho, armazene-os em um local seguro,
              como na nuvem (Google Drive, Dropbox e etc...)
            </p>
          </IonCol>
        </IonRow>

        <!-- <IonRow>
          <IonCol> <h5>Informações do backup:</h5> </IonCol>
        </IonRow> -->

        <!-- <IonRow>
          <IonCol>
            <IonList lines="full">
              <IonItem>
                <IonLabel>
                  <div style="font-size: 0.8rem; color: var(--ion-color-medium)">
                    Arquivo de backup
                  </div>
                  <div style="font-size: 0.9rem">
                    {{ upperFirst(Directory.Documents.toLowerCase()) }}/{{ FILENAME }}
                  </div>
                </IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>
                  <div style="font-size: 0.8rem; color: var(--ion-color-medium)">
                    Último backup feito há
                  </div>
                  <div style="font-size: 0.9rem">
                    {{
                      lastBackupAt
                        ? humanizeDuration(lastBackupAt.diffNow().toMillis(), {
                            language: 'pt',
                            units: ['d', 'h', 'm'],
                            round: true,
                          })
                        : 'N/A'
                    }}
                  </div>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow> -->

        <IonRow style="flex-grow: 1" />

        <IonRow>
          <IonCol>
            <IonButton
              color="success"
              shape="round"
              fill="outline"
              style="width: 100%"
              @click="saveData"
            >
              Salvar
            </IonButton>
          </IonCol>

          <IonCol>
            <IonButton
              color="primary"
              shape="round"
              fill="outline"
              style="width: 100%"
            >
              Recuperar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-grid {
  background-color: white;
}

ion-button {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
</style>
