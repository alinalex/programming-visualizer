import { comparingStateColor, sortedStateColor, unsortedStateColor } from "../constants/bubbleSortConstants";
import type { sortDataType } from "../types/bubbleSortTypes";

export function prepareDataForInsertion({ arr, i }: {
  arr: {
    value: number;
    color: string;
  }[], i?: number
}) {
  return arr.map((elem, index) => (elem.color === sortedStateColor || (typeof i === 'number' && [i, i + 1].includes(index)) ? { ...elem } : { value: elem.value, color: unsortedStateColor }))
}

export function getAllDataToInitialState({ arr }: {
  arr: {
    value: number;
    color: string;
  }[]
}) {
  return arr.map(elem => ({ value: elem.value, color: unsortedStateColor }))
}

export function bubbleSort({ arr }: { arr: sortDataType }) {
  let swapped = false;
  let len = arr[0].entries.length - 1;
  const res: sortDataType = [{ entries: arr[0].entries.map(elem => ({ value: elem.value, color: elem.color })), lineNo: [0, 1] }];

  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      arr[0].entries[i].color = comparingStateColor;
      arr[0].entries[i + 1].color = comparingStateColor;
      res.push({ entries: prepareDataForInsertion({ arr: arr[0].entries, i }), lineNo: [5] });
      if (arr[0].entries[i].value > arr[0].entries[i + 1].value) {
        let temp = arr[0].entries[i].value;
        arr[0].entries[i].value = arr[0].entries[i + 1].value;
        arr[0].entries[i + 1].value = temp;
        swapped = true;
        res.push({ entries: prepareDataForInsertion({ arr: arr[0].entries, i }), lineNo: [6] });
      }
    }
    arr[0].entries[len].color = sortedStateColor;
    len--;
    res.push({ entries: prepareDataForInsertion({ arr: arr[0].entries }), lineNo: [11] });
  } while (swapped);
  res.push({ entries: getAllDataToInitialState({ arr: arr[0].entries }), lineNo: [] });
  return res;
}