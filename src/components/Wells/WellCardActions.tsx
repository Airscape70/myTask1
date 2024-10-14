import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { IEvent } from "../../interfaces/IEvent";
import { Box, ToggleButton } from "@mui/material";
import { useState } from "react";

interface IWellCardActions {
  events: IEvent[];
  handleFilterReport: (filter: string) => void;
}
export default function WellCardActions(props: IWellCardActions) {
  const { events, handleFilterReport } = props;
  const [selected, setSelected] = useState(false);
  const buttons = ["БУР", "ВМР", "ОСВ"];

  return (
    <Box sx={{ justifyContent: "flex-end" }}>
      <CardActions
        sx={{
          height: "60px",
          pl: "16px",
        }}
      >
        {buttons.map((btn) => (
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => setSelected((prevSelected) => !prevSelected)}
          >
            {btn}
          </ToggleButton>
        ))}
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
    </Box>
  );
}
