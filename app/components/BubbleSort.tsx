'use client'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { bubbleSortArrayLength, bubbleSortWaitMs, spring } from "../constants/bubbleSortConstants";
import generateRandomUniqueArray from "../utils/generateRandomUniqueArray";
import timer from "../utils/timer";

type sortDataType = {
  entries: {
    value: number;
    color: string;
  }[];
  lineNo: number[]
}[];

type sortingStatusType = 'not-started' | 'in-progress' | 'paused';

const bubbleSortCode = [
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
    content: 'swapped = false',
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
]

export default function BubbleSort({ initialArray }: { initialArray: number[] }) {
  const unsortedStateColor = 'text-sky-600';
  const comparingStateColor = 'text-green-600';
  const sortedStateColor = 'text-orange-600';
  const [resetInProgress, setResetInProgress] = useState(false);
  const [sortingInProgress, setSortingInProgress] = useState<sortingStatusType>('not-started');

  const formattedInitialArray = [{ entries: initialArray.map(elem => ({ value: elem, color: unsortedStateColor })), lineNo: [] }];
  const [stateArray, setStateArray] = useState<sortDataType>([]);
  const [exampleArray, setExampleArray] = useState<sortDataType>(formattedInitialArray);

  const currentIndex = useRef(0);
  const sortInterval = useRef<NodeJS.Timeout>();

  async function resetArray() {
    setResetInProgress(true);
    setSortingInProgress('not-started');
    clearInterval(sortInterval.current);
    currentIndex.current = 0;
    const updatedArray = [{ entries: generateRandomUniqueArray({ length: bubbleSortArrayLength }).map(elem => ({ value: elem, color: unsortedStateColor })), lineNo: [] }];
    setStateArray([]);
    setExampleArray(updatedArray);
    await timer(100);
    setResetInProgress(false);
  }

  function prepareDataForInsertion({ arr, i }: {
    arr: {
      value: number;
      color: string;
    }[], i: number
  }) {
    return arr.map((elem, index) => (elem.color === sortedStateColor || [i, i + 1].includes(index) ? { ...elem } : { value: elem.value, color: unsortedStateColor }))
  }

  function bubbleSort({ arr }: { arr: sortDataType }) {
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
      res.push({ entries: arr[0].entries.map((elem, index) => (elem.color === sortedStateColor ? { ...elem } : { value: elem.value, color: unsortedStateColor })), lineNo: [11] });
    } while (swapped);
    res.push({ entries: arr[0].entries.map(elem => ({ value: elem.value, color: unsortedStateColor })), lineNo: [] });
    return res;
  }

  function sortAnimation() {
    sortInterval.current = setInterval(function () {
      if (currentIndex.current < (stateArray.length - 1)) {
        setExampleArray([stateArray[currentIndex.current]])
        currentIndex.current += 1;
      } else {
        currentIndex.current = 0;
        pauseSortAnimation();
      }
    }, bubbleSortWaitMs);
  }

  function pauseSortAnimation() {
    setSortingInProgress('paused');
    clearInterval(sortInterval.current);
  }

  async function reorder() {
    setSortingInProgress('in-progress');
    if (!stateArray.length && sortingInProgress === 'not-started') {
      const res = bubbleSort({ arr: [{ entries: exampleArray[0].entries.map(elem => ({ value: elem.value, color: elem.color })), lineNo: [] }] })
      setStateArray(res);
    }
  }

  useEffect(() => {
    if (sortingInProgress === 'in-progress' && stateArray.length > 0) {
      clearInterval(sortInterval.current);
      sortAnimation();
    }
  }, [stateArray, sortingInProgress]);

  return (
    <section>
      <div className="flex justify-between">
        <div>
          {
            resetInProgress
              ?
              <div className="text-xl">reset in progress...</div>
              :
              <div className="flex">
                <div className="text-xl mr-1">[</div>
                {
                  exampleArray[0].entries.map((item, index) => (
                    <div key={item.value} className="flex">
                      <motion.div
                        layout
                        key={item.value}
                        transition={spring}
                        className={`text-xl max-w-fi ${item.color}`}
                      >{item.value}</motion.div>
                      {index !== exampleArray[0].entries.length - 1 && <div className="text-xl mr-1">,</div>}
                    </div>
                  ))
                }
                <div className="text-xl ml-1">]</div>
              </div>
          }
          <div className="flex gap-x-4">
            <div
              className={`mt-4 rounded-lg w-fit py-2 px-5 text-white bg-sky-400 cursor-pointer`}
              onClick={e => sortingInProgress === 'in-progress' ? pauseSortAnimation() : reorder()}
            >{sortingInProgress === 'in-progress' ? 'Pause' : 'Sort'}</div>
            <div className={`mt-4 cursor-pointer rounded-lg bg-amber-400 w-fit py-2 px-5 text-white`} onClick={(e) => resetArray()}>Reset Data</div>
          </div>
        </div>
        <div className="bg-[#eeeef0] p-5">
          {bubbleSortCode.map((elem, index) =>
            <p key={index} className={`${elem.padding} ${exampleArray[0].lineNo.includes(index) && 'bg-black text-white'}`} dangerouslySetInnerHTML={{ __html: elem.content }} />
          )}
        </div>
      </div>
    </section>
  )
}