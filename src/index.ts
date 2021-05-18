export function kanji2Arabic(text: string): string {
  if (!isKanjiNumeric(text)) {
    throw TypeError("includes non-numeric characters")
  }

  if (isSmallNumberOnly(text)) {
    return parseSmallNumbersOnly(text)
  }

  return parseLargeNumbers(text, largeNumbersList).replace(/^0+/, "")
}

export function isKanjiNumeric(text: string): boolean {
  return !!text.match(
    new RegExp(`^[${allNumbersList.join("")}]+$`)
  )
}

export function fullWidthAlphabet2HalfWidthAlphabet(text: string): string {
  if (!isFullWidthAlphabetical(text)) {
    throw TypeError("includes non-full-width-alphabetical characters")
  }

  let result = ""
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) - 65248)
  }
  return result
}

export function isFullWidthAlphabetical(text: string): boolean {
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i)
    if (
      !isUpperCaseFullWidthAlphabetical(charCode) &&
      !isLowerCaseFullWidthAlphabetical(charCode)
    ) {
      return false
    }
  }
  return true
}

function isUpperCaseFullWidthAlphabetical(charCode: number) {
  return charCode > 65312 && charCode < 65339
}

function isLowerCaseFullWidthAlphabetical(charCode: number) {
  return charCode > 65344 && charCode < 65371
}

function isSmallNumberOnly(text: string) {
  return text.match(
    new RegExp(`^[${smallNumbersList.join("")}]+$`)
  )
}

function parseSmallNumbersOnly(text: string) {
  return text.split("").map(e => convertSmallNumber(e)).join("")
}

function parseLargeNumbers(text: string, largeNumberList: string[]): string {
  if (largeNumberList.length === 0) {
    return parseMiddleNumbers(text, middleNumbersList)
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
      return convertSmallNumber(text)
    }

    throw TypeError(`unable to parse ${text}`)
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

  return (matchedIndex === 0 ? 1 : convertSmallNumber(text.charAt(0)))
    + parseMiddleNumbers(
      text.substring(matchedIndex! + 1),
      middleNumberList.slice(1),
    )
}

function convertSmallNumber(text: string): string {
  const result = smallNumbersMap[text]
  if (!result) {
    throw TypeError(`unable to convert ${text}`)
  }
  return result
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

export const smallNumbersList: string[] = Object.keys(smallNumbersMap)

export const middleNumbersList: string[] = [
  "千",
  "百",
  "十",
]

export const largeNumbersList: string[] = [
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
