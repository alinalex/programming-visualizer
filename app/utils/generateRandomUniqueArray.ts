import { bubbleSortTopValue } from "../constants/bubbleSortConstants";

export default function generateRandomUniqueArray({ length }: { length: number }) {
  let a: number[] = [];
  while (a.length < length) {
    let elem = Math.floor(Math.random() * bubbleSortTopValue);
    if (!a.includes(elem)) a.push(elem);
  }
  return a;
}