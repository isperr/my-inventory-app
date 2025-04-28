import {CircularProgress, Link} from '@mui/material'
import {useResolveItem} from '../hooks/use-resolve-item'
import PageText from '../../../atoms/PageText'
import NonEditView from './NonEditView'
import Logo from '../../../atoms/Logo'

const Content = ({id}: {id?: string}) => {
  const {hasResolveError, isResolved, isResolving, item} = useResolveItem(id)

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

  if (item) {
    return <NonEditView {...item} />
  }

  return null
}

export default Content
