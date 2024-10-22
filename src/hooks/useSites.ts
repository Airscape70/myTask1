import { getSites } from "../api/api";
import { useQuery } from "react-query";
import { ISite } from "../interfaces/ISites";
import { useStore } from "../store/store";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useSites() {
  const { setSites, selectedProject } = useStore(
    useShallow((state) => ({
      setSites: state.setSites,
      selectedProject: state.selectedProject,
    }))
  );

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
