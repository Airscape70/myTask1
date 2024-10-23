import { create } from "zustand";
import { IStoreEvents, IStoreFilters, IStoreProjects, IStoreReport, IStoreWells } from "../interfaces/IStore";

export const useStoreProjects = create<IStoreProjects>((set) => ({
  projects: [],
  setProjects: (data) => set({ projects: data }),
  setSelectedProject: (project) => set({ selectedProject: project }),
}));

export const useStoreWells = create<IStoreWells>((set) => ({
  sites: [],
  setSites: (data) => set({ sites: data }),
  wells: [],
  setWells: (data) => set({ wells: data }),
  setSelectedWell: (well) => set({ selectedWell: well }),
}));

export const useStoreEvents = create<IStoreEvents>((set) => ({
  events: [],
  setEvents: (data) => set({ events: data }),
  selectedEventCode: [],
  setSelectedEventCode: (code) => set({ selectedEventCode: code }),
}));

export const useStoreReport = create<IStoreReport>((set) => ({
  report: [],
  setReport: (data) => set({ report: data }),
}));

export const useStoreFilters = create<IStoreFilters>((set, get) => ({
  eventCodes: [],
  addEventCode: (code) => set({ eventCodes: [...get().eventCodes, code] }),
  removeEventCode: (code) => set({ eventCodes: [...get().eventCodes.filter((c) => c !== code)] }),
  clearEventCodes: () => set({ eventCodes: [] }),

  plan: [],
  addPlan: (plan) => set({ plan: [...get().plan, plan] }),
  clearPlan: () => set({ plan: [] }),

  filterType: '',
  addFilterType: (alias) => set({ filterType:  alias }),
  clearFilterType: () => set({ filterType: '' }),
}));

