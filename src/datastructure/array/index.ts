import { isPositiveInteger } from 'src/utill'

export class OArray<T>
  extends Array<T>
{
  private readonly CAPACITY: number;
  private LENGTH: number;

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
        throw new Error('Capacity must be positive integer.');
      }
    } else {
      capacity = args.length;
      length = capacity;
    }

    super(...args);

    this.CAPACITY = capacity;
    this.LENGTH = length;

    Object.defineProperty(this, 'CAPACITY', {
      writable: false,
      configurable: false
    });

    /* 원래 의도보다 더 확실한 역할을 하는 것 같다.
    length 검사를 하기전에 capacity 를 벗어나는 삽입을 여기서 막는다.
    따라서 push 의 오버라이드 매서드를 제거해도 array 수정 전에 에러를 던지고 있다. */
    Object.seal(this);

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (typeof prop === 'string') {
          const index = Number(prop);
          if (!Number.isNaN(index) || prop === 'NaN') {
            if (!isPositiveInteger(index)) {
              throw new Error('Index must be positive integer.');
            }
            if (index >= target.LENGTH) {
              throw new Error('Index out of bound.');
            }
          } else {
            if (prop === 'length') {
              return target.LENGTH;
            }
          }
        }

        return Reflect.get(target, prop, receiver);
      },

      set: (target, prop, value, receiver) => {
        // length 와 value 의 할당 부분은 기존 Array 매서드와의 호환성에 영향을 줄 수 있으므로 최대힌 적게 수정하는 방향으로 진행해야한다. 만약 수정해야한다면 호환성에 최대한 적게 영향을 주는 방향으로 진행해야한다.
        if (prop === 'length') {
          // Todo: length 를 줄일때, 사용하지 않는 인덱스에 undefined 를 여기서 직접 할당해줘야할까? 그렇지 않으면 다시 length 를 늘렸을때 이전에 할당된 값이 남아있을텐데? 이것이 length 수정의 의도된 결과여도 되는가?
          receiver.LENGTH = value;
          return true;
        }

        if (prop === 'LENGTH' && value > target.CAPACITY) {
          throw new Error('Length must be less than capacity.');
        }

        // Todo: length 를 벗어나는 인덱스에 할당시에, 추후 해당 인덱스에 접근이 가능하도록 length 를 늘려주는것이 필요한가? 또는 length 를 벗어나는 할당을 막아야 할까?

        return Reflect.set(target, prop, value, receiver);
      }
    });
  }

  public get capacity(): number {
    return this.CAPACITY;
  }

  /* Constructor 에서 this 의 프록시를 반환하게되면
  클래스에서 오버라이딩한 length 의 getter, setter 를 호출하지 못하고
  부모 클래스인 Array 의 length 프로퍼티로 가는 것 같다.
    Todo: 이 부분에 대해서는 나중에 좀 더 봐야할 것같음.
  일단은, LENGTH 반환, 할당은 프록시 에서 처리하자. */
  public override get length(): number {
    return this.LENGTH;
  }

  public override set length(value: number) {
    this.LENGTH = value;
  }

  /**
   * @param items New elements to add to the array.
   * @OArray Throws an error if the new length exceeds the capacity.
   */
  public override push(...items: T[]): number {
    /* 일종의 트랜젝션 처럼, 일관성을 위해서,
    Capacity 를 벗어나는 삽입 시도는 일부가 가능하더라도 전혀 삽입하지 않아야한다. */
    if (this.LENGTH + items.length > this.CAPACITY) {
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

  /**
   * @OArray Method not implemented.
   */
  public override fill(value: T, start?: number, end?: number): this;
  public override fill(_value: T, _start: number, _end: number): this {
    throw new Error('Method not implemented.');
  }

  /**
   * @OArray Method not implemented.
   */
  public override reverse(): T[] {
    throw new Error('Method not implemented.');
  }

  // private increaseLength(): number {
  //   return ++this.LENGTH;
  // }

  // private decreaseLength(): number {
  //   return --this.LENGTH;
  // }

}
