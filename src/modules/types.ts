import {DocumentData} from 'firebase/firestore'
import {RootState} from '../utils/store'

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
