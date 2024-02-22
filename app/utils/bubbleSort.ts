import { comparingStateColor, explanationsList, sortedStateColor, unsortedStateColor } from "../constants/bubbleSortConstants";
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

export function bubbleSort({ arr }: {
  arr: {
    value: number;
    color: string;
  }[]
}) {
  let swapped = false;
  let len = arr.length - 1;

  const res: sortDataType = [{ entries: arr.map(elem => ({ value: elem.value, color: elem.color })), lineNo: [0], explanation: explanationsList.start }];

  res.push({ entries: arr.map(elem => ({ value: elem.value, color: elem.color })), lineNo: [1], explanation: explanationsList.initSwap });

  res.push({ entries: arr.map(elem => ({ value: elem.value, color: elem.color })), lineNo: [2], explanation: explanationsList.initLen });

  do {
    res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [3, 14], explanation: explanationsList.do });

    res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [4], explanation: explanationsList.swapToFalse });

    swapped = false;
    for (let i = 0; i < len; i++) {

      res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [5], explanation: explanationsList.iteration(len, i) });

      arr[i].color = comparingStateColor;
      arr[i + 1].color = comparingStateColor;

      res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [6], explanation: explanationsList.comparison(arr[i].value, arr[i + 1].value) });

      if (arr[i].value > arr[i + 1].value) {
        let temp = arr[i].value;
        arr[i].value = arr[i + 1].value;
        arr[i + 1].value = temp;
        swapped = true;

        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [7, 8, 9], explanation: explanationsList.doSwap });

        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [10], explanation: explanationsList.swapToTrue });
      }
    }

    arr[len].color = sortedStateColor;
    len--;

    res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [11], explanation: explanationsList.decrementLen });

    if (!swapped) {
      res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [14], explanation: explanationsList.noSwap });
    }

  } while (swapped);

  res.push({ entries: getAllDataToInitialState({ arr: arr }), lineNo: [], explanation: explanationsList.sortIsDone });

  return res;
}