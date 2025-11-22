import { CompleteBinaryTreeArray } from "src/binaryTree";
import { Comparator } from "./comparator";

export class Heap<T> extends CompleteBinaryTreeArray<T> {
  constructor(
    private readonly comparator: Comparator<T>
  ) {
    super();
  }

  public override add(value: T): number {
    const result = super.add(value);

    let idx = result;
    let parentIdx;
    while (
      (parentIdx = this.getParentIndex(idx)) > 0
      && this.comparator(this.tree[idx]!, this.tree[parentIdx]!)
    ) {
      const temp = this.tree[idx]!;
      this.tree[idx] = this.tree[parentIdx]!;
      this.tree[parentIdx] = temp;
      idx = parentIdx;
    }

    return result;
  }

  public poll(): T | null {
    const result = this.peek();

    if (result === null) {
      return result;
    }

    let idx = 1;
    this.tree[idx] = this.tree[this.size()]!;
    this.tree.length--;
    while (idx <= this.size() / 2) {
      let leftChildIdx = this.getLeftChildIndex(idx);
      let rightChildIdx = leftChildIdx + 1;
      if (
        this.comparator(this.tree[leftChildIdx]!, this.tree[idx]!)
        || this.comparator(this.tree[rightChildIdx]! /* undefined 일 수 있음. 어차피 false 될테니 괜찮음. 하지만 좋지않아~ */, this.tree[idx]!)
      ) {
        if (this.comparator(this.tree[leftChildIdx]!, this.tree[rightChildIdx]!)) {
          let temp = this.tree[leftChildIdx]!;
          this.tree[leftChildIdx] = this.tree[idx]!;
          this.tree[idx] = temp;
          idx = leftChildIdx;
        } else {
          let temp = this.tree[rightChildIdx]!;
          this.tree[rightChildIdx] = this.tree[idx]!;
          this.tree[idx] = temp;
          idx = rightChildIdx;
        }
      } else {
        break;
      }
    }
    
    return result;
  }
}
