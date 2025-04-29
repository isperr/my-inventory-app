import {Typography} from '@mui/material'

import FloatingButton from '../../atoms/FloatingButton'
import ItemForm from '../../molecules/ItemForm'
import PageTemplate from '../../templates/Page'

const ItemAddPage = () => {
  return (
    <PageTemplate className="h-fit gap-2">
      <Typography className="px-4 text-center" variant="h4">
        Neues Werk hinzufügen
      </Typography>

      <ItemForm isDisabled={false} />

      <FloatingButton position="secondary" icon="back" path="/finished-items">
        Zur Liste
      </FloatingButton>
      <FloatingButton />
    </PageTemplate>
  )
}

export default ItemAddPage
