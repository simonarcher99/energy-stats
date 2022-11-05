import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox,
  Button,
  Link as LinkMui,
  Grid,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";
import axios from "axios";
import { useState } from "react";

const baseUrl = "https://3qwfx5k0o4.execute-api.us-east-1.amazonaws.com/dev";

const theme = createTheme();

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const result = await axios.post(`${baseUrl}/user/login`, {
      password,
      email,
    });
    setIsLoading(false);
    navigate("/")
    console.log(result.data);
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember Me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "3rem"}}
            >
              {isLoading ? <CircularProgress style={{padding: "10px"}} color="inherit" /> : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/signup">
                  <LinkMui variant="body2">
                    Don't have an account? Sign up
                  </LinkMui>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
