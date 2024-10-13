import { Box, Typography } from "@mui/material";
import WellCard from "./WellCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Grid from "@mui/material/Grid2";
import { IProject } from "../../interfaces/IProject";
import { IWell } from "../../interfaces/IWell";
import Carousel from "./Carousel";

 interface IWellsProps {
  project: IProject
  wells: IWell[]
  onWellClick: (wellid: IWell) => void;
  handleFilterReport: (filters: string) => void;
}

export default function Wells(props: IWellsProps) {

  return (
    <>
      <Grid container>
        <Grid size={10}>
          <Typography variant="h6" my="10px">
            {props.project.projectName}
          </Typography>

          <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {props.wells.map((el) => (
              <WellCard
                key={el.wellId}
                onWellClick={props.onWellClick}
                handleFilterReport={props.handleFilterReport}
                well = {el}
              />
            ))}
          </Box>
          {/* <Carousel /> */}
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
