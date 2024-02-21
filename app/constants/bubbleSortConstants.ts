export const bubbleSortArrayLength = 5;
export const bubbleSortTopValue = 200;
export const bubbleSortWaitMs = 500;
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

export const unsortedStateColor = 'text-sky-600';
export const comparingStateColor = 'text-green-600';
export const sortedStateColor = 'text-orange-600';