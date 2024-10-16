import { IReport } from './../interfaces/IReport';
import axios from "axios";
import { IEvent } from "../interfaces/IEvent";


const instance = axios.create({
  baseURL: "https://edmrest.emeryone.com/Universal/",
});

export async function getProjects() {
  const { data } = await instance.get("CdProjectSource", {
    params: {
      fields: "projectName,projectId",
    },
  });
  return data;
}

export async function getSites(projectId: string) {
  const { data } = await instance.get(`CdSiteSource/projectId/${projectId}`, {
    params: {
      fields: "projectId,siteId,siteName",
    },
  });
  return data;
}

export async function getWells(siteIds: string) {
  const { data } = await instance.get(`CdWellSource/siteId/${siteIds}`, {
    params: {
      fields: "siteId,wellCommonName,wellId,spudDate,reason",
    },
  });
  return data;
}

export async function getEvents(wellId?: string) {
  const { data } = await instance.get(`DmEventT/wellId/${wellId}`, {
    params: {
      fields: "wellId,eventId,eventCode",
    },
  });

  return data;
}

export async function getReport(
  wellId: string,
  events?: IEvent[],
  eventCodeFilter?: string[]
) {
  const hasFilter = !(eventCodeFilter?.length === 0);

  const filteredEventId = events!
    .filter((event) => eventCodeFilter!.includes(event.eventCode))
    .reduce((acc, event) => (acc += event.eventId + ","), "");

  const filteredUrl =
    hasFilter && filteredEventId.length > 0
      ? `/eventId/${filteredEventId}`
      : "";

  const { data } = await instance.get(
    `DmReportJournal/wellId/${wellId}${filteredUrl}`,
    {
      params: {
        fields:
          "eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo",
      },
    }
  );
  return data;
}
