import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState, useAppDispatch } from "../app/store";
import { logout } from "../features/user/userSlice";
import { NewMeter } from "../components/NewMeter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMeters } from "../features/meters/metersActions";
import MeterThumbnail from "../components/MeterThumbnail";

const theme = createTheme();

const Homepage = () => {
  const { meters } = useSelector((state: RootState) => state.meters);
  const { userInfo, userToken } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!userToken) {
      return;
    }
    console.log(`userId: ${JSON.stringify(userInfo.userId)}`);
    dispatch(getMeters({ userId: userInfo.userId, userToken }));
  }, [dispatch, userToken, userInfo]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button onClick={handleLogout}>Logout</Button>
          {meters.length === 0 && <NewMeter />}
          <Grid container spacing={2}>
            {meters.map((meter) => (
              <Grid item xs={6}>
                <MeterThumbnail
                  meterName={meter.meterName}
                  gasOrElectric={meter.gasOrElectric}
                  mpxn={meter.mpxn}
                  retailer={meter.retailer}
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
