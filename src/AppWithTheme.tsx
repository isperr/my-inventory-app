import {
  createTheme,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
  useMediaQuery
} from '@mui/material'
import {ReactNode, useMemo, useState} from 'react'
import {themeOptions} from './theme.tsx'
import {ThemePaletteModeContext} from './context.tsx'

const AppWithTheme = ({
  appThemeOptions,
  children
}: {
  appThemeOptions: ThemeOptions
  children: ReactNode
}) => {
  const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [themePaletteMode, setThemePaletteMode] = useState<PaletteMode>(
    isSystemDarkMode ? 'dark' : 'light'
  )

  const themePaletteModeContextProvider = useMemo(
    () => ({
      toggleThemePaletteMode: () => {
        setThemePaletteMode(prevMode =>
          prevMode === 'light' ? 'dark' : 'light'
        )
      },
      themePaletteMode
    }),
    [themePaletteMode]
  )

  return (
    <ThemePaletteModeContext.Provider value={themePaletteModeContextProvider}>
      <ThemeProvider
        theme={createTheme({
          ...themeOptions,
          ...appThemeOptions,
          palette: {
            ...themeOptions.palette,
            mode: themePaletteMode,
            ...(themePaletteMode === 'dark' && {
              background: {
                default: '#303031',
                paper: '#424241'
              }
            })
          }
        })}
      >
        {children}
      </ThemeProvider>
    </ThemePaletteModeContext.Provider>
  )
}

export default AppWithTheme
