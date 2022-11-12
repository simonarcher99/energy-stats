import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage";
import AddMeter from "./pages/AddMeter";
import Consumption from "./pages/Consumption";
import { createTheme, ThemeOptions } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const themeOptions: ThemeOptions = {
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

export const appTheme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-meter"
          element={
            <PrivateRoute>
              <AddMeter />
            </PrivateRoute>
          }
        />
        <Route
          path="/consumption/:meterSerialNumber"
          element={
            <PrivateRoute>
              <Consumption />
            </PrivateRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
