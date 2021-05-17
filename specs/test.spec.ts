import { chinese2Arabic } from "../src"

describe("chinese2Arabic", function () {
  it("For sentences that do not contain numbers, return the original text as is.", () => {
   expect(chinese2Arabic("こんにちは。")).toBe("こんにちは。")
  })
})
