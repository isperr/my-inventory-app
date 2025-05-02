import {ReactNode} from 'react'
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField
} from '@mui/material'
import Select from '@mui/material/Select'

import CountField from '../../atoms/CountField'
import UploadButton from '../../atoms/UploadButton'
import {categoryNames, ItemCategory} from '../../modules/types'
import MultiImageUpload, {
  MultiImageType
} from '../../pages/ItemDetailPage/components/MultiImageUpload'

type ItemProps = {
  category?: ItemCategory
  count?: number
  details?: string
  imgUrl?: string
  name?: string
  price?: number
}

export type ItemFormProps = ItemProps & {
  children: ReactNode
  handleSubmit?: React.FormEventHandler<HTMLFormElement>
  images: Array<MultiImageType>
  isDisabled: boolean
  setHasFileChange?: (hasFileChange: boolean) => void
  setImages: (images: Array<MultiImageType>) => void
}

const ItemForm = ({
  category,
  children,
  count,
  details,
  images,
  imgUrl,
  name,
  handleSubmit,
  isDisabled,
  price,
  setHasFileChange,
  setImages
}: ItemFormProps) => (
  <Box
    className="flex flex-col px-6 gap-4 pb-6"
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

    <UploadButton
      imgUrl={imgUrl}
      isDisabled={isDisabled}
      setHasFileChange={setHasFileChange}
    />

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
        <MenuItem value="plushy">{categoryNames.plushy}</MenuItem>
        <MenuItem value="regular">{categoryNames.regular}</MenuItem>
        <MenuItem value="keychain">{categoryNames.keychain}</MenuItem>
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

    <MultiImageUpload
      images={images}
      isDisabled={isDisabled}
      setImages={setImages}
    />

    <div className="flex gap-2">{children}</div>
  </Box>
)

export default ItemForm
