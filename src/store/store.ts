import { create } from "zustand";
import { IProject } from "../interfaces/IProject";
import { IWell } from "../interfaces/IWell";
import { ISite } from "../interfaces/ISites";
import { IEvent } from "./../interfaces/IEvent";
import { IReport } from "../interfaces/IReport";

interface IStore {
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

export const useStore = create<IStore>((set, get) => ({
  projects: [],
  setProjects: (data) => set({ projects: data }),
  setSelectedProject: (project) => set({ selectedProject: project }),

  sites: [],
  setSites: (data) => set({ sites: data }),
  wells: [],
  setWells: (data) => set({ wells: data }),
  setSelectedWell: (well) => set({ selectedWell: well }),

  events: [],
  setEvents: (data) => set({ events: data }),
  selectedEventCode: [],
  setSelectedEventCode: (code) => set({ selectedEventCode: code }),

  report: [],
  setReport: (data) => set({ report: data }),

  eventCodes: [],
  addEventCode: (code) => set({ eventCodes: [...get().eventCodes, code] }),
  removeEventCode: (code) => set({ eventCodes: [...get().eventCodes.filter((c) => c !== code)] }),
  clearEventCodes: () => set({ eventCodes: [] }),

  plan: [],
  addPlan: (plan) => set({ plan: [...get().eventCodes, plan] }),
  clearPlan: () => set({ plan: [] }),

  filterType: '',
  addFilterType: (alias) => set({ filterType:  alias }),
  clearFilterType: () => set({ filterType: '' }),
}));

