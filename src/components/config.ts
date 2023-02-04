export const gspToRegion: Record<string, string> = {
  _A: "East England",
  _B: "East Midlands",
  _C: "London",
  _D: "North Wales, Merseyside and Cheshire",
  _E: "West Midlands",
  _F: "North East England",
  _G: "North West England",
  _H: "Southern England",
  _J: "South East England",
  _K: "South Wales",
  _L: "South West England",
  _M: "Yorkshire",
  _N: "South and Central Scotland",
  _P: "North Scotland",
};

export const gspToRegionId: Record<string, number> = {
  _A: 10,
  _B: 9,
  _C: 13,
  _D: 6,
  _E: 8,
  _F: 4,
  _G: 3,
  _H: 12,
  _J: 14,
  _K: 7,
  _L: 11,
  _M: 5,
  _N: 2,
  _P: 1,
};

export const intesityIndexColors: Record<string, string> = {
  "very low": "green",
  low: "LimeGreen",
  moderate: "GoldenRod",
  high: "OrangeRed",
  "very high": "red",
};

export const fuelToColor: Record<string, string> = {
  solar: "rgb(100, 250, 230)",
  hydro: "rgb(100, 240, 160)",
  biomass: "rgb(90, 160, 190)",
  nuclear: "rgb(87, 102, 234)",
  other: "rgb(140, 102, 234)",
  imports: "rgb(140, 140, 234)",
  wind: "rgb(140, 140, 180)",
  gas: "rgb(140, 100, 120)",
  coal: "rgb(90, 100, 120)",
};
