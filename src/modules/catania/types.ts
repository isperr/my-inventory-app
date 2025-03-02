import {DocumentData} from 'firebase/firestore'

import {RootState} from '../../utils/store'

export type CataniaDocumentData = DocumentData & {
  imgUrl?: string | null
}
export type CataniaEntityType = {
  [k: string]: CataniaDocumentData
}
export type UpdatingType = 'add' | 'remove' | 'isActivated'

export type ResolveStateReturnType = (state: RootState) => boolean
export type ResolveStateDataReturnType = (
  state: RootState
) => CataniaDocumentData | null
