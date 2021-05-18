import { fullWidthAlphabet2HalfWidthAlphabet, isFullWidthAlphabetical, isKanjiNumeric, kanji2Arabic } from "../src"

describe("kanji2Arabic", function () {
  it.each`
    input | expected
    ${"〇"} | ${"0"}
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
    expect(kanji2Arabic(input)).toBe(expected)
  })

  it("no middle numbers", () => {
    expect(kanji2Arabic("一二三四五六七八九〇")).toBe("1234567890")
  })

  it.each`
    input | expected
    ${"五千四百三十二"} | ${"5432"}
    ${"千百十一"} | ${"1111"}
    ${"五千"} | ${"5000"}
    ${"五千三十"} | ${"5030"}
    ${"五百一"} | ${"501"}
  `("with middle numbers [$input -> $expected]", ({input, expected}) => {
    expect(kanji2Arabic(input)).toBe(expected)
  })

  it.each`
    input | expected
    ${"九千八百七十六兆五千四百三十二億九千八百七十六万五千四百三十二"} | ${"9876543298765432"}
    ${"九千八百七十六兆五千四百三十二"} | ${"9876000000005432"}
    ${"九千京一"} | ${"90000000000000000001"}
    ${"九千極"} | ${"9000000000000000000000000000000000000000000000000000"}
  `("with large numbers [$input -> $expected]", ({input, expected}) => {
    expect(kanji2Arabic(input)).toBe(expected)
  })

  describe("error cases", () => {
    it.each`
      input | expectedMessage
      ${"あ"} | ${"includes non-numeric characters"}
      ${"三百、二十"} | ${"includes non-numeric characters"}
    `("include non-numeric characters [$input -> $expectedMessage]", ({input, expectedMessage}) => {
      try {
        kanji2Arabic(input)
        fail("should not reach here")
      } catch (e) {
        expect(e.message).toBe(expectedMessage)
      }
    })

    it.each`
      input | expectedMessage
      ${"四五千"} | ${"unable to parse 四五千"}
      ${"五千四三百"} | ${"unable to parse 四三百"}
      ${"五千四百三二十"} | ${"unable to parse 三二十"}
      ${"五千四百三十二一"} | ${"unable to parse 二一"}
    `("unparsable factor [$input -> $expectedMessage]", ({input, expectedMessage}) => {
      try {
        kanji2Arabic(input)
        fail("should not reach here")
      } catch (e) {
        expect(e.message).toBe(expectedMessage)
      }
    })

    it.each`
      input | expectedMessage
      ${"五千五千"} | ${"unable to parse 五千"}
      ${"五千四百四百"} | ${"unable to parse 四百"}
      ${"五千四百三十三十"} | ${"unable to parse 三十"}
      ${"四百五千"} | ${"unable to parse 四百五千"}
      ${"五千三十四百"} | ${"unable to parse 三十四百"}
    `("invalid middle numbers [$input -> $expectedMessage]", ({input, expectedMessage}) => {
      try {
        kanji2Arabic(input)
        fail("should not reach here")
      } catch (e) {
        expect(e.message).toBe(expectedMessage)
      }
    })
  })
})

describe("isKanjiNumeric", function () {
  it.each`
    input | expected
    ${"〇一二三四五六七八九"} | ${true}
    ${"極載正澗溝穣𥝱垓京兆億万千百十"} | ${true}
    ${"あ"} | ${false}
    ${"123"} | ${false}
  `("input: $input, expected: $expected", ({input, expected}) => {
    expect(isKanjiNumeric(input)).toBe(expected)
  })
})

describe("fullWidthAlphabet2HalfWidthAlphabet", function () {
  it("happy path", () => {
    expect(fullWidthAlphabet2HalfWidthAlphabet(
      "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"
    )).toBe(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    )
  })

  it("include non-full-width-alphabetical characters", () => {
    try {
      fullWidthAlphabet2HalfWidthAlphabet("aA")
      fail("should not reach here")
    } catch (e) {
      expect(e.message).toBe("includes non-full-width-alphabetical characters")
    }
  })
})

describe("isFullWidthAlphabetical", function () {
  it.each`
    input | expected
    ${"ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ"} | ${true}
    ${"ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"} | ${true}
    ${"a"} | ${false}
    ${"z"} | ${false}
    ${"A"} | ${false}
    ${"Z"} | ${false}
    ${"＠"} | ${false}
    ${"［"} | ${false}
    ${"｀"} | ${false}
    ${"｛"} | ${false}
  `("input: $input, expected: $expected", ({input, expected}) => {
    expect(isFullWidthAlphabetical(input)).toBe(expected)
  })
})
