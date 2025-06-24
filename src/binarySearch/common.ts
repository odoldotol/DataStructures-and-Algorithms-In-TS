/**
 * @todo 1 시퀀스씩 또는 특정 조건까지 시퀀스를 진행시킬 수 있도록 하기
 */
export abstract class BinarySearch {

  protected targetIndex = NaN;

  constructor(
    protected leftIndex: number,
    protected rightIndex: number,
  ) {}

  protected midIndex = NaN;
  protected sequenceCount = 0;

  public getTargetIndex(): number {
    return this.targetIndex;
  }

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

  public abstract run(): this;

  /*
  아래는 Core methods.
  while 조건, 분기점구조, Range 설정 등.
  추후 분리나 커스텀이 필요하면 구현하자. (코어 템플릿 주입하는 방식?)
  */

  protected calculateMidIndex(
    leftIndex: number,
    rightIndex: number
  ): number {
    return Math.floor(leftIndex + (rightIndex - leftIndex) / 2);
  }

}
