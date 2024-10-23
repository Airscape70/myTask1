import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WellCardActions from "./WellCardActions";
import { IWell } from "../../interfaces/IWell";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { StyledCard, StyledCardBox } from "../styles";
import { useStoreFilters, useStoreWells } from "../../store/store";
import { useWells } from "../../hooks/useWells";
import { useShallow } from "zustand/react/shallow";

export default function WellCard(well: IWell) {

  const { setSelectedWell, selectedWell } = useStoreWells(useShallow((state) => ({
      setSelectedWell: state.setSelectedWell,
      selectedWell: state.selectedWell,
    })))

  const clearEventCodes = useStoreFilters((state) => state.clearEventCodes);
  const { goToWell } = useWells();

  const handleOnClick = (well: IWell) => {
    setSelectedWell(well);
    clearEventCodes();
    goToWell(well);
  };
  const validSpudDate = dayjs(well.spudDate).format("DD.MM.YYYY");
  const isSelecetedWell = selectedWell?.wellId === well.wellId;

  return (
    <>
      <StyledCard
        sx={{
          boxShadow: isSelecetedWell
            ? "0px 5px 10px rgb(100, 100, 100)"
            : "none",
        }}
      >
        <StyledCardBox>
          <Box onClick={() => handleOnClick(well)}>
            <CardContent sx={{ height: "100px", mb: "30px" }}>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Куст: {well.siteId}
              </Typography>

              <Typography
                variant="h5"
                sx={{ color: isSelecetedWell ? "#1976D3" : "#383838" }}
              >
                Скважина: {well.wellCommonName}
              </Typography>

              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                {well.reason}
              </Typography>

              <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
                Дата забуревания:{" "}
                {dayjs(validSpudDate, "DD.MM.YYYY").isValid()
                  ? validSpudDate
                  : "нет данных"}
              </Typography>
            </CardContent>
          </Box>

          <WellCardActions {...well} />
        </StyledCardBox>
      </StyledCard>
    </>
  );
}
