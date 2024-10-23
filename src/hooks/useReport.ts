import { useQuery } from "react-query";
import { getReport } from "../api/api";
import { IReport } from "../interfaces/IReport";
import { default as dayjs } from "dayjs";
import { useStoreEvents, useStoreFilters, useStoreReport, useStoreWells } from "../store/store";
import { useCallback } from "react";

export function useReport() {
  const setReport = useStoreReport(state => state.setReport)
  const selectedWell = useStoreWells(state => state.selectedWell)
  const eventCodes = useStoreFilters(state => state.eventCodes)
  const events = useStoreEvents(state => state.events)

  const { refetch: fetchReportData } = useQuery<IReport[]>(
    ["reportId", selectedWell?.wellId],
    async () =>
      selectedWell && getReport(selectedWell.wellId, events, eventCodes),
    {
      staleTime: 1000 * 60 * 1000,
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
