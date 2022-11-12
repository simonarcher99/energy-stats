import { Container, CssBaseline, Toolbar } from "@mui/material";
import { NewMeter } from "../components/NewMeter";
import Navbar from "../components/Navbar";


const AddMeter = () => {
  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Toolbar />
        <NewMeter />
      </Container>
    </>
  );
};

export default AddMeter;
