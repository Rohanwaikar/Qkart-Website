import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'  
import { ThemeProvider } from 'styled-components'
import theme from './theme' // Importing custom theme
 

//import { ThemeProvider } from '@mui/material/styles' // Importing ThemeProvider for Material-UI theming
//import theme from './theme' // Importing custom theme
createRoot(document.getElementById('root')).render( // Rendering the root element of the application
  <StrictMode> {/* StrictMode is used to highlight potential problems in the application */}
     
     {/* Wrapping the application in ThemeProvider to apply custom theme */}
    <SnackbarProvider maxSnack={1} anchorOrigin={{ // Configuring SnackbarProvider to show notifications
      vertical: 'bottom', // Positioning the snackbar at the bottom of the screen
      horizontal: 'center', // Centering the snackbar horizontally
    }} preventDuplicate> {/* Preventing duplicate snackbars from being displayed */}
        <App />
    </SnackbarProvider>
    
     
  </StrictMode>
)


