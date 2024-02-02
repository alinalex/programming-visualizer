'use client'
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {

  const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };

  const [exampleArray, setExampleArray] = useState([10, 8, 9, 5, 3, 2, 1]);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  let staticArray = [10, 8, 9, 5, 3, 2, 1];

  function timer(ms: number, data: number[]) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function reorder() {
    setSortingInProgress(true);
    let len = staticArray.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (staticArray[j] > staticArray[j + 1]) {
          let toBeUpped = staticArray[j];
          let toBeDown = staticArray[j + 1];
          const updatedArray = [...staticArray.slice(0, j), toBeDown, toBeUpped, ...staticArray.slice(j + 2)];
          staticArray = updatedArray;
          setExampleArray(updatedArray)
          await timer(500, updatedArray);
        }
      }
    }
    setSortingInProgress(false);
  }

  return (
    <main className="min-h-screen p-24">
      <div className="flex">
        <div className="text-xl mr-1">[</div>
        {
          exampleArray.map((item, index) => (
            <div key={item} className="flex">
              <motion.div
                layout
                key={item}
                transition={spring}
                className="text-xl max-w-[22px]"
              >{item}</motion.div>
              {index !== exampleArray.length - 1 && <div className="text-xl mr-1">,</div>}
            </div>
          ))
        }
        <div className="text-xl ml-1">]</div>
      </div>
      <div
        className={`mt-4 cursor-pointer rounded-lg bg-sky-400 w-fit py-2 px-5 text-white ${sortingInProgress && 'pointer-events-none bg-gray-500'}`}
        onClick={e => reorder()}
      >bubble sort</div>
    </main>
  );
}
