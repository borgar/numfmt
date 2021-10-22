# numfmt – a spreadsheet number formatter

The numfmt library formats numbers according to a specifier string as defined in [ECMA-376][ecma]. The library tries its best to emulate the inns and outs of what the Excel spreadsheet software does.

The library is written in pure JavaScript and has no dependencies. It is comparable to the [SSF][ssf] with some minor interface exceptions.


#### Features

Why use this rather than the battle tested SSF? You may have no need to but numfmt is fully open source, has equivalent (if not better) formatting capabilities, built in international support, customizability, and may run about twice as fast in most cases.

Adding locales <a href="#numfmt.addLocale">is simple</a> but those included are:

* Chinese (Simplified) (`zh-CN` or `zh`)
* Chinese (Traditional) (`zh-TW`)
* Czech (`cs`)
* Danish (`da`)
* Dutch (`nl`)
* English (`en`)
* Finnish (`fi`)
* French (`fr`)
* German (`de`)
* Greek (`el`)
* Hungarian (`hu`)
* Icelandic (`is`)
* Indonesian (`id`)
* Italian (`it`)
* Japanese (`ja`)
* Korean (`ko`)
* Norwegian Bokmål (`nb`)
* Polish (`pl`)
* Portuguese (`pt`)
* Russian (`ru`)
* Slovak (`sk`)
* Spanish (`es`)
* Swedish (`sv`)
* Thai (`th`)
* Turkish (`tr`)

