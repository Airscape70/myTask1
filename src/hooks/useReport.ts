import { useQuery } from "react-query";
import { IWell } from "../interfaces/IWell";
import { getReport } from "../api/api";
import { IReport } from "../interfaces/IReport";
import { useEffect } from "react";

export function useReport(well?: IWell) {
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
