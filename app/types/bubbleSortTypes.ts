export type sortDataType = {
  entries: {
    value: number;
    color: string;
  }[];
  lineNo: number[];
  explanation: string;
}[];

export type sortingStatusType = 'not-started' | 'in-progress' | 'paused';