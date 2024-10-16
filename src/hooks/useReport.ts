import { useQuery } from "react-query";
import { IWell } from "../interfaces/IWell";
import { getReport } from "../api/api";
import { IReport } from "../interfaces/IReport";
import { useEffect } from "react";
import { IEvent } from "../interfaces/IEvent";
import { default as dayjs } from "dayjs";

export function useReport(
  well?: IWell,
  eventCodeFilter?: string[],
  events?: IEvent[]
) {
  const { data: reportData = [], refetch: fetchReportData } = useQuery<
    IReport[]
  >(
    ["reportId", well?.wellId],
    async () => well && getReport(well.wellId, events, eventCodeFilter),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

for (let rep of reportData) {
  rep.dateReport = dayjs(rep.dateReport).format('DD.MM.YYYY')
  rep.reportNo = Number(rep.reportNo)
}

  reportData.sort((a:any, b:any) => a.dateReport - b.dateReport)

  useEffect(() => {
    if (!well) return;
    fetchReportData();
  }, [well, fetchReportData]);

  return reportData;
}
