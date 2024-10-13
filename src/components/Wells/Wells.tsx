import { Box, Button, Typography } from "@mui/material";
import WellCard from "./WellCard";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Grid from "@mui/material/Grid2";
import { IProject } from "../../interfaces/IProject";
import { useQuery } from "react-query";
import { getSites, getWells } from "../../api/api";
import { ISites } from "../../interfaces/ISites";
import { IWells } from "../../interfaces/IWells";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";

interface IWellsProps {
  project: IProject
  wells: IWells[]
  handleWellClick: (wellid: IWells) => void;
}

export default function Wells(props: IWellsProps) {
  // const [wells, setWells] = useState<IWells[]>([]);

  // const { data: sitesData = [], refetch: fetchSitesData } = useQuery<ISites[]>(
  //   ["sites", props.projectId],
  //   () => getSites(props.projectId!),
  //   {
  //     enabled: false,
  //   }
  // );

  // const { data: wellsData = [], refetch: fetchWellsData } = useQuery<IWells[]>(
  //   ["wells", sitesData],
  //   () => {
  //     const siteIds: string = sitesData.map((el) => el.siteId).join(",");
  //     return getWells(siteIds);
  //   },
  //   {
  //     enabled: false,
  //   }
  // );

  // useEffect(() => {
  //   if (!props.projectId) return;
  //   fetchSitesData();
  // }, [props.projectId, fetchSitesData]);

  // useEffect(() => {
  //   if (sitesData.length === 0) return;
  //   fetchWellsData();
  // }, [sitesData, fetchWellsData]);


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
                handleWellClick={props.handleWellClick}
                {...el}
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
