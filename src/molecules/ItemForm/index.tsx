import {ReactNode} from 'react'
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField
} from '@mui/material'
import Select, {SelectChangeEvent} from '@mui/material/Select'

import CountField from '../../atoms/CountField'
import {ItemCategory} from '../../modules/types'
import UploadButton from '../../atoms/UploadButton'

type ItemProps = {
  category?: ItemCategory
  count?: number
  details?: string
  name?: string
  price?: number
}

export type ItemFormProps = ItemProps & {
  children: ReactNode
  handleCollectionChange?:
    | ((event: SelectChangeEvent<ItemCategory>, child: ReactNode) => void)
    | undefined
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
  isDisabled: boolean
}

const ItemForm = ({
  category,
  children,
  count,
  details,
  name,
  handleSubmit,
  isDisabled,
  price
}: ItemFormProps) => {
  return (
    <Box
      className="flex flex-col px-6 gap-4 pb-12"
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        className="w-full"
        defaultValue={name}
        disabled={isDisabled}
        id="name"
        label="Name"
        variant="outlined"
        required
      />

      <UploadButton isDisabled={isDisabled} />

      <FormControl id="category-form" required>
        <InputLabel id="category-label">Kategorie</InputLabel>
        <Select
          defaultValue={category ?? ''}
          disabled={isDisabled}
          labelId="category-label"
          id="category"
          label="Kategorie"
          name="category"
          required
        >
          <MenuItem value="plushy">Plushy</MenuItem>
          <MenuItem value="regular">Normal</MenuItem>
          <MenuItem value="keychain">Schlüsselanhänger</MenuItem>
        </Select>
      </FormControl>

      <CountField defaultValue={count ?? null} isDisabled={isDisabled} />

      <TextField
        className="w-full"
        defaultValue={price?.toString().replace('.', ',')}
        disabled={isDisabled}
        id="price"
        label="Preis"
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">€</InputAdornment>
          }
        }}
        required
      />

      <TextField
        className="w-full"
        defaultValue={details}
        disabled={isDisabled}
        id="details"
        label="Details"
        minRows={4}
        multiline
        variant="outlined"
      />

      {children}
    </Box>
  )
}

export default ItemForm
