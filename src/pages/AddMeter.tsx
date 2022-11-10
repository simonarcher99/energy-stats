import { ThemeProvider } from "@emotion/react";
import { createTheme, Container, CssBaseline, Toolbar } from "@mui/material";
import { NewMeter } from "../components/NewMeter";
import Navbar from "../components/Navbar";
import { ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2e3954',
    },
    secondary: {
      main: '#a6003b',
    },
    error: {
      main: '#c3504a',
    },
  },
};


const theme = createTheme(themeOptions);

const AddMeter = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toolbar />
        <NewMeter />
      </Container>
    </ThemeProvider>
  );
};

export default AddMeter;
