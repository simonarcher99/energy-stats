import { Box, Button, CircularProgress, Grid, Modal, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { MeterData } from "../features/meters/metersSlice";
import { updateMeterName } from "../features/meters/metersActions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MeterSettings = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meter: MeterData;
}) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.meters);

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      updateMeterName({
        retailer: props.meter.retailer,
        gasOrElectric: props.meter.gasOrElectric,
        meterName: data.get("meterName") as string,
        meterSerialNumber: props.meter.meterSerialNumber,
        mpxn: props.meter.mpxn,
        apiKey: props.meter.apiKey,
        userId: userInfo.userId,
      })
    )
      .unwrap()
      .then(() => props.setOpen(false));
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="meterName"
                required
                fullWidth
                id="meterName"
                label="Meter nickname"
                defaultValue={props.meter.meterName}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, height: "3rem" }}
                onClick={() => props.setOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: "3rem" }}
              >
                {loading ? <CircularProgress color="inherit" /> : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default MeterSettings;
