import { useQuery } from "react-query";
import { getFilteredReports } from "../api/api";
import { useEffect } from "react";
import { IReport } from "../interfaces/IReport";

export function useEventReports(eventId?: string) {
  const { data: eventReports = [], refetch: fetchEventReports} = useQuery<IReport[]>(
    ["eventReportId", eventId], 
    async () => eventId && getFilteredReports(eventId), {
    enabled: false,
  });

  useEffect(() => {
    if (!eventId) return;
    fetchEventReports();
  }, [eventId, fetchEventReports]);

  return eventReports;
}
