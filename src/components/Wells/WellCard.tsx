import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import WellCardActions from "./WellCardActions";
import { IWell } from "../../interfaces/IWell";
import { Box } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../providers/DataProvider";

export default function WellCard(well: IWell) {
  const { setSelectedWell, setSelectedEventCodes, setSelectedPlan, currentWell } = useContext(DataContext);

  const handleOnClick = (well: IWell) => {
    setSelectedEventCodes([]);
    setSelectedPlan([]);
    setSelectedWell(well);
    currentWell(well)
  };

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
          boxShadow: "0px 5px 10px rgb(100, 100, 100)",
          cursor: "pointer",
        },
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
            <Typography variant="h5">
              Скважина: {well.wellCommonName}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              {well.reason}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              Дата забуревания: {well.spudDate}
            </Typography>
          </CardContent>
        </Box>

        <WellCardActions {...well} />
      </Box>
    </Card>
  );
}
