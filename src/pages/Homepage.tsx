import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMeters } from "../features/meters/metersActions";
import MeterThumbnail from "../components/MeterThumbnail";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { CircularLoading } from "../components/LoadingPage";


const Homepage = () => {
  const { meters, fetched } = useSelector(
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
    <>
      <Navbar />
      {!fetched && <CircularLoading/>}
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
              <Grid item sm={6} xs={12}>
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
    </>
  );
};

export default Homepage;
