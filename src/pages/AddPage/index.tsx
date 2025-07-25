import React, {useState} from 'react'
import {useNavigate} from 'react-router'
import {Box, Typography} from '@mui/material'
import {SelectChangeEvent} from '@mui/material/Select'
import {useNotifications} from '@toolpad/core'

import PageTemplate from '../../templates/Page'
import {getToastConfig} from '../../utils/toast/get-toast-config'
import {CollectionType} from '../HomePage/types'

import {useAdd} from './hooks/use-add'
import Form from './components/Form'

const AddPage = () => {
  const navigate = useNavigate()
  const notifications = useNotifications()
  const [collection, setCollection] = useState<CollectionType>('catania')

  const handleCollectionChange = (
    event: SelectChangeEvent<typeof collection>
  ) => {
    setCollection(event.target.value as typeof collection)
  }

  const {color, isAdded, isAdding, isDisabled, isbn, handleAdd} = useAdd()

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      collection: {value: string}
      color: {value: string}
      count: {value: string}
      preview: {files: FileList}
      isbn: {value: string}
      name: {value: string}
    }

    try {
      const newColor = Number(formElements.color.value)
      await handleAdd({
        collection: formElements.collection.value as CollectionType,
        data: {
          color: newColor,
          count: Number(formElements.count.value),
          ISBN: Number(formElements.isbn.value),
          isActivated: true,
          name: formElements.name.value
        },
        file: formElements.preview.files[0]
      })
      notifications.show(
        'Das Wollknäuel wurde erfolgreich hinzugefügt. Du wirst gleich zur Detail-Seite weitergeleitet.',
        getToastConfig({autoHideDuration: 3000, severity: 'success'})
      )
      setTimeout(() => {
        // navigate to detail-page after toast was shown
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
    <PageTemplate className="h-fit gap-4 pb-6">
      <Box className="mx-6">
        <Typography className="text-center" variant="h5">
          Wollknäuel zum Wollbestand hinzufügen
        </Typography>
      </Box>

      <Form
        collection={collection}
        color={color}
        handleCollectionChange={handleCollectionChange}
        handleSubmit={handleSubmit}
        isAdded={isAdded}
        isAdding={isAdding}
        isDisabled={isDisabled}
        isbn={isbn}
      />
    </PageTemplate>
  )
}

export default AddPage
