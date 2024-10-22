import { create } from "zustand";
import { IStore } from "../interfaces/IStore";

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

