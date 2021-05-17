export function chinese2Arabic(text: string) {
  if (!text.match(
    new RegExp(`[${largeNumbersList.concat(middleNumbersList).join("")}]`)
  )) {
    return getArabicNumbersFromSmallNumberOnlyText(text)
  }

  return parseLargeNumbers(text, largeNumbersList).replace(/^0+/, "")
}

function getArabicNumbersFromSmallNumberOnlyText(text: string) {
  return text.split("").map(e => chinese2ArabicMap[e]).join("")
}

function parseLargeNumbers(text: string, largeNumberList: string[]): string {
  if (largeNumberList.length === 0) {
    return parseMiddleNumbers(middleNumbersList, text).toString().padStart(4, "0")
  }

  const targetLargeNumber = largeNumberList[0]
  const matchResult = text.match(new RegExp(targetLargeNumber))

  if (!matchResult) {
    return "0000" + parseLargeNumbers(
      text,
      largeNumberList.slice(1)
    )
  }

  const matchedIndex = matchResult.index

  return parseMiddleNumbers(middleNumbersList, text.substring(0, matchedIndex))
      .toString().padStart(4, "0")
    + parseLargeNumbers(
      text.substring(matchedIndex! + 1),
      largeNumberList.slice(1),
    )
}

function parseMiddleNumbers(middleNumbers: string[], text: string): number {
  if (text === "") {
    return 0
  }

  const middleNumbersRegex = new RegExp("[" + middleNumbers.join("") + "]")
  const matchResult = text.match(middleNumbersRegex)

  if (!matchResult) {
    if (text.length !== 1) {
      throw TypeError(`unable to parse ${text}`)
    }

    const value = chinese2ArabicMap[text]
    if (value === undefined) {
      throw TypeError(`unable to parse ${text}`)
    }

    return value
  }

  const matchedIndex = matchResult.index
  const matchedMiddleNumber = matchResult[0]

  if (matchedIndex! > 1) {
    throw TypeError(`unable to parse ${text}`)
  }

  const factor = matchedIndex === 0 ? 1 : chinese2ArabicMap[(text.charAt(0))]

  return factor * middleNumbersMap[matchedMiddleNumber]
    + parseMiddleNumbers(
      middleNumbers.slice(middleNumbers.findIndex(n => n === matchedMiddleNumber) + 1),
      text.substring(matchedIndex! + 1)
    )
}

const chinese2ArabicMap: Record<string, number> = {
  "〇": 0,
  "一": 1,
  "二": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6,
  "七": 7,
  "八": 8,
  "九": 9,
}

const middleNumbersMap: Record<string, number> = {
  "千": 1000,
  "百": 100,
  "十": 10,
}

const middleNumbersList = Object.keys(middleNumbersMap)

const largeNumbersList: string[] = [
  "京",
  "兆",
  "億",
  "万",
]

