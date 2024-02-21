import BubbleSort from "./components/BubbleSort";
import { bubbleSortArrayLength, bubbleSortCodeArray } from "./constants/bubbleSortConstants";
import generateRandomUniqueArray from "./utils/generateRandomUniqueArray";
import { getPrettyCode } from "./utils/prettyCode";

export default function Home() {

  const initialArray = generateRandomUniqueArray({ length: bubbleSortArrayLength });
  const prettyCode = getPrettyCode({ codeArray: bubbleSortCodeArray });

  return (
    <main className="min-h-screen p-4">
      <section>
        <h1 className="text-2xl text-slate-800 mb-5">Bubble Sort</h1>
      </section>
      <BubbleSort initialArray={initialArray} prettyCode={prettyCode} />
    </main>
  );
}
