import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
} from "react";
import { IWell } from "../interfaces/IWell";
import { IProject } from "../interfaces/IProject";
import { useQuery } from "react-query";
import { getProjects } from "../api/api";
import { useSites } from "../hooks/useSites";
import { useWells } from "../hooks/useWells";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { useReport } from "../hooks/useReport";
import { DataContextValue } from "../interfaces/IDataProvider";
import Loading from "../components/Common/Loading";

export const DataContext = createContext<DataContextValue>({
  setSelectedProject: () => {},
  setSelectedWell: () => {},
  setSelectedPlan: () => {},
  setSelectedEventCodes: () => {},
  currentWell: () => {},
  currentProject: () => {},
  projects: [],
  selectedPlan: [],
  selectedEventCodes: [],
});

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { projectId, wellId } = useParams();
  const navigate = useNavigate();
  const { status, data: projects = [] } = useQuery<IProject[] | undefined>(
    "projects", getProjects,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const [selectedProject, setSelectedProject] = useState<IProject | undefined>();
  const [selectedWell, setSelectedWell] = useState<IWell | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedEventCodes, setSelectedEventCodes] = useState<string[]>([]);

  const sites = useSites(selectedProject);
  const wells = useWells(sites);
  const events = useEvents(selectedWell?.wellId);
  const report = useReport(selectedWell, selectedEventCodes, events);

  useEffect(() => {
    if (!projects) return;

    const defaultProject = projectId
      ? projects.find((p) => p.projectId === projectId)
      : projects[0];

    setSelectedProject(defaultProject);
  }, [projects, projectId]);

  useEffect(() => {
    if (!wells) return;

    const defaultWell = wellId
      ? wells.find((w) => w.wellId === wellId)
      : wells[0];

    wells.length > 0 && setSelectedWell(defaultWell);
  }, [wells, wellId]);



  const currentProject = (project: IProject) => {
    navigate(`/projects/${project.projectId}`);
  };

  const currentWell = (well: IWell) => {
    selectedProject &&
      navigate(`/projects/${selectedProject.projectId}/wells/${well.wellId}`);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <h2>Error</h2>;
  }

  return (
    <DataContext.Provider
      value={{
        currentProject,
        wells,
        currentWell,
        projects,
        selectedProject,
        selectedWell,
        setSelectedProject,
        setSelectedWell,
        selectedPlan,
        setSelectedPlan,
        selectedEventCodes,
        setSelectedEventCodes,
        report,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
