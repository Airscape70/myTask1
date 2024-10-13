import axios from "axios";

const instance = axios.create({
  baseURL: "https://edmrest.emeryone.com/Universal/",
});

export async function getFields() {
  // return instance
  //   .get("CdProjectSource?fields=projectName,projectId")
  //   .then((response) => {
  //     return response.data;
  //   });
  
    const {data} = await instance
    .get("CdProjectSource?fields=projectName,projectId")
    return data
}

export async function getSites(projectId: string) {
  return instance
    .get(`CdSiteSource/projectId/${projectId}/?fields=projectId,siteId,siteName`)
    .then((response) => {
      return response.data;
    });
}
export async function getWells(siteIds: string) {
  return instance
    .get(`https://edmrest.emeryone.com/Universal/CdWellSource/siteId/${siteIds}/?fields=siteId,wellCommonName,wellId,spudDate,reason`)
    .then((response) => {
      return response.data;
    });
}
export async function getReport(wellId: string) {
  return instance
    .get(`https://edmrest.emeryone.com/Universal/DmReportJournal/wellId/${wellId}/?fields=eventCode,reportJournalId,wellId,wellboreId,dateReport,eventId,reportAlias,description,entityType,reportNo`)
    .then((response) => {
      return response.data;
    });
}
