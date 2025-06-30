import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import {ThemePaletteModeContext} from '../../context'
import FloatingButton from '../../atoms/FloatingButton'
import Logo from '../../atoms/Logo'
import useFirebaseAuth from '../../hooks/auth-state/use-firebase-auth'
import {useScrollToTop} from '../../hooks/use-scroll-to-top'
import PageTemplate from '../../templates/Page'

import PreviewList from './components/PreviewList'

const HomePage = () => {
  useScrollToTop()
  const {onLogout, username} = useFirebaseAuth()
  const themePaletteModeContext = React.useContext(ThemePaletteModeContext)

  return (
    <PageTemplate className="mt-0 pt-10 mb-6 h-fit gap-4">
      <Logo>Willkommen zurück{username ? `, ${username}` : ''}!</Logo>
      <div className="flex flex-row-reverse absolute right-0 top-2">
        <IconButton
          aria-label="logout"
          size="large"
          color="secondary"
          onClick={onLogout}
        >
          <LogoutIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="mode"
          size="large"
          color="secondary"
          onClick={themePaletteModeContext.toggleThemePaletteMode}
        >
          {themePaletteModeContext.themePaletteMode === 'light' ? (
            <LightModeIcon fontSize="inherit" />
          ) : (
            <DarkModeIcon fontSize="inherit" />
          )}
        </IconButton>
      </div>

      <PreviewList collection="catania" />
      <PreviewList collection="catania-color" />
      <PreviewList collection="cotton-quick" />
      <PreviewList collection="cotton-quick-print" />
      <PreviewList collection="funny-uni" />
      <PreviewList collection="king-cotton" />
      <PreviewList collection="lisa-premium-uni" />
      <PreviewList collection="samt" />
      <PreviewList collection="samt-baby" />
      <PreviewList collection="fluffy" />
      <PreviewList collection="dolphin-baby" />
      <PreviewList collection="baby-snuggle-solid" />

      <FloatingButton
        ariaLabel="items"
        icon="items"
        path="/finished-items"
        position="secondary"
      />
      <FloatingButton ariaLabel="scan" icon="scan" path="/scan" />
    </PageTemplate>
  )
}

export default HomePage
