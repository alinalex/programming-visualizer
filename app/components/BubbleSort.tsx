'use client'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { bubbleSortArrayLength, bubbleSortCode, bubbleSortWaitMs, spring, unsortedStateColor } from "../constants/bubbleSortConstants";
import generateRandomUniqueArray from "../utils/generateRandomUniqueArray";
import timer from "../utils/timer";
import type { sortDataType, sortingStatusType } from "../types/bubbleSortTypes";
import { bubbleSort } from "../utils/bubbleSort";

export default function BubbleSort({ initialArray, prettyCode }: { initialArray: number[], prettyCode: string[] }) {
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

  function sortAnimation() {
    sortInterval.current = setInterval(function () {
      if (currentIndex.current <= (stateArray.length - 1)) {
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
      <div className="flex">
        <div className="p-5 min-w-[50%]">
          <pre className="theme-atom-one-dark shadow-3xl text-lg relative overflow-hidden max-w-full tab-size h-full">
            <span className="hljs mb-0 p-4 block min-h-full overflow-auto">
              <code>
                {prettyCode.map((elem, index) => (<div key={index} className={`${exampleArray[0].lineNo.includes(index) && 'bg-white'}`} dangerouslySetInnerHTML={{ __html: elem }}></div>))}
              </code>
            </span>
            <small className="bg-black/30 text-white absolute top-0 right-0 uppercase font-bold text-xs rounded-bl-md px-2 py-1">
              <span className="sr-only">Language:</span>JavaScript
            </small>
          </pre>
        </div>
        <div className="h-auto border-l border-dashed border-slate-500 mx-2"></div>
        <div className="p-9 flex-1">
          {
            resetInProgress
              ?
              <div className="text-lg">reset in progress...</div>
              :
              <div className="flex">
                <div className="text-lg mr-1">array &#61;</div>
                <div className="text-lg mr-1">[</div>
                {
                  exampleArray[0].entries.map((item, index) => (
                    <div key={item.value} className="flex">
                      <motion.div
                        layout
                        key={item.value}
                        transition={spring}
                        className={`text-lg max-w-fi ${item.color}`}
                      >{item.value}</motion.div>
                      {index !== exampleArray[0].entries.length - 1 && <div className="text-lg mr-1">,</div>}
                    </div>
                  ))
                }
                <div className="text-lg ml-1">]</div>
              </div>
          }
        </div>
      </div>
      <div className="flex gap-x-4 mt-4 p-3 rounded-xl shadow-md border border-gray-100">
        <div
          className={`rounded-lg w-fit py-2 px-5 text-white bg-sky-400 cursor-pointer`}
          onClick={e => sortingInProgress === 'in-progress' ? pauseSortAnimation() : reorder()}
        >{sortingInProgress === 'in-progress' ? 'Pause' : 'Sort'}</div>
        <div className={`cursor-pointer rounded-lg bg-amber-400 w-fit py-2 px-5 text-white`} onClick={(e) => resetArray()}>Reset Data</div>
      </div>
    </section>
  )
}