import { BinarySearch } from "./common";
import { BinarySearchWithTargetStrategy } from "./strategy";

export class BinarySearchWithTarget<T>
  extends BinarySearch
{
  constructor(
    leftIndex: number,
    rightIndex: number,
    private readonly strategy: BinarySearchWithTargetStrategy<T>,
    private readonly target: T,
  ) {
    super(leftIndex, rightIndex);
  }

  public run(): this {
    let comparable: T;

    while (this.leftIndex <= this.rightIndex) { // Core 커스텀?
      this.sequenceCount++;

      this.midIndex = this.calculateMidIndex(this.leftIndex, this.rightIndex);
      comparable = this.strategy.makeIndexComparable(this.midIndex);

      // isTargetInLeftSide, isTarget, else 순으로 로직을 타는게 가장 효율적일것이라 예상.
      if (this.strategy.isTargetInLeftSide(comparable, this.target, this.strategy.compare)) {
        this.rightIndex = this.midIndex - 1; // Core 커스텀?
      } else if (this.strategy.isTarget(comparable, this.target, this.strategy.isEqual)) {
        this.targetIndex = this.midIndex;
        return this;
      } else {
        this.leftIndex = this.midIndex + 1; // Core 커스텀?
      }
    }

    return this;
  }

}
