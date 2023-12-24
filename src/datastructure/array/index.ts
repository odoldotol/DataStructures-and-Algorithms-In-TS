import { isPositiveInteger } from 'src/utill'

export class OArray<T>
  extends Array<T>
{
  private readonly CAPACITY: number;
  private LENGTH: number;

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
        if (prop === 'length') {
          receiver.LENGTH = value;
          return true;
        }

        if (prop === 'LENGTH' && value > target.CAPACITY) {
          throw new Error('Length must be less than capacity.');
        }

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

  // Todo: 문제가 발견된 모든 Array 매서드 오버라이드 하기.

  // Todo: 퍼포먼스적으로 오버라이드 해야하는 메서드 테스트 해보기.

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
