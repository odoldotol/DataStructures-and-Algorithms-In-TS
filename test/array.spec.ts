import { OArray } from "src/datastructure";

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

      it('하나의 string 타입 요소를 같는 Items', () => {
        const array = new OArray("10");
        expect(array.capacity).toBe(1);
        expect(array).toHaveLength(1);
        expect(array[0]).toBe("10");
      });
    });
  });

  describe('Basic Spec', () => {
    describe('Capacity', () => {
      const CAPACITY = 10;
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
      const CAPACITY = 5;
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
      const CAPACITY = 5;
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
      const CAPACITY = 5;
      const array = new OArray(CAPACITY);
      let iterator = array[Symbol.iterator]();
      it("Iterator 를 리턴함", () => {
        expect(iterator).toBeDefined();
        expect(iterator[Symbol.iterator]()).toBe(iterator);
      });

      it("Iterator 는 Length 만큼 next 로 반복함", () => {
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

  describe('Ovveride Methods of Array', () => {
    describe('Inserting. Length++', () => {
      let CAPACITY = 5;
      let array: OArray<string>;
      let ogLength: number;
      beforeEach(() => {
        array = new OArray(CAPACITY);
        array[0] = 'a';
        array[1] = 'b';
        array[2] = 'c';
        ogLength = 3;
        array.length = ogLength;
      });
      describe('push', () => {
        it('끝에 삽입', () => {
          array.push('d');
          expect(array[ogLength]).toBe('d');
          expect(array.length).toBe(ogLength+1);

          --array.length;
          array.push('d', 'e');
          expect(array[ogLength]).toBe('d');
          expect(array[ogLength+1]).toBe('e');
          expect(array.length).toBe(ogLength+2);
        });

        it('Capacity 를 벗어나는 삽입은 불가능', () => {
          array.push('d');
          array.push('e');
          expect(array.length).toBe(CAPACITY);

          let isError = false;
          (() => {
            try {
              array.push('f');
            } catch (e) {
              isError = true;
              // 삽입 잔에 에러를 던져야한다
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY))
              .toBeUndefined();
            }
          })();
          expect(isError).toBe(true);

          --array.length;
          isError = false;
          (() => {
            try {
              array.push('e', 'f');
            } catch (e) {
              isError = true;
              // 삽입 잔에 에러를 던져야한다
              expect(Object.getOwnPropertyDescriptor(array, CAPACITY))
              .toBeUndefined();
            }
          })();
          expect(isError).toBe(true);
        });
      });

      // unshift 앞에 삽입
      // splice 중간에 삽입
    });
    
    describe('Deleting. Length--', () => {
      // pop 끝에서 삭제
      // shift 앞에서 삭제
      // splice 중간에서 삭제
    });

    // Todo: 그 밖의 테스트 해야될것같거나 문제가 발견된 모든 매서드에 대한 테스트 작성하기
  });
});