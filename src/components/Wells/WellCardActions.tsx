import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { IWell } from "../../interfaces/IWell";
import { EVENTS_CODES } from "../../constants/constants";
import { StyledToggleButton } from "../styles";
import { useStoreFilters, useStoreWells } from "../../store/store";
import { useShallow } from "zustand/react/shallow";

export default function WellCardActions(well: IWell) {
  const { selectedWell, setSelectedWell } = useStoreWells(
    useShallow((state) => ({
      selectedWell: state.selectedWell,
      setSelectedWell: state.setSelectedWell,
    }))
  );

  const {
    eventCodes,
    addEventCode,
    removeEventCode,
    clearEventsCode,
    addPlan,
    clearPlan,
  } = useStoreFilters(
    useShallow((state) => ({
      eventCodes: state.eventCodes,
      addEventCode: state.addEventCode,
      removeEventCode: state.removeEventCode,
      clearEventsCode: state.clearEventCodes,
      addPlan: state.addPlan,
      clearPlan: state.clearPlan,
    }))
  );

  const isToogleSelected = (code: string) =>
    selectedWell?.wellId === well.wellId && eventCodes?.includes(code);

  const handleFilterChange = (code: string) => {
    const selected = isToogleSelected(code);

    if (selectedWell?.wellId !== well.wellId) {
      clearEventsCode();
    } else {
      selected ? removeEventCode(code) : addEventCode(code);
    }
    setSelectedWell(well);
  };
  const handlePlanChange = (plan: string) => {
    if (selectedWell?.wellId === well.wellId) {
      addPlan(plan);
    } else {
      setSelectedWell(well);
      addPlan(plan);
    }
  };

  const handleFilterReset = (well: IWell) => {
    setSelectedWell(well);
    clearPlan();
    clearEventsCode();
  };

  return (
    <Box sx={{ justifyContent: "flex-end" }}>
      <CardActions sx={{ height: "60px", pl: "16px" }}>
        {EVENTS_CODES.map((code) => (
          <StyledToggleButton
            key={code}
            value="check"
            color="primary"
            selected={isToogleSelected(code)}
            onChange={() => handleFilterChange(code)}
          >
            {code}
          </StyledToggleButton>
        ))}
      </CardActions>

      <CardActions>
        <Stack direction="row" spacing={1}>
          <Button
            size="medium"
            variant="text"
            onClick={() => handlePlanChange("GEN_PLAN")}
          >
            План
          </Button>
          <Button
            size="medium"
            variant="text"
            onClick={() => handleFilterReset(well)}
          >
            Все отчеты
          </Button>
        </Stack>
      </CardActions>
    </Box>
  );
}
