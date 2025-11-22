import { Heap } from "./base";
import { minHeapComparator } from "./comparator";

export class MinHeap<T> extends Heap<T> {
  constructor() {
    super(minHeapComparator);
  }
}
