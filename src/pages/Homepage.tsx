import { Box, Button, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RootState, useAppDispatch } from "../app/store";
import { logout } from "../features/user/userSlice";
import { NewMeter } from "../components/NewMeter";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getMeters } from "../features/meters/metersActions";

const theme = createTheme();

const Homepage = () => {
  const { meters } = useSelector((state: RootState) => state.meters);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMeters({ userId: "testUserId", userToken: "userToken" }));
  }, [dispatch]);

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
          {meters.length >= 0 &&
            meters.map((meter) => <h1>meter.meterName</h1>)}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Homepage;
