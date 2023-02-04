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

const CarbonIntensity = (props: { gsp: string }) => {
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
    const regionId = gspToRegionId[props.gsp];
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
  }, [props.gsp]);

  return (
    <Box>
      <Grid
        container
        spacing={5}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid item xs={5}>
          {props.gsp && <Typography fontWeight={"bold"}>{gspToRegion[props.gsp]}</Typography>}
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
