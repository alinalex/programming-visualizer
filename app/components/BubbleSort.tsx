'use client'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import generateRandomUniqueArray from "../utils/generateRandomUniqueArray";
import { bubbleSortArrayLength, bubbleSortWaitMs } from "../constants/bubbleSortConstants";

export default function BubbleSort({ initialArray }: { initialArray: number[] }) {
  const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };

  const [exampleArray, setExampleArray] = useState(initialArray);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [resetInProgress, setResetInProgress] = useState(false);
  const [isCompared, setIsCompared] = useState<number[]>([]);
  const [sortedIndexes, setSortedIndexes] = useState<number[]>([]);
  let staticArray = initialArray;
  const pause = useRef(false);
  const indexI = useRef(1);
  const indexJ = useRef(0);


  function timer(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function reorder() {
    setSortingInProgress(true);
    let len = staticArray.length;
    let i: number;
    let j: number;
    loop1: for (i = indexI.current; i < len; i++) {
      for (j = indexJ.current; j < len - i; j++) {
        setIsCompared([j, j + 1]);
        await timer(bubbleSortWaitMs);
        if (staticArray[j] > staticArray[j + 1]) {
          let toBeUpped = staticArray[j];
          let toBeDown = staticArray[j + 1];
          const updatedArray = [...staticArray.slice(0, j), toBeDown, toBeUpped, ...staticArray.slice(j + 2)];
          staticArray = updatedArray;
          setExampleArray(updatedArray)
          await timer(bubbleSortWaitMs);
        }
        if (pause.current) {
          indexI.current = i;
          indexJ.current = j;
          break loop1;
        }
      }
      setIsCompared([]);
      setSortedIndexes(prevState => [...prevState, staticArray.length - i]);
      await timer(bubbleSortWaitMs);
    }
    if (!pause.current) {
      setSortedIndexes(prevState => [...prevState, staticArray.length - i]);
      setSortingInProgress(false);
    }
  }

  async function resetArray() {
    setResetInProgress(true);
    const updatedArray = generateRandomUniqueArray({ length: bubbleSortArrayLength });
    staticArray = updatedArray;
    setExampleArray(updatedArray);
    await timer(bubbleSortWaitMs);
    setResetInProgress(false);
  }

  function playPause() {
    pause.current = !pause.current;
    if (!pause.current) reorder();
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
                    className={`text-xl max-w-fit ${sortedIndexes.includes(index) && 'text-orange-700'} ${isCompared.includes(index) && 'text-green-700'}`}
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
          className={`mt-4 rounded-lg w-fit py-2 px-5 text-white ${sortingInProgress ? 'pointer-events-none bg-gray-500' : 'bg-sky-400 cursor-pointer'}`}
          onClick={e => reorder()}
        >bubble sort</div>
        <div className={`mt-4 cursor-pointer rounded-lg bg-amber-400 w-fit py-2 px-5 text-white`} onClick={(e) => resetArray()}>reset array</div>
        <div className={`mt-4 cursor-pointer rounded-lg bg-green-400 w-fit py-2 px-5 text-white`} onClick={(e) => playPause()}>{pause.current ? 'play' : 'pause'}</div>
      </div>
    </section>
  )
}