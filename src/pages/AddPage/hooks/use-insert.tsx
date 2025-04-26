import {useCallback} from 'react'
import {WoolDocumentData} from '../../../modules/types'
import {CollectionType} from '../../HomePage/types'
import {getAddInserts} from '../utils/get-slice'
import {useAppDispatch} from '../../../utils/store-hooks'

export const useInsert = () => {
  const dispatch = useAppDispatch()

  const catania = getAddInserts('catania')
  const cataniaColor = getAddInserts('catania-color')
  const cottonQuick = getAddInserts('cotton-quick')
  const cottonQuickPrint = getAddInserts('cotton-quick-print')
  const funnyUni = getAddInserts('funny-uni')
  const samt = getAddInserts('samt')
  const samtBaby = getAddInserts('samt-baby')
  const dolphinBaby = getAddInserts('dolphin-baby')
  const babySnuggle = getAddInserts('baby-snuggle-solid')

  const handleInsert = useCallback(
    (data: WoolDocumentData, collection: CollectionType) => {
      switch (collection) {
        case 'catania':
          dispatch(catania.homeInsert(data))
          dispatch(catania.listInsert(data))
          break
        case 'catania-color':
          dispatch(cataniaColor.homeInsert(data))
          dispatch(cataniaColor.listInsert(data))
          break
        case 'cotton-quick':
          dispatch(cottonQuick.homeInsert(data))
          dispatch(cottonQuick.listInsert(data))
          break
        case 'cotton-quick-print':
          dispatch(cottonQuickPrint.homeInsert(data))
          dispatch(cottonQuickPrint.listInsert(data))
          break
        case 'funny-uni':
          dispatch(funnyUni.homeInsert(data))
          dispatch(funnyUni.listInsert(data))
          break
        case 'samt':
          dispatch(samt.homeInsert(data))
          dispatch(samt.listInsert(data))
          break
        case 'samt-baby':
          dispatch(samtBaby.homeInsert(data))
          dispatch(samtBaby.listInsert(data))
          break
        case 'dolphin-baby':
          dispatch(dolphinBaby.homeInsert(data))
          dispatch(dolphinBaby.listInsert(data))
          break
        case 'baby-snuggle-solid':
          dispatch(babySnuggle.homeInsert(data))
          dispatch(babySnuggle.listInsert(data))
          break
        default:
        // do nothing
      }
    },
    []
  )

  return {handleInsert}
}
