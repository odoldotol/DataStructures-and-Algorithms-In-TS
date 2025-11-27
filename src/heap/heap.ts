import { CompleteBinaryTreeArray } from "src/binaryTree";
import { Comparator, maxHeapComparator, minHeapComparator } from "./comparator";

export class Heap<T> extends CompleteBinaryTreeArray<T> {

  public static max<T>(array: T[] = []): Heap<T> {
    return new Heap(maxHeapComparator, array);
  }

  public static min<T>(array: T[] = []): Heap<T> {
    return new Heap(minHeapComparator, array);
  }

  private readonly comparator: Comparator<T>;

  /**
   * default is min heap
   */
  constructor();
  constructor(array: T[]);
  constructor(comparator: Comparator<T>);
  constructor(comparator: Comparator<T>, array: T[]);
  constructor(
    arg1?: Comparator<T> | T[],
    arg2?: T[],
  ) {
    let
    comparator: Comparator<T>,
    array: T[];

    if (Array.isArray(arg1)) {
      array = arg1;
    } else if (Array.isArray(arg2)) {
      array = arg2;
    } else {
      array = [];
    }

    if (typeof arg1 === "function") {
      comparator = arg1;
    } else {
      comparator = minHeapComparator;
    }

    super(array);

    this.comparator = comparator;
    
    for (let i = Math.floor(this.treeSize / 2 - 1); i >= 0; i--) {
      this.heapify(i);
    }
  }

  public override add(value: T): number {
    const result = super.add(value);

    let idx = result - 1;
    let parentIdx;

    while (
      (parentIdx = this.getParentIndex(idx)) >= 0
      && this.comparator(this.treeArr[idx]!, this.treeArr[parentIdx]!) < 0
    ) {
      [this.treeArr[idx]!, this.treeArr[parentIdx]!] = [this.treeArr[parentIdx]!, this.treeArr[idx]!];
      idx = parentIdx;
    }

    return result;
  }

  public poll(): T | null {
    const result = this.peek();

    if (result === null) {
      return result;
    }

    let idx = 0;
    this.treeArr[idx] = this.treeArr[this.treeSize - 1]!;
    this.treeSize--;
    this.treeArr.length--;

    this.heapify(idx);
    
    return result;
  }

  /**
   * Top K Elements, Top K-th Element 를 위해 구현해봄. \
   * 매소드로 제공할 만큼 유용할지 의문임. \
   * 
   * poll 과 add 를 같이 쓰는 것으로 충분히 대체 가능. \
   * 복잡도는 O(log N) 으로 동일하지만 replace 구현상 상수 시간만큼 더 빠름.
   */
  public replace(value: T): T | null {
    const result = this.peek();

    this.treeArr[0] = value;
    this.heapify(0);

    return result;
  }

  protected heapify(index: number): void {
    while (index < Math.floor(this.treeSize / 2)) {
      let leftChildIdx = this.getLeftChildIndex(index);
      let rightChildIdx = leftChildIdx < this.treeSize - 1 ? leftChildIdx + 1 : null;
      if (
        this.comparator(this.treeArr[leftChildIdx]!, this.treeArr[index]!) < 0
        || (rightChildIdx !== null && this.comparator(this.treeArr[rightChildIdx]!, this.treeArr[index]!) < 0)
      ) {
        if (rightChildIdx === null || this.comparator(this.treeArr[leftChildIdx]!, this.treeArr[rightChildIdx]!) < 0) {
          [this.treeArr[leftChildIdx]!, this.treeArr[index]!] = [this.treeArr[index]!, this.treeArr[leftChildIdx]!];
          index = leftChildIdx;
        } else {
          [this.treeArr[rightChildIdx]!, this.treeArr[index]!] = [this.treeArr[index]!, this.treeArr[rightChildIdx]!];
          index = rightChildIdx;
        }
      } else {
        break;
      }
    }
  }
}
