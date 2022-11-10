import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState, useAppDispatch } from "../app/store";
import { NewMeter } from "../components/NewMeter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMeters } from "../features/meters/metersActions";
import MeterThumbnail from "../components/MeterThumbnail";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Homepage = () => {
  const { meters, fetched, loading } = useSelector(
    (state: RootState) => state.meters
  );
  const { userInfo, userToken } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userToken) {
      return;
    }
    if (!fetched) {
      dispatch(getMeters({ userId: userInfo.userId, userToken }));
    }
  }, [dispatch, userToken, userInfo, fetched, meters]);

  useEffect(() => {
    if (fetched && meters.length === 0) {
      navigate("/add-meter");
    }
  }, [navigate, fetched, meters]);

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
          <Grid container spacing={2}>
            {meters.map((meter) => (
              <Grid item xs={6}>
                <MeterThumbnail
                  meterName={meter.meterName}
                  gasOrElectric={meter.gasOrElectric}
                  mpxn={meter.mpxn}
                  retailer={meter.retailer}
                  meterSerialNumber={meter.meterSerialNumber}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Homepage;
