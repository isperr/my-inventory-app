import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import {memo, useState} from 'react'
import Button from '../../../atoms/Button'
import ActivatedChip from '../../../atoms/ActivatedChip'

export type ActivateDialogProps = {
  activeChipText?: string
  cancelText?: string
  confirmText?: string
  inactiveChipText?: string
  isActivated: boolean
  onConfirm: (closeDialog: () => void) => void
  text?: string
  title?: string
}

const ActivateDialog = ({
  activeChipText = 'Aktiv',
  cancelText = 'Abbrechen',
  confirmText = 'Ja, aktivieren',
  inactiveChipText = 'Noch nicht aktiviert',
  isActivated,
  onConfirm,
  text = 'Das Wollknäuel war noch nie in deiner Sammlung. Möchtest du es aktivieren & in die Sammlung hinzufügen?',
  title = 'Wollknäuel ist derzeit noch nicht aktiviert'
}: ActivateDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleClick = () => {
    if (isActivated) {
      return
    }
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirm = () => {
    onConfirm(closeDialog)
  }

  return (
    <>
      <ActivatedChip
        activeText={activeChipText}
        className="w-fit mx-auto"
        clickable={!isActivated}
        inactiveText={inactiveChipText}
        isActivated={isActivated}
        onClick={handleClick}
      />

      <Dialog
        open={isDialogOpen}
        //onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions className="pb-5 flex justify-evenly items-center">
          <Button onClick={closeDialog}>{cancelText}</Button>
          <Button onClick={handleConfirm} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(ActivateDialog)
