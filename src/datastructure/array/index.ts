import { isPositiveInteger } from 'src/utill'

export class OArray<T>
  extends Array<T>
{
  /* 기존 JS Array 의 length 의 개념보다 더 좁은 의미의 length 개념 + Capacity 개념을 사용할 것이다.
  기존 length 를 변경할 때 일어나는 delete 작업 등등 은 피해야 한다.
  Capacity 를 정의해야한다. (기존 length 를 CAPACITY 로 사용하는 방법도 가능할 것 같음)
  
  가장 안전하고 직관적인 방법은 CAPACITY 와 _length 를 새로 정의하는것일 것이다. 기존 length 는 유명무실해 지지만 이해하기 쉽다.
  length 속성을 인터페이스로 제공하면서 실재로는 _length 를 의미하도록 하려면, Proxy 를 쓰는 방법이 적절해보인다.
  (get, set 매서드로 length 를 오버라이드 하여도 length 를 우회할 수는 없다. 이미 인스턴스가 length 를 가지기에 프로토타입까지 안감.) */
  private readonly CAPACITY: number;
  private _length: number;

  // Todo: 모호함을 제거하기위해, capacity 를 인자로 받는 생성만 허용하고 Items 를 인자로 받는 생성은 허용하지 말아야 할까?
  constructor(capacity: number);
  constructor(...items: T[]);
  constructor(...args: any[]) {
    let capacity: number;
    let length: number = 0;
    if (args.length === 1 && typeof args[0] === 'number') {
      if (isPositiveInteger(args[0])) {
        capacity = args[0];
        args = new Array(capacity).fill(undefined);
      } else {
        throw new Error(`Capacity(${args[0]}) must be positive integer.`);
      }
    } else {
      capacity = args.length;
      length = capacity;
    }

    super(...args);

    this.CAPACITY = capacity;
    this._length = length;

    Object.defineProperty(this, 'CAPACITY', {
      writable: false,
      enumerable: false,
    });

    Object.defineProperty(this, '_length', {
      enumerable: false,
    });

    Object.seal(this);

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (typeof prop === 'string') {
          const index = Number(prop);
          if (!Number.isNaN(index) || prop === 'NaN') {
            if (!isPositiveInteger(index)) {
              // index 에 음의 정수를 허용하지 않음으로써 전체적으로 더 단순해진다 (set: sealed)
              throw new Error(`Index(${index}) must be positive integer.`);
            } else if (index >= target._length) {
              throw new Error(`Index(${index}) out of bound.`);
            }
          } else {
            if (prop === 'length') {
              return target._length;
            }
          }
        }

        return Reflect.get(target, prop, receiver);
      },

      set: (target, prop, value, receiver) => {
        // length 와 value 의 할당 부분은 기존 Array 매서드와의 호환성에 영향을 줄 수 있으므로 최대힌 적게 수정하는 방향으로 진행해야한다. 만약 수정해야한다면 호환성에 최대한 적게 영향을 주는 방향으로 진행해야한다.
        if (prop === 'length') {
          // Todo: length 를 줄일때 또는 늘릴때, 사용하지 않는 인덱스에 undefined 를 여기서 직접 할당해줘야할까? 필요할까?
          receiver._length = value;
          return true;
        } else if (prop === '_length') {
          if (value > target.CAPACITY) {
            throw new Error(`Length(${value}) must be less than capacity.`);
          } else if (!isPositiveInteger(value)) {
            throw new Error(`Length(${value}) must be positive integer.`);
          }
        }

        // Todo: length 를 벗어나는 인덱스에 할당시에, 추후 해당 인덱스에 접근이 가능하도록 length 를 늘려주는것이 필요한가? 또는 length 를 벗어나는 할당을 막아야 할까?

        return Reflect.set(target, prop, value, receiver);
      }
    });
  }

  public get capacity(): number {
    return this.CAPACITY;
  }

  /**
   * @param items New elements to add to the array.
   * @OArray Throws an error if the new length exceeds the capacity.
   */
  public override push(...items: T[]): number {
    /* 일종의 트랜젝션 처럼, 일관성을 위해서,
    Capacity 를 벗어나는 삽입 시도는 일부가 가능하더라도 전혀 삽입하지 않아야한다. */
    if (this._length + items.length > this.CAPACITY) {
      throw new Error('New length will exceed the capacity.');
    }
    return super.push(...items);
  }

  /**
   * @param items Elements to insert at the start of the array.
   * @OArray Throws an error if the new length exceeds the capacity.
   */
  public override unshift(...items: T[]): number {
    return super.unshift(...items);
  }

  /* Array 의 메서드 중 삭제 관련 메서드의 오버라이드
  pop, shilft => delete operator 를 이용한다. OArray 는 delete 를 허용하지 않는다.
  splice => redefine 을 이용한다. OArray 에서는 redefine 을 허용하지 않는다. */

  /**
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns An array containing the elements that were deleted.
   * @OArray Throws an error if the new length exceeds the capacity.
   */
  public override splice(
    start: number,
    deleteCount: number = this._length - start,
    ...items: T[]
  ): T[] {
    /* 삭제작업이 없는 경우는 기존 매서드 그대로 이용해도 무방함.
    아래 주석처리된 코드를 살려도 옳바르게 동작함. 하지만 구현했으니 구현한것을 쓰자. */
    // if (deleteCount === 0) {
    //   return super.splice(start, deleteCount, ...items);
    // }

    const validDeleteCount = Math.min(deleteCount, this._length - start);
    const newLength = this._length + items.length - validDeleteCount;
    
    if (this.CAPACITY < newLength) {
      throw new Error('New length will exceed the capacity.');
    }

    // deleted elements
    /* Todo: 이 작업을 아래 순회와 합치면 새로운길이 - start 만큼의 순회 한번으로 끝남.
    지금처럼 따로하면 새로운길이 - start + delete 만큼의 순회를함. */
    const result: T[] = [];
    for (let i = 0; i < validDeleteCount; i++) {
      (result[i] as T | undefined) = this[start + i];
    }

    const moveElementTo = (i: number) => {
      (this[i] as T | undefined) = this[i + validDeleteCount - items.length];
    };

    // Move Elements Back Or Forward
    if (items.length > validDeleteCount) { // 뒤로 밀어야 하는 경우
      this.length = newLength; // 밀어야 한다면 밀기 전에 길이를 수정해야함
      for (let i = newLength-1; start + items.length <= i; i--) { // 뒤에서부터
        moveElementTo(i);
      }
    } else if (items.length < validDeleteCount) { // 앞으로 당겨야 하는 경우
      for (let i = start + items.length; i < newLength; i++) { // 앞에서부터
        moveElementTo(i);
      }
      this.length = newLength; // 당겨야 한다면 당긴 뒤에 길이를 수정해야함
    }

    // Inserting
    for (let i = 0; i < items.length; i++) {
      (this[start + i] as T | undefined) = items[i];
    }

    return result;
  }

  /**
   * @OArray Throws an error if array is empty.
   */
  public override pop(): T | undefined {
    const result = this[this._length - 1]; // lenth 가 0 이면 여기에서 에러를 던짐
    this.decreaseLength();
    return result;
  }

  /**
   * @OArray Throws an error if array is empty.
   */
  public override shift(): T | undefined {
    const result = this[0]; // lenth 가 0 이면 여기에서 에러를 던짐
    for (let i = 0; i < this.length-1; i++) {
      (this[i] as T | undefined) = this[i + 1];
    }
    this.decreaseLength();
    return result;
  }

  // private increaseLength(): number {
  //   return ++this._length;
  // }

  private decreaseLength(): number {
    return --this._length;
  }

}
