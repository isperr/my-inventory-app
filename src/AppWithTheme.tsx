import {ReactNode, useMemo} from 'react'
import {createTheme, ThemeOptions, ThemeProvider} from '@mui/material'

import {useThemePaletteMode} from './hooks/use-theme-palette-mode.tsx'
import {themeOptions} from './theme.tsx'
import {ThemePaletteModeContext} from './context.tsx'
import {themeColors} from '../theme.ts'

const AppWithTheme = ({
  appThemeOptions,
  children
}: {
  appThemeOptions: ThemeOptions
  children: ReactNode
}) => {
  const {themePaletteMode, toggleThemePaletteMode} = useThemePaletteMode()

  const themePaletteModeContextProvider = useMemo(
    () => ({
      toggleThemePaletteMode,
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
              background: themeColors.background.dark,
              divider: themeColors.divider.dark,
              text: themeColors.text.dark
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
