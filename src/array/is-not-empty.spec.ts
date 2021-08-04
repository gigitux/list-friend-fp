import { isNotEmpty } from "./is-not-empty";

describe("isNotEmpty ", () => {
  it("should return true when array is not empty", () => {
    const array = [1, 2];

    return expect(isNotEmpty(array)).toBe(true);
  });

  it("should return false when array is empty", () => {
    const array: readonly string[] = [];

    return expect(isNotEmpty(array)).toBe(false);
  });
});
