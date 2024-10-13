import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import Report from "../../components/Report/Report";
import Wells from "../../components/Wells/Wells";
import { useQuery } from "react-query";
import { IProject } from "../../interfaces/IProject";
import { getFields, getReport, getSites, getWells } from "../../api/api";
import { useEffect, useState } from "react";
import { IWells } from "../../interfaces/IWells";
import { ISites } from "../../interfaces/ISites";
import { IReport } from "../../interfaces/IReport";

// export function useFields() {
//   const { status, data: fields } = useQuery("fields", getFields);

//   return fields;
// }

export function useSites(project?: IProject) {
  const { data: sitesData = [], refetch: fetchSitesData } = useQuery<ISites[]>(
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

export function useWells(sites: ISites[]) {
  const { data: wellsData = [], refetch: fetchWellsData } = useQuery<IWells[]>(
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

export function useReport(well?: IWells) {
  const { data: reportData = [], refetch: fetchReportData } = useQuery<
    IReport[]
  >(["reportId", well?.wellId], async () => well && getReport(well.wellId), {
    enabled: false,
  });

  useEffect(() => {
    if (!well) return;
    fetchReportData();
  }, [well, fetchReportData]);

  return reportData;
}

export default function Home() {
  const { status, data: fields } = useQuery("fields", getFields);
  const [selectProject, setSelectProject] = useState<IProject | undefined>();
  const [selectWell, setSelecetWell] = useState<IWells | undefined>();

  const sites = useSites(selectProject);
  const wells = useWells(sites);
  const report = useReport(selectWell);

  useEffect(() => {
    fields && setSelectProject(fields![0]);
  }, [fields]);

  useEffect(() => {
    wells.length > 0 && setSelecetWell(wells[0]);
  }, [wells]);

  if (status === "loading") {
    return <h2>LOADING....</h2>;
  }

  if (status === "error") {
    return <h2>ERRROR</h2>;
  }

  const handleSelectClick = (selected: IProject) => {
    setSelectProject(selected);
  };

  const handleWellClick = (selected: IWells) => {
    setSelecetWell(selected);
  };

  return (
    <>
      <Header data={fields} handleSelectClick={handleSelectClick} />

      {selectProject && (
        <Box mx="50px">
          <Wells
            project={selectProject}
            wells={wells}
            handleWellClick={handleWellClick}
          />
          <Report report={report} />
        </Box>
      )}
    </>
  );
}
