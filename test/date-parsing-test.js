import test from 'tape';
import fmt from '../lib';

const date = 3290.1278435; // 1909-01-02 03:04:05.678

test('Date specifiers:', t => {
  t.is(fmt('s')(date), '6', 's');
  t.is(fmt('ss')(date), '06', 'ss');
  t.is(fmt('sss')(date), '06', 'sss');
  t.is(fmt('ssss')(date), '06', 'ssss');
  t.is(fmt('sssss')(date), '06', 'sssss');
  t.is(fmt('ssssss')(date), '06', 'ssssss');
  t.is(fmt('S')(date), '6', 'S');
  t.is(fmt('SS')(date), '06', 'SS');
  t.is(fmt('SSS')(date), '06', 'SSS');
  t.is(fmt('SSSS')(date), '06', 'SSSS');
  t.is(fmt('SSSSS')(date), '06', 'SSSSS');
  t.is(fmt('SSSSSS')(date), '06', 'SSSSSS');
  t.is(fmt('m')(date), '1', 'm');
  t.is(fmt('mm')(date), '01', 'mm');
  t.is(fmt('mmm')(date), 'Jan', 'mmm');
  t.is(fmt('mmmm')(date), 'January', 'mmmm');
  t.is(fmt('mmmmm')(date), 'J', 'mmmmm');
  t.is(fmt('mmmmmm')(date), 'January', 'mmmmmm');
  t.is(fmt('M')(date), '1', 'M');
  t.is(fmt('MM')(date), '01', 'MM');
  t.is(fmt('MMM')(date), 'Jan', 'MMM');
  t.is(fmt('MMMM')(date), 'January', 'MMMM');
  t.is(fmt('MMMMM')(date), 'J', 'MMMMM');
  t.is(fmt('MMMMMM')(date), 'January', 'MMMMMM');
  t.is(fmt('h')(date), '3', 'h');
  t.is(fmt('hh')(date), '03', 'hh');
  t.is(fmt('hhh')(date), '03', 'hhh');
  t.is(fmt('hhhh')(date), '03', 'hhhh');
  t.is(fmt('hhhhh')(date), '03', 'hhhhh');
  t.is(fmt('hhhhhh')(date), '03', 'hhhhhh');
  t.is(fmt('H')(date), '3', 'H');
  t.is(fmt('HH')(date), '03', 'HH');
  t.is(fmt('HHH')(date), '03', 'HHH');
  t.is(fmt('HHHH')(date), '03', 'HHHH');
  t.is(fmt('HHHHH')(date), '03', 'HHHHH');
  t.is(fmt('HHHHHH')(date), '03', 'HHHHHH');
  t.is(fmt('d')(date), '2', 'd');
  t.is(fmt('dd')(date), '02', 'dd');
  t.is(fmt('ddd')(date), 'Sat', 'ddd');
  t.is(fmt('dddd')(date), 'Saturday', 'dddd');
  t.is(fmt('ddddd')(date), 'Saturday', 'ddddd');
  t.is(fmt('dddddd')(date), 'Saturday', 'dddddd');
  t.is(fmt('D')(date), '2', 'D');
  t.is(fmt('DD')(date), '02', 'DD');
  t.is(fmt('DDD')(date), 'Sat', 'DDD');
  t.is(fmt('DDDD')(date), 'Saturday', 'DDDD');
  t.is(fmt('DDDDD')(date), 'Saturday', 'DDDDD');
  t.is(fmt('DDDDDD')(date), 'Saturday', 'DDDDDD');
  t.is(fmt('y')(date), '09', 'y');
  t.is(fmt('yy')(date), '09', 'yy');
  t.is(fmt('yyy')(date), '1909', 'yyy');
  t.is(fmt('yyyy')(date), '1909', 'yyyy');
  t.is(fmt('yyyyy')(date), '1909', 'yyyyy');
  t.is(fmt('yyyyyy')(date), '1909', 'yyyyyy');
  t.is(fmt('Y')(date), '09', 'Y');
  t.is(fmt('YY')(date), '09', 'YY');
  t.is(fmt('YYY')(date), '1909', 'YYY');
  t.is(fmt('YYYY')(date), '1909', 'YYYY');
  t.is(fmt('YYYYY')(date), '1909', 'YYYYY');
  t.is(fmt('YYYYYY')(date), '1909', 'YYYYYY');
  // elapsed
  t.is(fmt('[h]')(date), '78963', '[h]');
  t.is(fmt('[hh]')(date), '78963', '[hh]');
  t.is(fmt('[hhh]')(date), '78963', '[hhh]');
  t.is(fmt('[hhhh]')(date), '78963', '[hhhh]');
  t.is(fmt('[hhhhh]')(date), '78963', '[hhhhh]');
  t.is(fmt('[m]')(date), '4737784', '[m]');
  t.is(fmt('[mm]')(date), '4737784', '[mm]');
  t.is(fmt('[mmm]')(date), '4737784', '[mmm]');
  t.is(fmt('[mmmm]')(date), '4737784', '[mmmm]');
  t.is(fmt('[s]')(date), '284267046', '[s]');
  t.is(fmt('[ss]')(date), '284267046', '[ss]');
  t.is(fmt('[sss]')(date), '284267046', '[sss]');
  t.is(fmt('[ssss]')(date), '284267046', '[ssss]');
  // fractional seconds
  t.is(fmt('[s].0')(date), '284267045.7', '[s].0');
  t.is(fmt('[s].00')(date), '284267045.68', '[s].00');
  t.is(fmt('[s].000')(date), '284267045.678', '[s].000');
  t.is(fmt('s.0')(date), '5.7', 's.0');
  t.is(fmt('s.00')(date), '5.68', 's.00');
  t.is(fmt('s.000')(date), '5.678', 's.000');
  t.end();
});

