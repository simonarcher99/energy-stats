import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { deleteMeter } from "../features/meters/metersActions";
import { RootState, useAppDispatch } from "../app/store";


const MeterThumbnail = (props: {
  meterName: string;
  gasOrElectric: string;
  retailer: string;
  mpxn: string;
  meterSerialNumber: string
}) => {
  const dispatch = useAppDispatch()
  const { userInfo } = useSelector(
    (state: RootState) => state.user
  );
  const handleDeleteMeter = () => {
    const meterSerialNumber = props.meterSerialNumber
    const userId = userInfo.userId
    dispatch(deleteMeter({ meterSerialNumber, userId }))
  }
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <IconButton onClick={handleDeleteMeter}>
          <DeleteIcon />
        </IconButton>
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
      <CardActions>
        <Button size="small">View Consumption</Button>
      </CardActions>
    </Card>
  );
};

export default MeterThumbnail;
