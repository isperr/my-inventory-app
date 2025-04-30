import {CircularProgress, Link, Typography} from '@mui/material'
import {useResolveItem} from '../hooks/use-resolve-item'
import PageText from '../../../atoms/PageText'
import NonEditView from './NonEditView'
import Logo from '../../../atoms/Logo'
import {useToggleEditMode} from '../hooks/use-toggle-edit-mode'
import ItemForm from '../../../molecules/ItemForm'
import Button from '../../../atoms/Button'

const Content = ({id}: {id?: string}) => {
  const {hasResolveError, isResolved, isResolving, item} = useResolveItem(id)
  const {enterEditMode, leaveEditMode, isEditMode} = useToggleEditMode()

  if (hasResolveError) {
    return (
      <>
        <Logo />
        <PageText>
          Das fertige Werk mit der "{id}" konnte nicht geladen werden. Versuche
          die Seite neu zu Laden oder navigiere{' '}
          <Link color="secondary" href={'/finished-items'}>
            zurück
          </Link>{' '}
          zur Liste.
        </PageText>
      </>
    )
  }

  if (isResolving) {
    return (
      <div className="w-full flex justify-center items-center h-[90vh]">
        <CircularProgress />
      </div>
    )
  }

  if (isResolved && !item) {
    return (
      <PageText>
        Ein fertiges Werk mit der "{id}" konnte nicht gefunden werden.
      </PageText>
    )
  }

  if (item && !isEditMode) {
    return <NonEditView enterEditMode={enterEditMode} {...item} />
  }

  if (item && isEditMode) {
    return (
      <>
        <Typography className="px-4 text-center" variant="h4">
          {item.name} bearbeiten
        </Typography>
        <ItemForm isDisabled={false} {...item}>
          <Button fullWidth onClick={leaveEditMode} variant="outlined">
            Abbrechen
          </Button>
          <Button fullWidth onClick={leaveEditMode}>
            Speichern
          </Button>
        </ItemForm>
      </>
    )
  }

  return null
}

export default Content
