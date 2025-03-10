import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'

import FloatingButton from '../../atoms/FloatingButton'
import Logo from '../../atoms/Logo'
import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'
import PageTemplate from '../../templates/Page'

import PreviewList from './components/PreviewList'

const HomePage = () => {
  const {onLogout, username} = useFirebaseAuth()

  return (
    <PageTemplate className="mt-10 mb-6 h-fit">
      <Logo>Willkommen zurück{username ? `, ${username}` : ''}!</Logo>
      <IconButton
        aria-label="logout"
        className="absolute right-0 top-2"
        size="large"
        color="secondary"
        onClick={onLogout}
      >
        <LogoutIcon fontSize="inherit" />
      </IconButton>

      <PreviewList collection="catania" />
      <PreviewList collection="catania-color" />
      <PreviewList collection="cotton-quick" />
      <PreviewList collection="cotton-quick-print" />
      <PreviewList collection="funny-uni" />
      <PreviewList collection="samt" />
      <PreviewList collection="samt-baby" />

      <FloatingButton ariaLabel="scan" icon="scan" path="/scan" />
    </PageTemplate>
  )
}

export default HomePage
