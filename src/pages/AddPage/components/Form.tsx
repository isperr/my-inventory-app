import {memo, ReactNode} from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  TextField
} from '@mui/material'
import Select, {SelectChangeEvent} from '@mui/material/Select'

import {CollectionType} from '../../HomePage/types'
import UploadButton from './UploadButton'
import CountField from './CountField'

export type AddPageFormProps = {
  collection?: CollectionType
  color?: number
  handleCollectionChange:
    | ((event: SelectChangeEvent<CollectionType>, child: ReactNode) => void)
    | undefined
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
  isAdded: boolean
  isAdding: boolean
  isDisabled: boolean
  isbn?: number
}

const Form = ({
  collection,
  color,
  handleCollectionChange,
  handleSubmit,
  isAdded,
  isAdding,
  isDisabled,
  isbn
}: AddPageFormProps) => (
  <Paper
    className="flex flex-col px-6 gap-4"
    component="form"
    elevation={0}
    onSubmit={handleSubmit}
  >
    <UploadButton />

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

    <CountField isDisabled={isDisabled} />

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
)

export default memo(Form)
