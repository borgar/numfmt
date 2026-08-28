
<a name="readmemd"></a>

# numfmt

The numfmt library formats numbers according to a specifier string as defined in ECMA-376.
The library tries its best to emulate the inns and outs of what the Excel spreadsheet
software does.

## Type Aliases

- [DayNames](#type-aliasesdaynamesmd)
- [FormatDateInfo](#type-aliasesformatdateinfomd)
- [FormatInfo](#type-aliasesformatinfomd)
- [FormatOptions](#type-aliasesformatoptionsmd)
- [LocaleData](#type-aliaseslocaledatamd)
- [LocaleToken](#type-aliaseslocaletokenmd)
- [MonthNames](#type-aliasesmonthnamesmd)
- [ParseDataBool](#type-aliasesparsedataboolmd)
- [ParseDataNum](#type-aliasesparsedatanummd)
- [Token](#type-aliasestokenmd)
- [TokenType](#type-aliasestokentypemd)

## Functions

- [addLocale](#functionsaddlocalemd)
- [dateFromSerial](#functionsdatefromserialmd)
- [dateToSerial](#functionsdatetoserialmd)
- [dec2frac](#functionsdec2fracmd)
- [format](#functionsformatmd)
- [formatColor](#functionsformatcolormd)
- [getFormatDateInfo](#functionsgetformatdateinfomd)
- [getFormatInfo](#functionsgetformatinfomd)
- [getLocale](#functionsgetlocalemd)
- [isDateFormat](#functionsisdateformatmd)
- [isPercentFormat](#functionsispercentformatmd)
- [isTextFormat](#functionsistextformatmd)
- [isValidFormat](#functionsisvalidformatmd)
- [listLocales](#functionslistlocalesmd)
- [parseBool](#functionsparseboolmd)
- [parseDate](#functionsparsedatemd)
- [parseLocale](#functionsparselocalemd)
- [parseNumber](#functionsparsenumbermd)
- [parseTime](#functionsparsetimemd)
- [parseValue](#functionsparsevaluemd)
- [round](#functionsroundmd)
- [tokenize](#functionstokenizemd)


<a name="functionsaddlocalemd"></a>

# addLocale()

```ts
function addLocale(localeSettings: Partial<LocaleData>, l4e: string | LocaleToken): LocaleData;
```

Register locale data for a language to use when formatting.

Any partial set of properties may be provided to have the defaults used where properties are missing.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `localeSettings` | `Partial`\<[`LocaleData`](#type-aliaseslocaledatamd)\> | A collection of settings for a locale. |
| `l4e` | `string` \| [`LocaleToken`](#type-aliaseslocaletokenmd) | A string BCP 47 tag of the locale. |

## Returns

[`LocaleData`](#type-aliaseslocaledatamd)

A full collection of settings for a locale


<a name="functionsdatefromserialmd"></a>

# dateFromSerial()

```ts
function dateFromSerial(serialDate: number, options?: {
  leap1900?: boolean;
}): [number, number, number, number, number, number];
```

Convert a spreadsheet serial date to an array of date parts.
Accurate to a second.

```js
// output as [ Y, M, D, h, m, s ]
dateFromSerial(28627); // [ 1978, 5, 17, 0, 0, 0 ]
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serialDate` | `number` | The date |
| `options?` | \{ `leap1900?`: `boolean`; \} | Options for this method |
| `options.leap1900?` | `boolean` | Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year). True by default. |

## Returns

\[`number`, `number`, `number`, `number`, `number`, `number`\]

An array of date parts with parts in descending order: [ year, month, day, hour, minute, second ]


<a name="functionsdatetoserialmd"></a>

# dateToSerial()

```ts
function dateToSerial(date: number[] | Date, options?: {
  ignoreTimezone?: boolean;
}): number | undefined;
```

Convert a native JavaScript Date, or an array of date parts to an spreadsheet serial date.

Returns a serial date number if input was a Date object or an array of
numbers, else an undefined.

```js
// input as Date
dateToSerial(new Date(1978, 5, 17)); // 28627
// input as [ Y, M, D, h, m, s ]
dateToSerial([ 1978, 5, 17 ]); // 28627
// other input
dateToSerial("something else"); // undefined
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `number`[] \| `Date` | A Date instance or an array of date parts in descending order. |
| `options?` | \{ `ignoreTimezone?`: `boolean`; \} | Options for this method |
| `options.ignoreTimezone?` | `boolean` | Normally time zone will be taken into account. This makes the conversion to serial date ignore the timezone offset. |

## Returns

`number` \| `undefined`

The date as a spreadsheet serial date, or undefined.


<a name="functionsdec2fracmd"></a>

# dec2frac()

```ts
function dec2frac(
   number: number, 
   numeratorMaxDigits?: number, 
   denominatorMaxDigits?: number): [number, number];
```

Split a fractional number into a numerator and denominator for display as
vulgar fractions.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `number` | `number` | `undefined` | The value to split |
| `numeratorMaxDigits?` | `number` | `2` | Maximum digits the numerator may have. |
| `denominatorMaxDigits?` | `number` | `2` | Maximum digits the denominator may have. |

## Returns

\[`number`, `number`\]

Tuple of two numbers, numerator and denominator.


<a name="functionsformatmd"></a>

# format()

```ts
function format(
   pattern: string, 
   value: any, 
   options?: Partial<FormatOptions>): string;
```

Formats a value as a string and returns the result.

- Dates are normalized to spreadsheet style serial dates and then formatted.
- Booleans are emitted as uppercase `TRUE` or `FALSE` by default, but will
  be subject to locale (see [LocaleData](#type-aliaseslocaledatamd)).
- `null` and `undefined` will return an empty string `""`.
- Any non number values will be stringified and passed through the text section of the format pattern.
- `NaN`s and `Infinite`s will use the corresponding strings from the active locale.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |
| `value` | `any` | The value to format. |
| `options?` | `Partial`\<[`FormatOptions`](#type-aliasesformatoptionsmd)\> | Formatter options |

## Returns

`string`

A formatted value


<a name="functionsformatcolormd"></a>

# formatColor()

```ts
function formatColor(
   pattern: string, 
   value: any, 
   options?: {
  ignoreTimezone?: boolean;
  indexColors?: boolean;
  throws?: boolean;
}): string | number | undefined;
```

Find the color appropriate to a value as dictated by a format pattern.

If the pattern defines colors, this function will emit the color appropriate
to the value. If no colors were specified this function returns `undefined`.

```js
const color = formatColor("[green]#,##0;[red]-#,##0", -10);
console.log(color); // "red"
const color = formatColor("[green]#,##0;-#,##0", -10);
console.log(color); // undefined
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |
| `value` | `any` | The value to format. |
| `options?` | \{ `ignoreTimezone?`: `boolean`; `indexColors?`: `boolean`; `throws?`: `boolean`; \} | Formatter options |
| `options.ignoreTimezone?` | `boolean` | Normally when date objects are used with the formatter, time zone is taken into account. This makes the formatter ignore the timezone offset. `false` by default. |
| `options.indexColors?` | `boolean` | When indexed color modifiers are used (`[Color 1]`) the formatter will convert the index into the corresponding hex color of the default palette. When this option is set to false, the number will instead by emitted allowing you to index against a custom palette. `true` by default. |
| `options.throws?` | `boolean` | Should the formatter throw an error if a provided pattern is invalid. If false, a formatter will be constructed which instead outputs an error string (see _invalid_ in [FormatOptions](#type-aliasesformatoptionsmd)). `true` by default. |

## Returns

`string` \| `number` \| `undefined`

A string color value as described by the pattern or a number if the
   indexColors option has been set to false.


<a name="functionsgetformatdateinfomd"></a>

# getFormatDateInfo()

```ts
function getFormatDateInfo(pattern: string): FormatDateInfo;
```

Gets information about how date codes are used in a format string.

Note that output will always be a format info, even in the case where the
format pattern is invalid and would cause the formatter to throw.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

[`FormatDateInfo`](#type-aliasesformatdateinfomd)

An object of format date properties.


<a name="functionsgetformatinfomd"></a>

# getFormatInfo()

```ts
function getFormatInfo(pattern: string, options?: {
  currency?: string;
}): FormatInfo;
```

Returns an object detailing the properties and internals of a format parsed
format pattern.

Note that output will always be a format info, even in the case where the
format pattern is invalid and would cause the formatter to throw.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |
| `options?` | \{ `currency?`: `string`; \} | Options for the method |
| `options.currency?` | `string` | Limit the patterns identified as currency to those that use the give string. If nothing is provided, patterns will be tagged as currency if one of the following currency symbols is used: `¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿` |

## Returns

[`FormatInfo`](#type-aliasesformatinfomd)

An object of format properties.


<a name="functionsgetlocalemd"></a>

# getLocale()

```ts
function getLocale(locale: string | number): LocaleData | undefined;
```

Used by the formatter to pull a locate from its registered locales. If
subtag isn't available but the base language is, the base language is used:
So if `en-CA` is not found, the formatter tries to find `en` else it
returns `undefined`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale` | `string` \| `number` | A BCP 47 string tag of the locale, or an Excel locale code. |

## Returns

[`LocaleData`](#type-aliaseslocaledatamd) \| `undefined`

An object of locale properties if one was found.

## Throws

If the locale tag is invalid.


<a name="functionsisdateformatmd"></a>

# isDateFormat()

```ts
function isDateFormat(pattern: string): boolean;
```

Determine if a given format pattern is a date pattern.

The pattern is considered a date pattern if any of its sections (`"a;b;c;d"`)
contains a date operator (such as `Y` or `H`). Each section is restricted to be
_either_ a number or date format.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`boolean`

True if the specified pattern is a date pattern, False otherwise.


<a name="functionsispercentformatmd"></a>

# isPercentFormat()

```ts
function isPercentFormat(pattern: string): boolean;
```

Determine if a given format pattern is a percentage pattern.

The pattern is considered a percentage pattern if any of its sections (`"a;b;c;d"`)
contains an unescaped percentage symbol.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`boolean`

True if the specified pattern is a percent pattern, False otherwise.


<a name="functionsistextformatmd"></a>

# isTextFormat()

```ts
function isTextFormat(pattern: string): boolean;
```

Determine if a given format pattern is a text only pattern.

The pattern is considered text only if its definition is composed of a single
section that includes that text symbol (`@`).

For example `@` or `@" USD"` are text patterns but `#;@` is not.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`boolean`

True if the specified pattern is a text pattern, False otherwise.


<a name="functionsisvalidformatmd"></a>

# isValidFormat()

```ts
function isValidFormat(pattern: string): boolean;
```

Determine if a given format pattern is valid.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`boolean`

True if the specified pattern is valid, False otherwise.


<a name="functionslistlocalesmd"></a>

# listLocales()

```ts
function listLocales(): string[];
```

Get a list of locales that are registered with the formatter.

## Returns

`string`[]

A list of locale tags


<a name="functionsparseboolmd"></a>

# parseBool()

```ts
function parseBool(value: string, options?: {
  locale?: string;
}): ParseDataBool | undefined;
```

Parse a string input and return its equivalent boolean value. If the input was not
recognized or valid, the function returns an `undefined`, for valid input it
returns an object with a single property:

- `v`: the parsed value.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The supposed boolean to parse |
| `options?` | \{ `locale?`: `string`; \} | Options for the parser |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

[`ParseDataBool`](#type-aliasesparsedataboolmd) \| `undefined`

An object of the parsed value


<a name="functionsparsedatemd"></a>

# parseDate()

```ts
function parseDate(value: string, options?: {
  locale?: string;
}): ParseDataNum | undefined;
```

Parse a date or datetime string input and return its value and format. If
the input was not recognized or valid, the function returns an `undefined`, for
valid input it returns an object with two properties:

- `v`: the parsed value.
- `z`: the number format of the input (if applicable).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The string to parse |
| `options?` | \{ `locale?`: `string`; \} | Options for the parser |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

[`ParseDataNum`](#type-aliasesparsedatanummd) \| `undefined`

An object of the parsed value and a corresponding format string


<a name="functionsparselocalemd"></a>

# parseLocale()

```ts
function parseLocale(locale: string): LocaleToken;
```

Parse a regular IETF BCP 47 locale tag (`en-US`) and emit an object of its parts.
Irregular tags and subtags are not supported.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale` | `string` | A BCP 47 string tag of the locale. |

## Returns

[`LocaleToken`](#type-aliaseslocaletokenmd)

An object describing the locale.

## Throws

If the locale tag is invalid.


<a name="functionsparsenumbermd"></a>

# parseNumber()

```ts
function parseNumber(value: string, options?: {
  locale?: string;
}): ParseDataNum | undefined;
```

Parse a numeric string input and return its value and format. If the input
was not recognized or valid, the function returns an `undefined`, for valid input
it returns an object with two properties:

* `v`: the parsed value.
* `z`: the number format of the input (if applicable).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The number to parse |
| `options?` | \{ `locale?`: `string`; \} | Options for the parser |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

[`ParseDataNum`](#type-aliasesparsedatanummd) \| `undefined`

An object of the parsed value and a corresponding format string


<a name="functionsparsetimemd"></a>

# parseTime()

```ts
function parseTime(value: string, options?: {
  locale?: string;
}): ParseDataNum | undefined;
```

Parse a time string input and return its value and format. If the input was
not recognized or valid, the function returns an `undefined`, for valid input it
returns an object with two properties:

- `v`: the parsed value.
- `z`: the number format of the input (if applicable).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The string to parse |
| `options?` | \{ `locale?`: `string`; \} | Options for the parser |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

[`ParseDataNum`](#type-aliasesparsedatanummd) \| `undefined`

An object of the parsed value and a corresponding format string


<a name="functionsparsevaluemd"></a>

# parseValue()

```ts
function parseValue(value: string, options?: {
  locale?: string;
}): 
  | ParseDataNum
  | ParseDataBool
  | undefined;
```

Attempt to parse a "spreadsheet input" string input and return its value and
format. If the input was not recognized or valid, the function returns an
`undefined`, for valid input it returns an object with two properties:

- `v`: The parsed value. For dates, this will be an Excel style serial date.
- `z`: (Optionally) the number format string of the input. This property will
       not be present if it amounts to the `General` format.

`parseValue()` recognizes a wide range of dates and date-times, times,
numbers, and booleans. Some examples:

```js
// basic number
parseValue("-123");// { v: -123 }
// formatted number
parseValue("$1,234"); // { v: 1234, z: "$#,##0" }
// a percent
parseValue("12.3%"); // { v: 0.123, z: "0.00%" }
// a date
parseValue("07 October 1984"); // { v: 30962, z: 'dd mmmm yyyy' }
// an ISO formatted date-time
parseValue("1984-09-10 11:12:13.1234"); // { v: 30935.46681855787, z: "yyyy-mm-dd hh:mm:ss" }
// a boolean
parseValue("false"); // { v: false }
```

The formatting string outputted may not correspond exactly to the input.
Rather, is it composed of certain elements which the input controls. This is
comparable to how Microsoft Excel and Google Sheets parse pasted input. Some
things you may expect:

- Whitespace is ignored.
- Decimal fractions are always represented by `.00` regardless of how many
  digits were shown in the input.
- Negatives denoted by parentheses [`(1,234)`] will not include the
  parentheses in the format string (the value will still be negative.)
- All "scientific notation" returns the same format: `0.00E+00`.

Internally the parser calls, `parseNumber`, `parseDate`,
`parseTime` and `parseBool`. They work in the same way except
with a more limited scope. You may prefer those functions if you are limiting
input to a smaller scope.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The value to parse |
| `options?` | \{ `locale?`: `string`; \} | Options for the parser |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#functionsaddlocalemd)) |

## Returns

  \| [`ParseDataNum`](#type-aliasesparsedatanummd)
  \| [`ParseDataBool`](#type-aliasesparsedataboolmd)
  \| `undefined`

An object of the parsed value and a corresponding format string


<a name="functionsroundmd"></a>

# round()

```ts
function round(number: number, places?: number): number;
```

Return a number rounded to the specified amount of places. This is the
rounding function used internally by the formatter (symmetric arithmetic
rounding). It rounds the same way Excel does.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `number` | `number` | `undefined` | The number to round. |
| `places?` | `number` | `0` | The number of decimals to round to. |

## Returns

`number`

A rounded number.


<a name="functionstokenizemd"></a>

# tokenize()

```ts
function tokenize(pattern: string): Token[];
```

Breaks a format pattern string into a list of tokens.

The returned output will be an array of objects representing the tokens:

```js
[
  { type: TOKEN_ZERO, value: '0', raw: '0' },
  { type: TOKEN_POINT, value: '.', raw: '.' },
  { type: TOKEN_ZERO, value: '0', raw: '0' },
  { type: TOKEN_PERCENT, value: '%', raw: '%' }
]
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | The format pattern |

## Returns

[`Token`](#type-aliasestokenmd)[]

A list of tokens


<a name="type-aliasesdaynamesmd"></a>

# DayNames

```ts
type DayNames = [string, string, string, string, string, string, string];
```

A list of the names of the days of the week, starting with Sunday.


<a name="type-aliasesformatdateinfomd"></a>

# FormatDateInfo

```ts
type FormatDateInfo = {
  clockType: 12 | 24;
  day: boolean;
  hours: boolean;
  minutes: boolean;
  month: boolean;
  seconds: boolean;
  year: boolean;
};
```

An object detailing which date specifiers are used in a format pattern.
See the [getFormatDateInfo](#functionsgetformatdateinfomd) method.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-clocktype"></a> `clockType` | `12` \| `24` | 12 if the pattern uses AM/PM clock else 24. |
| <a id="property-day"></a> `day` | `boolean` | true if the pattern uses day of the month else false. |
| <a id="property-hours"></a> `hours` | `boolean` | true if the pattern uses hours else false. |
| <a id="property-minutes"></a> `minutes` | `boolean` | true if the pattern uses minutes else false. |
| <a id="property-month"></a> `month` | `boolean` | true if the pattern uses months else false. |
| <a id="property-seconds"></a> `seconds` | `boolean` | true if the pattern uses seconds else false. |
| <a id="property-year"></a> `year` | `boolean` | true if the pattern uses years else false. |


<a name="type-aliasesformatinfomd"></a>

# FormatInfo

```ts
type FormatInfo = {
  code: string;
  color: 0 | 1;
  grouped: 0 | 1;
  isDate: boolean;
  isPercent: boolean;
  isText: boolean;
  level: number;
  maxDecimals: number;
  parentheses: 0 | 1;
  scale: number;
  type:   | "currency"
     | "date"
     | "datetime"
     | "error"
     | "fraction"
     | "general"
     | "grouped"
     | "number"
     | "percent"
     | "scientific"
     | "text"
     | "time";
};
```

An object of information properties based on a format pattern.
See the [getFormatInfo](#functionsgetformatinfomd) method.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-code"></a> `code` | `string` | Corresponds to Excel's `CELL("format")` functionality. It should match Excel's esoteric behaviour fairly well. [See Microsoft's documentation.](https://support.microsoft.com/en-us/office/cell-function-51bd39a5-f338-4dbe-a33f-955d67c2b2cf) |
| <a id="property-color"></a> `color` | `0` \| `1` | 1 if the format uses color on the negative portion of the string, else a 0. This replicates Excel's `CELL("color")` functionality. |
| <a id="property-grouped"></a> `grouped` | `0` \| `1` | 1 if the positive portion of the format uses a thousands separator, else a 0. |
| <a id="property-isdate"></a> `isDate` | `boolean` | Corresponds to the output from isDateFormat. |
| <a id="property-ispercent"></a> `isPercent` | `boolean` | Corresponds to the output from isPercentFormat. |
| <a id="property-istext"></a> `isText` | `boolean` | Corresponds to the output from isTextFormat. |
| <a id="property-level"></a> `level` | `number` | An arbirarty number that represents the format's specificity if you want to compare one to another. Integer comparisons roughly match Excel's resolutions when it determines which format wins out. |
| <a id="property-maxdecimals"></a> `maxDecimals` | `number` | The maximum number of decimals this format will emit. |
| <a id="property-parentheses"></a> `parentheses` | `0` \| `1` | 1 if the positive portion of the number format contains an open parenthesis, else a 0. This is replicates Excel's `CELL("parentheses")` functionality. |
| <a id="property-scale"></a> `scale` | `number` | The multiplier used when formatting the number (100 for percentages). |
| <a id="property-type"></a> `type` | \| `"currency"` \| `"date"` \| `"datetime"` \| `"error"` \| `"fraction"` \| `"general"` \| `"grouped"` \| `"number"` \| `"percent"` \| `"scientific"` \| `"text"` \| `"time"` | A string identifier for the type of the number formatter. |


<a name="type-aliasesformatoptionsmd"></a>

# FormatOptions

```ts
type FormatOptions = {
  bigintErrorNumber: boolean;
  dateErrorNumber: boolean;
  dateErrorThrows: boolean;
  dateSpanLarge: boolean;
  fillChar: string;
  grouping: [number, number] | [number];
  ignoreTimezone: boolean;
  indexColors: boolean;
  invalid: string;
  leap1900: boolean;
  locale: string | number;
  nbsp: boolean;
  overflow: string;
  skipChar: string;
  throws: boolean;
};
```

Options that control the behavior of the formatter.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-biginterrornumber"></a> `bigintErrorNumber` | `boolean` | Should the formatter switch to a plain string number format when trying to format a bigint that is out of bounds of regular JS numbers? **Default** `false` |
| <a id="property-dateerrornumber"></a> `dateErrorNumber` | `boolean` | Should the formatter emit a number when trying to format a date that is out of bounds? This is default behaviour by Google Sheets. `dateErrorThrows` overrides this setting. **Default** `true` |
| <a id="property-dateerrorthrows"></a> `dateErrorThrows` | `boolean` | Should the formatter throw an error when trying to format a date that is out of bounds? **Default** `false` |
| <a id="property-datespanlarge"></a> `dateSpanLarge` | `boolean` | Extends the allowed range of dates from Excel bounds (1900–9999) to Google Sheet bounds (0–99999). **Default** `true` |
| <a id="property-fillchar"></a> `fillChar` | `string` | When the formatter encounters `*` it normally emits nothing instead of the `*` and the next character (like Excel TEXT function does). Setting this to a character will make the formatter emit that followed by the next one. **Default** `''` |
| <a id="property-grouping"></a> `grouping` | \[`number`, `number`\] \| \[`number`\] | Integer grouping sizes. You may desire to emit numbers in standards other than the common 3 digits per group (e.g. "123,456,789"). The first grouping size is used for the least significant integer group, and the second grouping size is used for more significant groups (e.g. `[3, 2]` => "12,34,56,789"). **Default** `[ 3, 3 ]` |
| <a id="property-ignoretimezone"></a> `ignoreTimezone` | `boolean` | Normally when date objects are used with the formatter, time zone is taken into account and the date is adjusted into UTC. This option makes the formatter ignore the timezone offset. **Default** `false` |
| <a id="property-indexcolors"></a> `indexColors` | `boolean` | Automatically resolve indexed colors to hex when outputting colors (red => #f00); When indexed color modifiers are used (`[Color 1]`) the formatter will convert the index into the corresponding hex color of the default palette. When this option is set to false, the number will instead by emitted allowing you to index against a custom palette. **Default** `true` |
| <a id="property-invalid"></a> `invalid` | `string` | The string emitted when formatter fails to parse a pattern and has been instructed not to throw an error. **Default** `'######'` |
| <a id="property-leap1900"></a> `leap1900` | `boolean` | Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year). It is a requirement in the Ecma OOXML specification so it is on by default. **Default** `true` |
| <a id="property-locale"></a> `locale` | `string` \| `number` | A BCP 47 string tag or Excel [MsoLanguageID](https://docs.microsoft.com/en-us/office/vba/api/office.msolanguageid). Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) **Default** `''` |
| <a id="property-nbsp"></a> `nbsp` | `boolean` | Emit regular vs. non-breaking spaces. By default the output will use a regular space, but in many cases you may desire a non-breaking-space instead. **Default** `false` |
| <a id="property-overflow"></a> `overflow` | `string` | The string emitted when a formatter fails to format a date that is out of bounds. Both `dateErrorThrows` and `dateErrorNumber` override this setting. **Default** `'######'` |
| <a id="property-skipchar"></a> `skipChar` | `string` | When the formatter encounters `_` it normally emits a single space instead of the `_` and the next character (like Excel TEXT function does). Setting this to a character will make the formatter emit that followed by the next one. **Default** `''` |
| <a id="property-throws"></a> `throws` | `boolean` | Should the formatter throw an error if a provided pattern is invalid. If false, a formatter will be constructed which instead outputs an error string (see _invalid_ in this type). **Default** `true` |


<a name="type-aliaseslocaledatamd"></a>

# LocaleData

```ts
type LocaleData = {
  ampm: [string, string];
  bool: [string, string];
  ddd: DayNames;
  dddd: DayNames;
  decimal: string;
  exponent: string;
  group: string;
  infinity: string;
  mmm: MonthNames;
  mmm6: MonthNames;
  mmmm: MonthNames;
  mmmm6: MonthNames;
  nan: string;
  negative: string;
  percent: string;
  positive: string;
  preferMDY: boolean;
};
```

An object of properties used by a formatter when printing a number in a certain locale.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-ampm"></a> `ampm` | \[`string`, `string`\] | How AM and PM should be presented. **Default** `["AM", "PM"]` |
| <a id="property-bool"></a> `bool` | \[`string`, `string`\] | How TRUE and FALSE should be presented. **Default** `["TRUE", "FALSE"]` |
| <a id="property-ddd"></a> `ddd` | [`DayNames`](#type-aliasesdaynamesmd) | Shortened day names (`Wed`). **Default** `["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]` |
| <a id="property-dddd"></a> `dddd` | [`DayNames`](#type-aliasesdaynamesmd) | Long day names (`Wednesday`). **Default** `["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]` |
| <a id="property-decimal"></a> `decimal` | `string` | Symbol used to separate integers from fractions (usually `.`). **Default** `"."` |
| <a id="property-exponent"></a> `exponent` | `string` | Symbol used to indicate an exponent (usually `E`). **Default** `"E"` |
| <a id="property-group"></a> `group` | `string` | Symbol used as a grouping separator (`1,000,000` uses `,`). **Default** `"\u00a0"` |
| <a id="property-infinity"></a> `infinity` | `string` | Symbol used to indicate infinite values (`∞`). **Default** `"∞"` |
| <a id="property-mmm"></a> `mmm` | [`MonthNames`](#type-aliasesmonthnamesmd) | Short month names for the Gregorian calendar (`Nov`). **Default** `["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]` |
| <a id="property-mmm6"></a> `mmm6` | [`MonthNames`](#type-aliasesmonthnamesmd) | Short month names for the Islamic calendar (`Raj.`). **Default** `["Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H."]` |
| <a id="property-mmmm"></a> `mmmm` | [`MonthNames`](#type-aliasesmonthnamesmd) | Long month names for the Gregorian calendar (`November`). **Default** `["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]` |
| <a id="property-mmmm6"></a> `mmmm6` | [`MonthNames`](#type-aliasesmonthnamesmd) | Long month names for the Islamic calendar (`Rajab`). **Default** `["Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah"]` |
| <a id="property-nan"></a> `nan` | `string` | Symbol used to indicate NaN values (`NaN`). **Default** `"NaN"` |
| <a id="property-negative"></a> `negative` | `string` | Symbol used to indicate positive numbers (usually `-`). **Default** `"-"` |
| <a id="property-percent"></a> `percent` | `string` | Symbol used to indicate a percentage (usually `%`). **Default** `"%"` |
| <a id="property-positive"></a> `positive` | `string` | Symbol used to indicate positive numbers (usually `+`). **Default** `"+"` |
| <a id="property-prefermdy"></a> `preferMDY` | `boolean` | Is the prefered date format month first (12/31/2025) or day first (31/12/2025). **Default** `false` |


<a name="type-aliaseslocaletokenmd"></a>

# LocaleToken

```ts
type LocaleToken = {
  lang: string;
  language: string;
  territory: string;
};
```

An object of properties for a locale tag.

```js
{ lang: 'zh-CN', language: 'zh', territory: 'CN' }
```

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-lang"></a> `lang` | `string` | The basic tag such as `zh-CN` or `fi` |
| <a id="property-language"></a> `language` | `string` | The language section (`zh` for `zh-CN`) |
| <a id="property-territory"></a> `territory` | `string` | The territory section (`CN` for `zh-CN`) |


<a name="type-aliasesmonthnamesmd"></a>

# MonthNames

```ts
type MonthNames = [string, string, string, string, string, string, string, string, string, string, string, string];
```

A list of the names of the months of the year.


<a name="type-aliasesparsedataboolmd"></a>

# ParseDataBool

```ts
type ParseDataBool = {
  v: boolean;
  z?: never;
};
```

Output from the boolean value parser.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-v"></a> `v` | `boolean` | A boolean value |
| <a id="property-z"></a> `z?` | `never` | A number format pattern |


<a name="type-aliasesparsedatanummd"></a>

# ParseDataNum

```ts
type ParseDataNum = {
  v: number;
  z?: string;
};
```

Output from a number or date value parser.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-v"></a> `v` | `number` | A number value |
| <a id="property-z"></a> `z?` | `string` | A number format pattern |


<a name="type-aliasestokenmd"></a>

# Token

```ts
type Token = {
  raw: string;
  type: TokenType;
  value: string;
};
```

A token emitted by the tokenizer.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-raw"></a> `raw` | `string` | Raw token source. |
| <a id="property-type"></a> `type` | [`TokenType`](#type-aliasestokentypemd) | Token type. |
| <a id="property-value"></a> `value` | `string` | The value of the token, cleaned of extra characters. |


<a name="type-aliasestokentypemd"></a>

# TokenType

```ts
type TokenType = 
  | typeof TOKEN_GENERAL
  | typeof TOKEN_HASH
  | typeof TOKEN_ZERO
  | typeof TOKEN_QMARK
  | typeof TOKEN_SLASH
  | typeof TOKEN_GROUP
  | typeof TOKEN_SCALE
  | typeof TOKEN_COMMA
  | typeof TOKEN_BREAK
  | typeof TOKEN_TEXT
  | typeof TOKEN_PLUS
  | typeof TOKEN_MINUS
  | typeof TOKEN_POINT
  | typeof TOKEN_SPACE
  | typeof TOKEN_PERCENT
  | typeof TOKEN_DIGIT
  | typeof TOKEN_CALENDAR
  | typeof TOKEN_ERROR
  | typeof TOKEN_DATETIME
  | typeof TOKEN_DURATION
  | typeof TOKEN_CONDITION
  | typeof TOKEN_DBNUM
  | typeof TOKEN_NATNUM
  | typeof TOKEN_LOCALE
  | typeof TOKEN_COLOR
  | typeof TOKEN_MODIFIER
  | typeof TOKEN_AMPM
  | typeof TOKEN_ESCAPED
  | typeof TOKEN_STRING
  | typeof TOKEN_SKIP
  | typeof TOKEN_EXP
  | typeof TOKEN_FILL
  | typeof TOKEN_PAREN
  | typeof TOKEN_CHAR;
```

A valid token type.

| Token type      | Description
|---------------- |----------------
| TOKEN_AMPM      | AM/PM operator (`AM/PM`, `A/P`)
| TOKEN_BREAK     | Semicolon operator indicating a break between format sections (`;`)
| TOKEN_CALENDAR  | Calendar modifier (`B2`)
| TOKEN_CHAR      | Single non-operator character (`m`)
| TOKEN_COLOR     | Color modifier (`[Black]`, `[color 5]`)
| TOKEN_COMMA     | Plain non-operator comma (`,`)
| TOKEN_CONDITION | Condition modifier for a section (`[>=10]`)
| TOKEN_DATETIME  | Date-time operator (`mmmm`, `YY`)
| TOKEN_DBNUM     | Number display modifier (`[DBNum23]`)
| TOKEN_DIGIT     | A digit between 1 and 9 (`3`)
| TOKEN_DURATION  | Time duration (`[ss]`)
| TOKEN_ERROR     | Unidentifiable or illegal character (`Ň`)
| TOKEN_ESCAPED   | Escaped character (`\E`)
| TOKEN_EXP       | Exponent operator (`E+`)
| TOKEN_FILL      | Fill with char operator and operand (`*_`)
| TOKEN_GENERAL   | General format operator (`General`)
| TOKEN_GROUP     | Number grouping operator (`,`)
| TOKEN_HASH      | Hash operator (digit if available) (`#`)
| TOKEN_LOCALE    | Locale modifier (`[$-1E020404]`)
| TOKEN_MINUS     | Minus sign (`-`)
| TOKEN_MODIFIER  | An unidentified modifier (`[Lorem]`)
| TOKEN_NATNUM    | Number display modifier (`[NatNum3]`)
| TOKEN_PAREN     | Parenthesis character (`)`)
| TOKEN_PERCENT   | Percent operator (`%`)
| TOKEN_PLUS      | Plus sign (`+`)
| TOKEN_POINT     | Decimal point operator (`.`)
| TOKEN_QMARK     | Question mark operator (digit or space if not available) (`?`)
| TOKEN_SCALE     | Scaling operator (`,`)
| TOKEN_SKIP      | Skip with char operator and operand (`*_`)
| TOKEN_SLASH     | Slash operator (`/`)
| TOKEN_SPACE     | Space (` `)
| TOKEN_STRING    | Quoted string (`"days"`)
| TOKEN_TEXT      | Text output operator (`@`)
| TOKEN_ZERO      | Zero operator (digit or zero if not available) (`0`) *
