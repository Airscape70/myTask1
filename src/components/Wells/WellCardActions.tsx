import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, ToggleButton } from "@mui/material";
import { useContext } from "react";
import { WellsContext } from "./WellsProvider";
import { IWell } from "../../interfaces/IWell";
import { EVENTS_CODES } from "../../constants/constants";

export default function WellCardActions(well: IWell) {
  const {
    selectedEventCodes,
    setSelectedEventCodes,
    selectedWell,
    setSelecetedWell,
    selectedPlan,
    setSelectedPlan} = useContext(WellsContext);

  const isToogleSelected = (code: string) =>
    selectedWell?.wellId === well.wellId && selectedEventCodes.includes(code);

  const handleFilterChange = (code: string) => {
    const selected = isToogleSelected(code);
    if (selectedWell?.wellId !== well.wellId) {
      setSelectedEventCodes([code]);
    } else {
      setSelectedEventCodes(
        selected
          ? selectedEventCodes.filter((c) => c !== code)
          : [...selectedEventCodes, code]
      );
    }
    setSelecetedWell(well);
    setSelectedPlan([]);
  };

  const handlePlanChange = (plan: string) => {
    if (selectedWell?.wellId === well.wellId) {
      setSelectedPlan([plan])
    } else {
      setSelecetedWell(well)
      setSelectedPlan([plan])
    }
  };
  const handleFilterReset = (well: IWell) => {
    setSelecetedWell(well);
    setSelectedPlan([]);
    setSelectedEventCodes([])
  };
  

  return (
    <Box sx={{ justifyContent: "flex-end" }}>
      <CardActions
        sx={{
          height: "60px",
          pl: "16px",
        }}
      >
        {EVENTS_CODES.map((code) => (
          <ToggleButton
            key={code}
            sx={{
              borderRadius: "50px",
              px: "20px",
              py: "5px",
            }}
            value="check"
            selected={isToogleSelected(code)}
            onChange={() => handleFilterChange(code)}
          >
            {code}
          </ToggleButton>
        ))}
      </CardActions>

      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="text"
            onClick={() => handlePlanChange("GEN_PLAN")}
          >
            План
          </Button>
          <Button size="small" variant="text" 
          onClick={() => handleFilterReset(well)}>
            Все отчеты
          </Button>
        </Stack>
      </CardActions>
    </Box>
  );
}
