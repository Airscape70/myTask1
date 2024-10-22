import { Box, Typography } from "@mui/material";
import WellCard from "./WellCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Grid from "@mui/material/Grid2";
import {  useStore } from "../../store/store";

export default function Wells() {
  const wells = useStore(state => state.wells)
  const selectedProject = useStore(state => state.selectedProject)

  
  return (
    <>
      <Grid container mb={5}>
        <Grid size={10}>
          <Typography variant="h6" my="10px">
            {selectedProject?.projectName}
          </Typography>

          <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }} pb={5}>
            {wells?.map((el) => (
              <WellCard key={el.wellId} {...el} />
            ))}
          </Box>
        </Grid>

        <Grid size={2}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
