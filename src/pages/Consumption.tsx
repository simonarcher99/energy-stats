import {
  Container,
  CssBaseline,
  Toolbar,
  Box,
  Typography,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import {
  getConsumption,
  GetMeterConsumption,
} from "../features/consumption/consumptionActions";
import DailyAverages from "../components/Charts/DailyAverages";
import ConsumptionBarChart from "../components/Charts/ConsumptionBarChart";
import HourlyAverages from "../components/Charts/HalfHourlyAverages";

const Consumption = () => {
  const { meterSerialNumber } = useParams();
  const dispatch = useAppDispatch();
  const { meters } = useSelector((state: RootState) => state.meters);
  const { consumption } = useSelector((state: RootState) => state.consumption);
  const [unit, setUnit] = useState<"kWh" | "m">("kWh");
  const meter = meters.filter(
    (meter) => meter.meterSerialNumber === meterSerialNumber
  )[0];
  useEffect(() => {
    if (
      consumption[meterSerialNumber as string] &&
      new Date().getTime() -
        consumption[meterSerialNumber as string].collected <
        18000000
    ) {
      return;
    } else {
      const apiData: GetMeterConsumption = {
        meterSerialNumber: meter.meterSerialNumber,
        apiKey: meter.apiKey,
        mpxn: meter.mpxn,
        gasOrElec: meter.gasOrElectric,
        period: "hour",
        pageSize: 1000,
      };
      dispatch(getConsumption(apiData));
    }
  }, [dispatch, meter, consumption, meterSerialNumber]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newUnit: "kWh" | "m"
  ) => {
    setUnit(newUnit);
  };

  // Don't like this!
  const consumptionWithUnits = (
    (consumption[meterSerialNumber as string] || []).data || []
  ).map((data) => {
    return {
      ...data,
      consumption:
        meter.gasOrElectric === "gas" && unit === "kWh"
          ? (data.consumption * 40 * 1.02264) / 3.6
          : data.consumption,
    };
  });

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Toolbar />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "2rem",
            }}
          >
            <Typography variant="h4">{meter.meterName}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ opacity: "50%", padding: "1rem" }}>
                Fuel:{" "}
                {meter.gasOrElectric.charAt(0).toUpperCase() +
                  meter.gasOrElectric.slice(1)}
              </Typography>
              {meter.gasOrElectric === "gas" && (
                <ToggleButtonGroup
                  color="primary"
                  value={unit}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="kWh" sx={{ textTransform: "none" }}>
                    kWh
                  </ToggleButton>
                  <ToggleButton value="m" sx={{ textTransform: "none" }}>
                    {"m"}
                    <sup>3</sup>
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </Box>
          </Container>

          {consumptionWithUnits.length > 0 && (
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <ConsumptionBarChart
                  consumption={consumptionWithUnits}
                  unit={unit}
                />
              </Grid>
              <Grid item xs={12}>
                <HourlyAverages
                  data={consumptionWithUnits}
                  gasOrElec={meter.gasOrElectric}
                  unit={unit}
                />
              </Grid>
              <Grid item xs={12}>
                <DailyAverages
                  data={consumptionWithUnits}
                  gasOrElec={meter.gasOrElectric}
                  unit={unit}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Consumption;
