import { useQuery } from "react-query";
import { getReport } from "../api/api";
import { IReport } from "../interfaces/IReport";
import { default as dayjs } from "dayjs";
import { useStore } from "../store/store";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useReport() {
  const { setReport, selectedWell, eventCodes, events } = useStore(
    useShallow((state) => ({
      setReport: state.setReport,
      selectedWell: state.selectedWell,
      eventCodes: state.eventCodes,
      events: state.events,
    }))
  );

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
