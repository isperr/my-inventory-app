import {isEqual} from 'lodash'
import {memo, useEffect, useRef, useState} from 'react'
import {Typography} from '@mui/material'

import Button from '../../../atoms/Button'
import ItemForm from '../../../molecules/ItemForm'
import {ItemCategory, ItemDocumentData} from '../../../modules/types'

import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import {useResolveItem} from '../hooks/use-resolve-item'
import {useUpdateItem} from '../hooks/use-update-item'
import {MultiImageType} from './MultiImageUpload'

const EditView = ({id}: {id?: string}) => {
  const {item} = useResolveItem(id)
  const {leaveEditMode} = useToggleEditMode()
  const {isUpdated, isUpdating, handleUpdateItem} = useUpdateItem()
  const [hasFileChange, setHasFileChange] = useState<boolean>(false)

  const effectRan = useRef<boolean>(false)
  const [images, setImages] = useState<Array<MultiImageType>>([])

  useEffect(() => {
    if (item && !effectRan.current && images.length !== item.images.length) {
      setImages(
        item.images.map(({imgUrl, name}) => ({file: undefined, imgUrl, name}))
      )
      effectRan.current = true
    }
  }, [item, effectRan])

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
      name: {value: string}
      price: {value: string}
      preview: {files: FileList}
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
    const prevImages: Array<MultiImageType> = item.images.map(
      ({imgUrl, name}) => ({
        imgUrl,
        file: undefined,
        name
      })
    )
    const hasImagesChange = !isEqual(prevImages, images)
    // in case all fields stayed the same
    if (!hasFieldsChange && !hasFileChange && !hasImagesChange) {
      leaveEditMode()
      return
    }

    await handleUpdateItem({
      data: updatedDataOnly,
      hasFieldsChange,
      hasFileChange,
      hasImagesChange,
      id,
      images,
      imgUrl: item.imgUrl,
      preview: formElements.preview.files[0],
      prevImages: item.images
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
        images={images}
        setImages={setImages}
      >
        <Button
          fullWidth
          isDisabled={isUpdating}
          onClick={leaveEditMode}
          variant="outlined"
        >
          Abbrechen
        </Button>
        <Button fullWidth isLoading={isUpdating} type="submit">
          Speichern
        </Button>
      </ItemForm>
    </>
  )
}

export default memo(EditView)
