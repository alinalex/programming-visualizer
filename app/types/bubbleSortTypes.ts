export type sortDataType = {
  entries: {
    value: number;
    color: string;
  }[];
  lineNo: number[];
  explanation: string;
  swapped: string;
  len: number;
  _i: number;
  dataLineNo: number[];
}[];

export type sortingStatusType = 'not-started' | 'in-progress' | 'paused';