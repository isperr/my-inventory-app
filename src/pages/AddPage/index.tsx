import React, {useState} from 'react'
import {useNavigate} from 'react-router'
import {twMerge} from 'tailwind-merge'
import {NumberField} from '@base-ui-components/react/number-field'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import {useNotifications} from '@toolpad/core'

import FloatingButton from '../../atoms/FloatingButton'
import PageTemplate from '../../templates/Page'
import {getToastConfig} from '../../utils/toast/get-toast-config'
import {useAdd} from './hooks/use-add'
import {CollectionType} from '../../molecules/WoolListPreview'

const AddPage = () => {
  const navigate = useNavigate()
  const notifications = useNotifications()
  const [collection, setCollection] = useState<CollectionType | undefined>(
    'catania'
  )

  const handleCollectionChange = (
    event: SelectChangeEvent<typeof collection>
  ) => {
    setCollection(event.target.value as typeof collection)
  }

  const {color, isAdded, isAdding, isDisabled, isbn, handleAdd} =
    useAdd(collection)

  // TODO: handle adding accordingly depending on collection
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      collection: {value: string}
      color: {value: string}
      count: {value: string}
      isbn: {value: string}
      name: {value: string}
    }

    try {
      const newColor = Number(formElements.color.value)
      await handleAdd({
        color: newColor,
        count: Number(formElements.count.value),
        ISBN: Number(formElements.isbn.value),
        isActivated: true,
        name: formElements.name.value
      })
      notifications.show(
        'Das Wollknäuel wurde erfolgreich hinzugefügt. Du wirst gleich zur Detail-Seite weitergeleitet.',
        getToastConfig({autoHideDuration: 3000, severity: 'success'})
      )
      setTimeout(() => {
        // navigate back after toast was shown.
        navigate(`/${collection}/${newColor}`)
      }, 3100)
    } catch (error) {
      notifications.show(
        'Beim Hinzufügen des Wollknäuels ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }

  return (
    <PageTemplate className="h-fit gap-4">
      <Paper className="mx-6" elevation={0}>
        <Typography className="font-normal" color="textSecondary" variant="h6">
          Wollknäuel zum Wollbestand hinzufügen:
        </Typography>
      </Paper>
      <Paper
        className="flex flex-col px-6 gap-4"
        component="form"
        elevation={0}
        onSubmit={handleSubmit}
      >
        <FormControl required>
          <InputLabel id="collection-label">Kollektion</InputLabel>
          <Select
            labelId="collection-label"
            value={collection}
            id="collection"
            label="Kollektion"
            required
            onChange={handleCollectionChange}
          >
            <MenuItem value="">
              <em>Keine Kollektion ausgewählt</em>
            </MenuItem>
            <ListSubheader>Schachermayr</ListSubheader>
            <MenuItem value="catania">Catania</MenuItem>
            <MenuItem disabled value="catania-color">
              Catania Color <i>(coming soon)</i>
            </MenuItem>
          </Select>
        </FormControl>

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
          defaultValue={color}
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
          defaultValue={0}
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
          disabled={isAdded || !collection}
          loading={isAdding}
          size="small"
          type="submit"
          variant="contained"
        >
          Hinzufügen
        </Button>
      </Paper>

      <FloatingButton position="secondary" icon="back" path="/scan">
        Zur Suche
      </FloatingButton>
      <FloatingButton />
    </PageTemplate>
  )
}

export default AddPage
