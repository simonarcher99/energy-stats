import { Box, Button, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../app/store";
import { logout } from "../features/user/userSlice";
import { NewMeter } from "../components/NewMeter";

const theme = createTheme();

const Homepage = () => {
  const dispatch = useAppDispatch();
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
          <NewMeter/>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Homepage;
