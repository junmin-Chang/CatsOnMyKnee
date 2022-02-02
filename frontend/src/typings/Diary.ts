export interface Diary {
  id?: string;
  title: string;
  date: string;
  feeling: string;
  description: string;
}

export enum DiaryFilter {
  'DESC' = 'DESC',
  'ASC' = 'ASC',
  'GOOD' = 'GOOD',
  'SOSO' = 'SOSO',
  'BAD' = 'BAD',
}
