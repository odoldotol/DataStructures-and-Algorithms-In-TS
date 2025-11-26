import { Heap } from "src/heap";
import { Comparator, minHeapComparator } from "src/heap/comparator";

export function heapSort<T>(array: T[]): T[];
export function heapSort<T>(comparator: Comparator<T>, array: T[]): T[];
export function heapSort<T>(arg1: Comparator<T> | T[], arg2?: T[]): T[] {
  let comparator: Comparator<T> | undefined = undefined;
  let array: T[];
  
  if (Array.isArray(arg1)) {
    array = arg1;
  } else {
    comparator = arg1;
    if (arg2) {
      array = arg2;
    } else {
      throw new Error("Invalid arguments");
    }
  }

  new HeapSort(array, comparator).sort();

  return array;
}

class HeapSort<T> extends Heap<T> {
  constructor(array: T[], comparator: Comparator<T> = minHeapComparator) {
    super(
      (a, b) => comparator(b, a), // 역순 comparator 필요
      array
    );
  }

  public sort(): T[] {
    for (let i = this.treeArr.length - 1; i > 0; i--) {
      [this.treeArr[0]!, this.treeArr[i]!] = [this.treeArr[i]!, this.treeArr[0]!];
      this.treeSize--;
      this.heapify(0);
    }

    this.treeSize = this.treeArr.length;

    return this.treeArr;
  }
}