import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState, useAppDispatch } from "../app/store";
import { NewMeter } from "../components/NewMeter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMeters } from "../features/meters/metersActions";
import MeterThumbnail from "../components/MeterThumbnail";
import Navbar from "../components/Navbar";

const theme = createTheme();

const Homepage = () => {
  const { meters, loading } = useSelector((state: RootState) => state.meters);
  const { userInfo, userToken } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userToken) {
      return;
    }
    console.log(`userId: ${JSON.stringify(userInfo.userId)}`);
    dispatch(getMeters({ userId: userInfo.userId, userToken }));
  }, [dispatch, userToken, userInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toolbar/>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* TODO: Redirect to AddMeter page here */}
          {!loading && meters.length === 0 && <NewMeter />}
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
