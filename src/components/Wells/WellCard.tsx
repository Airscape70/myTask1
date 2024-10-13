import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WellCardActions from "./WellCardActions";
import { IWells } from "../../interfaces/IWells";

interface wellCardProps extends IWells {
  handleWellClick: (wellid: IWells) => void;
}
export default function WellCard(props: wellCardProps) {
  return (
    <Card
      sx={{
        width: 300,
        height: 250,
        display: "inline-block",
        flexFlow: "row wrap",
        mr: 5
      }}
    >
      <div onClick={() => props.handleWellClick(props)}>
        <CardContent sx={{ pb: "0" }}>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
            Куст: {props.siteId}
          </Typography>
          <Typography variant="h5">Скважина: {props.wellCommonName}</Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            {props.reason}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            Дата забуревания: {props.spudDate}
          </Typography>
        </CardContent>
      </div>

      <WellCardActions />
    </Card>
  );
}
