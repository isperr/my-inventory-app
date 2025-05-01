import {Typography} from '@mui/material'

import Button from '../../../atoms/Button'
import ItemForm from '../../../molecules/ItemForm'

import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import {useResolveItem} from '../hooks/use-resolve-item'
import {memo, useState} from 'react'
import {useUpdateItem} from '../hooks/use-update-item'
import {ItemCategory, ItemDocumentData} from '../../../modules/types'

const EditView = ({id}: {id?: string}) => {
  const {item} = useResolveItem(id)
  const {leaveEditMode} = useToggleEditMode()
  const {isUpdated, isUpdating, handleUpdateItem} = useUpdateItem()
  const [hasFileChange, setHasFileChange] = useState<boolean>(false)

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id || !item) {
      return
    }

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      category: {value: string}
      count: {value: string}
      details: {value: string}
      image: {files: FileList}
      name: {value: string}
      price: {value: string}
    }

    const data: Partial<ItemDocumentData> = {
      category: formElements.category.value as ItemCategory,
      count: Number(formElements.count.value),
      details: formElements.details.value,
      name: formElements.name.value,
      price: Number(formElements.price.value.replace(',', '.'))
    }

    const updatedDataOnly = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== item[key]) {
        return {...acc, [key]: data[key]}
      }
      return acc
    }, {})

    const hasFieldsChange = Boolean(Object.keys(updatedDataOnly).length)
    // in case all fields stayed the same
    if (!hasFieldsChange && !hasFileChange) {
      leaveEditMode()
      return
    }

    await handleUpdateItem({
      data: updatedDataOnly,
      file: formElements.image.files[0],
      hasFieldsChange,
      hasFileChange,
      id,
      imgUrl: item.imgUrl
    })
  }

  if (!item) {
    return null
  }

  return (
    <>
      <Typography className="px-4 text-center" variant="h4">
        {item.name} bearbeiten
      </Typography>
      <ItemForm
        handleSubmit={handleSubmit}
        isDisabled={isUpdated || isUpdating}
        setHasFileChange={setHasFileChange}
        {...item}
      >
        <Button fullWidth onClick={leaveEditMode} variant="outlined">
          Abbrechen
        </Button>
        <Button fullWidth type="submit">
          Speichern
        </Button>
      </ItemForm>
    </>
  )
}

export default memo(EditView)
