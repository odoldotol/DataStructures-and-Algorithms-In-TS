// 힙은 자료구조이며 우선순위큐(Priority Queues)는 추상 데이터 유형으로 힙으로 구현가능함.
// 우선순위큐는 배열이나 연결리스트로도 구현 가능한데 이때는, 삽입 또는 삭제에 대해서만 O(1), 다른 연산은 O(N)
// 우선순위큐를 힙으로 구현하면 삽입과 삭제 모두 O(logN) 가능. 최대/최소값 얻기는 O(1)

// 힙은 이진트리의 특별유형으로, 완전 이진 트리이며 각 노드의 값은 자식 노드의 값보다 크거나 작아서는 안 됨.

// 완전이진트리와 배열

// 최대힙/최소힙 구현, 삽입삭제 구현, 길이 GET, 시공간복잡도 예상

import { CompleteBinaryTreeArray } from "src/binaryTree";
import { Comparator, maxHeapComparator, minHeapComparator } from "./comparator";

export class Heap<T> extends CompleteBinaryTreeArray<T> {

  public static max<T>(array: T[] = []): Heap<T> {
    return new Heap(maxHeapComparator, array);
  }

  public static min<T>(array: T[] = []): Heap<T> {
    return new Heap(minHeapComparator, array);
  }

  constructor(comparator: Comparator<T>);
  constructor(comparator: Comparator<T>, array: T[]);
  constructor(
    private readonly comparator: Comparator<T>,
    array: T[] = [],
  ) {
    super(array);
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
    while (idx < this.treeSize / 2) {
      let leftChildIdx = this.getLeftChildIndex(idx);
      let rightChildIdx = leftChildIdx + 1;
      if (
        this.comparator(this.treeArr[leftChildIdx]!, this.treeArr[idx]!) < 0
        || this.comparator(this.treeArr[rightChildIdx]! /* @Todo - undefined 일 수 있음? 어차피 false 될테니 괜찮음. 하지만 좋지않아. */, this.treeArr[idx]!) < 0
      ) {
        if (this.comparator(this.treeArr[leftChildIdx]!, this.treeArr[rightChildIdx]!) < 0) {
          [this.treeArr[leftChildIdx]!, this.treeArr[idx]!] = [this.treeArr[idx]!, this.treeArr[leftChildIdx]!];
          idx = leftChildIdx;
        } else {
          [this.treeArr[rightChildIdx]!, this.treeArr[idx]!] = [this.treeArr[idx]!, this.treeArr[rightChildIdx]!];
          idx = rightChildIdx;
        }
      } else {
        break;
      }
    }
    
    return result;
  }

  public sort(): T[] {
    // @Todo - 구현

    this.treeSize = this.treeArr.length;

    return this.treeArr;
  }
}
