import { useQuery } from "react-query";
import { getReport } from "../api/api";
import { IReport } from "../interfaces/IReport";
import { default as dayjs } from "dayjs";
import { useStore } from "../store/store";
import { useCallback } from "react";

export function useReport() {
  const setReport = useStore((state) => state.setReport);
  const selectedWell = useStore((state) => state.selectedWell);
  const eventCodes = useStore((state) => state.eventCodes);
  const events = useStore((state) => state.events);
  const plan = useStore((state) => state.plan);


  const { refetch: fetchReportData } = useQuery<IReport[]>(
    ["reportId", selectedWell?.wellId],
    async () =>
      selectedWell && getReport(selectedWell.wellId, events, eventCodes),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const loadReport = useCallback(async () => {
    const { data } = await fetchReportData();
    if (data) {
      for (let rep of data) {
        rep.dateReport = dayjs(rep.dateReport).format("DD.MM.YYYY");
        rep.reportNo = Number(rep.reportNo);
      }
    }
    data?.sort((a: any, b: any) => a.dateReport - b.dateReport);

    setReport(data);
  }, [setReport, fetchReportData, eventCodes]);

  return { loadReport };
}
