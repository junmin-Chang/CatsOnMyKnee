export interface Diary {
  id?: string;
  title: string;
  date: string;
  feeling: string;
  description: string;
}

export enum DiaryFilter {
  '최근 순' = '최근 순',
  '오래된 순' = '오래된 순',
  '기분 좋음' = '기분 좋음',
  '그저 그럼' = '그저그럼',
  '기분 안 좋음' = '기분 안 좋음',
}
