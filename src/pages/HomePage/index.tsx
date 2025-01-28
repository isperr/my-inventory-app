import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'
import Logo from '../../atoms/Logo'

const HomePage = () => {
  const {onLogout, username} = useFirebaseAuth()

  return (
    <div className="flex flex-col my-4 justify-center h-[100vh] gap-8">
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
    </div>
  )
}

export default HomePage
