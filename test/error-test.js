import test from 'tape';
import fmt from '../lib/index.js';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test(t => {
  // no more than 4 sections
  t.throws(() => fmt('a;b;c;d;'), 'a;b;c;d;');
  t.throws(() => fmt('#;#;#;#;#'), '#;#;#;#;');

  // no more than 2 conditional sections
  t.throws(() => fmt('[<-2]a;[<-1]b;[>2]c;d;'), '[<-2]a;[<-1]b;[>2]c;d');

  // can't mix dates and numbers (within a segment)
  t.throws(() => fmt('y 0'), 'y 0');
  t.throws(() => fmt('yyyy 0'), 'yyyy 0');
  t.throws(() => fmt('m 0'), 'm 0');
  t.throws(() => fmt('mmmm 0'), 'mmmm 0');
  t.throws(() => fmt('d 0'), 'd 0');
  t.throws(() => fmt('dddd 0'), 'dddd 0');
  t.throws(() => fmt('s 0'), 's 0');
  t.throws(() => fmt('h 0'), 'h 0');
  t.throws(() => fmt('AM/PM 0'), 'AM/PM 0');
  t.throws(() => fmt('[h] 0'), '[h] 0');
  t.throws(() => fmt('[m] 0'), '[m] 0');
  t.throws(() => fmt('[s] 0'), '[s] 0');
  t.throws(() => fmt('y #'), 'y #');
  t.throws(() => fmt('yyyy #'), 'yyyy #');
  t.throws(() => fmt('m #'), 'm #');
  t.throws(() => fmt('mmmm #'), 'mmmm #');
  t.throws(() => fmt('d #'), 'd #');
  t.throws(() => fmt('dddd #'), 'dddd #');
  t.throws(() => fmt('s #'), 's #');
  t.throws(() => fmt('h #'), 'h #');
  t.throws(() => fmt('AM/PM #'), 'AM/PM #');
  t.throws(() => fmt('[h] #'), '[h] #');
  t.throws(() => fmt('[m] #'), '[m] #');
  t.throws(() => fmt('[s] #'), '[s] #');
  t.throws(() => fmt('y ?'), 'y ?');
  t.throws(() => fmt('yyyy ?'), 'yyyy ?');
  t.throws(() => fmt('m ?'), 'm ?');
  t.throws(() => fmt('mmmm ?'), 'mmmm ?');
  t.throws(() => fmt('d ?'), 'd ?');
  t.throws(() => fmt('dddd ?'), 'dddd ?');
  t.throws(() => fmt('s ?'), 's ?');
  t.throws(() => fmt('h ?'), 'h ?');
  t.throws(() => fmt('AM/PM ?'), 'AM/PM ?');
  t.throws(() => fmt('[h] ?'), '[h] ?');
  t.throws(() => fmt('[m] ?'), '[m] ?');
  t.throws(() => fmt('[s] ?'), '[s] ?');

  t.throws(() => fmt('d .#'), 'd .#');
  t.throws(() => fmt('mm%'), 'mm%');
  t.throws(() => fmt('mm@'), 'mm@');

  // no out of bounds dates
  t.equal(fmt('dddd, dd. mmmm yyy', excelOpts)(-1), '######');
  t.equal(fmt('dddd, dd. mmmm yyy', excelOpts)(2958470), '######');

  // isDate should not throw on malformed input
  t.equal(fmt.isDate('dddd, dd. mmmm yyy'), true);
  t.equal(fmt.isDate('0.0M'), false);

  // utility functions exist and work on error formatters
  t.equal(fmt('y 0', { throws: false }).isDate(), false);
  t.equal(fmt('y 0', { throws: false }).isPercent(), false);
  t.equal(fmt('y 0', { throws: false }).isText(), false);

  t.end();
});
