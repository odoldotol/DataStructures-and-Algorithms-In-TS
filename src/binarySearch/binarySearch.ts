import { BinarySearchStrategy } from "./strategy";

/**
 * @todo 1 시퀀스씩 또는 특정 조건까지 시퀀스를 진행시킬 수 있도록 하기
 */
export class BinarySearch<T> {

  constructor(
    private leftIndex: number,
    private rightIndex: number,
    private readonly target: T,
    private readonly strategy: BinarySearchStrategy<T>,
  ) {
    if (strategy.isTargetInLeftSide) {
      this.isTargetInLeftSide = strategy.isTargetInLeftSide;
    }
  }

  private midIndex = NaN;
  private sequenceCount = 0;

  public getLeftIndex(): number {
    return this.leftIndex;
  }

  public getRightIndex(): number {
    return this.rightIndex;
  }

  public getMidIndex(): number {
    return this.midIndex;
  }

  public getSequenceCount(): number {
    return this.sequenceCount;
  }

  /**
   * @returns The index of the target element if found, otherwise NaN.
   */
  public run(): number {
    let comparable: T;

    // isLeftSide isRightSide isEqual 중 컴퓨팅에서 동등비교가 대소비교보다 일반적으로 유리하기때문에 isEqual 과 isLeftSide 를 모든 시퀀스에서 발생하도록 하는것을 선택함.
    // isLeftSide 와 isRightSide 를 이용하면 대략 50% 의 시퀀스에서 한번의 대소비교만 일어날 것임. 하지만 나머지 약 50% 에서 두번의 대소비교가 필요할 것암.
    while (this.leftIndex <= this.rightIndex) {
      this.sequenceCount++;
      this.midIndex = this.strategy.calculateMidIndex(this.leftIndex, this.rightIndex);
      comparable = this.strategy.makeIndexComparable(this.midIndex);
      if (this.isTarget(comparable)) {
        return this.midIndex;
      } else if (this.isTargetInLeftSide(comparable)) {
        this.rightIndex = this.midIndex - 1;
      } else {
        this.leftIndex = this.midIndex + 1;
      }
    }

    return NaN;
  }

  private isTarget(
    comparable: T
  ): boolean {
    return this.strategy.isEqual(comparable, this.target);
  }

  private isTargetInLeftSide(
    comparable: T
  ): boolean {
    return this.strategy.compare(this.target, comparable);
  }

  // private isTargetInRightSide(
  //   comparable: T
  // ): boolean {
  //   return this.strategy.compare(comparable, this.target);
  // }

}
