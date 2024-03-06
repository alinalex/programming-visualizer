export const bubbleSortArrayLength = 5;
export const bubbleSortTopValue = 200;
export const bubbleSortWaitMs = 1000;
export const spring = {
  type: "spring",
  damping: 25,
  stiffness: 120,
};
export const bubbleSortCode = [
  {
    content: 'let swapped = false',
    padding: ''
  },
  {
    content: 'let len = length of array - 1',
    padding: ''
  },
  {
    content: 'do &#123;',
    padding: ''
  },
  {
    content: 'swapped &#61; false',
    padding: 'pl-4'
  },
  {
    content: 'for &#40;i &#61; 1&#59; i &lt; len&#59; i++&#41; &#123;',
    padding: 'pl-4'
  },
  {
    content: 'if &#40;leftElement &gt; rightElement&#41; &#123;',
    padding: 'pl-8'
  },
  {
    content: 'swap&#40;leftElement, rightElement&#41;',
    padding: 'pl-12'
  },
  {
    content: 'swapped &#61; true',
    padding: 'pl-12'
  },
  {
    content: '&#125;',
    padding: 'pl-8'
  },
  {
    content: '&#125;',
    padding: 'pl-4'
  },
  {
    content: 'len--',
    padding: 'pl-4'
  },
  {
    content: '&#125; while &#40;swapped&#41;',
    padding: ''
  }
];

export const bubbleSortCodeArray = [
  `function bubbleSort(array) {`,
  `  let swapped;`,
  `  let len = array.length - 1;`,
  `  do {`,
  `    swapped = false;`,
  `    for (let i = 0; i < len; i++) {`,
  `      if (array[i] > array[i + 1]) {`,
  `        let temp = array[i];`,
  `        array[i] = array[i + 1];`,
  `        array[i + 1] = temp;`,
  `        swapped = true;`,
  `      }`,
  `    }`,
  `    len--;`,
  `  } while (swapped);`,
  `  return array;`,
  `}`,
];

export const unsortedStateColor = 'text-[#61aeee]'; //'text-sky-600';
export const comparingStateColor = 'text-[#98c379]'; //'text-green-600';
export const sortedStateColor = 'text-[#d19a66]'; //'text-orange-600';

export const explanationsList = {
  start: 'We start the sorting.',
  initSwap: 'Initialize a variable that tells us if any swap was made during a for iteration.',
  initLen: 'Initialize a variable for the index of last unsorted element, where we will stop with the for iteration.',
  do: 'We will make comparisons while swapped variable is true.',
  swapToFalse: 'Set the swapped variable to false.',
  iteration: (len: number, i: number) => `Iterate from index 0 up to ${len}. The current index is ${i}.`,
  comparison: (i: number, j: number) => `Checking if ${i} is greater than ${j} and swap them if that is true.`,
  doSwap: 'We do the swap.',
  swapToTrue: 'Set the value of swapped variable to true since we made the swap.',
  decrementLen: 'We decrement the index of last unsorted element.',
  noSwap: 'No swap is done in this pass. We can terminate Bubble Sort now.',
  sortIsDone: 'The array is sorted.',
}