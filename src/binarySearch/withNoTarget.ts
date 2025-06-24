import { BinarySearch } from "./common";
import { BinarySearchWithNoTargetStrategy } from "./strategy";

export class BinarySearchWithNoTarget<T>
  extends BinarySearch
{
  constructor(
    leftIndex: number,
    rightIndex: number,
    private readonly strategy: BinarySearchWithNoTargetStrategy<T>,
  ) {
    super(leftIndex, rightIndex);
  }

  public run(): this {
    while (this.leftIndex <= this.rightIndex) { // Core 커스텀?
      this.sequenceCount++;

      this.midIndex = this.calculateMidIndex(this.leftIndex, this.rightIndex);

      if (this.strategy.isNextSearchLeftSide(this.strategy.makeIndexComparable(this.midIndex))) {
        this.rightIndex = this.midIndex - 1; // Core 커스텀?
      } else {
        this.leftIndex = this.midIndex + 1; // Core 커스텀?
      }
    }

    return this;
  }

}
