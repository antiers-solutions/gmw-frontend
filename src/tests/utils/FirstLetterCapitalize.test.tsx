import { firstLetterCapitalize } from "../../helper/firstLetterCapitalize";

describe("firstLetterCapitalize Test", () => {
  test("firstLetterCapitalize", async () => {
    expect(firstLetterCapitalize("jatin")).toBe("Jatin");
  });
});
