import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Report from "../../components/Report/Report";
import Wells from "../../components/Wells/Wells";
import { useQuery } from "react-query";
import { IProject } from "../../interfaces/IProject";
import { getProjects } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { useSites } from "../../hooks/useSites";
import { useWells } from "../../hooks/useWells";
import { useReport } from "../../hooks/useReport";
import { WellsContext } from "../../components/Wells/WellsProvider";
import { useEvents } from "../../hooks/useEvents";

export default function Home() {
  const { status, data: projects } = useQuery("projects", getProjects);
  const [selectedProject, setSelectedProject] = useState<
    IProject | undefined
  >();
  const { selectedWell, setSelecetedWell } = useContext(WellsContext);
  const { selectedEventCodes } = useContext(WellsContext);
  const { selectedPlan } = useContext(WellsContext);

  const sites = useSites(selectedProject);
  const wells = useWells(sites);
  const events = useEvents(selectedWell?.wellId);
  const report = useReport(selectedWell, selectedEventCodes, events);

  const handleProjectClick = (project: IProject) => {
    setSelectedProject(project);
  };

  const reportFilteredPlan = report.filter(
    (el) => el.reportAlias === selectedPlan[0]
  );

  useEffect(() => {
    projects && setSelectedProject(projects![0]);
  }, [projects]);

  useEffect(() => {
    wells.length > 0 && setSelecetedWell(wells[0]);
  }, [wells, setSelecetedWell]);

  if (status === "loading") {
    return <h2>LOADING....</h2>;
  }

  if (status === "error") {
    return <h2>ERRROR</h2>;
  }

  return (
    <>
      <Header data={projects} onProjectClick={handleProjectClick} />

      {selectedProject && (
        <Box mx="50px">
          <Wells project={selectedProject} wells={wells} />
          <Report
            report={selectedPlan.length > 0 ? reportFilteredPlan : report}
          />
        </Box>
      )}
    </>
  );
}
