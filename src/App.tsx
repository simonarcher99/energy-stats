import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage";
import AddMeter from "./pages/AddMeter";

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
