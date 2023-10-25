import { isDateFormat, isPercentFormat, isTextFormat } from '../lib/index.js';
import test from './utils.js';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test(t => {
  // no more than 4 sections
  t.formatInvalid('a;b;c;d;');
  t.formatInvalid('#;#;#;#;#');

  // no more than 2 conditional sections
  t.formatInvalid('[<-2]a;[<-1]b;[>2]c;d;');

  // can't mix dates and numbers (within a segment)
  t.formatInvalid('y 0');
  t.formatInvalid('yyyy 0');
  t.formatInvalid('m 0');
  t.formatInvalid('mmmm 0');
  t.formatInvalid('d 0');
  t.formatInvalid('dddd 0');
  t.formatInvalid('s 0');
  t.formatInvalid('h 0');
  t.formatInvalid('AM/PM 0');
  t.formatInvalid('[h] 0');
  t.formatInvalid('[m] 0');
  t.formatInvalid('[s] 0');
  t.formatInvalid('y #');
  t.formatInvalid('yyyy #');
  t.formatInvalid('m #');
  t.formatInvalid('mmmm #');
  t.formatInvalid('d #');
  t.formatInvalid('dddd #');
  t.formatInvalid('s #');
  t.formatInvalid('h #');
  t.formatInvalid('AM/PM #');
  t.formatInvalid('[h] #');
  t.formatInvalid('[m] #');
  t.formatInvalid('[s] #');
  t.formatInvalid('y ?');
  t.formatInvalid('yyyy ?');
  t.formatInvalid('m ?');
  t.formatInvalid('mmmm ?');
  t.formatInvalid('d ?');
  t.formatInvalid('dddd ?');
  t.formatInvalid('s ?');
  t.formatInvalid('h ?');
  t.formatInvalid('AM/PM ?');
  t.formatInvalid('[h] ?');
  t.formatInvalid('[m] ?');
  t.formatInvalid('[s] ?');

  t.formatInvalid('d .#');
  t.formatInvalid('mm%');
  t.formatInvalid('mm@');

  // no out of bounds dates
  t.format('dddd, dd. mmmm yyy', -1, '######', excelOpts);
  t.format('dddd, dd. mmmm yyy', 2958470, '######', excelOpts);

  // isDate should not throw on malformed input
  t.equal(isDateFormat('dddd, dd. mmmm yyy'), true, "isDateFormat('dddd, dd. mmmm yyy')");
  t.equal(isDateFormat('0.0M'), false, "isDateFormat('0.0M')");

  // utility functions exist and work on error formatters
  t.equal(isDateFormat('y 0'), false, "isDateFormat('y 0')");
  t.equal(isPercentFormat('y 0'), false, "isPercentFormat('y 0')");
  t.equal(isTextFormat('y 0'), false, "isTextFormat('y 0')");

  t.end();
});
