import {memo, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {twMerge} from 'tailwind-merge'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import RemoveIcon from '@mui/icons-material/Remove'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import {useNotifications} from '@toolpad/core/useNotifications'

import {
  CataniaDocumentData,
  countUpdated,
  countUpdateError,
  updateCount
} from '../../../modules/catania/slice'
import {selectIsUpdatingType} from '../../../modules/catania/selectors'
import {useAppSelector} from '../../../utils/store-hooks'
import {getToastConfig} from '../../../utils/toast/get-toast-config'

import ColorText from './ColorText'
import {CircularProgress} from '@mui/material'
import CountButton from './CountButton'

const TOAST_TEXT = {
  add: {
    error: 'Hinzufügen',
    success: 'hinzugefügt'
  },
  remove: {
    error: 'Entfernen',
    success: 'entfernt'
  }
}

const Color = ({color, count, imgUrl, isbn, name}: CataniaDocumentData) => {
  const notifications = useNotifications()

  const dispatch = useDispatch()
  const db = getFirestore()
  const isUpdatingAdd = useAppSelector(selectIsUpdatingType('add'))
  const isUpdatingRemove = useAppSelector(selectIsUpdatingType('remove'))

  const onUpdateCount = useCallback(
    (updatedCount: number, type: 'add' | 'remove') => {
      const ref = doc(db, 'catania', color.toString())
      try {
        dispatch(updateCount(type))
        setDoc(ref, {count: updatedCount}, {merge: true})
        dispatch(countUpdated({count: updatedCount, id: color}))
        notifications.show(
          `Ein Wollknäuel wurde erfolgreich ${TOAST_TEXT[type].success}.`,
          getToastConfig({severity: 'success'})
        )
      } catch (error) {
        dispatch(countUpdateError(error as Error))
        notifications.show(
          `Beim ${TOAST_TEXT[type].error} des Wollknäuel ist leider ein Fehler aufgetreten.`,
          getToastConfig({})
        )
      }
    },
    [color, db]
  )

  return (
    <>
      {imgUrl ? (
        <img
          className="max-h-[180px] min-h-[150px] min-w-[250px] max-w-[300px] m-auto"
          alt={name}
          src={imgUrl}
        />
      ) : (
        <Paper
          className={twMerge(
            'max-h-[180px] min-h-[120px] min-w-[250px] max-w-[300px] mx-auto my-3.5 text-[4rem]',
            'rounded-full bg-[#bdbdbd] flex justify-center items-center text-[#f4f3f2]'
          )}
          elevation={0}
        >
          <ImageIcon color="inherit" fontSize="inherit" />
        </Paper>
      )}
      <Paper className="mx-6" elevation={0}>
        <ColorText heading="Schachermayr Catania Daten:" />
        <div className="grid grid-cols-4 grid-rows-3">
          <ColorText heading="ISBN:" text={isbn.toString()} />
          <ColorText heading="Farbe:" text={color.toString()} />
          <ColorText heading="Name:" text={name} />
        </div>
      </Paper>
      <Paper className="mx-6 flex flex-col gap-8" elevation={0}>
        <Paper elevation={0}>
          <ColorText heading="Wollknäuel Bestand:" />
          <div className="grid grid-cols-4 grid-rows-1">
            <ColorText heading="Anzahl:" text={count.toString()} />
          </div>
        </Paper>
        <Paper className="flex justify-around" elevation={0}>
          <CountButton
            ariaLabel="add"
            count={count}
            isDisabled={isUpdatingAdd || isUpdatingRemove}
            isLoading={isUpdatingAdd}
            onClick={onUpdateCount}
            text="Knäul hinzufügen:"
            type="add"
          />

          <CountButton
            ariaLabel="remove"
            count={count}
            isDisabled={count === 0 || isUpdatingAdd || isUpdatingRemove}
            isLoading={isUpdatingRemove}
            onClick={onUpdateCount}
            text="Knäul entfernen:"
            type="remove"
          />
        </Paper>
      </Paper>
    </>
  )
}

export default memo(Color)
