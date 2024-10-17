import axios from "axios";
import { IEvent } from "../interfaces/IEvent";

const instance = axios.create({
  baseURL: "https://edmrest.emeryone.com/Universal/",
});

const consoleError = (error: any) => {
  const errMsg = error.response
    ? `Статус: ${error.response.status}, Данные: ${error.response.data}`
    : error.request
    ? "Нет ответа"
    : `Ошибка настройки запроса: ${error.message}`;
  alert(`${errMsg}`);
};

export function getProjects() {
  return instance
    .get("CdProjectSource", {
      params: {
        fields: "projectName,projectId",
      },
    })
    .then((response) => response.data)
    .catch((error) => consoleError(error));
}

export function getSites(projectId: string) {
  return instance
    .get(`CdSiteSource/projectId/${projectId}`, {
      params: {
        fields: "projectId,siteId,siteName",
      },
    })
    .then((response) => response.data)
    .catch((error) => consoleError(error));
}

export function getWells(siteIds: string) {
  return instance
    .get(`CdWellSource/siteId/${siteIds}`, {
      params: {
        fields: "siteId,wellCommonName,wellId,spudDate,reason",
      },
    })
    .then((response) => response.data)
    .catch((error) => consoleError(error));
}

export function getEvents(wellId?: string) {
  return instance
    .get(`DmEventT/wellId/${wellId}`, {
      params: {
        fields: "wellId,eventId,eventCode",
      },
    })
    .then((response) => response.data)
    .catch((error) => consoleError(error));
}

export function getReport(
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

  return instance
    .get(`DmReportJournal/wellId/${wellId}${filteredUrl}`, {
      params: {
        fields:
          "eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo",
      },
    })
    .then((response) => response.data)
    .catch((error) => consoleError(error));
}
