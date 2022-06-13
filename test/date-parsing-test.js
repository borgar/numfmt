import test from 'tape';
import fmt from '../lib/index.js';

const date = 3290.1278435; // 1909-01-02 03:04:05.678

test('Date specifiers:', t => {
  t.equal(fmt('s')(date), '6', 's');
  t.equal(fmt('ss')(date), '06', 'ss');
  t.equal(fmt('sss')(date), '06', 'sss');
  t.equal(fmt('ssss')(date), '06', 'ssss');
  t.equal(fmt('sssss')(date), '06', 'sssss');
  t.equal(fmt('ssssss')(date), '06', 'ssssss');
  t.equal(fmt('S')(date), '6', 'S');
  t.equal(fmt('SS')(date), '06', 'SS');
  t.equal(fmt('SSS')(date), '06', 'SSS');
  t.equal(fmt('SSSS')(date), '06', 'SSSS');
  t.equal(fmt('SSSSS')(date), '06', 'SSSSS');
  t.equal(fmt('SSSSSS')(date), '06', 'SSSSSS');
  t.equal(fmt('m')(date), '1', 'm');
  t.equal(fmt('mm')(date), '01', 'mm');
  t.equal(fmt('mmm')(date), 'Jan', 'mmm');
  t.equal(fmt('mmmm')(date), 'January', 'mmmm');
  t.equal(fmt('mmmmm')(date), 'J', 'mmmmm');
  t.equal(fmt('mmmmmm')(date), 'January', 'mmmmmm');
  t.equal(fmt('M')(date), '1', 'M');
  t.equal(fmt('MM')(date), '01', 'MM');
  t.equal(fmt('MMM')(date), 'Jan', 'MMM');
  t.equal(fmt('MMMM')(date), 'January', 'MMMM');
  t.equal(fmt('MMMMM')(date), 'J', 'MMMMM');
  t.equal(fmt('MMMMMM')(date), 'January', 'MMMMMM');
  t.equal(fmt('h')(date), '3', 'h');
  t.equal(fmt('hh')(date), '03', 'hh');
  t.equal(fmt('hhh')(date), '03', 'hhh');
  t.equal(fmt('hhhh')(date), '03', 'hhhh');
  t.equal(fmt('hhhhh')(date), '03', 'hhhhh');
  t.equal(fmt('hhhhhh')(date), '03', 'hhhhhh');
  t.equal(fmt('H')(date), '3', 'H');
  t.equal(fmt('HH')(date), '03', 'HH');
  t.equal(fmt('HHH')(date), '03', 'HHH');
  t.equal(fmt('HHHH')(date), '03', 'HHHH');
  t.equal(fmt('HHHHH')(date), '03', 'HHHHH');
  t.equal(fmt('HHHHHH')(date), '03', 'HHHHHH');
  t.equal(fmt('d')(date), '2', 'd');
  t.equal(fmt('dd')(date), '02', 'dd');
  t.equal(fmt('ddd')(date), 'Sat', 'ddd');
  t.equal(fmt('dddd')(date), 'Saturday', 'dddd');
  t.equal(fmt('ddddd')(date), 'Saturday', 'ddddd');
  t.equal(fmt('dddddd')(date), 'Saturday', 'dddddd');
  t.equal(fmt('D')(date), '2', 'D');
  t.equal(fmt('DD')(date), '02', 'DD');
  t.equal(fmt('DDD')(date), 'Sat', 'DDD');
  t.equal(fmt('DDDD')(date), 'Saturday', 'DDDD');
  t.equal(fmt('DDDDD')(date), 'Saturday', 'DDDDD');
  t.equal(fmt('DDDDDD')(date), 'Saturday', 'DDDDDD');
  t.equal(fmt('y')(date), '09', 'y');
  t.equal(fmt('yy')(date), '09', 'yy');
  t.equal(fmt('yyy')(date), '1909', 'yyy');
  t.equal(fmt('yyyy')(date), '1909', 'yyyy');
  t.equal(fmt('yyyyy')(date), '1909', 'yyyyy');
  t.equal(fmt('yyyyyy')(date), '1909', 'yyyyyy');
  t.equal(fmt('Y')(date), '09', 'Y');
  t.equal(fmt('YY')(date), '09', 'YY');
  t.equal(fmt('YYY')(date), '1909', 'YYY');
  t.equal(fmt('YYYY')(date), '1909', 'YYYY');
  t.equal(fmt('YYYYY')(date), '1909', 'YYYYY');
  t.equal(fmt('YYYYYY')(date), '1909', 'YYYYYY');
  // elapsed
  t.equal(fmt('[h]')(date), '78963', '[h]');
  t.equal(fmt('[hh]')(date), '78963', '[hh]');
  t.equal(fmt('[hhh]')(date), '78963', '[hhh]');
  t.equal(fmt('[hhhh]')(date), '78963', '[hhhh]');
  t.equal(fmt('[hhhhh]')(date), '78963', '[hhhhh]');
  t.equal(fmt('[m]')(date), '4737784', '[m]');
  t.equal(fmt('[mm]')(date), '4737784', '[mm]');
  t.equal(fmt('[mmm]')(date), '4737784', '[mmm]');
  t.equal(fmt('[mmmm]')(date), '4737784', '[mmmm]');
  t.equal(fmt('[s]')(date), '284267046', '[s]');
  t.equal(fmt('[ss]')(date), '284267046', '[ss]');
  t.equal(fmt('[sss]')(date), '284267046', '[sss]');
  t.equal(fmt('[ssss]')(date), '284267046', '[ssss]');
  // fractional seconds
  t.equal(fmt('[s].0')(date), '284267045.7', '[s].0');
  t.equal(fmt('[s].00')(date), '284267045.68', '[s].00');
  t.equal(fmt('[s].000')(date), '284267045.678', '[s].000');
  t.equal(fmt('s.0')(date), '5.7', 's.0');
  t.equal(fmt('s.00')(date), '5.68', 's.00');
  t.equal(fmt('s.000')(date), '5.678', 's.000');
  t.end();
});

