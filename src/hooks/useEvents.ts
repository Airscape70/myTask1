import { useQuery } from "react-query";
import { getEvents } from "../api/api";
import { IEvent } from "../interfaces/IEvent";
import { useStoreEvents, useStoreWells } from "../store/store";
import { useCallback } from "react";

export function useEvents() {
  const setEvents = useStoreEvents(state => state.setEvents)
  const selectedWell = useStoreWells(state => state.selectedWell)

  const { refetch: fetchEvents } = useQuery<IEvent[]>(
    ["eventId", selectedWell],
    async () => selectedWell && getEvents(selectedWell.wellId),
    {
      staleTime: 1000 * 60 * 1000,
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
