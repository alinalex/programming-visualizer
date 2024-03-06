import { comparingStateColor, explanationsList, sortedStateColor, unsortedStateColor } from "../constants/bubbleSortConstants";
import type { sortDataType } from "../types/bubbleSortTypes";

type PrepareDataForInsertionType = {
  arr: {
    value: number;
    color: string;
  }[], i?: number
}

export function prepareDataForInsertion({ arr, i }: PrepareDataForInsertionType) {
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

function getSwappedStringValue(swapped: undefined | boolean) {
  return typeof swapped === 'undefined' ? 'undefined' : swapped.toString();
}

type InteractionFlowType = {
  flowData: sortDataType, argsForInsertion: PrepareDataForInsertionType, lineNo: number[], explanation: string, swapped: string, len: number, i: number, dataLineNo: number[], dataLineVar?: number[]
}

function addHighlightedCodeLine({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  flowData.push({ entries: prepareDataForInsertion(argsForInsertion), lineNo, explanation: '', swapped, len, _i: i, dataLineNo: [] });
}

function addConnectionToVariableOrNewVariableValue({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  flowData.push({ entries: prepareDataForInsertion(argsForInsertion), lineNo, explanation: '', swapped, len, _i: i, dataLineNo: typeof dataLineVar !== 'undefined' ? dataLineVar : [] });
}

function addConnectionToExplanation({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  flowData.push({ entries: prepareDataForInsertion(argsForInsertion), lineNo, explanation: '', swapped, len, _i: i, dataLineNo });
}

function addShowExplanation({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  flowData.push({ entries: prepareDataForInsertion(argsForInsertion), lineNo, explanation, swapped, len, _i: i, dataLineNo });
}

function runExplanationFlow({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  addHighlightedCodeLine({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
  addConnectionToExplanation({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
  addShowExplanation({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
}

function runVarAndExplanationPartOne({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  addHighlightedCodeLine({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
  addConnectionToVariableOrNewVariableValue({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
}

function runVarAndExplanationPartTwo({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar }: InteractionFlowType) {
  addConnectionToVariableOrNewVariableValue({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
  addConnectionToExplanation({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
  addShowExplanation({ flowData, argsForInsertion, lineNo, explanation, swapped, len, i, dataLineNo, dataLineVar });
}

export function bubbleSort({ arr }: {
  arr: {
    value: number;
    color: string;
  }[]
}) {
  let swapped: undefined | boolean;
  let len = arr.length - 1;
  let i = 0;

  const res: sortDataType = [];

  runExplanationFlow({ flowData: res, argsForInsertion: { arr }, lineNo: [0], explanation: explanationsList.start, i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4] })

  runExplanationFlow({ flowData: res, argsForInsertion: { arr }, lineNo: [1], explanation: explanationsList.initSwap, i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4] })

  runExplanationFlow({ flowData: res, argsForInsertion: { arr }, lineNo: [2], explanation: explanationsList.initLen, i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4] })

  do {
    runExplanationFlow({ flowData: res, argsForInsertion: { arr }, lineNo: [3, 14], explanation: explanationsList.do, i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4] })

    runVarAndExplanationPartOne({ flowData: res, argsForInsertion: { arr }, lineNo: [4], explanation: explanationsList.swapToFalse, i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4], dataLineVar: [0] });
    swapped = false;
    runVarAndExplanationPartTwo({ flowData: res, argsForInsertion: { arr }, lineNo: [4], explanation: explanationsList.swapToFalse, i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4], dataLineVar: [0] });

    for (i = 0; i < len; i++) {

      runVarAndExplanationPartOne({ flowData: res, argsForInsertion: { arr }, lineNo: [5], explanation: '', i: i !== 0 ? i - 1 : i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4], dataLineVar: [2] });

      runVarAndExplanationPartTwo({ flowData: res, argsForInsertion: { arr }, lineNo: [5], explanation: explanationsList.iteration(len, i), i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4], dataLineVar: [2] });

      runVarAndExplanationPartOne({ flowData: res, argsForInsertion: { arr }, lineNo: [6], explanation: '', i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4], dataLineVar: [3] })

      arr[i].color = comparingStateColor;
      arr[i + 1].color = comparingStateColor;

      runVarAndExplanationPartTwo({ flowData: res, argsForInsertion: { arr: arr, i }, lineNo: [6], explanation: explanationsList.comparison(arr[i].value, arr[i + 1].value), i, len, swapped: getSwappedStringValue(swapped), dataLineNo: [4], dataLineVar: [3] })

      if (arr[i].value > arr[i + 1].value) {
        // show highlighted code line
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [7, 8, 9], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [] });

        // show connection to variable
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [7, 8, 9], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [3] });

        let temp = arr[i].value;
        arr[i].value = arr[i + 1].value;
        arr[i + 1].value = temp;

        // show the new variable value
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [7, 8, 9], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [3] });

        // show connection to explanation
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [7, 8, 9], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [4] });

        // show explanation
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [7, 8, 9], explanation: explanationsList.doSwap, swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [4] });

        // show connection to variable
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [10], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [0] });

        swapped = true;

        // show the new variable value
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [10], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [0] });

        // show connection to explanation
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [10], explanation: '', swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [4] });

        // show explanation
        res.push({ entries: prepareDataForInsertion({ arr: arr, i }), lineNo: [10], explanation: explanationsList.swapToTrue, swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [4] });
      }
    }

    // you are here
    arr[len].color = sortedStateColor;
    len--;

    res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [11], explanation: explanationsList.decrementLen, swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [] });

    if (!swapped) {
      res.push({ entries: prepareDataForInsertion({ arr: arr }), lineNo: [14], explanation: explanationsList.noSwap, swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [] });
    }

  } while (swapped);

  res.push({ entries: getAllDataToInitialState({ arr: arr }), lineNo: [], explanation: explanationsList.sortIsDone, swapped: getSwappedStringValue(swapped), len: len, _i: i, dataLineNo: [] });

  return res;
}