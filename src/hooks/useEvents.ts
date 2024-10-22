import { useQuery } from "react-query";
import { getEvents } from "../api/api";
import { IEvent } from "../interfaces/IEvent";
import { useStore } from "../store/store";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

export function useEvents() {
  const { setEvents, selectedWell } = useStore(
    useShallow((state) => ({
      setEvents: state.setEvents,
      selectedWell: state.selectedWell,
    }))
  );

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
