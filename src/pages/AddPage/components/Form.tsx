import {memo, ReactNode} from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  TextField
} from '@mui/material'
import Select, {SelectChangeEvent} from '@mui/material/Select'

import Button from '../../../atoms/Button'
import CountField from '../../../atoms/CountField'
import UploadButton from '../../../atoms/UploadButton'
import {CollectionType} from '../../HomePage/types'
import {useNavigate} from 'react-router'

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
}: AddPageFormProps) => {
  const navigate = useNavigate()
  const handleCancelClick = () => {
    navigate('/scan')
  }

  return (
    <Box
      className="flex flex-col px-6 gap-4"
      component="form"
      onSubmit={handleSubmit}
    >
      <UploadButton isDisabled={isDisabled} isRounded />

      <FormControl id="collection-form" required>
        <InputLabel id="collection-label">Kollektion</InputLabel>
        <Select
          disabled={isDisabled}
          labelId="collection-label"
          value={collection}
          id="collection"
          label="Kollektion"
          name="collection"
          required
          onChange={handleCollectionChange}
        >
          <ListSubheader>Schachenmayr</ListSubheader>
          <MenuItem value="catania">Catania</MenuItem>
          <MenuItem value="catania-color">Catania Color</MenuItem>

          <ListSubheader>Gründl</ListSubheader>
          <MenuItem value="cotton-quick">Cotton Quick</MenuItem>
          <MenuItem value="cotton-quick-print">Cotton Quick Print</MenuItem>
          <MenuItem value="funny-uni">Funny uni</MenuItem>
          <MenuItem value="king-cotton">King Cotton</MenuItem>
          <MenuItem value="lisa-premium-uni">Lisa Premium uni</MenuItem>

          <ListSubheader>
            my<b>boshi</b>
          </ListSubheader>
          <MenuItem value="samt">Samt</MenuItem>

          <ListSubheader>Ayos Tex</ListSubheader>
          <MenuItem value="samt-baby">Samt Baby</MenuItem>
          <MenuItem value="fluffy">Fluffy</MenuItem>

          <ListSubheader>Himalaya</ListSubheader>
          <MenuItem value="dolphin-baby">Dolphin Baby</MenuItem>

          <ListSubheader>Hobbi</ListSubheader>
          <MenuItem value="baby-snuggle-solid">Baby Snuggle Solid</MenuItem>
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

      <CountField
        defaultValue={null}
        extraText="der Wollknäuel"
        isDisabled={isDisabled}
      />

      <div className="flex gap-2">
        <Button
          fullWidth
          isDisabled={isAdded || isAdding}
          onClick={handleCancelClick}
          variant="outlined"
        >
          Abbrechen
        </Button>
        <Button
          fullWidth
          isDisabled={isAdded || !collection}
          isLoading={isAdding}
          type="submit"
          variant="contained"
        >
          Hinzufügen
        </Button>
      </div>
    </Box>
  )
}

export default memo(Form)
