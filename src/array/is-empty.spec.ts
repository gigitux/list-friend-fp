import { isEmpty } from "./is-empty";

describe("isEmpty ", () => {
  it("should return false when array is not empty", () => {
    const array = [1, 2];

    return expect(isEmpty(array)).toBe(false);
  });

  it("should return true when array is empty", () => {
    const array: readonly string[] = [];

    return expect(isEmpty(array)).toBe(true);
  });
});
