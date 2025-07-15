import {Box, Typography} from '@mui/material'

import Button from '../Button'

export type NotInListProps = {
  amount: 'some' | 'none'
  color?: number
  isbn?: number
  isColorSearch: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const NotInList = ({
  amount,
  color,
  isbn,
  isColorSearch,
  onClick
}: NotInListProps) => (
  <Box className="mx-6 flex flex-col gap-4">
    {amount === 'none' && (
      <Typography className="font-normal" variant="h6">
        Das Wollknäuel{' '}
        {isbn && !isColorSearch && (
          <>
            mit der <b>ISBN-Nummer {isbn}</b>{' '}
          </>
        )}
        {color && isColorSearch && (
          <>
            mit der <b>Farben-Nummer {color}</b>{' '}
          </>
        )}
        ist leider noch nicht Teil deines Bestands.
      </Typography>
    )}
    <Typography className="font-normal" variant="h6">
      Möchtest du dieses Wollknäuel{' '}
      {amount === 'none' && 'zu deinem Bestand hinzufügen?'}
      {amount === 'some' && 'auch zu einer anderen Sammlung hinzufügen?'}
    </Typography>
    <Button onClick={onClick} size="small">
      Ja, hinzufügen
    </Button>
  </Box>
)

export default NotInList
