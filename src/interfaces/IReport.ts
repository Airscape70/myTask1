export interface IReport {
  reportJournalId: string;
  wellId: string;
  wellboreId: string;
  eventId: string;
  dateReport: string;
  reportNo: string | number;
  description: string;
  entityType: string;
  eventCode: string;
  reportAlias: string;
}