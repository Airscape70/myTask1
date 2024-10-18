import axios from "axios";
import { IEvent } from "../interfaces/IEvent";

const instance = axios.create({
  baseURL: "https://edmrest.emeryone.com/Universal/",
});

const consoleError = (error: any) => {
  const errResponse = error.response
    ? `Статус: ${error.response.status}, Данные: ${error.response.data}`
    : error.request
    ? "Нет ответа"
    : `Ошибка настройки запроса: ${error.message}`;
  alert(`${errResponse}`);
};

const getResponse = (fields: string, url: string, id: string = "") => {
  return instance
    .get(`${url}/${id}`, {
      params: {
        fields: `${fields}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => consoleError(error));
};

export const getProjects = () =>
  getResponse("projectName,projectId", "CdProjectSource");

export const getSites = (projectId: string) =>
  getResponse(
    "projectId,siteId,siteName",
    "CdSiteSource/projectId/",
    projectId
  );

export const getWells = (siteIds: string) =>
  getResponse(
    "siteId,wellCommonName,wellId,spudDate,reason",
    "CdWellSource/siteId/",
    siteIds
  );

export const getEvents = (wellId?: string) =>
  getResponse("wellId,eventId,eventCode", "DmEventT/wellId/", wellId);

export const getReport = (
  wellId: string,
  events?: IEvent[],
  eventCodeFilter?: string[]
) => {
  const hasFilter = !(eventCodeFilter?.length === 0);

  const filteredEventId = events!
    .filter((event) => eventCodeFilter!.includes(event.eventCode))
    .reduce((acc, event) => (acc += event.eventId + ","), "");

  const reportId =
    hasFilter && filteredEventId.length > 0
      ? `${wellId}/eventId/${filteredEventId}`
      : `${wellId}`;

  return getResponse(
    "eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo",
    "DmReportJournal/wellId/",
    reportId
  );
};
