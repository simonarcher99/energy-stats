import { ThemeProvider } from "@mui/material/styles";
import {
  Container,
  CssBaseline,
  Toolbar,
  Box,
  createTheme,
  ThemeOptions,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#2e3954",
    },
    secondary: {
      main: "#a6003b",
    },
    error: {
      main: "#c3504a",
    },
  },
};

const theme = createTheme(themeOptions);

const Consumption = () => {
  const { meters } = useSelector((state: RootState) => state.meters);
  const { meterSerialNumber } = useParams();
  const meter = meters.filter((meter) => meter.meterSerialNumber === meterSerialNumber)[0]
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Toolbar />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>Meter Serial Number: {meter.meterSerialNumber}</Typography>
          <Typography>Meter Name: {meter.meterName}</Typography>
          <Typography>Gas/Electric: {meter.gasOrElectric}</Typography>
          <Typography>API Key: {meter.apiKey}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Consumption;
