import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Report from "../../components/Report/Report";
import Wells from "../../components/Wells/Wells";
import { useQuery } from "react-query";
import { IProject } from "../../interfaces/IProject";
import { getProjects } from "../../api/api";
import { useEffect, useState } from "react";
import { IWell } from "../../interfaces/IWell";
import { useSites } from "../../hooks/useSites";
import { useWells } from "../../hooks/useWells";
import { useReport } from "../../hooks/useReport";
import { useEventReports } from "../../hooks/useEventReports";
import { IEvent } from "../../interfaces/IEvent";
import { useEvents } from "../../hooks/useEvents";

export default function Home() {
  const { status, data: projects } = useQuery("projects", getProjects);
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>();
  const [selectedWell, setSelecetedWell] = useState<IWell | undefined>();
  const [selectedFilter, setSelecetedFilter] = useState<string | undefined>();

  const sites = useSites(selectedProject);
  const wells = useWells(sites);
  const report = useReport(selectedWell);
  const eventReport = useEventReports(selectedFilter)
console.log(report)

  useEffect(() => {
    projects && setSelectedProject(projects![0]);
  }, [projects]);

  useEffect(() => {
    wells.length > 0 && setSelecetedWell(wells[0]);
  }, [wells]);

  if (status === "loading") {
    return <h2>LOADING....</h2>;
  }

  if (status === "error") {
    return <h2>ERRROR</h2>;
  }

  const onProjectClick = (project: IProject) => {
    setSelectedProject(project);
  };

  const onWellClick = (well: IWell) => {
    setSelecetedWell(well);
    setSelecetedFilter('')
  };
  const handleFilterReport = (filter: string) => {
    console.log(filter)
    !selectedFilter?.includes(filter)
      ? setSelecetedFilter(selectedFilter + filter + ",")
      : setSelecetedFilter(selectedFilter.replace(filter + ",", ""));
  };

  return (
    <>
      <Header data={projects} onProjectClick={onProjectClick} />

      {selectedProject && (
        <Box mx="50px">
          <Wells
            project={selectedProject}
            wells={wells}
            onWellClick={onWellClick}
            handleFilterReport={handleFilterReport}
          />
          <Report report={report} eventReport={eventReport}/>
        </Box>
      )}
    </>
  );
}
