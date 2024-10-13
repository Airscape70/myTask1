import { useQuery } from "react-query";
import { getEvents } from "../api/api";
import { useEffect } from "react";
import { IEvent } from "../interfaces/IEvent";

export function useEvents(wellId: string) {
  const { data: events = [], refetch: fetchEvents} = useQuery<
    IEvent[]
  >(["eventId", wellId], 
    async () => wellId && getEvents(wellId), {
    enabled: false,
  });

  useEffect(() => {
    if (!wellId) return;
    fetchEvents();
  }, [wellId, fetchEvents]);

  return events;
}
