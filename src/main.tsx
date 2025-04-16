import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from 'react-redux'
import {store} from './utils/store'
import CssBaseline from '@mui/material/CssBaseline'
import {StyledEngineProvider} from '@mui/material/styles'
import {BrowserRouter} from 'react-router'
import {NotificationsProvider} from '@toolpad/core/useNotifications'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/jost/300.css'
import '@fontsource/jost/400.css'
import '@fontsource/jost/500.css'
import '@fontsource/jost/700.css'

import AppWithTheme from './AppWithTheme.tsx'

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <AppWithTheme
          appThemeOptions={{
            components: {
              MuiPopover: {
                defaultProps: {
                  container: rootElement
                }
              },
              MuiPopper: {
                defaultProps: {
                  container: rootElement
                }
              },
              MuiDialog: {
                defaultProps: {
                  container: rootElement
                }
              },
              MuiModal: {
                defaultProps: {
                  container: rootElement
                }
              }
            }
          }}
        >
          <CssBaseline />
          <BrowserRouter>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </BrowserRouter>
        </AppWithTheme>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
)
