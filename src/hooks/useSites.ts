import { useEffect } from "react";
import { getSites } from "../api/api";
import { useQuery } from "react-query";
import { ISite } from "../interfaces/ISites";
import { IProject } from "../interfaces/IProject";

export function useSites(project?: IProject) {
  const { data: sitesData = [], refetch: fetchSitesData } = useQuery<ISite[]>(
    ["sites", project?.projectId],
    async () => project && getSites(project.projectId),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!project?.projectId) return;
    fetchSitesData();
  }, [project?.projectId, fetchSitesData]);

  return sitesData;
}