import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WellCardActions from "./WellCardActions";
import { IWell } from "../../interfaces/IWell";
import { Box } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../providers/DataProvider";
import dayjs from "dayjs";

export default function WellCard(well: IWell) {
  const {
    setSelectedWell,
    setSelectedEventCodes,
    setSelectedPlan,
    currentWell,
    selectedWell,
  } = useContext(DataContext);

  const handleOnClick = (well: IWell) => {
    setSelectedEventCodes([]);
    setSelectedPlan([]);
    setSelectedWell(well);
    currentWell(well);
  };
  const validSpudDate = dayjs(well.spudDate).format("DD.MM.YYYY");
  const isSelecetedWell = selectedWell?.wellId === well.wellId;

  return (
    <>
      <Card
        sx={{
          width: 300,
          height: 240,
          display: "inline-block",
          flexFlow: "row wrap",
          mr: 5,
          mt: 1,
          "&:hover": {
            boxShadow: "0px 5px 5px rgba(100, 100, 100, 0.5)",
            cursor: "pointer",
          },
          boxShadow: isSelecetedWell
            ? "0px 5px 10px rgb(100, 100, 100)"
            : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
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
        </Box>
      </Card>
    </>
  );
}
