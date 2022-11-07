import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import { useState } from "react";

const theme = createTheme();

export const NewMeter = () => {
  const [retailer, setRetailer] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRetailer(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const retailer = data.get("retailer")
    const gasOrElectric = data.get("electric") ? "electric" : "gas"
    const meterName = data.get("meterName")
    const meterSerialNumber = data.get("meterSerialNumber")
    const mpxn = data.get("mpxn")
    const apiKey = data.get("apiKey")
    console.log(retailer, gasOrElectric, meterName, meterSerialNumber, mpxn, apiKey)
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ElectricMeterIcon />
            </Avatar>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <GasMeterIcon />
            </Avatar>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl required fullWidth>
                  <InputLabel>Retailer</InputLabel>
                  <Select
                    value={retailer}
                    label="Retailer"
                    onChange={handleChange}
                    name="retailer"
                  >
                    <MenuItem value={"octopus"}>Octopus Energy</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlLabel
                            name="electric"
                          value="electric"
                          control={<Radio />}
                          label="Electric"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                        name = "gas"
                          value="gas"
                          control={<Radio />}
                          label="Gas"
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="meterName"
                  required
                  fullWidth
                  id="meterName"
                  label="Meter nickname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="meterSerialNumber"
                  required
                  fullWidth
                  id="meterSerialNumber"
                  label="Meter Serial Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="mpxn"
                  required
                  fullWidth
                  id="mpxn"
                  label="MPRN/MPAN"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="apiKey"
                  required
                  fullWidth
                  id="apiKey"
                  label="API key"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "3rem" }}
            >
              Add Meter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};