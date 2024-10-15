import { useQuery } from "react-query";
import { IWell } from "../interfaces/IWell";
import { getReport } from "../api/api";
import { IReport } from "../interfaces/IReport";
import { useEffect } from "react";
import { IEvent } from "../interfaces/IEvent";

export function useReport(well?: IWell, eventCodeFilter?: string[], events?: IEvent[] ) {
  const { data: reportData = [], refetch: fetchReportData } = useQuery<
    IReport[]
  >(["reportId", well?.wellId], async () => well && getReport(well.wellId, events, eventCodeFilter), {
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true
  });


  useEffect(() => {
    if (!well) return ;
    fetchReportData();
  }, [well, fetchReportData]);

  return reportData;
}
