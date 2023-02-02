import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MeterSettings from "./MeterSettings";
import { MeterData } from "../features/meters/metersSlice";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

const MeterThumbnail = (props: { meter: MeterData }) => {
  const [meterSettingsOpen, setMeterSettingsOpen] = useState(false);
  const [confirmMeterDeleteOpen, setConfirmMeterDeleteOpen] = useState(false);

  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const handleOpenMeterSettings = () => setMeterSettingsOpen(true);
  const handleConfirmDelete = () => setConfirmMeterDeleteOpen(true);

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
          onClick={() =>
            navigate(`/consumption/${props.meter.meterSerialNumber}`)
          }
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
        <IconButton onClick={handleConfirmDelete}>
          <DeleteIcon sx={{ color: "secondary.main" }} />
        </IconButton>
        <ConfirmDeletePopup
          open={confirmMeterDeleteOpen}
          setOpen={setConfirmMeterDeleteOpen}
          meter={props.meter}
          userId={userInfo.userId}
        />
      </CardActions>
    </Card>
  );
};

export default MeterThumbnail;
