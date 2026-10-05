import { addLocale, type DayNames, type LocaleData, type LocalFormat, type MonthNames } from './locale.ts';

/**
 * Split a semicolon delimited string and replace instances of characters
 * @internal
 * @param str Semicolon delimited string
 * @param [tilde] String to be inserted on every instance of ~
 * @returns Array of strings
 */
const _B = (str: string, tilde = '') => str.replaceAll('~', tilde).split(';') as [ string, string ];
const _W = (str: string, tilde = '') => _B(str, tilde) as unknown as DayNames;
const _M = (str: string, tilde = '') => _B(str, tilde) as unknown as MonthNames;

/**
 * Generate mmm and ddd properties as needed for locales. Many of them
 * are straightforward abreviations of mmmm and dddd so we can save some
 * bytes by auto-generating them.
 *
 * Both rule parameters use the same system. If shortform prop is missing:
 *
 * - 0 - use long form array unchanged
 * - 1...9 - shorten to N many characters
 * - 11...19 - shorten to 1...9 characters and add periods
 *
 * @internal
 * @param o Locale object
 * @param [ml] Month list rule
 * @param [dl] Day list rule
 * @returns The same input object, but with ddd and mmm filled in.
 */
const xm = (o: Partial<LocaleData> & Pick<LocaleData, 'mmmm' | 'dddd'>, ml: number = 0, dl: number = 0): Partial<LocaleData> => {
  if (!o.mmm) {
    // @ts-ignore
    o.mmm = ml < 1
      ? o.mmmm.concat()
      : o.mmmm.map(d => {
        const s = d.slice(0, ml % 10);
        return s + (ml < 10 || d === s ? '' : '.');
      });
  }
  if (!o.ddd) {
    // @ts-ignore
    o.ddd = dl < 1
      ? o.dddd.concat()
      : o.dddd.map(d => {
        const s = d.slice(0, dl % 10);
        return s + (dl < 10 || d === s ? '' : '.');
      });
  }
  if (!o.mmm6 && o.mmmm6) {
    o.mmm6 = o.mmmm6;
  }
  return o;
};

type CompressedFormat = {
  p?: 0 | 1; // parens around negatives
  s?: 0 | 1; // sign location: false=after currency, true=before currency
  o?: 0 | 1 | 2; // date order
  d?: 0 | 1; // pad date
  h?: 0 | 1; // pad hours
  i?: 0 | 1; // pad hours, alt
  m?: 0 | 1; // pad month
  y?: 0 | 1; // short year
  k?: string; // date separator
  l?: string; // date-short separator
  b?: string; // time separator
  c?: 0 | 1; // space around percent sign
  f?: 0 | 1 | 2 | 3; // currency symbol location
};

/**
 * Expand CompressedFormat to LocalFormat.
 * Note that the defaults are not the same as in LocalFormat.
 * This is done to save bytes across the wire.
 * @internal
 * @param p Compressed format params
 * @returns Expanded format params
 */
const xf = (p: CompressedFormat): Required<LocalFormat> => {
  return {
    minus: !p.p,
    sign: !!p.s,
    dateOrder: p.o ?? 1,
    currencyPos: p.f ?? 3,
    padMm: p.m == null ? true : !!p.m,
    padDd: p.d == null ? true : !!p.d,
    padHh: p.h == null ? true : !!p.h,
    padHhAlt: !!p.i,
    dateSep: p.k ?? '/',
    shortDateSep: p.l ?? '-',
    timeSep: p.b ?? ':',
    shortYear: !!p.y,
    spacePercent: !!p.c
  };
};

type Colors = Record<string, 'Black' | 'White' | 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Magenta' | 'Cyan'>;
const C_BLACK = 'Black';
const C_WHITE = 'White';
const C_RED = 'Red';
const C_GREEN = 'Green';
const C_BLUE = 'Blue';
const C_YELLOW = 'Yellow';
const C_MAGENTA = 'Magenta';
const C_CYAN = 'Cyan';

const fp1: CompressedFormat = { k: '.', l: '.' };
const fp2: CompressedFormat = { d: 0, h: 0, m: 0, k: '.', l: '.' };
const fp3: CompressedFormat = { d: 1, y: 1, f: 0, o: 1, k: '-', b: ':', s: 1 };
const fp4: CompressedFormat = { ...fp3, y: 0 };
const fp5: CompressedFormat = { h: 0, d: 0, f: 0, m: 0, s: 1 };

