import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from 'react-redux'
import {store} from './utils/store'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {StyledEngineProvider} from '@mui/material/styles'
import {BrowserRouter} from 'react-router'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import {themeOptions} from './theme.tsx'
import {ToastContainer} from 'react-toastify'

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ThemeProvider
          theme={createTheme({
            ...themeOptions,
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
          })}
        >
          <BrowserRouter>
            <ToastContainer
              className="pl-[5%]"
              stacked
              position="bottom-center"
            />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
)
