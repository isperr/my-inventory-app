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
import {ACTIVATE_DIALOG_TEXT} from '../constants'

export type ActivateDialogProps = {
  isActivated: boolean
  onConfirm: (isActivated: boolean, closeDialog: () => void) => void
}

const ActivateDialog = ({isActivated, onConfirm}: ActivateDialogProps) => {
  const updatingType = isActivated ? 'activate' : 'deactivate'
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleClick = () => {
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  const handleConfirm = () => {
    onConfirm(!isActivated, closeDialog)
  }

  return (
    <>
      <ActivatedChip
        activeText={ACTIVATE_DIALOG_TEXT.activeChipText}
        className="w-fit mx-auto"
        clickable
        inactiveText={ACTIVATE_DIALOG_TEXT.inactiveChipText}
        isActivated={isActivated}
        onClick={handleClick}
      />

      <Dialog
        open={isDialogOpen}
        //onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{ACTIVATE_DIALOG_TEXT.title[updatingType]}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {ACTIVATE_DIALOG_TEXT.text[updatingType]}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pb-5 flex justify-evenly items-center">
          <Button onClick={closeDialog} variant="outlined">
            {ACTIVATE_DIALOG_TEXT.cancelText}
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            {ACTIVATE_DIALOG_TEXT.confirmText[updatingType]}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(ActivateDialog)
