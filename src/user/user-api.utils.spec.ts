import { decodeUsers, decodeUser } from "./user-api.utils";
import { User } from "./user.types";

describe("decodeUsers ", () => {
  it("should return error when the payload is wrong ", () => {
    const payload = "wrongPayload";

    const res = decodeUsers(payload);

    return expect(res).toEqual({
      error: {
        data: {
          isError: true,
          message: "Users not valid",
          status: 200,
          type: "AdapterError",
        },
        status: 200,
      },
    });
  });

  it("should return value if correct", () => {
    const payload: readonly User[] = [
      { name: "luigi", friendIds: [], id: "id" },
      { name: "Ciro", friendIds: [], id: "id1" },
    ];

    const res = decodeUsers(payload);

    return expect(res).toEqual({
      data: [
        { name: "luigi", friendIds: [], id: "id" },
        { name: "Ciro", friendIds: [], id: "id1" },
      ],
    });
  });
});

describe("decodeUser ", () => {
  it("should return error when the payload is wrong ", () => {
    const payload = "wrongPayload";

    const res = decodeUser(payload);

    return expect(res).toEqual({
      error: {
        data: {
          isError: true,
          message: "User not valid",
          status: 200,
          type: "AdapterError",
        },
        status: 200,
      },
    });
  });

  it("should return value if correct", () => {
    const payload: User = { name: "luigi", friendIds: [], id: "id" };

    const res = decodeUser(payload);

    return expect(res).toEqual({
      data: {
        name: "luigi",
        friendIds: [],
        id: "id",
      },
    });
  });
});
