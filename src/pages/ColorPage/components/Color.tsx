import {memo, useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {twMerge} from 'tailwind-merge'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import ImageIcon from '@mui/icons-material/Image'
import Paper from '@mui/material/Paper'
import {useNotifications} from '@toolpad/core/useNotifications'
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

import Button from '../../../atoms/Button'
import {
  CataniaDocumentData,
  updated,
  updateError,
  update,
  UpdatingType
} from '../../../modules/catania/results/slice'
import {selectIsUpdatingType} from '../../../modules/catania/results/selectors'
import {useAppSelector} from '../../../utils/store-hooks'
import {getToastConfig} from '../../../utils/toast/get-toast-config'

import ColorText from '../../../molecules/WoolDetail/components/ColorText'
import CountButton from './CountButton'

const TOAST_TEXT = {
  add: {
    error: 'Hinzufügen',
    success: 'hinzugefügt'
  },
  remove: {
    error: 'Entfernen',
    success: 'entfernt'
  },
  isActivated: {
    error: 'Aktivieren',
    success: 'aktiviert'
  }
}

const Color = ({
  color,
  count,
  imgUrl,
  isbn,
  isActivated,
  name
}: CataniaDocumentData) => {
  const notifications = useNotifications()
  const dispatch = useDispatch()
  const db = getFirestore()
  const successToast = (type: UpdatingType) => {
    notifications.show(
      `Ein Wollknäuel wurde erfolgreich ${TOAST_TEXT[type].success}.`,
      getToastConfig({severity: 'success'})
    )
  }
  const errorToast = (type: UpdatingType) => {
    notifications.show(
      `Beim ${TOAST_TEXT[type].error} des Wollknäuel ist leider ein Fehler aufgetreten.`,
      getToastConfig({})
    )
  }

  const isUpdatingAdd = useAppSelector(selectIsUpdatingType('add'))
  const isUpdatingRemove = useAppSelector(selectIsUpdatingType('remove'))

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const onUpdateCount = useCallback(
    (updatedCount: number, type: 'add' | 'remove') => {
      const ref = doc(db, 'catania', color.toString())
      try {
        dispatch(update(type))
        setDoc(ref, {count: updatedCount}, {merge: true})
        dispatch(updated({field: 'count', id: color, value: updatedCount}))
        successToast(type)
      } catch (error) {
        dispatch(updateError(error as Error))
        errorToast(type)
      }
    },
    [color, db]
  )

  const handleClick = () => {
    if (isActivated) {
      return
    }
    setIsDialogOpen(true)
  }
  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const onConfirm = useCallback(() => {
    const ref = doc(db, 'catania', color.toString())
    try {
      dispatch(update('isActivated'))
      setDoc(ref, {isActivated: true}, {merge: true})
      dispatch(updated({field: 'isActivated', id: color, value: true}))
      setIsDialogOpen(false)
      successToast('isActivated')
    } catch (error) {
      dispatch(updateError(error as Error))
      errorToast('isActivated')
    }
  }, [color, db])

  return (
    <>
      <Chip
        className="w-fit mx-auto"
        color={isActivated ? 'success' : 'error'}
        clickable={!isActivated}
        label={isActivated ? 'Aktiv' : 'Noch nicht aktiviert'}
        onClick={handleClick}
      />

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

      <Dialog
        open={isDialogOpen}
        //onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Wollknäuel ist derzeit noch nicht aktiviert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Das Wollknäuel war noch nie in deiner Sammlung. Möchtest du es
            aktivieren & in die Sammlung hinzufügen?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pb-5 pr-5">
          <Button onClick={closeDialog}>Abbrechen</Button>
          <Button onClick={onConfirm} autoFocus>
            Ja, aktivieren
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(Color)
