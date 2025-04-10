import { InjectionKey } from 'vue'

import { EntryRecordHome } from './types'

export const entryInjectionKey = Symbol() as InjectionKey<EntryRecordHome>
export const isInflowInjectionKey = Symbol() as InjectionKey<boolean>
