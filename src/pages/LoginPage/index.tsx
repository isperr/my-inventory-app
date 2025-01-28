import {TextField} from '@mui/material'
import React, {useEffect, useState} from 'react'
import Button from '../../atoms/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputLabel from '@mui/material/InputLabel'
import Logo from '../../atoms/Logo'

const LoginPage = () => {
  const {isLoading, onLogin, onCheckUser} = useFirebaseAuth()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      email: {value: string}
      password: {value: string}
    }

    onLogin({
      email: formElements.email.value,
      password: formElements.password.value
    })
  }

  useEffect(() => {
    onCheckUser()
  }, [])

  return (
    <div className="flex flex-col my-4 justify-center h-[100vh] gap-8">
      <Logo>Woll Bestand</Logo>
      <form
        className="flex flex-col items-center p-6 gap-6"
        onSubmit={handleSubmit}
      >
        <TextField
          className="w-full"
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          required
        />
        <FormControl className="w-full">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            label="Passwort"
            type={showPassword ? 'text' : 'password'}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button ariaLabel="login" isLoading={isLoading} type="submit">
          Einloggen
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
