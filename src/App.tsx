import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Homepage</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
    </>
  );
}

export default App;