test('Date specifiers: month vs. minute', t => {
  t.is(fmt('h')(date), '3', 'h');
  t.is(fmt('m')(date), '1', 'm');
  t.is(fmt('s')(date), '6', 's');

  t.is(fmt('h-h')(date), '3-3', 'h-h');
  t.is(fmt('h-m')(date), '3-4', 'h-m');
  t.is(fmt('h-s')(date), '3-6', 'h-s');
  t.is(fmt('m-h')(date), '1-3', 'm-h');
  t.is(fmt('m-m')(date), '1-1', 'm-m');
  t.is(fmt('m-s')(date), '4-6', 'm-s');
  t.is(fmt('s-h')(date), '6-3', 's-h');
  t.is(fmt('s-m')(date), '6-4', 's-m');
  t.is(fmt('s-s')(date), '6-6', 's-s');

  t.is(fmt('h-h-m')(date), '3-3-4', 'h-h-m');
  t.is(fmt('h-h-s')(date), '3-3-6', 'h-h-s');
  t.is(fmt('h-m-h')(date), '3-4-3', 'h-m-h');
  t.is(fmt('h-m-m')(date), '3-4-1', 'h-m-m');
  t.is(fmt('h-m-s')(date), '3-4-6', 'h-m-s');
  t.is(fmt('h-s-h')(date), '3-6-3', 'h-s-h');
  t.is(fmt('h-s-m')(date), '3-6-4', 'h-s-m');
  t.is(fmt('h-s-s')(date), '3-6-6', 'h-s-s');
  t.is(fmt('m-h-h')(date), '1-3-3', 'm-h-h');
  t.is(fmt('m-h-m')(date), '1-3-4', 'm-h-m');
  t.is(fmt('m-h-s')(date), '1-3-6', 'm-h-s');
  t.is(fmt('m-m-h')(date), '1-1-3', 'm-m-h');
  t.is(fmt('m-m-m')(date), '1-1-1', 'm-m-m');
  t.is(fmt('m-m-s')(date), '1-4-6', 'm-m-s');
  t.is(fmt('m-s-h')(date), '4-6-3', 'm-s-h');
  t.is(fmt('m-s-m')(date), '4-6-1', 'm-s-m');
  t.is(fmt('m-s-s')(date), '4-6-6', 'm-s-s');
  t.is(fmt('s-h-h')(date), '6-3-3', 's-h-h');
  t.is(fmt('s-h-m')(date), '6-3-4', 's-h-m');
  t.is(fmt('s-h-s')(date), '6-3-6', 's-h-s');
  t.is(fmt('s-m-h')(date), '6-4-3', 's-m-h');
  t.is(fmt('s-m-m')(date), '6-4-1', 's-m-m');
  t.is(fmt('s-m-s')(date), '6-4-6', 's-m-s');
  t.is(fmt('s-s-h')(date), '6-6-3', 's-s-h');
  t.is(fmt('s-s-m')(date), '6-6-4', 's-s-m');

  t.is(fmt('h-m-m-s')(date), '3-4-4-6', 'h-m-m-s');
  t.is(fmt('h-m-s-m')(date), '3-4-6-1', 'h-m-s-m');
  t.is(fmt('h-s-m-m')(date), '3-6-4-1', 'h-s-m-m');
  t.is(fmt('m-h-m-s')(date), '1-3-4-6', 'm-h-m-s');
  t.is(fmt('m-h-s-m')(date), '1-3-6-4', 'm-h-s-m');
  t.is(fmt('m-m-h-s')(date), '1-1-3-6', 'm-m-h-s');
  t.is(fmt('m-m-s-h')(date), '1-4-6-3', 'm-m-s-h');
  t.is(fmt('m-s-h-m')(date), '4-6-3-4', 'm-s-h-m');
  t.is(fmt('m-s-m-h')(date), '4-6-1-3', 'm-s-m-h');
  t.is(fmt('s-h-m-m')(date), '6-3-4-1', 's-h-m-m');
  t.is(fmt('s-m-h-m')(date), '6-4-3-4', 's-m-h-m');
  t.is(fmt('s-m-m-h')(date), '6-4-1-3', 's-m-m-h');

  t.is(fmt('y-m-d')(date), '09-1-2', 'y-m-d');
  t.is(fmt('d-m-y')(date), '2-1-09', 'd-m-y');
  t.is(fmt('yy-mm-dd')(date), '09-01-02', 'yy-mm-dd');

  t.is(fmt('yyyy')(date), '1909', 'yyyy');
  t.is(fmt('yyyy-mm')(date), '1909-01', 'yyyy-mm');
  t.is(fmt('yyyy-mm-dd')(date), '1909-01-02', 'yyyy-mm-dd');
  t.is(fmt('yyyy-mm-dd\\Thh')(date), '1909-01-02T03', 'yyyy-mm-dd\\Thh');
  t.is(fmt('yyyy-mm-dd\\Thh-mm')(date), '1909-01-02T03-04', 'yyyy-mm-dd\\Thh-mm');
  t.is(fmt('yyyy-mm-dd\\Thh-mm-ss')(date), '1909-01-02T03-04-06', 'yyyy-mm-dd\\Thh-mm-ss');
  t.is(fmt('yyyy-mm-dd\\Thh-mm-ss.000')(date), '1909-01-02T03-04-05.678', 'yyyy-mm-dd\\Thh-mm-ss.000');

  t.is(fmt('yyyy-mm-dd\\Thh-mm-ss.000')(60), '1900-02-29T00-00-00.000', 'yyyy-mm-dd\\Thh-mm-ss.000');
  t.is(fmt('yyyy-mm-dd\\Thh-mm-ss.000')(61), '1900-03-01T00-00-00.000', 'yyyy-mm-dd\\Thh-mm-ss.000');

  t.end();
});

