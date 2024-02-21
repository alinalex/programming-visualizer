export type sortDataType = {
  entries: {
    value: number;
    color: string;
  }[];
  lineNo: number[]
}[];

export type sortingStatusType = 'not-started' | 'in-progress' | 'paused';