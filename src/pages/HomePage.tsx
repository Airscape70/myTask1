import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Report from "../components/Report/Report";
import Wells from "../components/Wells/Wells";
import { DataProvider } from "../providers/DataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useSites } from "../hooks/useSites";
import { useWells } from "../hooks/useWells";
import { useEvents } from "../hooks/useEvents";
import { useReport } from "../hooks/useReport";
import { useEffect } from "react";
import { useFilterStore } from "../store/store";
import { IProject } from "../interfaces/IProject";
import { IWell } from "../interfaces/IWell";
import { useProjects } from "../hooks/useProjects";

function HomeContent() {
  const { projectId, wellId } = useParams();
  const navigate = useNavigate();

  const {
    projects,
    selectedProject,
    selectedWell,
    selectedEventCodes,
    setSelectedProject,
    setSelectedWell,
  } = useFilterStore();

  const sites = useSites(selectedProject);
  const wells = useWells(sites);
  const events = useEvents(selectedWell?.wellId);
  const report = useReport(selectedWell, selectedEventCodes, events);

  useEffect(() => {
    if (!projects) return;

    const defaultProject = projectId
      ? projects.find((p) => p.projectId === projectId)
      : projects[0];

    setSelectedProject(defaultProject!);
  }, [projects, projectId]);

  useEffect(() => {
    if (!wells) return;

    const defaultWell = wellId
      ? wells.find((w) => w.wellId === wellId)
      : wells[0];

    wells.length > 0 && setSelectedWell(defaultWell!);
  }, [wells, wellId]);

  const currentProject = (project: IProject) => {
    navigate(`/projects/${project.projectId}`);
  };

  const currentWell = (well: IWell) => {
    selectedProject &&
      navigate(`/projects/${selectedProject.projectId}/wells/${well.wellId}`);
  };

  return (
    <>
      <Header currentProject={currentProject}/>
      <Box mx="50px">
        <Wells currentWell={currentWell}/>
        <Report />
      </Box>
    </>
  );
}

export default function HomePage() {
  return (
    <DataProvider>
      <HomeContent />
    </DataProvider>
  );
}
