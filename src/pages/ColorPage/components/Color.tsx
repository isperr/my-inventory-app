import {memo, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {twMerge} from 'tailwind-merge'
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import {toast} from 'react-toastify'
import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import RemoveIcon from '@mui/icons-material/Remove'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'

import {
  CataniaDocumentData,
  countUpdated,
  countUpdateError,
  updateCount
} from '../../../modules/catania/slice'

import ColorText from './ColorText'

const Color = ({color, count, imgUrl, isbn, name}: CataniaDocumentData) => {
  const dispatch = useDispatch()
  const db = getFirestore()

  const onUpdateCount = useCallback(
    (updatedCount: number) => {
      const ref = doc(db, 'catania', color.toString())
      try {
        dispatch(updateCount())
        setDoc(ref, {count: updatedCount}, {merge: true})
        dispatch(countUpdated({count: updatedCount, id: color}))
      } catch (error) {
        dispatch(countUpdateError(error as Error))
        toast.error(
          'Beim bearbeiten des Wollknäuel Bestands ist leider ein Fehler aufgetreten.'
        )
      }
    },
    [color, db]
  )

  const handleAddClick = () => {
    onUpdateCount(count + 1)
  }

  const handleRemoveClick = () => {
    onUpdateCount(count - 1)
  }

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
          <div className="flex flex-col items-center gap-4">
            <ColorText text="Knäul hinzufügen:" />
            <IconButton
              aria-label="add"
              className="border-solid border-2 border-[#c16f50]"
              color="secondary"
              onClick={handleAddClick}
              size="large"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ColorText text="Knäul entfernen:" />
            <IconButton
              aria-label="remove"
              className={twMerge(
                'border-solid border-2 shadow-md',
                count > 0 && 'border-[#c16f50]',
                count === 0 && 'border-[#00000042]'
              )}
              color="secondary"
              disabled={count === 0}
              onClick={handleRemoveClick}
              size="large"
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
          </div>
        </Paper>
      </Paper>
    </>
  )
}

export default memo(Color)
