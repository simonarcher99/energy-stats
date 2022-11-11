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

const MeterThumbnail = (props: {
  meterName: string;
  gasOrElectric: string;
  retailer: string;
  mpxn: string;
  meterSerialNumber: string;
}) => {
  const [deleteMeterLoading, setDeleteMeterLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const handleDeleteMeter = () => {
    const meterSerialNumber = props.meterSerialNumber;
    const userId = userInfo.userId;
    setDeleteMeterLoading(true);
    dispatch(deleteMeter({ meterSerialNumber, userId }))
      .unwrap()
      .then(() => setDeleteMeterLoading(false));
  };
  const handleMeterSettings = () => {};

  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "left" }}
          color="text.secondary"
          gutterBottom
        >
          {props.mpxn}
        </Typography>

        <Typography variant="h5" component="div">
          {props.meterName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.gasOrElectric}
        </Typography>
        <Typography variant="body2">{props.retailer}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small">Consumption</Button>
        <IconButton onClick={handleMeterSettings} sx={{ marginLeft: "auto" }}>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={handleDeleteMeter}>
          {deleteMeterLoading ? (
            <CircularProgress size="1em"/>
          ) : (
            <DeleteIcon sx={{ color: "secondary.main" }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MeterThumbnail;
