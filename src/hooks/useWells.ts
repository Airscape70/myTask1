import { useQuery } from "react-query";
import { IWell } from "../interfaces/IWell";
import { ISite } from "../interfaces/ISites";
import { getWells } from "../api/api";
import { useEffect } from "react";

export function useWells(sites: ISite[]) {
  const { data: wellsData = [], refetch: fetchWellsData } = useQuery<IWell[]>(
    ["wells", sites],
    () => {
      const siteIds: string = sites.map((el) => el.siteId).join(",");
      return getWells(siteIds);
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (sites.length === 0) return;
    fetchWellsData();
  }, [sites, fetchWellsData]);

  return wellsData;
}
