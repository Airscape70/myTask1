import { useQuery } from "react-query";
import { getProjects } from "../api/api";
import { IProject } from "../interfaces/IProject";
import { useStoreProjects } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useProjects() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { setSelectedProject, setProjects } = useStoreProjects(
    useShallow((state) => ({
      setSelectedProject: state.setSelectedProject,
      setProjects: state.setProjects,
    }))
  );
  
  const { refetch: fetchProjects } = useQuery<IProject[] | undefined>(
    "projects",
    getProjects,
    {
      enabled: false,
      staleTime: 1000 * 60 * 1000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );


  const loadProjects = useCallback(async () => {
    const { data } = await fetchProjects();
    const currentProject = projectId
      ? data?.find((p) => p.projectId === projectId)
      : undefined;

    setProjects(data);
    setSelectedProject(currentProject ?? data?.[0]);
  }, [setProjects, setSelectedProject, projectId, fetchProjects]);

  const goToProject = useCallback((project: IProject) => {
      navigate(`/projects/${project.projectId}`);
    }, [navigate]);

  return {
    loadProjects,
    goToProject,
  };
}
