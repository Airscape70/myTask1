import { useQuery } from "react-query";
import { getEvents } from "../api/api";
import { IEvent } from "../interfaces/IEvent";
import { useStore } from "../store/store";
import { useCallback } from "react";

export function useEvents() {
  const setEvents = useStore((state) => state.setEvents);
  const selectedWell = useStore((state) => state.selectedWell);

  const { refetch: fetchEvents } = useQuery<IEvent[]>(
    ["eventId", selectedWell],
    async () => selectedWell && getEvents(selectedWell.wellId),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const loadEvents = useCallback(async () => {
    const { data } = await fetchEvents();
    setEvents(data);
  }, [setEvents, fetchEvents]);

  return { loadEvents };
}
