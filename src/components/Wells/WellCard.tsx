import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WellCardActions from "./WellCardActions";
import { IWell } from "../../interfaces/IWell";
import { IEvent } from "../../interfaces/IEvent";
import { useEvents } from "../../hooks/useEvents";
import { Box } from "@mui/material";

interface IWellCardProps {
  well: IWell;
  onWellClick: (wellid: IWell) => void;
  handleFilterReport: (filter: string) => void;
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
        mt: 1,
        "&:hover": {
          cursor: "pointer",
          boxShadow: "0px 5px 10px rgb(100, 100, 100);"
        },
      }}

    >
     <Box sx={{display: "flex", flexFlow: "column", justifyContent: "space-between"}} >
        <Box >
          <CardContent sx={{ height: "100px", mb:"30px"}} onClick={() => onWellClick(well)}>
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
        </Box>
  
        <WellCardActions
          events={events}
          handleFilterReport={handleFilterReport}
        />
     </Box>
    </Card>
  );
}
