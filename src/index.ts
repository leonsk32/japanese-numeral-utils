export function chinese2Arabic(text: string) {
  validate(text)

  if (isSmallNumberOnly(text)) {
    return getArabicNumbersFromSmallNumberOnlyText(text)
  }

  return parseLargeNumbers(text, largeNumbersList).replace(/^0+/, "")
}

function validate(text: string) {
  if (!text.match(
    new RegExp(`^[${allNumbersList.join("")}]+$`)
  )) {
    throw TypeError("includes non-numeric characters")
  }
}

function isSmallNumberOnly(text: string) {
  return text.match(
    new RegExp(`^[${smallNumbersList.join("")}]+$`)
  )
}

function getArabicNumbersFromSmallNumberOnlyText(text: string) {
  return text.split("").map(e => smallNumbersMap[e]).join("")
}

function parseLargeNumbers(text: string, largeNumberList: string[]): string {
  if (largeNumberList.length === 0) {
    return parseMiddleNumbers(text, middleNumbersList).toString().padStart(4, "0")
  }

  const matchResult = text.match(new RegExp(largeNumberList[0]))

  if (!matchResult) {
    return "0000" + parseLargeNumbers(
      text,
      largeNumberList.slice(1)
    )
  }

  const matchedIndex = matchResult.index

  return parseMiddleNumbers(text.substring(0, matchedIndex), middleNumbersList)
      .toString().padStart(4, "0")
    + parseLargeNumbers(
      text.substring(matchedIndex! + 1),
      largeNumberList.slice(1),
    )
}

function parseMiddleNumbers(text: string, middleNumberList: string[]): string {
  if (middleNumberList.length === 0) {
    if (text.length === 0) {
      return "0"
    } else if (text.length === 1) {
      return smallNumbersMap[text]
    } else {
      throw TypeError(`unable to parse ${text}`)
    }
  }

  const matchResult = text.match(new RegExp(middleNumberList[0]))

  if (!matchResult) {
    return "0" + parseMiddleNumbers(
      text,
      middleNumberList.slice(1)
    )
  }

  const matchedIndex = matchResult.index

  if (matchedIndex! > 1) {
    throw TypeError(`unable to parse ${text}`)
  }

  return (matchedIndex === 0 ? 1 : smallNumbersMap[(text.charAt(0))])
    + parseMiddleNumbers(
      text.substring(matchedIndex! + 1),
      middleNumberList.slice(1),
    )
}

const smallNumbersMap: Record<string, string> = {
  "〇": "0",
  "一": "1",
  "二": "2",
  "三": "3",
  "四": "4",
  "五": "5",
  "六": "6",
  "七": "7",
  "八": "8",
  "九": "9",
}

const smallNumbersList: string[] = Object.keys(smallNumbersMap)

const middleNumbersList: string[] = [
  "千",
  "百",
  "十",
]

const largeNumbersList: string[] = [
  "極",
  "載",
  "正",
  "澗",
  "溝",
  "穣",
  "𥝱",
  "垓",
  "京",
  "兆",
  "億",
  "万",
]

const allNumbersList: string[] = smallNumbersList.concat(middleNumbersList, largeNumbersList)