export function initLocales () {
  const _zhM4 = _M('一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月');
  const _zhCl: Colors = {
    黑色: C_BLACK,
    白色: C_WHITE,
    紅色: C_RED,
    綠色: C_GREEN,
    藍色: C_BLUE,
    黃色: C_YELLOW,
    洋紅: C_MAGENTA,
    青色: C_CYAN
  };
  addLocale({
    group: ',',
    ampm: _B('上午;下午'),
    mmmm: _zhM4,
    mmm: _M('1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月'),
    dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期'),
    ddd: _W('周日;周一;周二;周三;周四;周五;周六'),
    color: '颜色',
    colors: {
      黑色: C_BLACK,
      白色: C_WHITE,
      红色: C_RED,
      绿色: C_GREEN,
      蓝色: C_BLUE,
      黄色: C_YELLOW,
      洋红: C_MAGENTA,
      蓝绿色: C_CYAN
    },
    general: 'G/通用格式',
    currency: '¥',
    format: xf({ h: 0, d: 0, f: 0, m: 0, o: 2, s: 1 }),
    sysdate: 'yyyy年m月d日',
    systime: 'h:mm:ss'
  }, 'zh-CN');
  addLocale({
    group: ',',
    ampm: _B('上午;下午'),
    mmmm: _zhM4,
    mmm: _zhM4,
    dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期'),
    ddd: _W('週日;週一;週二;週三;週四;週五;週六'),
    nan: '非數值',
    color: '色彩',
    colors: _zhCl,
    general: 'G/通用格式',
    currency: 'NT$',
    format: xf({ d: 0, f: 0, o: 2, m: 0, i: 1 }),
    sysdate: 'yyyy年m月d日',
    systime: 'AM/PM hh:mm:ss'
  }, 'zh-TW');
  addLocale({
    group: ',',
    ampm: _B('上午;下午'),
    mmmm: _zhM4,
    mmm: _zhM4,
    dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期'),
    ddd: _W('週日;週一;週二;週三;週四;週五;週六'),
    color: '色彩',
    colors: _zhCl,
    currency: 'HK$',
    format: xf({ h: 0, d: 0, f: 0, m: 0, p: 1 }),
    sysdate: 'yyyy年m月d日',
    systime: 'h:mm:ss'
  }, 'zh-HK');

  addLocale({
    group: ',',
    mmmm: _M('1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月'),
    mmm: _M('1;2;3;4;5;6;7;8;9;10;11;12'),
    dddd: _W('日曜日;月曜日;火曜日;水曜日;木曜日;金曜日;土曜日'),
    ddd: _W('日;月;火;水;木;金;土'),
    ampm: _B('午前;午後'),
    general: 'G/標準',
    currency: '¥',
    color: '色',
    colors: {
      黒: C_BLACK,
      白: C_WHITE,
      赤: C_RED,
      緑: C_GREEN,
      青: C_BLUE,
      黄: C_YELLOW,
      紫: C_MAGENTA,
      水: C_CYAN
    },
    format: xf({ h: 0, f: 0, o: 2, d: 1 }),
    sysdate: 'yyyy年m月d日',
    systime: 'h:mm:ss'
  }, 'ja');

  addLocale({
    group: ',',
    ampm: _B('오전;오후'),
    mmmm: _M('1월;2월;3월;4월;5월;6월;7월;8월;9월;10월;11월;12월'),
    mmm: _M('1;2;3;4;5;6;7;8;9;10;11;12'),
    dddd: _W('일요일;월요일;화요일;수요일;목요일;금요일;토요일'),
    ddd: _W('일;월;화;수;목;금;토'),
    color: '색',
    colors: {
      검정: C_BLACK,
      흰색: C_WHITE,
      빨강: C_RED,
      녹색: C_GREEN,
      파랑: C_BLUE,
      노랑: C_YELLOW,
      자홍: C_MAGENTA,
      녹청: C_CYAN
    },
    general: 'G/표준',
    currency: '₩',
    format: xf({ h: 0, f: 0, o: 2, k: '-' }),
    sysdate: 'yyyy년 mmmm d일 dddd',
    systime: 'AM/PM h:mm:ss'
  }, 'ko');

  addLocale({
    group: ',',
    // ampm: _B('ก่อนเที่ยง;หลังเที่ยง'),
    mmmm: _M('มกร~;กุมภาพันธ์;มีน~;เมษายน;พฤษภ~;มิถุนายน;กรกฎ~;สิงห~;กันยายน;ตุล~;พฤศจิกายน;ธันว~', 'าคม'),
    mmm: _M('ม.ค.;ก.พ.;มี.ค.;เม.ย.;พ.ค.;มิ.ย.;ก.ค.;ส.ค.;ก.ย.;ต.ค.;พ.ย.;ธ.ค.'),
    dddd: _W('อาทิตย์;จันทร์;อังคาร;พุธ;พฤหัสบดี;ศุกร์;เสาร์'),
    ddd: _W('อา.;จ.;อ.;พ.;พฤ.;ศ.;ส.'),
    color: 'สี',
    colors: {
      ดำ: C_BLACK,
      ขาว: C_WHITE,
      แดง: C_RED,
      เขียว: C_GREEN,
      น้ำเงิน: C_BLUE,
      เหลือง: C_YELLOW,
      ม่วงมาเจนต้า: C_MAGENTA,
      ฟ้า: C_CYAN
    },
    currency: '฿',
    format: xf({ h: 0, d: 0, f: 0, m: 0, o: 1 }),
    sysdate: 'd mmmm yyyy',
    systime: 'h:mm:ss'
  }, 'th');

  addLocale(xm({
    decimal: ',',
    ampm: _B('dop.;odp.'),
    mmmm: _M('leden;únor;březen;duben;květen;červen;červenec;srpen;září;říjen;listopad;prosinec'),
    mmm: _M('I;II;III;IV;V;VI;VII;VIII;IX;X;XI;XII'),
    dddd: _W('neděle;pondělí;úterý;středa;čtvrtek;pátek;sobota'),
    bool: _B('PRAVDA;NEPRAVDA'),
    color: 'Barva',
    colors: {
      černá: C_BLACK,
      bílá: C_WHITE,
      červená: C_RED,
      zelená: C_GREEN,
      modrá: C_BLUE,
      žlutá: C_YELLOW,
      purpurová: C_MAGENTA,
      azurová: C_CYAN
    },
    general: 'Všeobecný',
    opcodes: { dy: 'r' },
    currency: 'Kč',
    format: xf({ h: 0, k: '.', l: '.' }),
    sysdate: 'dddd d. mmmm yyyy',
    systime: 'h:mm:ss'
  }, -1, 2), 'cs');

  addLocale(xm({
    group: '.',
    decimal: ',',
    mmmm: _M('januar;februar;marts;april;maj;juni;juli;august;september;oktober;november;december'),
    dddd: _W('søn~;man~;tirs~;ons~;tors~;fre~;lør~', 'dag'),
    bool: _B('SAND;FALSK'),
    color: 'Farve',
    colors: {
      sort: C_BLACK,
      hvid: C_WHITE,
      rød: C_RED,
      lysegrøn: C_GREEN,
      blå: C_BLUE,
      gul: C_YELLOW,
      lyslilla: C_MAGENTA,
      akvamarin: C_CYAN
    },
    general: 'Standard',
    opcodes: { dy: 'å', th: 't' },
    currency: 'kr.',
    format: xf({ k: '-' }),
    sysdate: 'd. mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 3, 2), 'da');

  addLocale(xm({
    group: '.',
    decimal: ',',
    mmmm: _M('januari;februari;maart;april;mei;juni;juli;augustus;september;oktober;november;december'),
    mmm: _M('jan;feb;mrt;apr;mei;jun;jul;aug;sep;okt;nov;dec'),
    dddd: _W('zondag;maandag;dinsdag;woensdag;donderdag;vrijdag;zaterdag'),
    bool: _B('WAAR;ONWAAR'),
    color: 'Kleur',
    colors: {
      zwart: C_BLACK,
      wit: C_WHITE,
      rood: C_RED, // mac
      root: C_RED, // win?
      groen: C_GREEN,
      blauw: C_BLUE,
      geel: C_YELLOW,
      magenta: C_MAGENTA,
      cyaan: C_CYAN
    },
    general: 'Standaard',
    opcodes: { dy: 'j', th: 'u' },
    currency: '€',
    format: xf({ d: 0, f: 2, m: 0, k: '-', s: 1 }),
    sysdate: 'dddd d mmmm yyyy',
    systime: 'hh:mm:ss'
  }, -1, 2), 'nl');

  addLocale({
    group: ',',
    format: xf({ h: 0, d: 0, f: 0, m: 0, o: 0, p: 1 }),
    sysdate: 'dddd, mmmm d, yyyy',
    systime: 'h:mm:ss AM/PM'
  }, 'en');
  addLocale({
    group: ',',
    format: xf({ h: 0, d: 0, f: 0, m: 0, o: 0, p: 1 }),
    sysdate: 'dddd, mmmm d, yyyy',
    systime: 'h:mm:ss AM/PM'
  }, 'en-US');
  addLocale({
    group: ',',
    format: xf({ h: 0, f: 0, o: 2, p: 0, k: '-' }),
    sysdate: 'mmmm d, yyyy',
    systime: 'h:mm:ss AM/PM'
  }, 'en-CA');
  addLocale({
    group: ',',
    color: 'Colour',
    ampm: [ 'AM', 'PM' ],
    format: xf({ h: 0, d: 0, f: 0, p: 0 }),
    sysdate: 'dddd, d mmmm yyyy',
    systime: 'h:mm:ss AM/PM'
  }, 'en-AU');
  addLocale({
    group: ',',
    color: 'Colour',
    ampm: [ 'AM', 'PM' ],
    currency: '£',
    format: xf({ f: 0, p: 0 }),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'en-GB');
  addLocale({
    group: ',',
    mmm: _M('Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sept;Oct;Nov;Dec'),
    color: 'Colour',
    ampm: [ 'am', 'pm' ],
    currency: '€',
    format: xf({ f: 0, p: 0 }),
    sysdate: 'dddd d mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'en-IE');

  addLocale(xm({
    decimal: ',',
    nan: 'epäluku',
    ampm: _B('ap.;ip.'),
    mmmm: _M('tammi~;helmi~;maalis~;huhti~;touko~;kesä~;heinä~;elo~;syys~;loka~;marras~;joulu~', 'kuu'),
    mmm: _M('tammi;helmi;maalis;huhti;touko;kesä;heinä;elo;syys;loka;marras;joulu'),
    dddd: _W('sunnun~;maanan~;tiis~;keskiviikko;tors~;perjan~;lauan~', 'tai'),
    bool: _B('TOSI;EPÄTOSI'),
    color: 'Väri',
    colors: {
      musta: C_BLACK,
      valkoinen: C_WHITE,
      punainen: C_RED,
      vihreä: C_GREEN,
      sininen: C_BLUE,
      keltainen: C_YELLOW,
      magenta: C_MAGENTA,
      syaani: C_CYAN
    },
    general: 'Yleinen',
    currency: '€',
    opcodes: { dy: 'v', dm: 'k', dd: 'p', th: 't' },
    format: xf({ h: 0, d: 0, p: 0, k: '.', l: '.', m: 0, c: 1 }),
    sysdate: 'dddd d. mmmm yyyy',
    systime: 'h.mm.ss'
  }, -1, 2), 'fi');

  const _fr = xm({
    group: '\u202f',
    decimal: ',',
    mmmm: _M('janvier;février;mars;avril;mai;juin;juillet;août;septembre;octobre;novembre;décembre'),
    mmm: _M('janv;févr;mars;avr;mai;juin;juil;août;sept;oct;nov;déc'),
    dddd: _W('~manche;lun~;mar~;mercre~;jeu~;vendre~;same~', 'di'),
    ddd: [ 'dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam' ],
    bool: _B('VRAI;FAUX'),
    color: 'Couleur',
    colors: {
      noir: C_BLACK,
      blanc: C_WHITE,
      rouge: C_RED,
      vert: C_GREEN,
      bleu: C_BLUE,
      jaune: C_YELLOW,
      magenta: C_MAGENTA,
      cyan: C_CYAN
    },
    opcodes: { dy: 'a', dd: 'j', wd: 'o' },
    general: 'Standard',
    systime: 'hh:mm:ss'
  }, -1, -13);
  addLocale({
    ..._fr,
    currency: '€',
    format: xf({}),
    sysdate: 'dddd d mmmm yyyy'
  }, 'fr');
  addLocale({
    ..._fr,
    // ampm: [ 'a.m.', 'p.m.' ],
    ampm: _B('AM;PM'),
    format: xf({ p: 1, o: 2, d: 1, k: '-', l: '-', s: 1 }),
    sysdate: 'd mmmm yyyy'
  }, 'fr-CA');
  addLocale({
    group: "'",
    decimal: '.',
    ..._fr,
    currency: 'CHF',
    format: xf({ o: 1, d: 1, k: '.', l: '.' }),
    sysdate: 'dddd, d mmmm yyyy'
  }, 'fr-CH');

  const _de = xm({
    mmmm: _M('Januar;Februar;März;April;Mai;Juni;Juli;August;September;Oktober;November;Dezember'),
    mmm: _M('Jan;Feb;Mrz;Apr;Mai;Jun;Jul;Aug;Sep;Okt;Nov;Dez'),
    dddd: _W('Sonn~;Mon~;Diens~;Mittwoch;Donners~;Frei~;Sams~', 'tag'),
    bool: _B('WAHR;FALSCH'),
    color: 'Farbe',
    colors: {
      schwarz: C_BLACK,
      weiß: C_WHITE,
      rot: C_RED,
      grün: C_GREEN,
      blau: C_BLUE,
      gelb: C_YELLOW,
      magenta: C_MAGENTA,
      zyan: C_CYAN
    },
    opcodes: { dy: 'j', dd: 't' },
    general: 'Standard',
    sysdate: 'dddd, d. mmmm yyyy',
    systime: 'hh:mm:ss'
  }, -1, 2);
  addLocale({ group: '.', decimal: ',', ..._de, currency: '€', format: xf({ k: '.', l: '. ' }) }, 'de');
  addLocale({ group: '’', decimal: '.', ..._de, currency: 'CHF', mmm: _M('Jan;Feb;Mär;Apr;Mai;Jun;Jul;Aug;Sep;Okt;Nov;Dez'), format: xf({ o: 1, d: 1, k: '.', f: 2, s: 1, l: '. ' }) }, 'de-CH');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('πμ;μμ'),
    mmmm: _M('Ιανουαρ~;Φεβρουαρ~;Μαρτ~;Απριλ~;Μαΐου;Ιουν~;Ιουλ~;Αυγούστου;Σεπτεμβρ~;Οκτωβρ~;Νοεμβρ~;Δεκεμβρ~', 'ίου'),
    mmm: _M('Ιαν;Φεβ;Μαρ;Απρ;Μαϊ;Ιουν;Ιουλ;Αυγ;Σεπ;Οκτ;Νοε;Δεκ'),
    dddd: _W('Κυριακή;Δευτέρα;Τρίτη;Τετάρτη;Πέμπτη;Παρασκευή;Σάββατο'),
    ddd: [ 'Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ' ],
    colors: {
      μαύρο: C_BLACK,
      λευκό: C_WHITE,
      κόκκινο: C_RED,
      πράσινο: C_GREEN,
      μπλε: C_BLUE,
      κίτρινο: C_YELLOW,
      ματζέντα: C_MAGENTA,
      γαλάζιο: C_CYAN
    },
    general: 'Γενικός τύπος',
    color: 'Χρώμα',
    opcodes: { dy: 'ε', dm: 'μ', dd: 'η', th: 'ω', tm: 'λ', ts: 'δ' },
    currency: '€',
    format: xf({ h: 0, d: 0, m: 0 }),
    sysdate: 'dddd, d mmmm yyyy',
    systime: 'h:mm:ss AM/PM'
  }, -1, 3), 'el');

  addLocale({
    decimal: ',',
    ampm: _B('de.;du.'),
    mmmm: _M('január;február;március;április;május;június;július;augusztus;szeptember;október;november;december'),
    mmm: _M('jan;febr;márc;ápr;máj;jún;júl;aug;szept;okt;nov;dec'),
    dddd: _W('vasárnap;hétfő;kedd;szerda;csütörtök;péntek;szombat'),
    ddd: _W('V;H;K;Sze;Cs;P;Szo'),
    bool: _B('IGAZ;HAMIS'),
    currency: 'Ft',
    general: 'Normál',
    opcodes: { dy: 'é', dm: 'h', dd: 'n', th: 'ó', tm: 'p', ts: 'm' },
    colors: {
      fekete: C_BLACK,
      fehér: C_WHITE,
      piros: C_RED,
      zöld: C_GREEN,
      kék: C_BLUE,
      sárga: C_YELLOW,
      bíbor: C_MAGENTA,
      ciánkék: C_CYAN
    },
    color: 'Szín',
    format: xf({ h: 0, o: 2, k: '.', l: '.', d: 1 }),
    sysdate: 'yyyy. mmmm d".", dddd', // XXX: Illegal format!?
    systime: 'h:mm:ss'
  }, 'hu');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('f.h.;e.h.'),
    mmmm: _M('janúar;febrúar;mars;apríl;maí;júní;júlí;ágúst;september;október;nóvember;desember'),
    dddd: _W('sunnu~;mánu~;þriðju~;miðviku~;fimmtu~;föstu~;laugar~', 'dagur'),
    currency: 'kr.',
    format: xf({ d: 0, m: 0, k: '.', l: '.' }),
    sysdate: 'dddd, d. mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 3, 3), 'is');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('AM;PM'),
    mmmm: _M('Januari;Februari;Maret;April;Mei;Juni;Juli;Agustus;September;Oktober;November;Desember'),
    dddd: _W('Minggu;Senin;Selasa;Rabu;Kamis;Jumat;Sabtu'),
    ddd: _W('Mgg;Sen;Sel;Rab;Kam;Jum;Sab'),
    color: 'Warna',
    colors: {
      hitam: C_BLACK,
      putih: C_WHITE,
      merah: C_RED,
      hijau: C_GREEN,
      biru: C_BLUE,
      kuning: C_YELLOW,
      magenta: C_MAGENTA,
      sian: C_CYAN
    },
    currency: 'Rp',
    format: xf({ f: 0, b: '.' }),
    sysdate: 'dddd, dd mmmm yyyy',
    systime: 'hh.mm.ss'
  }, 3, 3), 'id');

  const _it = xm({
    mmmm: _M('gennaio;febbraio;marzo;aprile;maggio;giugno;luglio;agosto;settembre;ottobre;novembre;dicembre'),
    dddd: _W('domenica;lunedì;martedì;mercoledì;giovedì;venerdì;sabato'),
    bool: _B('VERO;FALSO'),
    general: 'Standard',
    color: 'Colore',
    colors: {
      nero: C_BLACK,
      bianco: C_WHITE,
      rosso: C_RED,
      verde: C_GREEN,
      blu: C_BLUE,
      giallo: C_YELLOW,
      fucsia: C_MAGENTA,
      celeste: C_CYAN, // mac
      ciano: C_CYAN // win
    },
    opcodes: { dy: 'a', dd: 'g', wd: 'o', en: 'x' },
    systime: 'hh:mm:ss'
  }, 3, 3);
  addLocale({
    group: '.',
    decimal: ',',
    ..._it,
    currency: '€',
    format: xf({}),
    sysdate: 'dddd d mmmm yyyy'
  }, 'it');
  addLocale({
    group: '’',
    decimal: '.',
    ..._it,
    currency: 'CHF',
    format:
    xf({ o: 1, d: 1, k: '.', l: '.', f: 2, s: 1 }),
    sysdate: 'dddd, d mmmm yyyy'
  }, 'it-CH');

  const _no = {
    decimal: ',',
    ampm: _B('a.m.;p.m.'),
    mmmm: _M('januar;februar;mars;april;mai;juni;juli;august;september;oktober;november;desember'),
    mmm: _M('jan;feb;mar;apr;mai;jun;jul;aug;sep;okt;nov;des'),
    dddd: _W('søn~;man~;tirs~;ons~;tors~;fre~;lør~', 'dag'),
    bool: _B('SANN;USANN'),
    color: 'Farge',
    colors: {
      svart: C_BLACK,
      hvit: C_WHITE,
      rød: C_RED,
      grønn: C_GREEN,
      blå: C_BLUE,
      gul: C_YELLOW,
      magenta: C_MAGENTA,
      cyan: C_CYAN
    } as Colors,
    general: 'Standard',
    opcodes: { dy: 'å', th: 't' },
    currency: 'kr',
    sysdate: 'dddd d. mmmm yyyy',
    systime: 'hh:mm:ss'
  };
  addLocale(xm({ ..._no, format: xf({ f: 2, c: 1, k: '.', l: '.', s: 1 }) }, -1, 3), 'nb');
  addLocale(xm({ ..._no, format: xf({ f: 2, c: 1, k: '.', l: '.', s: 1 }) }, -1, 3), 'no');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('styczeń;luty;marzec;kwiecień;maj;czerwiec;lipiec;sierpień;wrzesień;październik;listopad;grudzień'),
    dddd: _W('niedziela;poniedziałek;wtorek;środa;czwartek;piątek;sobota'),
    ddd: _W('niedz;pon;wt;śr;czw;pt;sob'),
    bool: _B('PRAWDA;FAŁSZ'),
    color: 'Kolor',
    colors: {
      czarny: C_BLACK,
      biały: C_WHITE,
      czerwony: C_RED,
      zielony: C_GREEN,
      niebieski: C_BLUE,
      żółty: C_YELLOW,
      amarantowy: C_MAGENTA,
      błękitny: C_CYAN
    },
    general: 'Standardowy',
    opcodes: { dy: 'r', th: 'g' },
    currency: 'zł',
    format: xf({ d: 0, k: '.', l: '.' }),
    sysdate: 'dddd, d mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 3, -1), 'pl');

  const _pt = {
    decimal: ',',
    mmmm: _M('janeiro;fevereiro;março;abril;maio;junho;julho;agosto;setembro;outubro;novembro;dezembro'),
    dddd: _W('domingo;segunda-feira;terça-feira;quarta-feira;quinta-feira;sexta-feira;sábado'),
    bool: _B('VERDADEIRO;FALSO'),
    opcodes: { dy: 'a', wd: 'o' },
    color: 'Cor'
  };
  addLocale({
    ...xm(_pt, 3, 3),
    group: '\u202f',
    general: 'Estandar',
    colors: {
      preto: C_BLACK,
      branco: C_WHITE,
      vermelho: C_RED,
      verde: C_GREEN,
      azul: C_BLUE,
      amarelo: C_YELLOW,
      magenta: C_MAGENTA,
      turquesa: C_CYAN, // mac
      ciano: C_CYAN // pc
    },
    currency: '€',
    format: xf({ l: '/' }),
    sysdate: 'd "de" mmmm "de" yyyy',
    systime: 'hh:mm:ss'
  }, 'pt');
  addLocale({
    ...xm(_pt, 3, 3),
    group: '.',
    general: 'Geral',
    colors: {
      preto: C_BLACK,
      branco: C_WHITE,
      vermelho: C_RED,
      verde: C_GREEN,
      azul: C_BLUE,
      amarelo: C_YELLOW,
      magenta: C_MAGENTA,
      ciano: C_CYAN
    },
    currency: 'R$',
    format: xf({ f: 2, l: '/' }),
    sysdate: 'dddd, d "de" mmmm "de" yyyy',
    systime: 'hh:mm:ss'
  }, 'pt-BR');

  addLocale({
    decimal: ',',
    nan: 'не\u00A0число',
    mmmm: _M('Январь;Февраль;Март;Апрель;Май;Июнь;Июль;Август;Сентябрь;Октябрь;Ноябрь;Декабрь'),
    mmm: _M('янв;фев;мар;апр;май;июн;июл;авг;сен;окт;ноя;дек'),
    dddd: _W('воскресенье;понедельник;вторник;среда;четверг;пятница;суббота'),
    ddd: _W('Вс;Пн;Вт;Ср;Чт;Пт;Сб'),
    mmmm6: _M('рамадан;шавваль;зуль-каада;зуль-хиджжа;мухаррам;раби-уль-авваль;раби-уль-ахир;джумад-уль-авваль;джумад-уль-ахир;раджаб;шаабан;рамадан'),
    mmm6: _M('рам.;шав.;зуль-к.;зуль-х.;мух.;раб. I;раб. II;джум. I;джум. II;радж.;шааб.;рам.'),
    bool: _B('ИСТИНА;ЛОЖЬ'),
    general: 'Основной',
    opcodes: { dy: 'г', dm: 'м', dd: 'д', th: 'ч', tm: 'м', ts: 'с' },
    color: 'Цвет',
    colors: {
      черный: C_BLACK,
      белый: C_WHITE,
      красный: C_RED,
      зеленый: C_GREEN,
      синий: C_BLUE,
      желтый: C_YELLOW,
      фиолетовый: C_MAGENTA, // mac
      пурпурный: C_MAGENTA, // win
      голубой: C_CYAN
    },
    currency: '₽',
    format: xf({ h: 0, k: '.', l: '.' }),
    sysdate: 'd mmmm yyyy "г."',
    systime: 'h:mm:ss'
  }, 'ru');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('január;február;marec;apríl;máj;jún;júl;august;september;október;november;december'),
    mmm: _M('1;2;3;4;5;6;7;8;9;10;11;12'),
    dddd: _W('nedeľa;pondelok;utorok;streda;štvrtok;piatok;sobota'),
    color: 'Farba',
    colors: {
      čierna: C_BLACK,
      biela: C_WHITE,
      červená: C_RED,
      zelená: C_GREEN,
      modrá: C_BLUE,
      žltá: C_YELLOW,
      purpurová: C_MAGENTA,
      azúrová: C_CYAN
    },
    currency: '€',
    format: xf(fp2),
    sysdate: 'dddd d. mmmm yyyy',
    systime: 'h:mm:ss'
  }, 3, 2), 'sk');

  const _es = {
    group: '.',
    decimal: ',',
    ampm: _B('a.\u00A0m.;p.\u00A0m.'),
    mmmm: _M('enero;febrero;marzo;abril;mayo;junio;julio;agosto;septiem~;octu~;noviem~;diciem~', 'bre'),
    mmm: _M('ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic'),
    dddd: _W('domingo;lunes;martes;miércoles;jueves;viernes;sábado'),
    ddd: _W('dom;lun;mar;mié;jue;vie;sáb'),
    bool: _B('VERDADERO;FALSO'),
    colors: {
      negro: C_BLACK,
      blanco: C_WHITE,
      rojo: C_RED,
      verde: C_GREEN,
      azul: C_BLUE,
      amarillo: C_YELLOW,
      magenta: C_MAGENTA,
      cian: C_CYAN, // mac
      ciano: C_CYAN // pc
    } as Colors,
    systime: 'h:mm:ss',
    sysdate: 'dddd, d "de" mmmm "de" yyyy'
  };
  const _esM3 = _M('ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic');
  const _esM3s = _M('ene;feb;mar;abr;may;jun;jul;ago;sept;oct;nov;dic');
  addLocale({
    ..._es,
    ampm: _B('AM;PM'),
    ddd: _W('do;lu;ma;mi;ju;vi;sá'),
    general: 'Estándar',
    opcodes: { dy: 'a', wd: 'o' },
    currency: '€',
    format: xf({ h: 0, d: 1 })
  }, 'es');
  addLocale({ ..._es, mmm: _esM3s, format: xf({ d: 0, f: 2, m: 0 }), systime: 'hh:mm:ss' }, 'es-AR');
  addLocale({ ..._es, mmm: _esM3s, currency: 'Bs', format: xf({ d: 0, f: 0, m: 0 }), systime: 'hh:mm:ss' }, 'es-BO');
  addLocale({ ..._es, mmm: _esM3s, format: xf({ h: 0, f: 0, s: 1, k: '-' }) }, 'es-CL');
  addLocale({ ..._es, mmm: _esM3, format: xf({ h: 0, d: 0, f: 2 }), systime: 'h:mm:ss AM/PM' }, 'es-CO');
  addLocale({ ..._es, mmm: _esM3s, format: xf(fp5) }, 'es-EC');
  addLocale({
    ..._es,
    mmm: _esM3s,
    currency: '₲',
    format: xf({ d: 0, f: 2, s: 1, m: 0 }),
    systime: 'hh:mm:ss'
  }, 'es-PY');
  addLocale({
    ..._es,
    group: ',',
    decimal: '.',
    mmm: _esM3,
    ampm: _B('a. m.;p. m.'),
    opcodes: { dy: 'a', wd: 'o' },
    general: 'Estándar',
    format: xf({ f: 0, i: 1 }),
    systime: 'hh:mm:ss AM/PM'
  }, 'es-MX');
  addLocale({
    ..._es,
    mmmm: _M('Enero;Febrero;Marzo;Abril;Mayo;Junio;Julio;Agosto;Setiembre;Octubre;Noviembre;Diciembre'),
    mmm: _M('Ene;Feb;Mar;Abr;May;Jun;Jul;Ago;set;Oct;Nov;Dic'),
    format: xf({ d: 0, f: 2, h: 0, m: 0 })
  }, 'es-UY');
  addLocale({
    ..._es,
    mmm: _esM3s,
    currency: 'Bs.S',
    format: xf(fp5),
    systime: 'h:mm:ss AM/PM'
  }, 'es-VE');

  addLocale(xm({
    decimal: ',',
    ampm: _B('fm;em'),
    mmmm: _M('januari;februari;mars;april;maj;juni;juli;augusti;september;oktober;november;december'),
    dddd: _W('sön~;mån~;tis~;ons~;tors~;fre~;lör~', 'dag'),
    opcodes: { dy: 'å', th: 't' },
    bool: [ 'SANT', 'FALSKT' ],
    general: 'Standard',
    color: 'Färg',
    colors: {
      svart: C_BLACK,
      vit: C_WHITE,
      röd: C_RED,
      grön: C_GREEN,
      blå: C_BLUE,
      gul: C_YELLOW,
      magenta: C_MAGENTA,
      cyanblå: C_CYAN
    },
    currency: 'kr',
    format: xf({ o: 2, k: '-' }),
    sysdate: '"den" d mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 3, 3), 'sv');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('ÖÖ;ÖS'),
    mmmm: _M('Ocak;Şubat;Mart;Nisan;Mayıs;Haziran;Temmuz;Ağustos;Eylül;Ekim;Kasım;Aralık'),
    mmm: _M('Oca;Şub;Mar;Nis;May;Haz;Tem;Ağu;Eyl;Eki;Kas;Ara'),
    dddd: _W('Pazar;Pazartesi;Salı;Çarşamba;Perşembe;Cuma;Cumartesi'),
    ddd: _W('Paz;Pzt;Sal;Çar;Per;Cum;Cmt'),
    bool: _B('DOĞRU;YANLIŞ'),
    color: 'Renk',
    colors: {
      siyah: C_BLACK,
      beyaz: C_WHITE,
      kırmızı: C_RED,
      yeşil: C_GREEN,
      mavi: C_BLUE,
      sarı: C_YELLOW,
      pembe: C_MAGENTA,
      camgöbeği: C_CYAN
    },
    opcodes: { dm: 'a', dd: 'g', th: 's', tm: 'd', ts: 'n' },
    general: 'Genel',
    currency: '₺',
    format: xf({ d: 0, f: 0, k: '.', l: '.' }),
    sysdate: 'd mmmm yyyy dddd',
    systime: 'hh:mm:ss'
  }, 3, -1), 'tr');

  addLocale({
    group: ',',
    // ampm: _B('yb;yh'),
    ampm: _B('AM;PM'),
    mmmm: _M('Ionawr;Chwefror;Mawrth;Ebrill;Mai;Mehefin;Gorffennaf;Awst;Medi;Hydref;Tachwedd;Rhagfyr'),
    mmm: _M('Ion;Chwef;Maw;Ebr;Mai;Meh;Gorff;Awst;Medi;Hyd;Tach;Rhag'),
    dddd: _W('Dydd Sul;Dydd Llun;Dydd Mawrth;Dydd Mercher;Dydd Iau;Dydd Gwener;Dydd Sadwrn'),
    ddd: _W('Sul;Llun;Maw;Mer;Iau;Gwe;Sad'),
    currency: '£',
    format: xf({ f: 0, p: 0 }),
    sysdate: 'dddd, d mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'cy');

  addLocale({
    group:  '.',
    decimal:  ',',
    mmmm: _M('yanvar;fevral;mart;aprel;may;iyun;iyul;avqust;sentyabr;oktyabr;noyabr;dekabr'),
    mmm: _M('yan;fev;mar;apr;may;iyn;iyl;avq;sen;okt;noy;dek'),
    dddd: _W('bazar;bazar ertəsi;çərşənbə axşamı;çərşənbə;cümə axşamı;cümə;şənbə'),
    ddd: _W('B;B.E;Ç.A;Ç;C.A;C;Ş'),
    currency: '₼',
    format: xf(fp1),
    sysdate: 'd mmmm yyyy, dddd',
    systime: 'hh:mm:ss'
  }, 'az');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('студзень;люты;сакавік;красавік;май;чэрвень;ліпень;жнівень;верасень;кастрычнік;лістапад;снежань'),
    mmm: _M('студз;лют;сак;крас;май;чэрв;ліп;жн;вер;кастр;ліст;снеж'),
    dddd: _W('нядзеля;панядзелак;аўторак;серада;чацвер;пятніца;субота'),
    ddd:  _W('нд;пн;аўт;ср;чц;пт;сб'),
    currency: 'Br',
    format: xf({ y: 1, k: '.', l: '.' }),
    sysdate: 'd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 3, -1), 'be');

  addLocale({
    decimal: ',',
    // ampm: _B('пр.об.;сл.об.'),
    mmmm: _M('януари;февруари;март;април;май;юни;юли;август;септември;октомври;ноември;декември'),
    mmm: _M('яну;фев;мар;апр;май;юни;юли;авг;сеп;окт;ное;дек'),
    dddd: _W('неделя;понеделник;вторник;сряда;четвъртък;петък;събота'),
    ddd: _W('нед;пон;вт;ср;четв;пет;съб'),
    currency: 'лв.',
    // bool: _B('ИСТИНА;ЛОЖЬ'),
    format: xf(fp2),
    sysdate: 'dd mmmm yyyy "г."',
    systime: 'h:mm:ss'
  }, 'bg');

  addLocale({
    group:  '.',
    decimal:  ',',
    mmmm: _M('gener;febrer;març;abril;maig;juny;juliol;agost;setembre;octubre;novembre;desembre'),
    mmm:  _M('gen;febr;març;abr;maig;juny;jul;ag;set;oct;nov;des'),
    dddd: _W('diumenge;dilluns;dimarts;dimecres;dijous;divendres;dissabte'),
    ddd:  _W('dg;dl;dt;dc;dj;dv;ds'),
    general: 'Estándar',
    opcodes: { dy: 'a', wd: 'o' },
    ampm: _B('a.\u00a0m.;p.\u00a0m.'),
    currency: '€',
    format: xf({ d: 0, o: 1, h: 0, m: 0 }),
    sysdate: 'dddd, d mmmm "de" yyyy',
    systime: 'h:mm:ss'
  }, 'ca');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    mmmm: _M('Enero;Pebrero;Marso;Abril;Mayo;Hunyo;Hulyo;Agosto;Setyembre;Oktubre;Nobyembre;Disyembre'),
    dddd: _W('Linggo;Lunes;Martes;Miyerkules;Huwebes;Biyernes;Sabado'),
    currency: '₱',
    format: xf({ h: 0, d: 0, f: 0, m: 0, o: 0 }),
    sysdate: 'dddd, mmmm d, yyyy',
    systime: 'h:mm:ss AM/PM'
  }, 3, 3), 'fil');

  addLocale({
    group:  ',',
    decimal:  '.',
    ampm:  [ 'પૂર્વ મધ્યાહ્ન', 'ઉત્તર મધ્યાહ્ન' ],
    mmmm: _M('જાન્યુઆરી;ફેબ્રુઆરી;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટેમ્બર;ઑક્ટોબર;નવેમ્બર;ડિસેમ્બર'),
    mmm: _M('જાન્યુ;ફેબ્રુ;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગ;સપ્ટે;ઑક્ટો;નવે;ડિસે'),
    dddd: _W('રવિ~;સોમ~;મંગળ~;બુધ~;ગુરુ~;શુક્ર~;શનિ~', 'વાર'),
    ddd: _W('રવિ;સોમ;મંગળ;બુધ;ગુરુ;શુક્ર;શનિ'),
    currency: '₹',
    format: xf(fp3),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'gu');

  addLocale({
    group:  ',',
    decimal:  '.',
    ampm: _B('לפ׳;אח׳'),
    dddd: [ 'יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת' ],
    ddd: [ 'יום א', 'יום ב', 'יום ג', 'יום ד', 'יום ה', 'יום ו', 'שבת' ],
    mmmm: _M('ינואר;פברואר;מרץ;אפריל;מאי;יוני;יולי;אוגוסט;ספטמבר;אוקטובר;נובמבר;דצמבר'),
    mmm: _M('ינו;פבר;מרץ;אפר;מאי;יונ;יול;אוג;ספט;אוק;נוב;דצמ'),
    mmmm6: _M('רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע אל־אוול;רביע א־ת׳אני;ג׳ומאדא אל־אולא;ג׳ומאדא א־ת׳אניה;רג׳ב;שעבאן;רמדאן'),
    mmm6: _M('רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע א׳;רביע ב׳;ג׳ומאדא א׳;ג׳ומאדא ב׳;רג׳ב;שעבאן;רמדאן'),
    color: 'צבע',
    colors: {
      'שחור': C_BLACK,
      'לבן': C_WHITE,
      'אדום': C_RED,
      'ירוק': C_GREEN,
      'כחול': C_BLUE,
      'צהוב': C_YELLOW,
      'אדום ארגמן': C_MAGENTA,
      'תכלת': C_CYAN
    },
    currency: '₪',
    format: xf({ f: 2, s: 1 }),
    sysdate: 'dddd dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'he');

  addLocale(xm({
    group:  '.',
    decimal:  ',',
    mmmm: _M('siječanj;veljača;ožujak;travanj;svibanj;lipanj;srpanj;kolovoz;rujan;listopad;studeni;prosinac'),
    mmm:  _M('sij;vlj;ožu;tra;svi;lip;srp;kol;ruj;lis;stu;pro'),
    dddd: _W('nedjelja;ponedjeljak;utorak;srijeda;četvrtak;petak;subota'),
    currency: '€',
    format: xf(fp2),
    sysdate: 'd. mmmm yyyy.',
    systime: 'h:mm:ss'
  }, -1, 3), 'hr');

  addLocale({
    decimal: ',',
    mmmm: _M('Հունվար;Փետրվար;Մարտ;Ապրիլ;Մայիս;Հունիս;Հուլիս;Օգոստոս;Սեպտեմբեր;Հոկտեմբեր;Նոյեմբեր;Դեկտեմբեր'),
    mmm:  _M('Հնվ;Փտվ;Մրտ;Ապր;Մյս;Հնս;Հլս;Օգս;Սպտ;Հկտ;Նյմ;Դկտ'),
    dddd: _W('Կիրակի;Երկուշաբթի;Երեքշաբթի;Չորեքշաբթի;Հինգշաբթի;Ուրբաթ;Շաբաթ'),
    ddd:  _W('Կիր;Երկ;Երք;Չրք;Հնգ;Ուր;Շբթ'),
    currency: '֏',
    format: xf(fp1),
    sysdate: 'd mmmm, yyyy',
    systime: 'hh:mm:ss'
  }, 'hy');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('იანვარი;თებერვალი;მარტი;აპრილი;მაისი;ივნისი;ივლისი;აგვისტო;სექტემბერი;ოქტომბერი;ნოემბერი;დეკემბერი'),
    dddd: _W('კვირა;ორშაბათი;სამშაბათი;ოთხშაბათი;ხუთშაბათი;პარასკევი;შაბათი'),
    ddd: _W('კვ;ორშ;სამშ;ოთხშ;ხუთშ;პარ;შაბ'),
    currency: '₾',
    format: xf(fp1),
    sysdate: 'dddd, dd mmmm, yyyy',
    systime: 'hh:mm:ss'
  }, 3, -1), 'ka');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('Қаңтар;Ақпан;Наурыз;Сәуір;Мамыр;Маусым;Шілде;Тамыз;Қыркүйек;Қазан;Қараша;Желтоқсан'),
    mmm: _M('қаң;ақп;нау;сәу;мам;мау;шіл;там;қыр;қаз;қар;жел'),
    dddd: _W('жексенбі;дүйсенбі;сейсенбі;сәрсенбі;бейсенбі;жұма;сенбі'),
    ddd:  _W('жек;дүй;сей;сәр;бей;жұм;сен'),
    opcodes: { dy: 'г', dm: 'м', dd: 'д', th: 'ч', tm: 'м', ts: 'с' },
    currency: '₸',
    general: 'Основной',
    format: xf(fp1),
    sysdate: 'yyyy ж. d mmmm, dddd',
    systime: 'hh:mm:ss'
  }, -1, -1), 'kk');

  addLocale({
    group:  ',',
    mmmm: _M('ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಏಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್'),
    mmm:  _M('ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಎಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್'),
    dddd: _W('ಭಾನು~;ಸೋಮ~;ಮಂಗಳ~;ಬುಧ~;ಗುರು~;ಶುಕ್ರ~;ಶನಿ~', 'ವಾರ'),
    ddd:  _W('ಭಾನು;ಸೋಮ;ಮಂಗಳ;ಬುಧ;ಗುರು;ಶುಕ್ರ;ಶನಿ'),
    ampm: _B('ಪೂರ್ವಾಹ್ನ;ಅಪರಾಹ್ನ'),
    currency: '₹',
    format: xf(fp3),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'kn');

  addLocale({
    decimal:  ',',
    mmmm: _M('sausis;vasaris;kovas;balandis;gegužė;birželis;liepa;rugpjūtis;rugsėjis;spalis;lapkritis;gruodis'),
    mmm:  _M('saus;vas;kov;bal;geg;birž;liep;rugp;rugs;spal;lapkr;gruod'),
    dddd: _W('sekmadienis;pirmadienis;antradienis;trečiadienis;ketvirtadienis;penktadienis;šeštadienis'),
    ddd:  _W('sk;pr;an;tr;kt;pn;št'),
    ampm: _B('priešpiet;popiet'),
    currency:  '€',
    format: xf({ o: 2, k: '-' }),
    sysdate: 'yyyy "m." mmmm d "d.," dddd', // XXX: illegal format
    systime: 'hh:mm:ss'
  }, 'lt');

  addLocale({
    decimal:  ',',
    mmmm: _M('janvāris;februāris;marts;aprīlis;maijs;jūnijs;jūlijs;augusts;septembris;oktobris;novembris;decembris'),
    mmm:  _M('janv;febr;marts;apr;maijs;jūn;jūl;aug;sept;okt;nov;dec'),
    dddd: _W('svētdiena;pirmdiena;otrdiena;trešdiena;ceturtdiena;piektdiena;sestdiena'),
    ddd:  _W('Svētd;Pirmd;Otrd;Trešd;Ceturtd;Piektd;Sestd'),
    ampm: _B('priekšp.;pēcp.'),
    currency: '€',
    format: xf(fp1),
    sysdate: 'dddd, yyyy. "gada" d. mmmm', // XXX: ???
    systime: 'hh:mm:ss'
  }, 'lv');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('ജനുവരി;ഫെബ്രുവരി;മാര്‍‌ച്ച്;ഏപ്രില്‍;മേയ്;ജൂൺ;ജൂലൈ;ആഗസ്റ്റ്;സെപ്‌റ്റംബര്‍;ഒക്‌ടോബര്‍;നവംബര്‍;ഡിസംബര്‍'),
    mmm: _M('ജനു;ഫെബ്രു;മാർ;ഏപ്രി;മേയ്;ജൂൺ;ജൂലൈ;ഓഗ;സെപ്റ്റം;ഒക്ടോ;നവം;ഡിസം'),
    dddd: _W('ഞായറാഴ്‌ച;തിങ്കളാഴ്‌ച;ചൊവ്വാഴ്ച;ബുധനാഴ്‌ച;വ്യാഴാഴ്‌ച;വെള്ളിയാഴ്‌ച;ശനിയാഴ്‌ച'),
    ddd: _W('ഞായർ;തിങ്കൾ;ചൊവ്വ;ബുധൻ;വ്യാഴം;വെള്ളി;ശനി'),
    currency: '₹',
    format: xf({ d: 0, m: 0, h: 0, y: 0, f: 0, o: 1, k: '/', b: ':', s: 0 }),
    sysdate: 'yyyy, mmmm d, dddd',
    systime: 'h:mm:ss AM/PM'
  }, 'ml');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('Нэгдүгээ~;Хоёрдугаа~;Гуравдугаа~;Дөрөвдүгээ~;Тавдугаа~;Зургаадугаа~;Долоодугаа~;Наймдугаа~;Есдүгээ~;Аравдугаа~;Арван нэгдүгээ~;Арван хоёрдугаар са', 'р сар'),
    mmm:  _M('1~;2~;3~;4~;5~;6~;7~;8~;9~;10~;11~;12~', '-р сар'),
    dddd: _W('ням;даваа;мягмар;лхагва;пүрэв;баасан;бямба'),
    ddd:  _W('Ня;Да;Мя;Лха;Пү;Ба;Бя'),
    ampm: _B('ү.ө.;ү.х.'),
    currency: '₮',
    format: xf({ o: 2, f: 2, k: '.', l: '.' }),
    sysdate: 'yyyy оны mmmmын d, dddd гараг', // XXX: ???
    systime: 'hh:mm:ss'
  }, 'mn');

  addLocale({
    group:  ',',
    decimal:  '.',
    ampm: [ 'म.पू.', 'म.नं.' ],
    mmmm: _M('जानेवारी;फेब्रुवारी;मार्च;एप्रिल;मे;जून;जुलै;ऑगस्ट;सप्टेंबर;ऑक्टोबर;नोव्हेंबर;डिसेंबर'),
    mmm:  _M('जाने;फेब्रु;मार्च;एप्रि;मे;जून;जुलै;ऑग;सप्टें;ऑक्टो;नोव्हें;डिसें'),
    dddd: _W('रविवार;सोमवार;मंगळवार;बुधवार;गुरुवार;शुक्रवार;शनिवार'),
    ddd:  _W('रवि;सोम;मंगळ;बुध;गुरु;शुक्र;शनि'),
    currency: '₹',
    format: xf(fp4),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'mr');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    mmmm: _M('ဇန်နဝါရီ;ဖေဖော်ဝါရီ;မတ်;ဧပြီ;မေ;ဇွန်;ဇူလိုင်;ဩဂုတ်;စက်တင်ဘာ;အောက်တိုဘာ;နိုဝင်ဘာ;ဒီဇင်ဘာ'),
    mmm:  _M('ဇန်;ဖေ;မတ်;ဧ;မေ;ဇွန်;ဇူ;ဩ;စက်;အောက်;နို;ဒီ'),
    dddd: _W('တနင်္ဂနွေ;တနင်္လာ;အင်္ဂါ;ဗုဒ္ဓဟူး;ကြာသပတေး;သောကြာ;စနေ'),
    ampm: _B('နံနက်;ညနေ'),
    currency: 'K',
    format: xf({ h: 0, d: 0, m: 0 }),
    sysdate: 'yyyy၊ mmmm d၊ dddd',
    systime: 'h:mm:ss'
  }, -1, 0), 'my');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    mmmm: _M('ਜਨਵਰੀ;ਫ਼ਰਵਰੀ;ਮਾਰਚ;ਅਪ੍ਰੈਲ;ਮਈ;ਜੂਨ;ਜੁਲਾਈ;ਅਗਸਤ;ਸਤੰਬਰ;ਅਕਤੂਬਰ;ਨਵੰਬਰ;ਦਸੰਬਰ'),
    dddd: _W('ਐਤਵਾਰ;ਸੋਮਵਾਰ;ਮੰਗਲਵਾਰ;ਬੁੱਧਵਾਰ;ਵੀਰਵਾਰ;ਸ਼ੁੱਕਰਵਾਰ;ਸ਼ਨਿੱਚਰਵਾਰ'),
    ddd:  _W('ਐਤ;ਸੋਮ;ਮੰਗਲ;ਬੁੱਧ;ਵੀਰ;ਸ਼ੁਕਰ;ਸ਼ਨਿੱਚਰ'),
    ampm: [ 'ਸਵੇਰ', 'ਸ਼ਾਮ' ],
    currency: '₹',
    format: xf({ d: 1, i: 1, y: 1, f: 2, o: 1, k: '-', b: ':', s: 1 }),
    sysdate: 'dd mmmm yyyy dddd',
    systime: 'AM/PM hh:mm:ss'
  }), 'pa');

  addLocale({
    group:  '.',
    decimal:  ',',
    mmmm: _M('ianuarie;februarie;martie;aprilie;mai;iunie;iulie;august;septem~;octom~;noiem~;decem~', 'brie'),
    mmm:  _M('ian;feb;mar;apr;mai;iun;iul;aug;sept;oct;nov;dec'),
    dddd: _W('duminică;luni;marți;miercuri;joi;vineri;sâmbătă'),
    ddd:  _W('dum;lun;mar;mie;joi;vin;sâm'),
    ampm: _B('a.m.;p.m.'),
    currency: 'lei',
    format: xf(fp1),
    sysdate: 'dddd, d mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'ro');

  addLocale(xm({
    group:  '.',
    decimal:  ',',
    mmmm: _M('januar;februar;marec;april;maj;junij;julij;avgust;september;oktober;november;december'),
    dddd: _W('nedelja;ponedeljek;torek;sreda;četrtek;petek;sobota'),
    ampm: _B('dop.;pop.'),
    currency: '€',
    format: xf({ d: 0, k: '.', l: '.' }),
    sysdate: 'dddd, d. mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 3, 3), 'sl');

  addLocale(xm({
    group:  '.',
    decimal:  ',',
    mmmm: _M('januar;februar;mart;april;maj;jun;jul;avgust;septembar;oktobar;novembar;decembar'),
    dddd: _W('nedelja;ponedeljak;utorak;sreda;četvrtak;petak;subota'),
    currency: 'RSD',
    format: xf({ d: 0, m: 0, k: '.', l: '.' }),
    sysdate: 'dddd, d. mmmm yyyy.',
    systime: 'hh:mm:ss'
  }, 3, 3), 'sr');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    ampm: [ 'காலை', 'மாலை' ],
    mmmm: _M('ஜனவரி;பிப்ரவரி;மார்ச்;ஏப்ரல்;மே;ஜூன்;ஜூலை;ஆகஸ்ட்;செப்டம்பர்;அக்டோபர்;நவம்பர்;டிசம்பர்'),
    dddd: _W('ஞாயிறு;திங்கள்;செவ்வாய்;புதன்;வியாழன்;வெள்ளி;சனி'),
    currency: '₹',
    format: xf({ d: 1, y: 0, f: 2, o: 1, k: '-', b: ':', s: 1 }),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }), 'ta');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('జనవరి;ఫిబ్రవరి;మార్చి;ఏప్రిల్;మే;జూన్;జులై;ఆగస్టు;సెప్టెంబర్;అక్టోబర్;నవంబర్;డిసెంబర్'),
    mmm:  _M('జన;ఫిబ్ర;మార్చి;ఏప్రి;మే;జూన్;జులై;ఆగ;సెప్టెం;అక్టో;నవం;డిసెం'),
    dddd: _W('ఆదివారం;సోమవారం;మంగళవారం;బుధవారం;గురువారం;శుక్రవారం;శనివారం'),
    ddd:  _W('ఆది;సోమ;మంగళ;బుధ;గురు;శుక్ర;శని'),
    currency: '₹',
    format: xf({ d: 1, h: 0, y: 0, f: 0, o: 1, k: '-', b: ':', s: 0 }),
    sysdate: 'd, mmmm yyyy, dddd',
    systime: 'h:mm:ss AM/PM'
  }, 'te');

  addLocale({
    decimal:  ',',
    mmmm: _M('січень;лютий;березень;квітень;травень;червень;липень;серпень;вересень;жовтень;листопад;грудень'),
    mmm:  _M('Січ;Лют;Бер;Кві;Тра;Чер;Лип;Сер;Вер;Жов;Лис;Гру'),
    dddd: _W("неділя;понеділок;вівторок;середа;четвер;п'ятниця;субота"),
    ddd:  _W('Нд;Пн;Вт;Ср;Чт;Пт;Сб'),
    ampm: _B('дп;пп'),
    currency: '₴',
    format: xf({ h: 0, k: '.', l: '.' }),
    sysdate: 'd mmmm yyyy "р."',
    systime: 'h:mm:ss'
  }, 'uk');

  addLocale({
    group: '.',
    decimal: ',',
    mmmm: _M('~Giêng;~Hai;~Ba;~Tư;~Năm;~Sáu;~Bảy;~Tám;~Chín;~Mười;~Mười Một;~Mười Hai', 'Tháng '),
    mmm:  _M('~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12', 'Thg'),
    dddd: _W('Chủ Nhật;~Hai;~Ba;~Tư;~Năm;~Sáu;~Bảy', 'Thứ '),
    ddd:  _W('CN;T2;T3;T4;T5;T6;T7'),
    ampm: _B('SA;CH'),
    currency: '₫',
    format: xf({ h: 0, d: 1 }),
    sysdate: 'dd mmmm yyyy',
    systime: 'h:mm:ss AM/PM'
  }, 'vi');

  addLocale(xm({
    group:  '٬',
    decimal:  '٫',
    ampm: _B('ص;م'),
    percent: '٪',
    mmmm: _M('يناير;فبراير;مارس;أبريل;مايو;يونيو;يوليو;أغسطس;سبتمبر;أكتوبر;نوفمبر;ديسمبر'),
    dddd: _W('الأحد;الإثنين;الثلاثاء;الأربعاء;الخميس;الجمعة;السبت'),
    mmmm6: _M('رمضان;شوال;ذو القعدة;ذو الحجة;محرم;ربيع الأول;ربيع الآخرة;جمادى الأولى;جمادى الآخرة;رجب;شعبان;رمضان'),
    color: 'اللون',
    colors: {
      أسود: C_BLACK,
      أبيض: C_WHITE,
      أحمر: C_RED,
      أخضر: C_GREEN,
      أزرق: C_BLUE,
      أصفر: C_YELLOW,
      ماجنتا: C_MAGENTA,
      سماوي: C_CYAN
    },
    currency: '⃁',
    format: xf({ f: 2, i: 1, y: 1, s: 1 }),
    sysdate: 'dd/mmmm/yyyy',
    systime: 'hh:mm:ss AM/PM'
  }, 0, 0), 'ar');

  addLocale({
    group: ',',
    decimal: '.',
    ampm: [ 'AM', 'PM' ],
    mmmm: _M('জানুয়ারী;ফেব্রুয়ারী;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগস্ট;সেপ্টেম্বর;অক্টোবর;নভেম্বর;ডিসেম্বর'),
    mmm:  _M('জানু;ফেব্রু;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগ;সেপ্টে;অক্টো;নভে;ডিসে'),
    dddd: _W('রবিবার;সোমবার;মঙ্গলবার;বুধবার;বৃহস্পতিবার;শুক্রবার;শনিবার'),
    ddd:  _W('রবি.;সোম.;মঙ্গল.;বুধ.;বৃহস্পতি.;শুক্র.;শনি.'),
    currency: '₹',
    format: xf({ f: 2, y: 1, k: '-', b: '.', s: 1 }),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh.mm.ss'
  }, 'bn');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('जनवरी;फरवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितम्बर;अक्तूबर;नवम्बर;दिसम्बर'),
    mmm:  _M('जनवरी;फरवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितम्बर;अक्तूबर;नवम्बर;दिसम्बर'),
    dddd: _W('रविवार;सोमवार;मंगलवार;बुधवार;गुरुवार;शुक्रवार;शनिवार'),
    ddd:  _W('रवि.;सोम.;मंगल.;बुध.;गुरु.;शुक्र.;शनि.'),
    ampm: [ 'पूर्वाह्न', 'अपराह्न' ],
    currency: '₹',
    format: xf(fp4),
    sysdate: 'dd mmmm yyyy',
    systime: 'hh:mm:ss'
  }, 'hi');
}
