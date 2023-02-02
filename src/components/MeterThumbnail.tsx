import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { deleteMeter } from "../features/meters/metersActions";
import { RootState, useAppDispatch } from "../app/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MeterSettings from "./MeterSettings";
import { MeterData } from "../features/meters/metersSlice";

const MeterThumbnail = (props: {
  meter: MeterData
}) => {
  const [deleteMeterLoading, setDeleteMeterLoading] = useState(false);
  const [meterSettingsOpen, setMeterSettingsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const handleDeleteMeter = () => {
    const meterSerialNumber = props.meter.meterSerialNumber;
    const userId = userInfo.userId;
    setDeleteMeterLoading(true);
    dispatch(deleteMeter({ meterSerialNumber, userId }))
      .unwrap()
      .then(() => setDeleteMeterLoading(false));
  };
  const handleOpenMeterSettings = () => setMeterSettingsOpen(true);

  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "left" }}
          color="text.secondary"
          gutterBottom
        >
          {props.meter.mpxn}
        </Typography>

        <Typography variant="h5" component="div">
          {props.meter.meterName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.meter.gasOrElectric}
        </Typography>
        <Typography variant="body2">{props.meter.retailer}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          onClick={() => navigate(`/consumption/${props.meter.meterSerialNumber}`)}
        >
          Consumption
        </Button>
        <IconButton
          onClick={handleOpenMeterSettings}
          sx={{ marginLeft: "auto" }}
        >
          <SettingsIcon />
        </IconButton>
        <MeterSettings
          open={meterSettingsOpen}
          setOpen={setMeterSettingsOpen}
          meter={props.meter}
        />
        <IconButton onClick={handleDeleteMeter}>
          {deleteMeterLoading ? (
            <CircularProgress size="1em" />
          ) : (
            <DeleteIcon sx={{ color: "secondary.main" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MeterThumbnail;
