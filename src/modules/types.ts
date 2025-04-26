import {DocumentData} from 'firebase/firestore'
import {RootState} from '../utils/store'

/* WOOL DATA */
export type WoolDocumentData = DocumentData & {
  imgUrl?: string | null
}
export type WoolEntityType = {
  [k: string]: WoolDocumentData
}

// Resolve data
export type UpdatingType = 'add' | 'remove' | 'activate' | 'deactivate'

export type ResolveStateReturnType = (state: RootState) => boolean
export type ResolveStateDataReturnType = (
  state: RootState
) => WoolDocumentData | null

/* FINISHED-ITEMS DATA */
export type BaseItemDocumentData = DocumentData & {id: string}
export type ItemDocumentData = BaseItemDocumentData & {
  imgUrl?: string | undefined
}
export type ItemEntityType = {
  [k: string]: ItemDocumentData
}
