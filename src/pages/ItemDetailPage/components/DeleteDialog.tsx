import {memo, useCallback, useState} from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import Button from '../../../atoms/Button'
import {useDeleteItem} from '../hooks/use-delete-item'
import {ExtraImageType} from '../../../modules/types'

export type DeleteDialogProps = {
  hasPreview: boolean
  id: string
  images: Array<ExtraImageType>
  name: string
}

const DeleteDialog = ({hasPreview, id, images, name}: DeleteDialogProps) => {
  const {handleDeleteItem, isDeleting} = useDeleteItem()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirm = useCallback(() => {
    handleDeleteItem({
      closeDialog,
      imageNames: images.map(({name}) => name),
      hasPreview,
      id
    })
  }, [handleDeleteItem])

  return (
    <>
      <Button
        className="mx-6"
        color="warning"
        onClick={handleClick}
        startIcon={<DeleteIcon />}
      >
        Löschen
      </Button>

      <Dialog
        open={isDialogOpen || isDeleting}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Fertiges Werk endgültig löschen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soll <b>{name}</b> wirklich aus der Sammlung der fertigen Werke
            gelöscht werden?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pb-5 px-6 flex justify-evenly items-center">
          <Button
            fullWidth
            isDisabled={isDeleting}
            onClick={closeDialog}
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button
            autoFocus
            fullWidth
            isLoading={isDeleting}
            onClick={handleConfirm}
          >
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(DeleteDialog)
