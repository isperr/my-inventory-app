import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'

const LoginPage = () => {
  const {isLoading, onLogin} = useFirebaseAuth()

  const handleLogin = () => {
    onLogin({email: 'isabella.sperr@email.com', password: 'geheim'})
  }

  return (
    <div className="flex flex-col items-center bg-green-300">
      {isLoading && <div>LOADING....</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage
