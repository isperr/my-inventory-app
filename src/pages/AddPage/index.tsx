import React, {useEffect} from 'react'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import {NumberField} from '@base-ui-components/react/number-field'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {Button, IconButton, Paper, TextField, Typography} from '@mui/material'
import {useNotifications} from '@toolpad/core'

import FloatingButton from '../../atoms/FloatingButton'
import {
  add,
  added,
  addingError,
  reset,
  selectIsAdded,
  selectIsAdding,
  selectIsbn
} from '../../modules/catania/add/slice'
import {insert as listInsert} from '../../modules/catania/results/slice'
import {insert as homeInsert} from '../../modules/catania/home/slice'
import PageTemplate from '../../templates/Page'
import {useAppDispatch, useAppSelector} from '../../utils/store-hooks'
import {getToastConfig} from '../../utils/toast/get-toast-config'
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'

const AddPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const notifications = useNotifications()
  const db = getFirestore()

  const isbn = useAppSelector(selectIsbn)
  const isAdding = useAppSelector(selectIsAdding)
  const isAdded = useAppSelector(selectIsAdded)
  const isDisabled = isAdded || isAdding

  const createNewEntry = async (data: {
    color: number
    count: number
    ISBN: number
    name: string
  }) => {
    await setDoc(doc(db, 'catania', data.color.toString()), data).catch(
      error => {
        // error is handled within handleSubmit
        throw error
      }
    )
    const cataniaDoc = await getDoc(doc(db, 'catania', data.color.toString()))
    return {...cataniaDoc.data(), imgUrl: null}
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      color: {value: string}
      count: {value: string}
      isbn: {value: string}
      name: {value: string}
    }

    try {
      dispatch(add())
      const newEntry = await createNewEntry({
        color: Number(formElements.color.value),
        count: Number(formElements.count.value),
        ISBN: Number(formElements.isbn.value),
        name: formElements.name.value
      })
      dispatch(added())
      dispatch(listInsert(newEntry))
      dispatch(homeInsert(newEntry))
      notifications.show(
        'Das Wollknäuel wurde erfolgreich hinzugefügt. Du wirst gleich zur Scan-Seite geleitet.',
        getToastConfig({autoHideDuration: 3000, severity: 'success'})
      )
      setTimeout(() => {
        // navigate back after toast was shown.
        navigate('/scan')
      }, 3100)
    } catch (error) {
      dispatch(addingError(error as Error))
      notifications.show(
        'Beim Hinzufügen des Wollknäuels ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [])

  return (
    <PageTemplate className="h-fit gap-4">
      <Paper className="mx-6" elevation={0}>
        <Typography className="font-normal" color="textSecondary" variant="h6">
          Wollknäuel in die <b>Schachermayr Catania Sammlung</b> hinzufügen:
        </Typography>
      </Paper>
      <Paper
        className="flex flex-col px-6 gap-4"
        component="form"
        elevation={0}
        onSubmit={handleSubmit}
      >
        <TextField
          className="w-full"
          defaultValue={isbn}
          disabled={isDisabled}
          id="isbn"
          label="ISBN"
          type="number"
          variant="outlined"
          required
        />
        <TextField
          className="w-full"
          disabled={isDisabled}
          id="color"
          label="Farbe"
          type="number"
          variant="outlined"
          required
        />
        <TextField
          className="w-full"
          disabled={isDisabled}
          id="name"
          label="Name"
          variant="outlined"
          required
        />

        <NumberField.Root
          disabled={isDisabled}
          id="count"
          min={0}
          name="count"
          required
        >
          <NumberField.ScrubArea>
            <NumberField.ScrubAreaCursor>
              <AddIcon />
            </NumberField.ScrubAreaCursor>
          </NumberField.ScrubArea>

          <NumberField.Group className="flex justify-center items-center">
            <NumberField.Decrement
              className={twMerge(
                'rounded-l-md border-[#c16f50] border-solid',
                'flex justify-center items-center p-[8.5px_10px]',
                'bg-transparent text-[#c16f50]'
              )}
              render={props => (
                <IconButton
                  aria-label="Decrease"
                  className={twMerge(
                    'border-solid border-2 rounded-r-none rounded-l-md',
                    !isDisabled && 'border-[#c16f50]',
                    isDisabled && 'border-[#00000042]'
                  )}
                  color="secondary"
                  size="large"
                  onClick={props.onClick}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onMouseUp={props.onMouseUp}
                  onPointerDown={props.onPointerDown}
                  onPointerMove={props.onPointerMove}
                  onTouchEnd={props.onTouchEnd}
                  onTouchStart={props.onTouchStart}
                  style={props.style}
                  tabIndex={props.tabIndex}
                >
                  <RemoveIcon
                    color={isDisabled ? 'disabled' : 'secondary'}
                    fontSize="inherit"
                  />
                </IconButton>
              )}
            />
            <NumberField.Input
              className={twMerge(
                'border-solid border-[1px] border-[#c4c4c4] outline-[#86694c]',
                'p-[16.5px_14px] outline-[1px] w-screen text-[16px] leading-[21px]',
                'font-[Roboto]'
              )}
              placeholder="Anzahl der Wollknäuel *"
            />
            <NumberField.Increment
              className={twMerge(
                'rounded-r-md border-[#c16f50] border-solid',
                'flex justify-center items-center p-[11.25px_14px]',
                'bg-transparent text-[#c16f50]'
              )}
              render={props => (
                <IconButton
                  aria-label="Increase"
                  className={twMerge(
                    'border-solid border-2 rounded-l-none rounded-r-md',
                    !isDisabled && 'border-[#c16f50]',
                    isDisabled && 'border-[#00000042]'
                  )}
                  color="secondary"
                  size="large"
                  onClick={props.onClick}
                  onMouseEnter={props.onMouseEnter}
                  onMouseLeave={props.onMouseLeave}
                  onMouseUp={props.onMouseUp}
                  onPointerDown={props.onPointerDown}
                  onPointerMove={props.onPointerMove}
                  onTouchEnd={props.onTouchEnd}
                  onTouchStart={props.onTouchStart}
                  style={props.style}
                  tabIndex={props.tabIndex}
                >
                  <AddIcon
                    color={isDisabled ? 'disabled' : 'secondary'}
                    fontSize="inherit"
                  />
                </IconButton>
              )}
            />
          </NumberField.Group>
        </NumberField.Root>

        <Button
          disabled={isAdded}
          loading={isAdding}
          size="small"
          type="submit"
          variant="contained"
        >
          Hinzufügen
        </Button>
      </Paper>

      <FloatingButton position="secondary" icon="back" path="/scan" />
      <FloatingButton />
    </PageTemplate>
  )
}

export default AddPage
