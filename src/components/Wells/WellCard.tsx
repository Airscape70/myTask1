import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WellCardActions from "./WellCardActions";
import { IWell } from "../../interfaces/IWell";
import { IEvent } from "../../interfaces/IEvent";
import { useEvents } from "../../hooks/useEvents";

interface IWellCardProps {
  well: IWell;
  onWellClick: (wellid: IWell) => void;
  handleFilterReport: (filters: string) => void;
}
export default function WellCard(props: IWellCardProps) {
  const { well, onWellClick, handleFilterReport } = props;
  const events = useEvents(props.well.wellId);

  return (
    <Card
      sx={{
        width: 300,
        height: 250,
        display: "inline-block",
        flexFlow: "row wrap",
        mr: 5,
      }}
    >
      <div onClick={() => onWellClick(well)}>
        <CardContent sx={{ pb: "0" }}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Куст: {well.siteId}
          </Typography>
          <Typography variant="h5">Скважина: {well.wellCommonName}</Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            {well.reason}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            Дата забуревания: {well.spudDate}
          </Typography>
        </CardContent>
      </div>

      <WellCardActions events = {events} handleFilterReport={handleFilterReport}/>
    </Card>
  );
}
