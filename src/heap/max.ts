import { Heap } from "./base";
import { maxHeapComparator } from "./comparator";

export class MaxHeap<T> extends Heap<T> {
  constructor() {
    super(maxHeapComparator);
  }
}
