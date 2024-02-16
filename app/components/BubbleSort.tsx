'use client'
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { bubbleSortArrayLength, bubbleSortWaitMs, spring } from "../constants/bubbleSortConstants";
import generateRandomUniqueArray from "../utils/generateRandomUniqueArray";
import timer from "../utils/timer";

export default function BubbleSort({ initialArray }: { initialArray: number[] }) {
  const [resetInProgress, setResetInProgress] = useState(false);
  const [exampleArray, setExampleArray] = useState<number[]>(initialArray);
  const unsortedArray = [{ entries: initialArray }];
  const currentIndex = useRef(0);
  let sortInterval: string | number | NodeJS.Timeout | undefined;

  async function resetArray() {
    setResetInProgress(true);
    const updatedArray = generateRandomUniqueArray({ length: bubbleSortArrayLength });
    setExampleArray(updatedArray);
    await timer(bubbleSortWaitMs);
    setResetInProgress(false);
  }

  async function bubbleSort({ arr }: { arr: number[] }) {
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
          unsortedArray.push({ entries: [...arr] });
          // setExampleArray([...exampleArray, { entries: arr }]);
          // await timer(50);
        }
      }
    } while (swapped);

    // return arr;
  }

  async function reorder() {
    bubbleSort({ arr: [...unsortedArray[0].entries] });
    // setExampleArray(unsortedArray[currentIndex.current].entries)
    clearInterval(sortInterval);
    sortInterval = setInterval(function () {
      if (currentIndex.current < (unsortedArray.length - 1)) {
        // setCurrentIndex(prevState => prevState + 1);
        currentIndex.current += 1;
        console.log('currentIndex', currentIndex);
        setExampleArray(unsortedArray[currentIndex.current].entries)
      } else {
        clearInterval(sortInterval);
      }
    }, bubbleSortWaitMs);
  }

  return (
    <section>
      {
        resetInProgress
          ?
          <div className="text-xl">reset in progress...</div>
          :
          <div className="flex">
            <div className="text-xl mr-1">[</div>
            {
              exampleArray.map((item, index) => (
                <div key={item} className="flex">
                  <motion.div
                    layout
                    key={item}
                    transition={spring}
                    className={`text-xl max-w-fit`}
                  // ${sortedIndexes.includes(index) && 'text-orange-700'} ${isCompared.includes(index) && 'text-green-700'}
                  >{item}</motion.div>
                  {index !== exampleArray.length - 1 && <div className="text-xl mr-1">,</div>}
                </div>
              ))
            }
            <div className="text-xl ml-1">]</div>
          </div>
      }
      <div className="flex gap-x-4">
        <div
          className={`mt-4 rounded-lg w-fit py-2 px-5 text-white bg-sky-400 cursor-pointer`}
          // ${sortingInProgress ? 'pointer-events-none bg-gray-500' : 'bg-sky-400 cursor-pointer'}
          onClick={e => reorder()}
        >bubble sort</div>
        <div className={`mt-4 cursor-pointer rounded-lg bg-amber-400 w-fit py-2 px-5 text-white`} onClick={(e) => resetArray()}>reset array</div>
      </div>
    </section>
  )
}