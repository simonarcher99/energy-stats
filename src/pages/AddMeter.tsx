import { ThemeProvider } from "@emotion/react";
import { createTheme, Container, CssBaseline, Toolbar } from "@mui/material";
import { NewMeter } from "../components/NewMeter";
import Navbar from "../components/Navbar";

const theme = createTheme();

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
