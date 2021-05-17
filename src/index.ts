export function chinese2Arabic(text: string) {
  let result = ""
  text.split("").forEach(e => {
    result = result + chinese2ArabicMap[e].toString()
  })

  return result
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
