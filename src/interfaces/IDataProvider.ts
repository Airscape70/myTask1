import { IEvent } from "./IEvent";
import { IProject } from "./IProject";
import { IReport } from "./IReport";
import { IWell } from "./IWell";

export interface DataContextValue {
  projects?: IProject[];
  wells?: IWell[];
  events?: IEvent[];
  report?: IReport[];
  currentProject: (project: IProject) => void;
  currentWell: (well: IWell) => void;
}