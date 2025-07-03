import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'  
import { ThemeProvider } from 'styled-components'
import theme from './theme' // Importing custom theme
 

//import { ThemeProvider } from '@mui/material/styles' // Importing ThemeProvider for Material-UI theming
//import theme from './theme' // Importing custom theme
createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={1} anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }} preventDuplicate>
        <App />
    </SnackbarProvider>
    </ThemeProvider>
     
  </StrictMode>
)


