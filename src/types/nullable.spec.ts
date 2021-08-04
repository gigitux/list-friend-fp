import { isNil, isNotNil } from "./nullable.guards";

describe("isNil function ", () => {
  it("should return true with null value", () => {
    return expect(isNil(null)).toEqual(true);
  });

  it("should return true with undefined value", () => {
    return expect(isNil(undefined)).toEqual(true);
  });

  it("should return true with undefined value", () => {
    return expect(isNil(undefined)).toEqual(true);
  });

  it("should return false with a value", () => {
    return expect(isNil("string")).toEqual(false);
  });
});

describe("isNotNil function ", () => {
  it("should return false with null value", () => {
    return expect(isNotNil(null)).toEqual(false);
  });

  it("should return false with undefined value", () => {
    return expect(isNotNil(undefined)).toEqual(false);
  });

  it("should return true with a value", () => {
    return expect(isNotNil("string")).toEqual(true);
  });
});
