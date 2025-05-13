import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
import { FilePicker, PickedFile } from '@capawesome/capacitor-file-picker'

import { useDatabaseStore } from '@/stores/database-store'
import { decodeBase64 } from '@/support/helpers'

const BACKUP_FILENAME_KEY = 'backup-filename'

export const useBackup = () => {
  const { database, connection } = useDatabaseStore()

  const setBackupFilename = async (filename: string) => {
    await Preferences.set({ key: BACKUP_FILENAME_KEY, value: filename })
  }

  const getBackupFilename = async () => {
    return (await Preferences.get({ key: BACKUP_FILENAME_KEY })).value || ''
  }

  const getBackupData = async () => {
    return (await database.exportToJson('full', false)).export
  }

  const saveBackupFile = async (filename: string) => {
    const data = await getBackupData()
    const normalizedFilename = filename.replaceAll('.json', '') + '.json'

    await setBackupFilename(normalizedFilename)

    await Filesystem.writeFile({
      path: normalizedFilename,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      data: JSON.stringify(data),
    })
  }

  const pickBackupFile = async () => {
    const result = await FilePicker.pickFiles({
      types: ['application/json'],
      readData: true,
      limit: 1,
    })

    if (!result.files[0]) {
      throw new Error('Error on retrieving backup file')
    }

    return result.files[0]
  }

  const importBackupFromFile = async (file: PickedFile) => {
    if (!file.data) {
      throw new Error('Picked file has no data')
    }

    const data = JSON.parse(decodeBase64(file.data))
    data.overwrite = true

    const jsonData = JSON.stringify(data)

    if (!connection.isJsonValid(jsonData)) {
      throw new Error('Database backup data is invalid')
    }

    await connection.closeConnection('sales', false)
    await connection.importFromJson(jsonData)
  }

  const getBackupFileInfo = async () => {
    const filename = await getBackupFilename()

    if (!filename) {
      return null
    }

    try {
      return await Filesystem.stat({
        path: filename,
        directory: Directory.Documents,
      })
    } catch (e) {
      return null
    }
  }

  return {
    setBackupFilename,
    getBackupFilename,
    saveBackupFile,
    pickBackupFile,
    importBackupFromFile,
    getBackupFileInfo,
  }
}
