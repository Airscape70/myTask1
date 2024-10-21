import { useQuery } from "react-query";
import { getProjects } from "../api/api";
import { IProject } from "../interfaces/IProject";


export function useProjects () {
const { data: projects = [] } = useQuery<IProject[] | undefined>(
  "projects", getProjects,
  {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  }
);
return projects
}