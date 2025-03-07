import {DocumentData} from 'firebase/firestore'

export type WoolDocumentData = DocumentData & {
  imgUrl?: string | null
}
