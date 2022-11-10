import { ThemeProvider } from "@emotion/react";
import { createTheme, Container, CssBaseline, Toolbar } from "@mui/material";
import { NewMeter } from "../components/NewMeter";
import Navbar from "../components/Navbar";
import { themeOptions } from "../index"

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
