import { IEvent } from "./IEvent";
import { IProject } from "./IProject";
import { IReport } from "./IReport";
import { IWell } from "./IWell";

export interface DataContextValue {
  projects?: IProject[];
  wells?: IWell[];
  events?: IEvent[];
  report?: IReport[];
  selectedProject?: IProject;
  selectedWell?: IWell;
  selectedPlan: string[];
  selectedEventCodes: string[];
  currentProject: (project: IProject) => void;
  currentWell: (well: IWell) => void;
  setSelectedProject: (project: IProject) => void;
  setSelectedWell: (well: IWell) => void;
  setSelectedPlan: (plan: string[]) => void;
  setSelectedEventCodes: (codes: string[]) => void;
}




