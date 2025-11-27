import { Heap } from "src/heap";

describe("Heap", () => {

  describe("Constructor", () => {});

  describe("Static Methods", () => {});

  describe("Instance Methods", () => {

    describe("add", () => {});

    describe("poll", () => {});

    describe("replace", () => {
      it("should replace the root element and maintain heap property", () => {
        const heap = new Heap([2,7,5,10,8,3]);
        const replaced = heap.replace(6);
        expect(replaced).toBe(2);
        expect(heap.peek()).toBe(3);
      });
    });
  });
});