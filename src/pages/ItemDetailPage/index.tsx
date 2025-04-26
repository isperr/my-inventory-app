import {Typography} from '@mui/material'
import PageTemplate from '../../templates/Page'
import FloatingButton from '../../atoms/FloatingButton'

const ItemDetailPage = () => {
  return (
    <PageTemplate className="h-fit gap-2">
      <Typography className="px-4 text-center" variant="h4">
        DAS DETAIL
      </Typography>

      <FloatingButton position="secondary" icon="back" path="/finished-items">
        Zur Liste
      </FloatingButton>
      <FloatingButton />
    </PageTemplate>
  )
}

export default ItemDetailPage
