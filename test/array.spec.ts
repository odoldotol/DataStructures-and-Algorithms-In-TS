import { OArray } from "src";

const CAPACITY = 5;

describe('OArray', () => {

  describe('생성', () => {
    it('Array 를 상속한다', () => {
      expect(new OArray()).toBeInstanceOf(Array);
    });

    describe('Capacity 로 생성', () => {
      it('Capacity 를 유일한 인자로 함', () => {
        expect((new OArray(10)).capacity).toBe(10);
        expect((new OArray(10, 10)).capacity).toBe(2);
      });

      it('Capacity 는 양의 정수', () => {
        expect(new OArray(10)).toBeDefined();
        expect(() => new OArray(-10)).toThrow();
        expect(() => new OArray(10.5)).toThrow();
        expect(() => new OArray(NaN)).toThrow();
      });
    });

    describe('...Items 로 생성', () => {
      it('...Items 를 인자로 함', () => {
        const array = new OArray(1, 2, undefined, 4, 5);
        expect(array.capacity).toBe(5);
        expect(array).toHaveLength(5);
        expect(array[0]).toBe(1);
        expect(array[1]).toBe(2);
        expect(array[2]).toBe(undefined);
        expect(array[3]).toBe(4);
        expect(array[4]).toBe(5);
      });

      it('하나의 string 타입 요소를 갖는 Items', () => {
        const array = new OArray("10");
        expect(array.capacity).toBe(1);
        expect(array).toHaveLength(1);
        expect(array[0]).toBe("10");
      });
    });
  });

  describe('Basic Spec', () => {
    describe('Capacity', () => {
      const array = new OArray(CAPACITY);

      it('get', () => {
        expect(array.capacity).toBe(CAPACITY);
      });

      it('Constancy', () => {
        const capacityDescriptor = Object.getOwnPropertyDescriptor(
          array,
          'CAPACITY'
        );
        expect(capacityDescriptor?.writable).toBe(false);
        expect(capacityDescriptor?.configurable).toBe(false);
      });
    });

    describe('Length', () => {
      const array = new OArray(CAPACITY);

      it('get', () => {
        expect(array.length).toBe(0);
      });

      it('set', () => {
        array.length = CAPACITY;
        expect(array.length).toBe(CAPACITY);
      });

      it('Capacity 보다 클 수 없음', () => {
        expect(() => array.length = CAPACITY+1).toThrow();
      });

      /* undefined 와 길이, 할당과의 관계
      혹시, 길이를 벗어나는 인덱스에 할당을 막거나,
      길이-1 인덱스 요소에 undefined 를 할당하면 길이를 줄이거나,
      어떤 인덱스에 undefined 가 아닌 값을 할당하면 길이 <= 인덱스 이면 길리를 인덱스+1 로 바꾸거나,
      하는 등의 할당과 길이를 엄격하게 연결시키는 제약을 가진 배열을 구현하는 것도 충분히 의미있을 것 같은데
      배열의 활용도가 줄어들 것 같아서 디자인에 확신이 들진 않음 */
    });

    describe('인덱스로 읽기', () => {
      const items = [1,2,3,4,5];
      const CAPACITY = items.length;
      const array = new OArray(...items);
      array.length = CAPACITY -1;

      it('get', () => {
        expect(array[2]).toBe(items[2]);
      });

      it('Length 를 벗어나는 인덱스로 읽을 수 없음', () => {
        expect(() => array[array.length]).toThrow();
      });

      it('인덱스는 양의 정수', () => {
        expect(() => array[-array.length]).toThrow();
        expect(() => array[array.length-1.5]).toThrow();
        expect(() => array[NaN]).toThrow();
        expect(() => array[`${array.length-1.5}`]).toThrow();

        expect(array[`${array.length-1}`]).toBe(items[array.length-1]);
      });
    });

    describe('인덱스로 할당', () => {
      const array = new OArray(CAPACITY);
      const value = 10;

      it('set', () => {
        array[CAPACITY-1] = value;
        const ogLength = array.length;
        array.length = CAPACITY;
        expect(array[CAPACITY-1]).toBe(value);
        array.length = ogLength;
      });

      it('Capacity 를 벗어나는 인덱스로 할당할 수 없음', () => {
        expect(() => array[CAPACITY]).toThrow();
      });

      it('인덱스는 양의 정수이며 인덱스가 아닌 임의의 키로 값을 할당할 수 없음', () => {
        expect(() => array[-CAPACITY] = value).toThrow();
        expect(() => array[CAPACITY-1.5] = value).toThrow();
        expect(() => array[NaN] = value).toThrow();
        expect(() => array[`${CAPACITY-1.5}`] = value).toThrow();

        expect(array[`${CAPACITY-1}`] = value).toBe(value);
      });
    });

    describe("Iterable", () => {
      const array = new OArray(CAPACITY);
      let iterator = array[Symbol.iterator]();
      it("Iterator", () => {
        expect(iterator).toBeDefined();
        expect(iterator[Symbol.iterator]()).toBe(iterator);
      });

      it("Iterator 는 Length 만큼 next 를 반복가능", () => {
        expect(iterator.next()).toEqual({value: undefined, done: true});
        array.length = CAPACITY;
        iterator = array[Symbol.iterator]();
        let i = 0;
        while (i < CAPACITY) {
          expect(iterator.next()).toEqual({value: undefined, done: false});
          i++;
        }
        expect(iterator.next()).toEqual({value: undefined, done: true});
      });
    });
  });

  describe('Methods of Array', () => {
    describe('Inserting', () => {
      let array: OArray<string>;
      const ogLength = CAPACITY - 2;
      const elements = new Array(CAPACITY+1);
      for (let i = 0; i < CAPACITY+1; i++) {
        elements[i] = String.fromCharCode(97+i);
      }

      beforeEach(() => {
        array = new OArray(CAPACITY);
        for (let i = 0; i < ogLength; i++) {
          array[i] = elements[i]!;
        }
        array.length = ogLength;
      });

      describe('push', () => {
        it('끝에 삽입', () => {
          const result = array.push(elements[ogLength]!);
          expect(array[ogLength]).toBe(elements[ogLength]);
          expect(array.length).toBe(ogLength+1);
          expect(result).toBe(ogLength+1);
        });

        it('끝에 삽입 2', () => {
          const result = array.push(elements[ogLength]!, elements[ogLength+1]!);
          expect(array[ogLength]).toBe(elements[ogLength]);
          expect(array[ogLength+1]).toBe(elements[ogLength+1]);
          expect(array.length).toBe(ogLength+2);
          expect(result).toBe(ogLength+2);
        });

        it('Capacity 를 벗어나는 삽입은 불가능 1', () => {
          for (let i = ogLength; i < CAPACITY; i++) {
            array.push(elements[i]!);
          }
          expect(array.length).toBe(CAPACITY);

          let isError = false;
          (() => {
            try {
              array.push(elements[CAPACITY]!);
            } catch (e) {
              isError = true;
              // 삽입 전에 에러를 던져야한다
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY))
              .toBeUndefined();
            }
          })();
          expect(isError).toBe(true);
        });

        it('Capacity 를 벗어나는 삽입은 불가능 2', () => {
          for (let i = ogLength; i < CAPACITY-1; i++) {
            array.push(elements[i]!);
          }
          expect(array.length).toBe(CAPACITY-1);

          let isError = false;
          (() => {
            try {
              array.push(elements[CAPACITY-1]!, elements[CAPACITY]!);
            } catch (e) {
              isError = true;
              /* 일종의 트랜젝션 처럼, 일관성을 위해서,
              Capacity 를 벗어나는 삽입 시도는 일부가 가능하더라도 전혀 삽입하지 않아야한다. */
              expect(array.length).toBe(CAPACITY-1);
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY-1)?.value)
              .toBeUndefined();
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY))
              .toBeUndefined();
            }
          })();
          expect(isError).toBe(true);
        });
      });

      describe('unshift', () => {
        it('앞에 삽입 1', () => {
          const result = array.unshift(elements[ogLength]!);
          expect(array[0]).toBe(elements[ogLength]);
          for (let i = 0; i < ogLength; i++) {
            expect(array[i+1]).toBe(elements[i]);
          }
          expect(array.length).toBe(ogLength+1);
          expect(result).toBe(ogLength+1);
        });

        it('앞에 삽입 2', () => {
          const result = array.unshift(elements[ogLength]!, elements[ogLength+1]!);
          expect(array[0]).toBe(elements[ogLength]);
          expect(array[1]).toBe(elements[ogLength+1]);
          for (let i = 0; i < ogLength; i++) {
            expect(array[i+2]).toBe(elements[i]);
          }
          expect(array.length).toBe(ogLength+2);
          expect(result).toBe(ogLength+2);
        });

        it('Capacity 를 벗어나는 삽입은 불가능 1', () => {
          for (let i = ogLength; i < CAPACITY; i++) {
            array.unshift(elements[i]!);
          }
          expect(array.length).toBe(CAPACITY);

          let isError = false;
          (() => {
            try {
              array.unshift(elements[CAPACITY]!);
            } catch (e) {
              isError = true;
              // 삽입 전에 에러를 던져야한다
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY))
              .toBeUndefined();
            }
          })();
          expect(isError).toBe(true);
        });

        it('Capacity 를 벗어나는 삽입은 불가능 2', () => {
          for (let i = ogLength; i < CAPACITY-1; i++) {
            array.unshift(elements[i]!);
          }
          expect(array.length).toBe(CAPACITY-1);

          let isError = false;
          (() => {
            try {
              array.unshift(elements[CAPACITY-1]!, elements[CAPACITY]!);
            } catch (e) {
              isError = true;
              /* 앞에 삽입은 리소스가 큰 작업이므로,
              실재로 여러번 삽입하지 않고 한번에 처리하기 때문에
              Capacity 를 벗어나면 전혀 삽입하지 않는다.
              이 부분이 일관성을 해친다고 생각하기 때문에, push 의 수정이 필요할 것 같다. */
              expect(array.length).toBe(CAPACITY-1);
              expect(Object.getOwnPropertyDescriptor(array, 0)?.value)
              .toBe(elements[CAPACITY-2]);
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY-1)?.value)
              .toBeUndefined();
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY))
              .toBeUndefined();
            }
          })();
          expect(isError).toBe(true);
        });
      });
      // splice 중간에 삽입
    });
    
    describe('Deleting', () => {
      // pop 끝에서 삭제
      // shift 앞에서 삭제
      // splice 중간에서 삭제
    });

    // Todo: 그 밖의 테스트 해야될것같거나 문제가 발견된 매서드에 대한 테스트 작성하고, 최종적으로 모든 메서드에 대한 테스트 가지기.
    // Todo: 퍼포먼스 테스트 해보기. (capacity 와 length 의 개념이 변하면서 퍼포먼스에서 이득을 볼 여지가 있지않을까?)
  });
});