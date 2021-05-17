# japanese-numeral-utils

Utilities for handling Japanese numerals.

## Installation

```shell
$ npm install @leonsk32/japanese-numeral-utils --save
```

## Usage

```javascript
import { kanji2Arabic } from "@leonsk32/japanese-numeral-utils";

console.log(kanji2Arabic("九千八百七十六兆五千四百三十二億九千八百七十六万五千四百三十二"));
// "9876543298765432"

console.log(kanji2Arabic("一二三四五六七八九〇"));
// "1234567890"
```
