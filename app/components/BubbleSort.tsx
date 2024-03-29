'use client'
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { bubbleSortArrayLength, bubbleSortWaitMs, spring, unsortedStateColor } from "../constants/bubbleSortConstants";
import generateRandomUniqueArray from "../utils/generateRandomUniqueArray";
import timer from "../utils/timer";
import type { sortDataType, sortingStatusType } from "../types/bubbleSortTypes";
import { bubbleSort } from "../utils/bubbleSort";

export default function BubbleSort({ initialArray, prettyCode }: { initialArray: number[], prettyCode: string[] }) {
  const [resetInProgress, setResetInProgress] = useState(false);
  const [sortingInProgress, setSortingInProgress] = useState<sortingStatusType>('not-started');

  const formattedInitialArray = [{ entries: initialArray.map(elem => ({ value: elem, color: unsortedStateColor })), lineNo: [], explanation: '', swapped: 'undefined', len: initialArray.length - 1, _i: 0, dataLineNo: [] }];
  const [stateArray, setStateArray] = useState<sortDataType>([]);
  const [exampleArray, setExampleArray] = useState<sortDataType>(formattedInitialArray);

  const currentIndex = useRef(0);
  const sortInterval = useRef<NodeJS.Timeout>();

  async function resetArray() {
    setResetInProgress(true);
    setSortingInProgress('not-started');
    clearInterval(sortInterval.current);
    currentIndex.current = 0;
    const updatedArray = [{ entries: generateRandomUniqueArray({ length: bubbleSortArrayLength }).map(elem => ({ value: elem, color: unsortedStateColor })), lineNo: [], explanation: '', swapped: 'undefined', len: initialArray.length - 1, _i: 0, dataLineNo: [] }];
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
      const res = bubbleSort({ arr: exampleArray[0].entries.map(elem => ({ value: elem.value, color: elem.color })) });
      setStateArray(res);
    }
  }

  function changeStep(goNext: boolean = false) {
    if (sortingInProgress !== 'in-progress') {
      goNext ? currentIndex.current += 1 : currentIndex.current -= 1;
      setExampleArray([stateArray[currentIndex.current]])
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
        <div className="min-w-[50%]">
          <pre className="theme-atom-one-dark shadow-3xl text-lg relative overflow-hidden max-w-full tab-size h-full">
            <span className="hljs mb-0 p-4 block min-h-full overflow-auto rounded-xl">
              <code>
                {prettyCode.map((elem, index) => (<div key={index} className={`transition-all duration-200 ${exampleArray[0].lineNo.includes(index) ? 'bg-[#00008b] rounded-md' : ''}`} dangerouslySetInnerHTML={{ __html: elem }}></div>))}
              </code>
            </span>
            <small className="rounded-tr-xl bg-black/30 text-white absolute top-0 right-0 uppercase font-bold text-xs px-2 py-1">
              <span className="sr-only">Language:</span>JavaScript
            </small>
          </pre>
        </div>
        <div className="flex-1 p-4 pt-6 pl-0 flex items-start justify-end">
          <div className="gap-y-3 flex flex-col w-full">
            <div className="flex">
              <div className="flex-1 relative"><div className={`line ${exampleArray[0].dataLineNo.includes(0) ? 'block' : 'hidden'}`}></div></div>
              <p className={`w-[75%] transition-all duration-200 text-lg text-[#425466] px-3 py-2 shadow-md border border-gray-100 rounded-xl`}>swapped = {exampleArray[0].swapped}</p>
            </div>
            <div className="flex">
              <div className="flex-1 relative"><div className={`line ${exampleArray[0].dataLineNo.includes(1) ? 'block' : 'hidden'}`}></div></div>
              <p className="w-[75%] text-lg text-[#425466] px-3 py-2 shadow-md border border-gray-100 rounded-xl">len = {exampleArray[0].len}</p>
            </div>
            <div className="flex">
              <div className="flex-1 relative"><div className={`line ${exampleArray[0].dataLineNo.includes(2) ? 'block' : 'hidden'}`}></div></div>
              <p className="w-[75%] text-lg text-[#425466] px-3 py-2 shadow-md border border-gray-100 rounded-xl">i = {exampleArray[0]._i}</p>
            </div>
            <div className="flex">
              <div className="flex-1 relative"><div className={`line ${exampleArray[0].dataLineNo.includes(3) ? 'block' : 'hidden'}`}></div></div>
              <div className="w-[75%] px-3 py-2 shadow-md border border-gray-100 rounded-xl">
                {
                  resetInProgress
                    ?
                    <div className="text-lg text-[#425466]">reset in progress...</div>
                    :
                    <>
                      <div className="flex">
                        <div className="text-lg mr-1 text-[#425466]">array &#61;</div>
                        <div className="text-lg mr-1 text-[#425466]">[</div>
                        {
                          exampleArray[0].entries.map((item, index) => (
                            <div key={item.value} className="flex">
                              <motion.div
                                layout
                                key={item.value}
                                transition={spring}
                                className={`text-lg max-w-fi ${item.color}`}
                              >{item.value}</motion.div>
                              {index !== exampleArray[0].entries.length - 1 && <div className="text-lg mr-1 text-[#425466]">,</div>}
                            </div>
                          ))
                        }
                        <div className="text-lg ml-1 text-[#425466]">]</div>
                      </div>
                    </>
                }
              </div>
            </div>
            <div className="flex">
              <div className="flex-1 relative"><div className={`line ${exampleArray[0].dataLineNo.includes(4) ? 'block' : 'hidden'}`}></div></div>
              <p className={`w-[75%] transition-all duration-200 text-lg text-[#425466] mt-2 px-3 py-2 shadow-md border border-gray-100 rounded-xl`}>Explanation: <br />{exampleArray[0].explanation}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 mt-4 p-3 rounded-xl shadow-md border border-gray-100">
        <div
          className={`rounded-lg w-fit py-2 px-5 text-white bg-sky-400 cursor-pointer`}
          onClick={e => sortingInProgress === 'in-progress' ? pauseSortAnimation() : reorder()}
        >{sortingInProgress === 'in-progress' ? 'Pause' : 'Sort'}</div>
        <div className={`cursor-pointer rounded-lg bg-amber-400 w-fit py-2 px-5 text-white`} onClick={(e) => resetArray()}>Reset Data</div>
        <div className="cursor-pointer rounded-lg bg-teal-600 w-fit py-2 px-5 text-white" onClick={e => changeStep()}>Prev</div>
        <div className="cursor-pointer rounded-lg bg-teal-600 w-fit py-2 px-5 text-white" onClick={e => changeStep(true)}>Next</div>
      </div>
    </section>
  )
}