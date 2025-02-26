import test, { Test } from 'tape';
import { format, formatColor, getFormatDateInfo, getFormatInfo } from '../lib/index.js';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { URL, fileURLToPath } from 'url';

const VALUE_ERROR = '#VALUE!';

function getTimeZoneName () {
  const ds = new Date().toString();
  return ds.replace(/^.*GMT\+\d{4} \((.*?)\)$/, '$1');
}

function getTimeZoneOffset (d) {
  const temp = new Date();
  temp.setUTCFullYear(
    d.getFullYear(),
    d.getMonth(),
    d.getDate()
  );
  temp.setUTCHours(
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  );
  return (d - temp) / 60000;
}

function isLeapYear (year) {
  return !!(!(year % 4) && year % 100) || !(year % 400);
}

Test.prototype.runTable = function runSSFTable (pathToTable) {
  const filename = fileURLToPath(new URL(pathToTable, import.meta.url));
  // eslint-disable-next-line
  if (process.env.SKIPTABLES) { return; }
  const tableFN = path.join(filename) + '.gz';
  const table = zlib.gunzipSync(fs.readFileSync(tableFN))
    .toString('utf8')
    .replace(/\r/g, '')
    .split('\n')
    .map(d => d.replace(/#{255}/g, '').split('\t'));

  const headers = table[0];
  const startPos = 1;
  const endPos = table.length;
  headers.slice(1).forEach((code, hi) => {
    this.test('Pattern: ' + code, t => {
      let failCount = 0;
      for (let i = startPos; i < endPos; i++) {
        const d = table[i];
        if (!d[0]) { break; }
        let exp = d[hi + 1];
        if (exp === '######') {
          // some tables use #VALUE!, others '######'
          exp = VALUE_ERROR;
        }
        let res;
        try {
          res = format(code, parseFloat(d[0]), {
            dateSpanLarge: false,
            dateErrorNumber: false,
            dateErrorThrows: true
          });
        }
        catch (err) {
          res = VALUE_ERROR;
        }
        if (res !== exp) {
          failCount++;
          t.fail(`${i - 1}: numfmt('${code}', ${d[0]}) => ${res} !== ${exp}`);
        }
      }
      if (!failCount) {
        t.pass('OK');
      }
      t.end();
    });
  });
};

function formatMessage (pattern, value, options) {
  let message = pattern;
  const suffix = (typeof value === 'bigint') ? 'n' : '';
  message += '\x1b[36m <=> ' + value + suffix;
  const o = JSON.stringify(options);
  if (o !== '{}') {
    message += '\x1b[2m\x1b[33m [ OPTIONS=' + o + ' ]';
  }
  message += '\x1b[0m';
  return message;
}

// extend tape to be able to omit descriptions

Test.prototype.format = function assertFormat (pattern, value, expected, options = {}) {
  const output = format(pattern, value, options);
  this.is(output, expected, formatMessage(pattern, value, options));
};

Test.prototype.validFormat = function assertFormatParses (pattern, options = {}) {
  const message = formatMessage(pattern, null, options);
  try {
    format(pattern, 1);
    this.pass(message);
  }
  catch (err) {
    this.fail(message);
  }
};

Test.prototype.formatColor = function assertFormat (pattern, value, expected, options = {}) {
  const output = formatColor(pattern, value, options);
  this.is(output, expected, formatMessage(pattern, value, options));
};

Test.prototype.formatInvalid = function assertFormatThrows (pattern, options = {}) {
  this.throws(
    () => {
      format(pattern, '', options);
    },
    null,
    formatMessage(pattern, null, options)
  );
};

Test.prototype.formatThrows = function assertFormatThrows (pattern, value, expected, options = {}) {
  this.throws(
    () => format(pattern, value, options),
    expected,
    formatMessage(pattern, value, options)
  );
};

const commonProps = {
  isDate: false,
  isText: false,
  isPercent: false,
  maxDecimals: 0,
  grouped: 0,
  parentheses: 0,
  color: 0,
  scale: 1,
  level: 0
};

function alphabetizeProps (obj) {
  const keys = Object.keys(obj).sort();
  return keys.reduce((a, c) => { a[c] = obj[c]; return a; }, {});
}

Test.prototype.assertInfo = function (fmtString, expectProps) {
  const output = { ...getFormatInfo(fmtString) };
  this.deepEqual(
    alphabetizeProps(output),
    alphabetizeProps({ ...commonProps, ...expectProps }),
    fmtString
  );
};

const commonDateProps = {
  year: false,
  month: false,
  day: false,
  hours: false,
  minutes: false,
  seconds: false,
  clockType: 24
};

Test.prototype.assertDateInfo = function (fmtString, expectProps) {
  const output = getFormatDateInfo(fmtString);
  this.deepEqual(
    alphabetizeProps(output),
    alphabetizeProps({ ...commonDateProps, ...expectProps }),
    fmtString
  );
};

export { test, Test, getTimeZoneName, getTimeZoneOffset, isLeapYear };
export default test;