The library is made to work with current generation spreadsheets and so it does not support the [1904 date system](https://docs.microsoft.com/en-us/office/troubleshoot/excel/1900-and-1904-date-system). It does not have built in tables for formats addressable by offsets, you are expected to maintain those yourself.


## Installing

If you don't want to download and build numfmt yourself, the library is conveniently provided as an NPM package:

```
$ npm install numfmt
```


## Using

```js
import numfmt from "numfmt";

// reusable function
const formatter = numfmt("#,##0.00");
const output = formatter(1234.56);
console.log(output);

// ... or just 
const output = numfmt.format("#,##0.00", 1234.56);
console.log(output);
```


## Format syntax

Microsoft have excellent [documentation on how the format works](https://support.microsoft.com/en-us/office/review-guidelines-for-customizing-a-number-format-c0a1d1fa-d3f4-4018-96b7-9c9354dd99f5). Here are some quick basics:

A format pattern is divided into 4 sections: `<POSITIVE>;<NEGATIVE>;<ZERO>;<TEXT>`

Only the first section is mandatory, the others are filled in as needed. The sections consist of symbols to indicate what to emit. The symbols are case insensitive:

| Symbol | Result | Description
|-- |-- |--
| `0`   | Digit or Zero   | `7` formatted with `00` will emit `"07"`
| `#`   | Digit if needed   | `7` formatted with `##` will emit `"7"`
| `?`   | Digit or Space  | `7` formatted with `??` will emit `" 7"`
| `.`   | Decimal point   | 
| `,`   | Thousands separator   |  `1234` formatted with `#,##0` will emit `"1,234"`. The emitted grouping character depends on the locale used.
| `%`   | Percentage  | Number is multiplied by 100 before it is shown.  `.7` formatted with `0%` will emit `"70%"`
| `e-`, `e+` | Exponential format | `12200000` formatted with `0.00E+00` will emit `"1.22E+07"`
| `$`, `-`, `+`, `/`, `(`, `)`,  ` ` | Pass-through | The symbol is printed as-is.
| `\` | Escape | Pass the the next character through as-is.
| `*` | Fill | Repeat the next character in the format enough times to fill the column to its current width. *Like Excel's TEXT function, numFmt emits nothing when this is used.*
| `_` | Skip width | Skip the width of the next character. *Like Excel's TEXT function, numFmt emits only a single space when this is used.*
| `"text"` | Pass-through | Pass through whatever text is inside the quotation marks as-is. `7` formatted with `0 "bells"` will emit `"7 bells"`
| `@` | Text value | When value is a text, emit it as is: `foo` formatted with `"bar"@"bar"` will emit `"barfoobar"`
| `yy` | Years | Two digit year
| `yyyy` | Years | Four digit year
| `m` | Month | 1–12
| `mm` | Month | 01–12
| `mmm` | Short month | Month name abbreviation (Jan–Dec). Names are locale dependent.
| `mmmm` | Month name | Full month name (January–December). Names are locale dependent.
| `mmmmm` | Month name | Single letter month abbreviation (J–D). Names are locale dependent.
| `d` | Days | 1–31
| `dd` | Days | 01–31
| `ddd` | Weekdays | Sun–Sat
| `dddd` | Weekdays | Sunday–Saturday
| `h` | Hours | 0–23 or 1–12
| `hh` | Hours | 00–23 or 01–12
| `m` | Minutes | 0–59
| `mm` | Minutes | 00–59
| `s` | Seconds | 0–59
| `ss` | Seconds | 00–59
| `AM/PM` | 12h clock | Sets clock to 12h and emits AM or PM.
| `A/P` | 12h clock | Sets clock to 12h and emits A or P.
| `[h]` | Hours | Elapsed time in hours
| `[m]` | Minutes | Elapsed time in minutes
| `[s]` | Seconds | Elapsed time in seconds


## API Reference

<a name="numfmt" href="#numfmt">#</a> **numfmt**(pattern[, options]])

Constructs a new _formatter_ function with the specified options.

Pattern must be a string according to the [ECMA-376][ecma] number format. <a href="#options">Options</a> should be an object of options. You may change defaults once for all instances using <a href="#numfmt.options">numfmt.options</a>.


<a name="numfmt" href="#formatter">#</a> _formatter_(value[, options])

Returns a formatted string for the argument value. If <a href="#options">options</a> object is provided then it overrides the constructor options of those options provided.


<a name="formatter.isDate" href="#formatter.isDate">#</a> _formatter_.isDate()

Returns a true or false depending on if the pattern is a date pattern. The pattern is considered a date pattern if any of its sections contain a date symbol (see table above).  Each section is restricted to  to be _either_ a number or date format.


<a name="formatter.isPercent" href="#formatter.isPercent">#</a> _formatter_.isPercent()

Returns a true or false depending on if the pattern is a percentage pattern. The pattern is considered a percentage pattern if any of its sections contain a percentage symbol (see table above).


<a name="formatter.isText" href="#formatter.isText">#</a> _formatter_.isText()

Returns a true or false depending on if the pattern is a text percentage pattern if its definition is composed of a single section that includes that text symbol (see table above). For example `@` or `@" USD"` are text patterns but `#;@` is not.


<a name="formatter.color" href="#formatter.color">#</a> _formatter_.color(value)

If the pattern defines colors this function will emit the color appropriate to the value. If no colors were specified this function returns `"black"`.

```js
import numfmt from "numfmt";

const formatter = numfmt("[green]#,##0;[red]-#,##0");
const color = formatter.color(-10);
console.log(color); // "red"
```


<a name="numfmt.format" href="#numfmt.format">#</a> numfmt.**format**(pattern, value[, options])

Parses the format pattern and formats the value according to the pattern, and optionally, any <a href="#options">options</a>. See definition [above](#numfmt).


<a name="numfmt.round" href="#numfmt.round">#</a> numfmt.**round**(number[, places])

Return a value rounded to the specified amount of places. This is the rounding function used by the formatter (symmetric arithmetic rounding). 


<a name="numfmt.parseLocale" href="#numfmt.parseLocale">#</a> numfmt.**parseLocale**(tag)

Parse a BCP 47 locale tag and emit an object of its parts. Intended for internal use.


<a name="numfmt.getLocale" href="#numfmt.getLocale">#</a> numfmt.**getLocale**(tag)

Used by the formatter to pull a locate from its registered locales. If subtag isn't available but the base language is, the base language is used. So if `en-CA` is not found, the formatter tries to find `en` else it returns a `null`.


<a name="numfmt.addLocale" href="#numfmt.addLocale">#</a> numfmt.**addLocale**(data, tag)

Register locale data for a language. The full data object looks like this:

```js
{
  group: "\u00a0", // non-breaking space
  decimal: ".",
  positive: "+",
  negative: "-",
  percent: "%",
  exponent: "E",
  nan: "NaN",
  infinity: "∞",
  ampm: [ "AM", "PM" ],

  // gregorian calendar
  mmmm: [ "January", "February", … ],
  mmm: [ "Jan", "Feb", … ],
  dddd: [ "Sunday", "Monday", … ],
  ddd: [ "Sun", "Mon", … ],

  // islamic calendar
  mmmm6: [ "Muharram", "Safar", … ],
  mmm6: [ "Muh.", "Saf.", … ],
}
```

The data object does not need to be complete, it will fall back to defaults (mostly English) for any missing properties. Adding support for Faroese you would require only passing the data different from the defaults:

```js
numfmt.addLocale({
  group: ".",
  decimal: ",",
  mmmm: [ "januar", "februar", … ],
  mmm: [ "jan", "feb", … ],
  dddd: [ "sunnudagur", "mánadagur", … ],
  ddd: [ "sun", "mán", … ],
}, "fo-FO");
```

If the language tag provided has a subtag and a base language does not exit, the locale is register to both. In the Faroese example above both `fo` and `fo-FO` will be created. 


<a name="numfmt.isDate" href="#numfmt.isDate">#</a> numfmt.**isDate**(format)

Returns a true or false depending on if the pattern is a date pattern. The pattern is considered a date pattern if any of its sections contain a date symbol (see table above).  Each section is restricted to  to be _either_ a number or date format.

For compatibility reasons, this function is also available as `numfmt.is_date(format)`.


<a name="numfmt.isPercent" href="#numfmt.isPercent">#</a> numfmt.**isPercent**(format)

Returns a true or false depending on if the pattern is a percentage pattern. The pattern is considered a percentage pattern if any of its sections contain a percentage symbol (see table above).


<a name="numfmt.isText" href="#numfmt.isText">#</a> numfmt.**isText**(format)

Returns a true or false depending on if the pattern is a text percentage pattern if its definition is composed of a single section that includes that text symbol (see table above). For example `@` or `@" USD"` are text patterns but `#;@` is not.


<a name="numfmt.options" href="#numfmt.options">#</a> numfmt.**options**(options)

Set a default option or <a href="#options">options</a> for the formatter. This will affect all formatters unless they have overwritten options at construction time. Calling `numfmt.options(null)` will reset to internal defaults.

```js
// basic "default" formatter
const weekdayEN = numfmt("dddd");
weekdayEN(1234); // "Monday"

// setting a new default
numfmt.options({ locale: "is" });

// call the same formatter
weekdayEN(1234); // "mánudagur"

// construct a new formatter with a locale
const weekdayFR = numfmt("dddd", { locale: "fr", });
weekdayFR(1234); // "lundi"

// override settings at call-time
weekdayEN(1234, { locale: "pl" }); // "poniedziałek"
weekdayFR(1234, { locale: "pl" }); // "poniedziałek"
```


<a name="options" href="#options">#</a> The **options**

As well as allowing locale customization, numfmt behaviour can be controlled with a 

| Member | Type | Default | Note
|-- |-- |-- |--
| locale | `string` | `""` | A [BCP 47][bcp] string tag. Locale default is english with a `\u00a0` grouping symbol (see <a href="#numfmt.addLocale">numfmt.addLocale</a>). 
| throws | `boolean` | `true` | Should the formatter throw an error if a provided pattern is invalid. If not, a formatter will be constructed which only ever outputs an error string (see _invalid_ in this table).
| invalid | `string` | `"######"` | The string emitted when no-throw mode fails to parse a pattern.
| nbsp | `boolean` | `true` | By default the formatters will emit [non-breaking-space][nbsp] rather than a regular space when emitting the formatted number. Setting this to false will make it use regular spaces instead.
| leap1900 | `boolean` | `true` | Simulate the Lotus 1-2-3 [1900 leap year bug][bug1900]. It is a requirement in the Ecma OOXML specification so it is on by default.
| dateErrorThrows | `boolean` | `false` | Should the formatter throw an error when trying to format a date that is out of bounds?
| dateErrorNumber | `boolean` | `true` | Should the formatter switch to a General number format when trying to format a date that is out of bounds?
| overflow | `string` | `"######"` | The string emitted when a formatter fails to format a date that is out of bounds.
| dateSpanLarge | `boolean` | `true` | Extends the allowed range of dates from Excel bounds (1900–9999) to Google Sheet bounds (0–99999).
| ignoreTimezone | `boolean` | `false` | Normally when date objects are used with the formatter, time zone is taken into account. This makes the formatter ignore the timezone offset.

[ecma]: https://www.ecma-international.org/publications/standards/Ecma-376.htm
[ssf]: https://www.npmjs.com/package/ssf
[bcp]: http://www.rfc-editor.org/rfc/bcp/bcp47.txt
[nbsp]: https://en.wikipedia.org/wiki/Non-breaking_space
[bug1900]: https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year
