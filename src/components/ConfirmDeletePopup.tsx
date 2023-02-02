import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { MeterData } from "../features/meters/metersSlice";
import { useState } from "react";
import { useAppDispatch } from "../app/store";
import { deleteMeter } from "../features/meters/metersActions";

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

const ConfirmDeletePopup = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  meter: MeterData;
  userId: string;
}) => {
  const [deleteMeterLoading, setDeleteMeterLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleDeleteMeter = () => {
    const meterSerialNumber = props.meter.meterSerialNumber;
    const userId = props.userId;
    setDeleteMeterLoading(true);
    dispatch(deleteMeter({ meterSerialNumber, userId }))
      .unwrap()
      .then(() => {
        setDeleteMeterLoading(false);
        props.setOpen(false);
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>
          Are you sure you want to remove <span style={{fontWeight: "bold"}}>{props.meter.meterName}</span> from your
          dashboard?
        </Typography>
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
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: "3rem" }}
              onClick={() => handleDeleteMeter()}
            >
              {deleteMeterLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <Typography>Confirm</Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ConfirmDeletePopup;
