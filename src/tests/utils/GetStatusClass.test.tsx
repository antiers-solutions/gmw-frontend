import { getStatusClass, getStatusName } from "../../helper/getStatusClass";

describe("getStatusClass Test", () => {
  test("getStatusClass", async () => {
    expect(getStatusClass("active")).toBe("yellow");
    expect(getStatusClass("in-progress")).toBe("yellow");
    expect(getStatusClass("in-review")).toBe("yellow");
    expect(getStatusClass("complete")).toBe("green");
    expect(getStatusClass("accepted")).toBe("green");
    expect(getStatusClass("completed")).toBe("green");
    expect(getStatusClass("hold")).toBe("red");
    expect(getStatusClass("rejected")).toBe("red");
    expect(getStatusClass("reject")).toBe("purple");
  });
});

describe("getStatusName Test", () => {
  test("getStatusName", async () => {
    expect(getStatusName("active")).toBe("In-Progress");
    expect(getStatusName("complete")).toBe("Completed");
    expect(getStatusName("hold")).toBe("Hold");
    expect(getStatusName("reject")).toBe("Rejected");
  });
});
