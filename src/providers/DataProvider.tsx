import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
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
import { IEvent } from "../interfaces/IEvent";
import { IReport } from "../interfaces/IReport";

interface DataContextValue {
  projects: IProject[];
  wells?: IWell[];
  events?: IEvent[];
  report?: IReport[];
  currentWell: (well: IWell) => void;
  selectedProject?: IProject;
  setSelectedProject: (project: IProject) => void;
  selectedWell?: IWell;
  setSelectedWell: (well: IWell) => void;
  selectedPlan: string[];
  setSelectedPlan: (plan: string[]) => void;
  selectedEventCodes: string[];
  setSelectedEventCodes: (codes: string[]) => void;
}

export const DataContext = createContext<DataContextValue>({
  setSelectedProject: () => {},
  setSelectedWell: () => {},
  setSelectedPlan: () => {},
  setSelectedEventCodes: () => {},
  currentWell: () => {},
  projects: [],
  selectedPlan: [],
  selectedEventCodes: [],
});

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const { wellId } = useParams();
  const navigate = useNavigate();

  const { status, data: projects } = useQuery("projects", getProjects);

  const [selectedProject, setSelectedProject] = useState<
    IProject | undefined
  >();
  const [selectedWell, setSelectedWell] = useState<IWell | undefined>();
  const [selectedPlan, setSelectedPlan] = useState<string[]>([]);
  const [selectedEventCodes, setSelectedEventCodes] = useState<string[]>([]);

  const sites = useSites(selectedProject);
  const wells = useWells(sites);
  const events = useEvents(selectedWell?.wellId);
  const report = useReport(selectedWell, selectedEventCodes, events);

  const currentWell = (well: IWell) => {
    selectedProject && navigate(`/${well.wellId}`);
  };

  useEffect(() => {
    if (!projects) return;
    setSelectedProject(projects[0]);
  }, [projects]);

  useEffect(() => {
    if (!wells) return;
    const defaultWell = wellId
      ? wells.find((w) => w.wellId === wellId)
      : wells[0];
    setSelectedWell(defaultWell);
  }, [wells, setSelectedProject, wellId]);

  if (status === "loading") {
    return <h2>LOADING....</h2>;
  }

  if (status === "error") {
    return <h2>ERRROR</h2>;
  }

  return (
    <DataContext.Provider
      value={{
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
