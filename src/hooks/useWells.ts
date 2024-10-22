import { useQuery } from "react-query";
import { IWell } from "../interfaces/IWell";
import { getWells } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/store";
import { useCallback } from "react";

export function useWells() {
  const { wellId } = useParams();
  const navigate = useNavigate();
  const setWells = useStore((state) => state.setWells);
  const setSelectedWell = useStore((state) => state.setSelectedWell);
  const selectedProject = useStore((state) => state.selectedProject);
  const sites = useStore((state) => state.sites);

  const { refetch: fetchWellsData } = useQuery<IWell[]>(
    ["wells"],
    () => {
      const siteIds: string = sites.map((el) => el.siteId).join(",");
      return getWells(siteIds);
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const loadWells = useCallback(async () => {
    const { data } = await fetchWellsData();

    const currentWell = wellId
      ? data?.find((w) => w.wellId === wellId)
      : undefined;

    setWells(data);
    setSelectedWell(currentWell ?? data?.[0]);
  }, [setWells, setSelectedWell, fetchWellsData, wellId]);

  const goToWell = useCallback(
    (well: IWell) => {
      selectedProject &&
        navigate(`/projects/${selectedProject.projectId}/wells/${well.wellId}`);
    },
    [navigate, selectedProject]
  );

  return { loadWells, goToWell };
}
