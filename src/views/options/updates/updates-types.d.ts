export type IsFetchingUpdate = {
  releaseInfo: boolean
  download: boolean
}

export type ReleaseUpdate = {
  data: { [key: string]: any } | null
  filepath: string
  bodyRendered: string
  downloadProgress: number
  remoteVersion?: string
  currentVersion?: string
}
