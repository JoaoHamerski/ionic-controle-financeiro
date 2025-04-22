import { InjectionKey } from 'vue'

import { EntryForm } from './entries-form/EntriesForm.vue'
import { EntryRecordHome } from './types'

export const entryInjectionKey = Symbol() as InjectionKey<EntryRecordHome>
export const entryFormInjectionKey = Symbol() as InjectionKey<EntryForm>
