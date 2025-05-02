import {useState} from 'react'
import {useNavigate} from 'react-router'
import {Typography} from '@mui/material'
import {useNotifications} from '@toolpad/core'

import Button from '../../atoms/Button'
import {ItemCategory} from '../../modules/types'
import ItemForm from '../../molecules/ItemForm'
import PageTemplate from '../../templates/Page'
import {getToastConfig} from '../../utils/toast/get-toast-config'

import {MultiImageType} from '../ItemDetailPage/components/MultiImageUpload'
import {useAddItem} from './hooks/use-add-item'

const ItemAddPage = () => {
  const notifications = useNotifications()
  const navigate = useNavigate()
  const [images, setImages] = useState<Array<MultiImageType>>([])

  const {handleAddItem, isAdded, isAdding, isDisabled} = useAddItem()

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      category: {value: string}
      count: {value: string}
      details: {value: string}
      images: {files: FileList}
      name: {value: string}
      preview: {files: FileList}
      price: {value: string}
    }

    try {
      const result = await handleAddItem({
        data: {
          category: formElements.category.value as ItemCategory,
          count: Number(formElements.count.value),
          details: formElements.details.value,
          name: formElements.name.value,
          price: Number(formElements.price.value.replace(',', '.'))
        },
        files: Array.from(formElements.images.files),
        preview: formElements.preview.files[0]
      })

      notifications.show(
        'Das fertige Werk wurde erfolgreich hinzugefügt. Du wirst gleich zur Detail-Seite weitergeleitet.',
        getToastConfig({autoHideDuration: 3000, severity: 'success'})
      )

      setTimeout(() => {
        // navigate to detail-page after toast was shown
        navigate(`/finished-items/${result.id}`)
      }, 3100)
    } catch (error) {
      notifications.show(
        'Beim Hinzufügen des fertigen Werks ist leider ein Fehler aufgetreten.',
        getToastConfig({})
      )
    }
  }

  return (
    <PageTemplate className="h-fit gap-2">
      <Typography className="px-4 text-center" variant="h4">
        Neues Werk hinzufügen
      </Typography>

      <ItemForm
        handleSubmit={handleSubmit}
        images={images}
        isDisabled={isDisabled}
        setImages={setImages}
      >
        <Button
          fullWidth
          isDisabled={isAdded || isAdding}
          onClick={event => {
            event.preventDefault()
            navigate('/finished-items/')
          }}
          variant="outlined"
        >
          Abbrechen
        </Button>
        <Button
          fullWidth
          isDisabled={isAdded}
          isLoading={isAdding}
          type="submit"
        >
          Hinzufügen
        </Button>
      </ItemForm>
    </PageTemplate>
  )
}

export default ItemAddPage
