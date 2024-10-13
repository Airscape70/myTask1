import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IEvent } from "../../interfaces/IEvent";


interface IWellCardActions {
  events: IEvent[]
  handleFilterReport: (filters: string) => void;
}

export default function WellCardActions(props: IWellCardActions) {
  const {events, handleFilterReport} = props
  return (
    <>
      <CardActions
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          pl: "16px",
        }}
      >
        <Stack direction="row" spacing={2}>
            {events.map((el) => 
              <Button
                key={el.eventId}
                sx={{ borderRadius: "50px" }}
                size="medium"
                variant="outlined"
                onClick={() => handleFilterReport(el.eventId)}
              >
                {el.eventCode}
              </Button>
          )}
        </Stack>
      </CardActions>

      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="text">
            План
          </Button>
          <Button size="small" variant="text">
            Все отчеты
          </Button>
        </Stack>
      </CardActions>
    </>
  );
}
