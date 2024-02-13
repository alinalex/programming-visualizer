import BubbleSort from "./components/BubbleSort";
import { bubbleSortArrayLength } from "./constants/bubbleSortConstants";
import generateRandomUniqueArray from "./utils/generateRandomUniqueArray";

export default function Home() {

  const initialArray = generateRandomUniqueArray({ length: bubbleSortArrayLength });

  return (
    <main className="min-h-screen p-24">
      <BubbleSort initialArray={initialArray} />
    </main>
  );
}