test('Date specifiers: month vs. minute', t => {
  t.equal(fmt('h')(date), '3', 'h');
  t.equal(fmt('m')(date), '1', 'm');
  t.equal(fmt('s')(date), '6', 's');

  t.equal(fmt('h-h')(date), '3-3', 'h-h');
  t.equal(fmt('h-m')(date), '3-4', 'h-m');
  t.equal(fmt('h-s')(date), '3-6', 'h-s');
  t.equal(fmt('m-h')(date), '1-3', 'm-h');
  t.equal(fmt('m-m')(date), '1-1', 'm-m');
  t.equal(fmt('m-s')(date), '4-6', 'm-s');
  t.equal(fmt('s-h')(date), '6-3', 's-h');
  t.equal(fmt('s-m')(date), '6-4', 's-m');
  t.equal(fmt('s-s')(date), '6-6', 's-s');

  t.equal(fmt('h-h-m')(date), '3-3-4', 'h-h-m');
  t.equal(fmt('h-h-s')(date), '3-3-6', 'h-h-s');
  t.equal(fmt('h-m-h')(date), '3-4-3', 'h-m-h');
  t.equal(fmt('h-m-m')(date), '3-4-1', 'h-m-m');
  t.equal(fmt('h-m-s')(date), '3-4-6', 'h-m-s');
  t.equal(fmt('h-s-h')(date), '3-6-3', 'h-s-h');
  t.equal(fmt('h-s-m')(date), '3-6-4', 'h-s-m');
  t.equal(fmt('h-s-s')(date), '3-6-6', 'h-s-s');
  t.equal(fmt('m-h-h')(date), '1-3-3', 'm-h-h');
  t.equal(fmt('m-h-m')(date), '1-3-4', 'm-h-m');
  t.equal(fmt('m-h-s')(date), '1-3-6', 'm-h-s');
  t.equal(fmt('m-m-h')(date), '1-1-3', 'm-m-h');
  t.equal(fmt('m-m-m')(date), '1-1-1', 'm-m-m');
  t.equal(fmt('m-m-s')(date), '1-4-6', 'm-m-s');
  t.equal(fmt('m-s-h')(date), '4-6-3', 'm-s-h');
  t.equal(fmt('m-s-m')(date), '4-6-1', 'm-s-m');
  t.equal(fmt('m-s-s')(date), '4-6-6', 'm-s-s');
  t.equal(fmt('s-h-h')(date), '6-3-3', 's-h-h');
  t.equal(fmt('s-h-m')(date), '6-3-4', 's-h-m');
  t.equal(fmt('s-h-s')(date), '6-3-6', 's-h-s');
  t.equal(fmt('s-m-h')(date), '6-4-3', 's-m-h');
  t.equal(fmt('s-m-m')(date), '6-4-1', 's-m-m');
  t.equal(fmt('s-m-s')(date), '6-4-6', 's-m-s');
  t.equal(fmt('s-s-h')(date), '6-6-3', 's-s-h');
  t.equal(fmt('s-s-m')(date), '6-6-4', 's-s-m');

  t.equal(fmt('h-m-m-s')(date), '3-4-4-6', 'h-m-m-s');
  t.equal(fmt('h-m-s-m')(date), '3-4-6-1', 'h-m-s-m');
  t.equal(fmt('h-s-m-m')(date), '3-6-4-1', 'h-s-m-m');
  t.equal(fmt('m-h-m-s')(date), '1-3-4-6', 'm-h-m-s');
  t.equal(fmt('m-h-s-m')(date), '1-3-6-4', 'm-h-s-m');
  t.equal(fmt('m-m-h-s')(date), '1-1-3-6', 'm-m-h-s');
  t.equal(fmt('m-m-s-h')(date), '1-4-6-3', 'm-m-s-h');
  t.equal(fmt('m-s-h-m')(date), '4-6-3-4', 'm-s-h-m');
  t.equal(fmt('m-s-m-h')(date), '4-6-1-3', 'm-s-m-h');
  t.equal(fmt('s-h-m-m')(date), '6-3-4-1', 's-h-m-m');
  t.equal(fmt('s-m-h-m')(date), '6-4-3-4', 's-m-h-m');
  t.equal(fmt('s-m-m-h')(date), '6-4-1-3', 's-m-m-h');

  t.equal(fmt('y-m-d')(date), '09-1-2', 'y-m-d');
  t.equal(fmt('d-m-y')(date), '2-1-09', 'd-m-y');
  t.equal(fmt('yy-mm-dd')(date), '09-01-02', 'yy-mm-dd');

  t.equal(fmt('yyyy')(date), '1909', 'yyyy');
  t.equal(fmt('yyyy-mm')(date), '1909-01', 'yyyy-mm');
  t.equal(fmt('yyyy-mm-dd')(date), '1909-01-02', 'yyyy-mm-dd');
  t.equal(fmt('yyyy-mm-dd\\Thh')(date), '1909-01-02T03', 'yyyy-mm-dd\\Thh');
  t.equal(fmt('yyyy-mm-dd\\Thh-mm')(date), '1909-01-02T03-04', 'yyyy-mm-dd\\Thh-mm');
  t.equal(fmt('yyyy-mm-dd\\Thh-mm-ss')(date), '1909-01-02T03-04-06', 'yyyy-mm-dd\\Thh-mm-ss');
  t.equal(fmt('yyyy-mm-dd\\Thh-mm-ss.000')(date), '1909-01-02T03-04-05.678', 'yyyy-mm-dd\\Thh-mm-ss.000');

  t.equal(fmt('yyyy-mm-dd\\Thh-mm-ss.000')(60), '1900-02-29T00-00-00.000', 'yyyy-mm-dd\\Thh-mm-ss.000');
  t.equal(fmt('yyyy-mm-dd\\Thh-mm-ss.000')(61), '1900-03-01T00-00-00.000', 'yyyy-mm-dd\\Thh-mm-ss.000');

  t.end();
});

