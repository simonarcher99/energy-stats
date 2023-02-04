import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import GenerationMixPieChart from "./Charts/GenerationMixPieChart";
import { gspToRegion, gspToRegionId, intesityIndexColors } from "./config";

export interface GenerationMix {
  fuel: string;
  perc: number;
}

interface CarbonIntensityObject {
  forecast: number;
  index: string;
}

const CarbonIntensity = (props: { mpan: string }) => {
  const [gsp, setGsp] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [currentCarbonIntensity, setCurrentCarbonIntensity] = useState<
  CarbonIntensityObject | undefined
  >();
  const [currentGenerationMix, setCurrentGenerationMix] = useState<
    GenerationMix[] | undefined
  >();

  const toTitleCase = (str: string): string => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase();
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.octopus.energy/v1/electricity-meter-points/${props.mpan}/`
      )
      .then((res) => res.data)
      .then((data) => setGsp(data.gsp))
      .catch((error) => setError(error.message));
  }, [props.mpan]);

  useEffect(() => {
    if (!gsp) {
      return;
    }
    const regionId = gspToRegionId[gsp];
    axios
      .get(`https://api.carbonintensity.org.uk/regional/regionid/${regionId}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data.data[0].data[0]);
        setCurrentGenerationMix(data.data[0].data[0].generationmix);
        setCurrentCarbonIntensity(data.data[0].data[0].intensity);
      })
      .catch((error) => setError(error.message));
    console.log("GSP is now set");
  }, [gsp]);

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3rem"}}>
      <Typography variant="h4">Current carbon intensity</Typography>
      <Grid
        container
        spacing={5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={5}>
          {gsp && <Typography fontWeight={"bold"}>{gspToRegion[gsp]}</Typography>}
          {currentCarbonIntensity && (
            <>
              <Typography>
                Carbon Intensity: {currentCarbonIntensity.forecast}gCO
                <sub>2</sub>/kWh
              </Typography>
              <Typography
                sx={{
                  color: intesityIndexColors[currentCarbonIntensity.index],
                  fontWeight: "bold",
                }}
              >
                {toTitleCase(currentCarbonIntensity.index)}
              </Typography>
            </>
          )}
          {error && <Typography>Error: {error}</Typography>}
        </Grid>
        <Grid item xs={7}>
          {currentGenerationMix && (
            <GenerationMixPieChart generationMix={currentGenerationMix} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CarbonIntensity;
