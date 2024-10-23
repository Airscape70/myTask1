import { getSites } from "../api/api";
import { useQuery } from "react-query";
import { ISite } from "../interfaces/ISites";
import { useStoreProjects, useStoreWells } from "../store/store";
import { useCallback } from "react";


export function useSites() {
  const setSites = useStoreWells(state => state.setSites)
  const selectedProject = useStoreProjects(state => state.selectedProject)

  const { refetch: fetchSitesData } = useQuery<ISite[]>(
    ["sites", selectedProject?.projectId],
    async () => selectedProject && getSites(selectedProject.projectId),
    {
      enabled: false,
      staleTime: 1000 * 60 * 1000,
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
