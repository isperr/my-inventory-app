import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'

import FloatingButton from '../../atoms/FloatingButton'
import Logo from '../../atoms/Logo'
import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'
import PageTemplate from '../../templates/Page'
import CataniaPreview from './components/CataniaPreview'

const HomePage = () => {
  const {onLogout, username} = useFirebaseAuth()

  return (
    <PageTemplate>
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

      <CataniaPreview />

      <FloatingButton ariaLabel="scan" icon="scan" path="/scan" />
    </PageTemplate>
  )
}

export default HomePage
