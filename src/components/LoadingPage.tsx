import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";


const DisabledBackground = styled(Box)({
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: 1
});
export const CircularLoading = () => (
  <>
    <CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2
      }}
    />
    <DisabledBackground />
  </>
);