import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const MeterThumbnail = (props: {meterName: string, gasOrElectric: string, retailer: string, mpxn: string}) => {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.mpxn}
        </Typography>
        <Typography variant="h5" component="div">
          {props.meterName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.gasOrElectric}
        </Typography>
        <Typography variant="body2">
          {props.retailer}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Consumption</Button>
      </CardActions>
    </Card>
  );
};

export default MeterThumbnail;
