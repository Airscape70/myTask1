import { getSites } from "../api/api";
import { useQuery } from "react-query";
import { ISite } from "../interfaces/ISites";
import { IProject } from "../interfaces/IProject";
import { useStore } from "../store/store";
import { useCallback } from "react";

export function useSites() {
  const setSites = useStore((state) => state.setSites);
  const selectedProject = useStore((state) => state.selectedProject);

  const { refetch: fetchSitesData } = useQuery<ISite[]>(
    ["sites", selectedProject?.projectId],
    async () => selectedProject && getSites(selectedProject.projectId),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );



  const loadSites = useCallback(async () => {
    const { data } = await fetchSitesData();
    setSites(data);
  }, [setSites, fetchSitesData]);

  return { loadSites };
}
