import {Typography} from '@mui/material'
import PageTemplate from '../../templates/Page'
import FloatingButton from '../../atoms/FloatingButton'

const ItemListPage = () => {
  return (
    <PageTemplate className="h-fit gap-2">
      <Typography className="px-4 text-center" variant="h4">
        Fertig gehäkelte Teile
      </Typography>

      <FloatingButton />
    </PageTemplate>
  )
}

export default ItemListPage
