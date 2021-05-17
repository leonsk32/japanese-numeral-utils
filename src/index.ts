export function chinese2Arabic(text: string) {
  return chinese2ArabicMap[text].toString()
}

const chinese2ArabicMap: Record<string, number> = {
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
