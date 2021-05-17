export function chinese2Arabic(text: string) {
  const middleNumbers = Object.keys(middleNumbersMap)
  const matchResult = text.match(
    new RegExp("[" + middleNumbers.join("") + "]")
  )

  if (!matchResult) {
    return getArabicNumbersFromSmallNumberOnlyText(text)
  }

  return parseMiddleNumbers(middleNumbers, text).toString()
}

function getArabicNumbersFromSmallNumberOnlyText(text: string) {
  return text.split("").map(e => chinese2ArabicMap[e]).join("")
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
  const matchedLargeNumber = matchResult[0]

  let factor
  if (matchedIndex == 0) {
    factor = 1
  } else if (matchedIndex == 1) {
    const chineseFactor = text.split(matchedLargeNumber)[0]
    factor = chinese2ArabicMap[chineseFactor]
  } else {
    throw TypeError(`unable to parse ${text}`)
  }

  return factor * middleNumbersMap[matchedLargeNumber]
    + parseMiddleNumbers(
      middleNumbers.filter(value => value !== matchedLargeNumber),
      text.substring(matchedIndex + 1)
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
  "十": 10,
  "百": 100,
  "千": 1000,
}

