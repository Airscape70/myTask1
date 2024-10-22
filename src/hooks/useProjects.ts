import { useQuery } from "react-query";
import { getProjects } from "../api/api";
import { IProject } from "../interfaces/IProject";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useProjects() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { refetch: fetchProjects } = useQuery<IProject[] | undefined>(
    "projects",
    getProjects,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const { setSelectedProject, setProjects } = useStore(
    useShallow((state) => ({
      setSelectedProject: state.setSelectedProject,
      setProjects: state.setProjects,
    }))
  );
  // const setProjects = useStore((state) => state.setProjects);

  const loadProjects = useCallback(async () => {
    const { data } = await fetchProjects();
    const currentProject = projectId
      ? data?.find((p) => p.projectId === projectId)
      : undefined;

    setProjects(data);
    setSelectedProject(currentProject ?? data?.[0]);
  }, [setProjects, setSelectedProject, projectId, fetchProjects]);

  const goToProject = useCallback(
    (project: IProject) => {
      navigate(`/projects/${project.projectId}`);
    },
    [navigate]
  );

  return {
    loadProjects,
    goToProject,
  };
}
