import {ThemeOptions} from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  typography: {
    h1: {
      color: '#6d5b54'
    },
    h2: {
      color: '#6d5b54'
    },
    h3: {
      color: '#6d5b54'
    },
    h4: {
      color: '#6d5b54'
    },
    h5: {
      color: '#6d5b54'
    },
    h6: {
      color: '#6d5b54'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#86694c',
      dark: '#6d5b54'
    },
    secondary: {
      main: '#c16f50'
    },
    warning: {
      main: '#f59a23'
    },
    info: {
      main: '#007aff'
    },
    success: {
      main: '#7ec636'
    },
    background: {
      default: '#f4f3f2'
    },
    text: {
      primary: '#332929'
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none'
            }
          }
        },
        thumb: {
          width: 24,
          height: 24
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }
      }
    }
  }
}
