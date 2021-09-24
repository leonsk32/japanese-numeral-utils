# japanese-numeral-utils

Utilities for handling Japanese numerals.

[![Latest NPM release](https://img.shields.io/npm/v/@leonsk32/japanese-numeral-utils.svg)](https://www.npmjs.com/package/@leonsk32/japanese-numeral-utils)
![MIT License](https://img.shields.io/npm/l/@leonsk32/japanese-numeral-utils.svg)

## Installation

```shell
$ npm install @leonsk32/japanese-numeral-utils --save
```

## Usage

```javascript
import { 
  fullWidthAlphabet2HalfWidthAlphabet,
  isFullWidthAlphabetical,
  isKanjiNumeric,
  kanji2Arabic,
  halfWidthText2FullWidthText
} from "@leonsk32/japanese-numeral-utils";

console.log(kanji2Arabic("九千八百七十六兆五千四百三十二億九千八百七十六万五千四百三十二"));
// "9876543298765432"

console.log(kanji2Arabic("一二三四五六七八九〇"));
// "1234567890"

console.log(isKanjiNumeric("〇一二三四五六七八九"));
// true

console.log(isKanjiNumeric("123"));
// false

console.log(fullWidthAlphabet2HalfWidthAlphabet("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ"));
// "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

console.log(isFullWidthAlphabetical("ＡＢＣａｂｃ"));
// true

console.log(isFullWidthAlphabetical("abcABC"));
// false

console.log(halfWidthText2FullWidthText("ｱｶｻABCz123abc"))
// アカサＡＢＣｚ１２３ａｂｃ
```
