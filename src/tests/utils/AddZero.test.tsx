import { addZero } from "../../helper/addZero";

describe("addZero Test", () => {
  test("addZero", async () => {
    expect(addZero(1)).toBe("01");
  });
});
