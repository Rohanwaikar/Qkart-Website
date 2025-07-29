import { createTheme } from "@mui/material/styles"; // Importing createTheme from Material-UI to create a custom theme

const theme = createTheme({ // Creating a custom theme
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      light: "#45c09f",
      main: "#00a278",
      dark: "#00845c",
      contrastText: "#fff",
    },
  },
});

export default theme; // Exporting the custom theme for use in the application
