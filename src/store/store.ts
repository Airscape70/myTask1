import { create } from "zustand";
import { IProject } from "../interfaces/IProject";
import { IWell } from "../interfaces/IWell";
import { useProjects } from "../hooks/useProjects";


interface IFilterStore {
  projects: IProject[];
  selectedProject?: IProject;
  setSelectedProject: (project: IProject) => void;
  selectedWell?: IWell;
  setSelectedWell: (well: IWell) => void;
  selectedEventCodes: string[];
  setSelectedEventCodes: (code: string[]) => void;
  removeSelectedEventCodes: () => void;
  selectedPlan: string[];
  setSelectedPlan: (plan: string) => void;
  removeSelectedPlan: () => void;
}


export const useFilterStore = create<IFilterStore>((set) => ({
  projects: useProjects(),
  selectedProject: undefined,
  setSelectedProject: (project) =>
    set((state) => ({
      selectedProject: project,
    })),

  selectedWell: undefined,
  setSelectedWell: (well: IWell) =>
    set((state) => ({
      selectedWell: well,
    })),

  selectedEventCodes: [],
  setSelectedEventCodes: ([code]) =>
    set((state) => ({
      selectedEventCodes: [...state.selectedEventCodes, code],
    })),
  removeSelectedEventCodes: () =>
    set((state) => ({
      selectedEventCodes: [],
    })),

  selectedPlan: [],
  setSelectedPlan: (plan) =>
    set((state) => ({
      selectedPlan: [...state.selectedPlan, plan],
    })),
  removeSelectedPlan: () =>
    set((state) => ({
      selectedPlan: [],
    })),
}));
