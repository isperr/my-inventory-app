import {Paper, Typography} from '@mui/material'

import Button from '../Button'

export type NotInListProps = {
  color?: number
  isbn?: number
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const NotInList = ({color, isbn, onClick}: NotInListProps) => (
  <Paper className="mx-6 flex flex-col gap-4" elevation={0}>
    <Typography className="font-normal" variant="h6">
      Das Wollknäuel{' '}
      {isbn && (
        <>
          mit der <b>ISBN-Nummer {isbn}</b>{' '}
        </>
      )}
      {color && (
        <>
          mit der <b>Farben-Nummer {color}</b>{' '}
        </>
      )}
      ist leider noch nicht Teil deines Bestands.
    </Typography>
    <Typography className="font-normal" variant="h6">
      Möchtest du dieses Wollknäuel zu deinem Bestand hinzufügen?
    </Typography>
    <Button onClick={onClick} size="small">
      Ja, hinzufügen
    </Button>
  </Paper>
)

export default NotInList
