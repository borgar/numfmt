
<a name="readmemd"></a>

# numfmt

## Variables

- [tokenTypes](#variablestokentypesmd)

## Functions

- [addLocale](#functionsaddlocalemd)
- [dateFromSerial](#functionsdatefromserialmd)
- [dateToSerial](#functionsdatetoserialmd)
- [format](#functionsformatmd)
- [formatColor](#functionsformatcolormd)
- [getFormatDateInfo](#functionsgetformatdateinfomd)
- [getFormatInfo](#functionsgetformatinfomd)
- [getLocale](#functionsgetlocalemd)
- [isDateFormat](#functionsisdateformatmd)
- [isPercentFormat](#functionsispercentformatmd)
- [isTextFormat](#functionsistextformatmd)
- [isValidFormat](#functionsisvalidformatmd)
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
function addLocale(localeSettings: {
  ampm?: string[];
  bool?: string[];
  ddd?: string[];
  dddd?: string[];
  decimal?: string;
  exponent?: string;
  group?: string;
  infinity?: string;
  mmm?: string[];
  mmm6?: string[];
  mmmm?: string[];
  mmmm6?: string[];
  nan?: string;
  negative?: string;
  percent?: string;
  positive?: string;
  preferMDY?: boolean;
}, l4e: string): LocaleData;
```

Register LocaleData for a language so for use when formatting.

Any partial set of properties may be returned to have the defaults used where properties are missing.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `localeSettings` | \{ `ampm?`: `string`[]; `bool?`: `string`[]; `ddd?`: `string`[]; `dddd?`: `string`[]; `decimal?`: `string`; `exponent?`: `string`; `group?`: `string`; `infinity?`: `string`; `mmm?`: `string`[]; `mmm6?`: `string`[]; `mmmm?`: `string`[]; `mmmm6?`: `string`[]; `nan?`: `string`; `negative?`: `string`; `percent?`: `string`; `positive?`: `string`; `preferMDY?`: `boolean`; \} | A collection of settings for a locale. |
| `localeSettings.ampm?` | `string`[] | How AM and PM should be presented. |
| `localeSettings.bool?` | `string`[] | How TRUE and FALSE should be presented. |
| `localeSettings.ddd?` | `string`[] | Shortened day names (e.g. `Wed`) |
| `localeSettings.dddd?` | `string`[] | Long day names (e.g. `Wednesday`) |
| `localeSettings.decimal?` | `string` | Symbol used to separate integers from fractions (usually `.`) |
| `localeSettings.exponent?` | `string` | Symbol used to indicate an exponent (usually `E`) |
| `localeSettings.group?` | `string` | Symbol used as a grouping separator (`1,000,000` uses `,`) |
| `localeSettings.infinity?` | `string` | Symbol used to indicate infinite values (`∞`) |
| `localeSettings.mmm?` | `string`[] | Short month names for the Gregorian calendar (e.g. `Nov`) |
| `localeSettings.mmm6?` | `string`[] | Short month names for the Islamic calendar (e.g. `Raj.`) |
| `localeSettings.mmmm?` | `string`[] | Long month names for the Gregorian calendar (e.g. `November`) |
| `localeSettings.mmmm6?` | `string`[] | Long month names for the Islamic calendar (e.g. `Rajab`) |
| `localeSettings.nan?` | `string` | Symbol used to indicate NaN values (`NaN`) |
| `localeSettings.negative?` | `string` | Symbol used to indicate positive numbers (usually `-`) |
| `localeSettings.percent?` | `string` | Symbol used to indicate a percentage (usually `%`) |
| `localeSettings.positive?` | `string` | Symbol used to indicate positive numbers (usually `+`) |
| `localeSettings.preferMDY?` | `boolean` | Is the prefered date format month first (12/31/2025) or day first (31/12/2025) |
| `l4e` | `string` | A string BCP 47 tag of the locale. |

## Returns

`LocaleData`

- A full collection of settings for a locale


<a name="functionsdatefromserialmd"></a>

# dateFromSerial()

```ts
function dateFromSerial(serialDate: number, options?: {
  leap1900?: boolean;
}): number[];
```

Convert a spreadsheet serial date to an array of date parts.
Accurate to a second.

```js
// output as [ Y, M, D, h, m, s ]
dateFromSerial(28627); // [ 1978, 5, 17, 0, 0, 0 ]
````

@param serialDate The date
@param [options={}] The options
@param [options.leap1900=true]
  Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
@returns returns an array of date parts

## Parameters

| Parameter | Type |
| ------ | ------ |
| `serialDate` | `number` |
| `options?` | \{ `leap1900?`: `boolean`; \} |
| `options.leap1900?` | `boolean` |

## Returns

`number`[]


<a name="functionsdatetoserialmd"></a>

# dateToSerial()

```ts
function dateToSerial(date: number[] | Date, options?: {
  ignoreTimezone?: boolean;
}): number;
```

Convert a native JavaScript Date, or array to an spreadsheet serial date.

Returns a serial date number if input was a Date object or an array of
numbers, a null.

```js
// input as Date
dateToSerial(new Date(1978, 5, 17)); // 28627
// input as [ Y, M, D, h, m, s ]
dateToSerial([ 1978, 5, 17 ]); // 28627
// other input
dateToSerial("something else"); // null
````

@param date The date
@param [options.ignoreTimezone=false]
  Normally time zone will be taken into account. This makes the conversion to
  serial date ignore the timezone offset.
@returns The date as a spreadsheet serial date, or null.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `number`[] \| `Date` |
| `options?` | \{ `ignoreTimezone?`: `boolean`; \} |
| `options.ignoreTimezone?` | `boolean` |

## Returns

`number`


<a name="functionsformatmd"></a>

# format()

```ts
function format(
   pattern: string, 
   value: any, 
   options?: FormatOptions): string;
```

Formats a value as a string and returns the result.

- Dates are normalized to spreadsheet style serial dates and then formatted.
- Booleans are emitted as uppercase "TRUE" or "FALSE".
- Null and Undefined will return an empty string "".
- Any non number values will be stringified and passed through the text section of the format pattern.
- NaNs and infinites will use the corresponding strings from the active locale.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |
| `value` | `any` | The value to format. |
| `options?` | `FormatOptions` | Formatter options |

## Returns

`string`

A formatted value


<a name="functionsformatcolormd"></a>

# formatColor()

```ts
function formatColor(
   pattern: string, 
   value: any, 
   options?: FormatColorOptions): string | number;
```

Find the color appropriate to a value as dictated by a format pattern.

If the pattern defines colors, this function will emit the color appropriate
to the value. If no colors were specified this function returns `undefined`.

```js
const color = formatColor("[green]#,##0;[red]-#,##0", -10);
console.log(color); // "red"
const color = formatColor("[green]#,##0;-#,##0", -10);
console.log(color); // null
```

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |
| `value` | `any` | The value to format. |
| `options?` | `FormatColorOptions` | Formatter options |

## Returns

`string` \| `number`

A string color value as described by the pattern or a number if the
   indexColors option has been set to false.


<a name="functionsgetformatdateinfomd"></a>

# getFormatDateInfo()

```ts
function getFormatDateInfo(pattern: string): FormatDateInfo;
```

Gets information about date codes use in a format string.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`FormatDateInfo`

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

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |
| `options` | \{ `currency?`: `string`; \} | - |
| `options.currency?` | `string` | Limit the patterns identified as currency to those that use the give string. If nothing is provided, patterns will be tagged as currency if one of the following currency symbols is used: ¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿ |

## Returns

`FormatInfo`

An object of format properties.


<a name="functionsgetlocalemd"></a>

# getLocale()

```ts
function getLocale(locale: string): LocaleData;
```

Used by the formatter to pull a locate from its registered locales. If
subtag isn't available but the base language is, the base language is used.
So if `en-CA` is not found, the formatter tries to find `en` else it
returns a `null`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale` | `string` | A BCP 47 string tag of the locale, or an Excel locale code. |

## Returns

`LocaleData`

- An object of format date properties.


<a name="functionsisdateformatmd"></a>

# isDateFormat()

```ts
function isDateFormat(pattern: string): boolean;
```

Determine if a given format pattern is a date pattern.

The pattern is considered a date pattern if any of its sections contain a
date symbol (such as `Y` or `H`). Each section is restricted to be
_either_ a number or date format.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`boolean`

True if the specified pattern is date pattern, False otherwise.


<a name="functionsispercentformatmd"></a>

# isPercentFormat()

```ts
function isPercentFormat(pattern: string): boolean;
```

Determine if a given format pattern is a percentage pattern.

The pattern is considered a percentage pattern if any of its sections
contains an unescaped percentage symbol.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | A format pattern in the ECMA-376 number format. |

## Returns

`boolean`

True if the specified pattern is date pattern, False otherwise.


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

True if the specified pattern is date pattern, False otherwise.


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


<a name="functionsparseboolmd"></a>

# parseBool()

```ts
function parseBool(value: string, options?: {
  locale?: string;
}): ParseData;
```

Parse a string input and return its boolean value. If the input was not
recognized or valid, the function returns a `null`, for valid input it
returns an object with one property:

- `v`: the parsed value.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The supposed boolean to parse |
| `options?` | \{ `locale?`: `string`; \} | - |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

`ParseData`

An object of the parsed value and a corresponding format string

## See

parseValue


<a name="functionsparsedatemd"></a>

# parseDate()

```ts
function parseDate(value: string, options?: {
  locale?: string;
}): ParseData;
```

Parse a date or datetime string input and return its value and format. If
the input was not recognized or valid, the function returns a `null`, for
valid input it returns an object with two properties:

- `v`: the parsed value.
- `z`: the number format of the input (if applicable).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The date to parse |
| `options?` | \{ `locale?`: `string`; \} | - |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

`ParseData`

An object of the parsed value and a corresponding format string

## See

parseValue


<a name="functionsparselocalemd"></a>

# parseLocale()

```ts
function parseLocale(locale: string): LocaleToken;
```

Parse a regular IETF BCP 47 locale tag and emit an object of its parts.
Irregular tags and subtags are not supported.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `locale` | `string` | A BCP 47 string tag of the locale. |

## Returns

`LocaleToken`

- An object describing the locale.


<a name="functionsparsenumbermd"></a>

# parseNumber()

```ts
function parseNumber(value: string, options?: {
  locale?: string;
}): ParseData;
```

Parse a numeric string input and return its value and format. If the input
was not recognized or valid, the function returns a `null`, for valid input
it returns an object with two properties:

* `v`: the parsed value.
* `z`: the number format of the input (if applicable).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The number to parse |
| `options` | \{ `locale?`: `string`; \} | - |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

`ParseData`

An object of the parsed value and a corresponding format string

## See

parseValue


<a name="functionsparsetimemd"></a>

# parseTime()

```ts
function parseTime(value: string, options?: {
  locale?: string;
}): ParseData;
```

Parse a time string input and return its value and format. If the input was
not recognized or valid, the function returns a `null`, for valid input it
returns an object with two properties:

- `v`: the parsed value.
- `z`: the number format of the input (if applicable).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The date to parse |
| `options?` | \{ `locale?`: `string`; \} | Options |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

`ParseData`

An object of the parsed value and a corresponding format string

## See

parseValue


<a name="functionsparsevaluemd"></a>

# parseValue()

```ts
function parseValue(value: string, options?: {
  locale?: string;
}): ParseData;
```

Attempt to parse a "spreadsheet input" string input and return its value and
format. If the input was not recognized or valid, the function returns a
`null`, for valid input it returns an object with two properties:

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
  parentheses in the format string (the value will still by negative.)
- All "scientific notation" returns the same format: `0.00E+00`.

Internally the parser calls, `parseNumber`, `parseDate`,
`parseTime` and `parseBool`. They work in the same way except
with a more limited scope. You may want those function if you are limiting
input to a smaller scope.

Be warned that the parser do not (yet) take locale into account so all input
is assumed to be in "en-US". This means that `1,234.5` will parse, but
`1.234,5` will not. Similarly, the order of date parts will be US centric.
This may change in the future so be careful what options you pass the
functions.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The value to parse |
| `options?` | \{ `locale?`: `string`; \} | - |
| `options.locale?` | `string` | A BCP 47 string tag. Locale default is english with a `\u00a0` grouping symbol (see [addLocale](#addLocale)) |

## Returns

`ParseData`

An object of the parsed value and a corresponding format string


<a name="functionsroundmd"></a>

# round()

```ts
function round(number: number, places?: number): number;
```

Return a number rounded to the specified amount of places. This is the
rounding function used internally by the formatter (symmetric arithmetic
rounding).

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
function tokenize(pattern: string): FormatToken[];
```

Breaks a format pattern string into a list of tokens.

The returned output will be an array of objects representing the tokens:

```js
[
  { type: 'zero', value: '0', raw: '0' },
  { type: 'point', value: '.', raw: '.' },
  { type: 'zero', value: '0', raw: '0' },
  { type: 'percent', value: '%', raw: '%' }
]
```

Token types may be found as an Object as the
[`tokenTypes` export][tokenTypes](#variablestokentypesmd) of the package.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `pattern` | `string` | The format pattern |

## Returns

`FormatToken`[]

a list of tokens


<a name="variablestokentypesmd"></a>

# tokenTypes

```ts
const readonly tokenTypes: Readonly<{
  AMPM: "ampm";
  BREAK: "break";
  CALENDAR: "calendar";
  CHAR: "char";
  COLOR: "color";
  COMMA: "comma";
  CONDITION: "condition";
  DATETIME: "datetime";
  DBNUM: "dbnum";
  DIGIT: "digit";
  DURATION: "duration";
  ERROR: "error";
  ESCAPED: "escaped";
  EXP: "exp";
  FILL: "fill";
  GENERAL: "general";
  GROUP: "group";
  HASH: "hash";
  LOCALE: "locale";
  MINUS: "minus";
  MODIFIER: "modifier";
  NATNUM: "natnum";
  PAREN: "paren";
  PERCENT: "percent";
  PLUS: "plus";
  POINT: "point";
  QMARK: "qmark";
  SCALE: "scale";
  SKIP: "skip";
  SLASH: "slash";
  SPACE: "space";
  STRING: "string";
  TEXT: "text";
  ZERO: "zero";
}>;
```

A dictionary of the types used to identify token variants.

## Constant

tokenTypes

## See

tokenize
