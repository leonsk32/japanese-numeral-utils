import { chinese2Arabic } from "../src"

describe("chinese2Arabic", function () {
  it.each`
    input | expected
    ${"一"} | ${"1"}
    ${"二"} | ${"2"}
    ${"三"} | ${"3"}
    ${"四"} | ${"4"}
    ${"五"} | ${"5"}
    ${"六"} | ${"6"}
    ${"七"} | ${"7"}
    ${"八"} | ${"8"}
    ${"九"} | ${"9"}
  `("one digit [$input -> $expected]", ({input, expected}) => {
    expect(chinese2Arabic(input)).toBe(expected)
  })
})
