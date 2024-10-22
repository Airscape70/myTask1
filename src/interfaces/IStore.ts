import { IEvent } from "./IEvent";
import { IProject } from "./IProject";
import { IReport } from "./IReport";
import { ISite } from "./ISites";
import { IWell } from "./IWell";

export interface IStore {
  projects: IProject[];
  setProjects: (projects?: IProject[]) => void;
  selectedProject?: IProject;
  setSelectedProject: (project?: IProject) => void;

  sites: ISite[];
  setSites: (site?: ISite[]) => void;
  wells: IWell[];
  setWells: (wells?: IWell[]) => void;
  selectedWell?: IWell;
  setSelectedWell: (well?: IWell) => void;

  events: IEvent[];
  setEvents: (event?: IEvent[]) => void;
  selectedEventCode?: string[];
  setSelectedEventCode: (code: string[]) => void;

  report: IReport[];
  setReport: (report?: IReport[]) => void;

  eventCodes: string[];
  addEventCode: (code: string) => void;
  removeEventCode: (code: string) => void;
  clearEventCodes: () => void;

  plan: string[];
  addPlan: (code: string) => void;
  clearPlan: () => void;

  filterType: string;
  addFilterType: (alias: string) => void;
  clearFilterType: () => void;
}