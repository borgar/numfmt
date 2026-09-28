import { addLocale, type DayNames, type LocaleData, type MonthNames } from './locale.ts';

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

export function initLocales () {
  const _zhM4 = _M('一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月');
  const _zhCl = {
    黑色: 'Black',
    白色: 'White',
    紅色: 'Red',
    綠色: 'Green',
    藍色: 'Blue',
    黃色: 'Yellow',
    洋紅: 'Magenta',
    青色: 'Cyan'
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
      黑色: 'Black',
      白色: 'White',
      红色: 'Red',
      绿色: 'Green',
      蓝色: 'Blue',
      黄色: 'Yellow',
      洋红: 'Magenta',
      蓝绿色: 'Cyan'
    },
    general: 'G/通用格式',
    currency: '¥'
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
    currency: 'NT$'
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
    currency: 'HK$'
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
      黒: 'Black',
      白: 'White',
      赤: 'Red',
      緑: 'Green',
      青: 'Blue',
      黄: 'Yellow',
      紫: 'Magenta',
      水: 'Cyan'
    }
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
      검정: 'Black',
      흰색: 'White',
      빨강: 'Red',
      녹색: 'Green',
      파랑: 'Blue',
      노랑: 'Yellow',
      자홍: 'Magenta',
      녹청: 'Cyan'
    },
    general: 'G/표준',
    currency: '₩'
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
      ดำ: 'Black',
      ขาว: 'White',
      แดง: 'Red',
      เขียว: 'Green',
      น้ำเงิน: 'Blue',
      เหลือง: 'Yellow',
      ม่วงมาเจนต้า: 'Magenta',
      ฟ้า: 'Cyan'
    },
    currency: '฿'
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
      černá: 'Black',
      bílá: 'White',
      červená: 'Red',
      zelená: 'Green',
      modrá: 'Blue',
      žlutá: 'Yellow',
      purpurová: 'Magenta',
      azurová: 'Cyan'
    },
    general: 'Všeobecný',
    opcodes: { dy: 'r' },
    currency: 'Kč'
  }, -1, 2), 'cs');

  addLocale(xm({
    group: '.',
    decimal: ',',
    mmmm: _M('januar;februar;marts;april;maj;juni;juli;august;september;oktober;november;december'),
    dddd: _W('søn~;man~;tirs~;ons~;tors~;fre~;lør~', 'dag'),
    bool: _B('SAND;FALSK'),
    color: 'Farve',
    colors: {
      sort: 'Black',
      hvid: 'White',
      rød: 'Red',
      lysegrøn: 'Green',
      blå: 'Blue',
      gul: 'Yellow',
      lyslilla: 'Magenta',
      akvamarin: 'Cyan'
    },
    general: 'Standard',
    opcodes: { dy: 'å', th: 't' },
    currency: 'kr.'
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
      zwart: 'Black',
      wit: 'White',
      rood: 'Red', // mac
      root: 'Red', // win?
      groen: 'Green',
      blauw: 'Blue',
      geel: 'Yellow',
      magenta: 'Magenta',
      cyaan: 'Cyan'
    },
    general: 'Standaard',
    opcodes: { dy: 'j', th: 'u' },
    currency: '€'
  }, -1, 2), 'nl');

  addLocale({ group: ',', preferMDY: true }, 'en');
  addLocale({ group: ',', preferMDY: true }, 'en-US');
  addLocale({ group: ',' }, 'en-CA');
  addLocale({ group: ',', color: 'Colour', ampm: [ 'AM', 'PM' ] }, 'en-AU');
  addLocale({ group: ',', color: 'Colour', ampm: [ 'AM', 'PM' ], currency: '£' }, 'en-GB');
  addLocale({
    group: ',',
    mmm: _M('Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sept;Oct;Nov;Dec'),
    color: 'Colour',
    ampm: [ 'am', 'pm' ],
    currency: '€'
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
      musta: 'Black',
      valkoinen: 'White',
      punainen: 'Red',
      vihreä: 'Green',
      sininen: 'Blue',
      keltainen: 'Yellow',
      magenta: 'Magenta',
      syaani: 'Cyan'
    },
    general: 'Yleinen',
    currency: '€',
    opcodes: { dy: 'v', dm: 'k', dd: 'p', th: 't' }
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
      noir: 'Black',
      blanc: 'White',
      rouge: 'Red',
      vert: 'Green',
      bleu: 'Blue',
      jaune: 'Yellow',
      magenta: 'Magenta',
      cyan: 'Cyan'
    },
    opcodes: { dy: 'a', dd: 'j', wd: 'o' },
    general: 'Standard'
  }, -1, -13);
  addLocale({ ..._fr, currency: '€' }, 'fr');
  addLocale({ ..._fr, ampm: [ 'a.m.', 'p.m.' ] }, 'fr-CA');
  addLocale({ group: "'", decimal: '.', ..._fr, currency: 'CHF' }, 'fr-CH');

  const _de = xm({
    mmmm: _M('Januar;Februar;März;April;Mai;Juni;Juli;August;September;Oktober;November;Dezember'),
    mmm: _M('Jan;Feb;Mrz;Apr;Mai;Jun;Jul;Aug;Sep;Okt;Nov;Dez'),
    dddd: _W('Sonn~;Mon~;Diens~;Mittwoch;Donners~;Frei~;Sams~', 'tag'),
    bool: _B('WAHR;FALSCH'),
    color: 'Farbe',
    colors: {
      schwarz: 'Black',
      weiß: 'White',
      rot: 'Red',
      grün: 'Green',
      blau: 'Blue',
      gelb: 'Yellow',
      magenta: 'Magenta',
      zyan: 'Cyan'
    },
    opcodes: { dy: 'j', dd: 't' },
    general: 'Standard'
  }, -1, 2);
  addLocale({ group: '.', decimal: ',', ..._de, currency: '€' }, 'de');
  addLocale({ group: '’', decimal: '.', ..._de, currency: 'CHF', mmm: _M('Jan;Feb;Mär;Apr;Mai;Jun;Jul;Aug;Sep;Okt;Nov;Dez') }, 'de-CH');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('πμ;μμ'),
    mmmm: _M('Ιανουαρ~;Φεβρουαρ~;Μαρτ~;Απριλ~;Μαΐου;Ιουν~;Ιουλ~;Αυγούστου;Σεπτεμβρ~;Οκτωβρ~;Νοεμβρ~;Δεκεμβρ~', 'ίου'),
    mmm: _M('Ιαν;Φεβ;Μαρ;Απρ;Μαϊ;Ιουν;Ιουλ;Αυγ;Σεπ;Οκτ;Νοε;Δεκ'),
    dddd: _W('Κυριακή;Δευτέρα;Τρίτη;Τετάρτη;Πέμπτη;Παρασκευή;Σάββατο'),
    ddd: [ 'Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ' ],
    colors: {
      μαύρο: 'Black',
      λευκό: 'White',
      κόκκινο: 'Red',
      πράσινο: 'Green',
      μπλε: 'Blue',
      κίτρινο: 'Yellow',
      ματζέντα: 'Magenta',
      γαλάζιο: 'Cyan'
    },
    general: 'Γενικός τύπος',
    color: 'Χρώμα',
    opcodes: { dy: 'ε', dm: 'μ', dd: 'η', th: 'ω', tm: 'λ', ts: 'δ' },
    currency: '€'
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
      fekete: 'Black',
      fehér: 'White',
      piros: 'Red',
      zöld: 'Green',
      kék: 'Blue',
      sárga: 'Yellow',
      bíbor: 'Magenta',
      ciánkék: 'Cyan'
    },
    color: 'Szín'
  }, 'hu');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('f.h.;e.h.'),
    mmmm: _M('janúar;febrúar;mars;apríl;maí;júní;júlí;ágúst;september;október;nóvember;desember'),
    dddd: _W('sunnu~;mánu~;þriðju~;miðviku~;fimmtu~;föstu~;laugar~', 'dagur'),
    currency: 'kr.'
  }, 3, 3), 'is');

  addLocale(xm({
    group: '.',
    decimal: ',',
    ampm: _B('.AM;.PM'),
    mmmm: _M('Januari;Februari;Maret;April;Mei;Juni;Juli;Agustus;September;Oktober;November;Desember'),
    dddd: _W('Minggu;Senin;Selasa;Rabu;Kamis;Jumat;Sabtu'),
    ddd: _W('Mgg;Sen;Sel;Rab;Kam;Jum;Sab'),
    color: 'Warna',
    colors: {
      hitam: 'Black',
      putih: 'White',
      merah: 'Red',
      hijau: 'Green',
      biru: 'Blue',
      kuning: 'Yellow',
      magenta: 'Magenta',
      sian: 'Cyan'
    },
    currency: 'Rp'
  }, 3, 3), 'id');

  const _it = xm({
    mmmm: _M('gennaio;febbraio;marzo;aprile;maggio;giugno;luglio;agosto;settembre;ottobre;novembre;dicembre'),
    dddd: _W('domenica;lunedì;martedì;mercoledì;giovedì;venerdì;sabato'),
    bool: _B('VERO;FALSO'),
    general: 'Standard',
    color: 'Colore',
    colors: {
      nero: 'Black',
      bianco: 'White',
      rosso: 'Red',
      verde: 'Green',
      blu: 'Blue',
      giallo: 'Yellow',
      fucsia: 'Magenta',
      celeste: 'Cyan', // mac
      ciano: 'Cyan' // win
    },
    opcodes: { dy: 'a', dd: 'g', wd: 'o', en: 'x' }
  }, 3, 3);
  addLocale({ group: '.', decimal: ',', ..._it, currency: '€' }, 'it');
  addLocale({ group: '’', decimal: '.', ..._it, currency: 'CHF' }, 'it-CH');

  const _no = {
    decimal: ',',
    ampm: _B('a.m.;p.m.'),
    mmmm: _M('januar;februar;mars;april;mai;juni;juli;august;september;oktober;november;desember'),
    mmm: _M('jan;feb;mar;apr;mai;jun;jul;aug;sep;okt;nov;des'),
    dddd: _W('søn~;man~;tirs~;ons~;tors~;fre~;lør~', 'dag'),
    bool: _B('SANN;USANN'),
    color: 'Farge',
    colors: {
      svart: 'Black',
      hvit: 'White',
      rød: 'Red',
      grønn: 'Green',
      blå: 'Blue',
      gul: 'Yellow',
      magenta: 'Magenta',
      cyan: 'Cyan'
    },
    general: 'Standard',
    opcodes: { dy: 'å', th: 't' },
    currency: 'kr'
  };
  addLocale(xm({ ..._no }, -1, 3), 'nb');
  addLocale(xm({ ..._no }, -1, 3), 'no');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('styczeń;luty;marzec;kwiecień;maj;czerwiec;lipiec;sierpień;wrzesień;październik;listopad;grudzień'),
    dddd: _W('niedziela;poniedziałek;wtorek;środa;czwartek;piątek;sobota'),
    ddd: _W('niedz;pon;wt;śr;czw;pt;sob'),
    bool: _B('PRAWDA;FAŁSZ'),
    color: 'Kolor',
    colors: {
      czarny: 'Black',
      biały: 'White',
      czerwony: 'Red',
      zielony: 'Green',
      niebieski: 'Blue',
      żółty: 'Yellow',
      amarantowy: 'Magenta',
      błękitny: 'Cyan'
    },
    general: 'Standardowy',
    opcodes: { dy: 'r', th: 'g' },
    currency: 'zł'
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
      preto: 'Black',
      branco: 'White',
      vermelho: 'Red',
      verde: 'Green',
      azul: 'Blue',
      amarelo: 'Yellow',
      magenta: 'Magenta',
      turquesa: 'Cyan', // mac
      ciano: 'Cyan' // pc
    },
    currency: '€'
  }, 'pt');
  addLocale({
    ...xm(_pt, 3, 3),
    group: '.',
    general: 'Geral',
    colors: {
      preto: 'Black',
      branco: 'White',
      vermelho: 'Red',
      verde: 'Green',
      azul: 'Blue',
      amarelo: 'Yellow',
      magenta: 'Magenta',
      ciano: 'Cyan'
    },
    currency: 'R$'
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
      черный: 'Black',
      белый: 'White',
      красный: 'Red',
      зеленый: 'Green',
      синий: 'Blue',
      желтый: 'Yellow',
      фиолетовый: 'Magenta', // mac
      пурпурный: 'Magenta', // win
      голубой: 'Cyan'
    },
    currency: '₽'
  }, 'ru');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('január;február;marec;apríl;máj;jún;júl;august;september;október;november;december'),
    mmm: _M('1;2;3;4;5;6;7;8;9;10;11;12'),
    dddd: _W('nedeľa;pondelok;utorok;streda;štvrtok;piatok;sobota'),
    color: 'Farba',
    colors: {
      čierna: 'Black',
      biela: 'White',
      červená: 'Red',
      zelená: 'Green',
      modrá: 'Blue',
      žltá: 'Yellow',
      purpurová: 'Magenta',
      azúrová: 'Cyan'
    },
    currency: '€'
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
      negro: 'Black',
      blanco: 'White',
      rojo: 'Red',
      verde: 'Green',
      azul: 'Blue',
      amarillo: 'Yellow',
      magenta: 'Magenta',
      cian: 'Cyan', // mac
      ciano: 'Cyan' // pc
    }
  };
  const _esM3 = _M('ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic');
  const _esM3s = _M('ene;feb;mar;abr;may;jun;jul;ago;sept;oct;nov;dic');
  addLocale({ ..._es, ddd: _W('do;lu;ma;mi;ju;vi;sá'), general: 'Estándar', opcodes: { dy: 'a', wd: 'o' }, currency: '€' }, 'es');
  addLocale({ ..._es, mmm: _esM3s }, 'es-AR');
  addLocale({ ..._es, mmm: _esM3s, currency: 'Bs' }, 'es-BO');
  addLocale({ ..._es, mmm: _esM3s }, 'es-CL');
  addLocale({ ..._es, mmm: _esM3 }, 'es-CO');
  addLocale({ ..._es, mmm: _esM3s }, 'es-EC');
  addLocale({ ..._es, mmm: _esM3s, currency: '₲' }, 'es-PY');
  addLocale({
    ..._es,
    group: ',',
    decimal: '.',
    mmm: _esM3,
    ampm: _B('a.m.;p.m.'),
    opcodes: { dy: 'a', wd: 'o' },
    general: 'Estándar'
  }, 'es-MX');
  addLocale({
    ..._es,
    mmmm: _M('Enero;Febrero;Marzo;Abril;Mayo;Junio;Julio;Agosto;Setiembre;Octubre;Noviembre;Diciembre'),
    mmm: _M('Ene;Feb;Mar;Abr;May;Jun;Jul;Ago;set;Oct;Nov;Dic')
  }, 'es-UY');
  addLocale({
    ..._es,
    mmm: _esM3s,
    currency: 'Bs.S'
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
      svart: 'Black',
      vit: 'White',
      röd: 'Red',
      grön: 'Green',
      blå: 'Blue',
      gul: 'Yellow',
      magenta: 'Magenta',
      cyanblå: 'Cyan'
    },
    currency: 'kr'
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
      siyah: 'Black',
      beyaz: 'White',
      kırmızı: 'Red',
      yeşil: 'Green',
      mavi: 'Blue',
      sarı: 'Yellow',
      pembe: 'Magenta',
      camgöbeği: 'Cyan'
    },
    opcodes: { dm: 'a', dd: 'g', th: 's', tm: 'd', ts: 'n' },
    general: 'Genel',
    currency: '₺'
  }, 3, -1), 'tr');

  addLocale({
    group: ',',
    ampm: _B('yb;yh'),
    mmmm: _M('Ionawr;Chwefror;Mawrth;Ebrill;Mai;Mehefin;Gorffennaf;Awst;Medi;Hydref;Tachwedd;Rhagfyr'),
    mmm: _M('Ion;Chwef;Maw;Ebr;Mai;Meh;Gorff;Awst;Medi;Hyd;Tach;Rhag'),
    dddd: _W('Dydd Sul;Dydd Llun;Dydd Mawrth;Dydd Mercher;Dydd Iau;Dydd Gwener;Dydd Sadwrn'),
    ddd: _W('Sul;Llun;Maw;Mer;Iau;Gwe;Sad'),
    currency: '£'
  }, 'cy');

  addLocale({
    group:  '.',
    decimal:  ',',
    mmmm: _M('yanvar;fevral;mart;aprel;may;iyun;iyul;avqust;sentyabr;oktyabr;noyabr;dekabr'),
    mmm: _M('yan;fev;mar;apr;may;iyn;iyl;avq;sen;okt;noy;dek'),
    dddd: _W('bazar;bazar ertəsi;çərşənbə axşamı;çərşənbə;cümə axşamı;cümə;şənbə'),
    ddd: _W('B;B.E;Ç.A;Ç;C.A;C;Ş'),
    currency: '₼'
  }, 'az');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('студзень;люты;сакавік;красавік;май;чэрвень;ліпень;жнівень;верасень;кастрычнік;лістапад;снежань'),
    mmm: _M('студз;лют;сак;крас;май;чэрв;ліп;жн;вер;кастр;ліст;снеж'),
    dddd: _W('нядзеля;панядзелак;аўторак;серада;чацвер;пятніца;субота'),
    ddd:  _W('нд;пн;аўт;ср;чц;пт;сб'),
    currency: 'Br'
  }, 3, -1), 'be');

  addLocale({
    decimal: ',',
    // ampm: _B('пр.об.;сл.об.'),
    mmmm: _M('януари;февруари;март;април;май;юни;юли;август;септември;октомври;ноември;декември'),
    mmm: _M('яну;фев;мар;апр;май;юни;юли;авг;сеп;окт;ное;дек'),
    dddd: _W('неделя;понеделник;вторник;сряда;четвъртък;петък;събота'),
    ddd: _W('нед;пон;вт;ср;четв;пет;съб'),
    currency: 'лв.'
    // bool: _B('ИСТИНА;ЛОЖЬ'),
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
    currency: '€'
  }, 'ca');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    mmmm: _M('Enero;Pebrero;Marso;Abril;Mayo;Hunyo;Hulyo;Agosto;Setyembre;Oktubre;Nobyembre;Disyembre'),
    dddd: _W('Linggo;Lunes;Martes;Miyerkules;Huwebes;Biyernes;Sabado'),
    currency: '₱'
  }, 3, 3), 'fil');

  addLocale({
    group:  ',',
    decimal:  '.',
    ampm:  [ 'પૂર્વ મધ્યાહ્ન', 'ઉત્તર મધ્યાહ્ન' ],
    mmmm: _M('જાન્યુઆરી;ફેબ્રુઆરી;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટેમ્બર;ઑક્ટોબર;નવેમ્બર;ડિસેમ્બર'),
    mmm: _M('જાન્યુ;ફેબ્રુ;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગ;સપ્ટે;ઑક્ટો;નવે;ડિસે'),
    dddd: _W('રવિ~;સોમ~;મંગળ~;બુધ~;ગુરુ~;શુક્ર~;શનિ~', 'વાર'),
    ddd: _W('રવિ;સોમ;મંગળ;બુધ;ગુરુ;શુક્ર;શનિ'),
    currency: '₹'
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
      'שחור': 'Black',
      'לבן': 'White',
      'אדום': 'Red',
      'ירוק': 'Green',
      'כחול': 'Blue',
      'צהוב': 'Yellow',
      'אדום ארגמן': 'Magenta',
      'תכלת': 'Cyan'
    },
    currency: '₪'
  }, 'he');

  addLocale(xm({
    group:  '.',
    decimal:  ',',
    mmmm: _M('siječanj;veljača;ožujak;travanj;svibanj;lipanj;srpanj;kolovoz;rujan;listopad;studeni;prosinac'),
    mmm:  _M('sij;vlj;ožu;tra;svi;lip;srp;kol;ruj;lis;stu;pro'),
    dddd: _W('nedjelja;ponedjeljak;utorak;srijeda;četvrtak;petak;subota'),
    currency: '€'
  }, -1, 3), 'hr');

  addLocale({
    decimal: ',',
    mmmm: _M('Հունվար;Փետրվար;Մարտ;Ապրիլ;Մայիս;Հունիս;Հուլիս;Օգոստոս;Սեպտեմբեր;Հոկտեմբեր;Նոյեմբեր;Դեկտեմբեր'),
    mmm:  _M('Հնվ;Փտվ;Մրտ;Ապր;Մյս;Հնս;Հլս;Օգս;Սպտ;Հկտ;Նյմ;Դկտ'),
    dddd: _W('Կիրակի;Երկուշաբթի;Երեքշաբթի;Չորեքշաբթի;Հինգշաբթի;Ուրբաթ;Շաբաթ'),
    ddd:  _W('Կիր;Երկ;Երք;Չրք;Հնգ;Ուր;Շբթ'),
    currency: '֏'
  }, 'hy');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('იანვარი;თებერვალი;მარტი;აპრილი;მაისი;ივნისი;ივლისი;აგვისტო;სექტემბერი;ოქტომბერი;ნოემბერი;დეკემბერი'),
    dddd: _W('კვირა;ორშაბათი;სამშაბათი;ოთხშაბათი;ხუთშაბათი;პარასკევი;შაბათი'),
    ddd: _W('კვ;ორშ;სამშ;ოთხშ;ხუთშ;პარ;შაბ'),
    currency: '₾'
  }, 3, -1), 'ka');

  addLocale(xm({
    decimal: ',',
    mmmm: _M('Қаңтар;Ақпан;Наурыз;Сәуір;Мамыр;Маусым;Шілде;Тамыз;Қыркүйек;Қазан;Қараша;Желтоқсан'),
    mmm: _M('қаң;ақп;нау;сәу;мам;мау;шіл;там;қыр;қаз;қар;жел'),
    dddd: _W('жексенбі;дүйсенбі;сейсенбі;сәрсенбі;бейсенбі;жұма;сенбі'),
    ddd:  _W('жек;дүй;сей;сәр;бей;жұм;сен'),
    opcodes: { dy: 'г', dm: 'м', dd: 'д', th: 'ч', tm: 'м', ts: 'с' },
    currency: '₸',
    general: 'Основной'
  }, -1, -1), 'kk');

  addLocale({
    group:  ',',
    mmmm: _M('ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಏಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್'),
    mmm:  _M('ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಎಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್'),
    dddd: _W('ಭಾನು~;ಸೋಮ~;ಮಂಗಳ~;ಬುಧ~;ಗುರು~;ಶುಕ್ರ~;ಶನಿ~', 'ವಾರ'),
    ddd:  _W('ಭಾನು;ಸೋಮ;ಮಂಗಳ;ಬುಧ;ಗುರು;ಶುಕ್ರ;ಶನಿ'),
    ampm: _B('ಪೂರ್ವಾಹ್ನ;ಅಪರಾಹ್ನ'),
    currency: '₹'
  }, 'kn');

  addLocale({
    decimal:  ',',
    mmmm: _M('sausis;vasaris;kovas;balandis;gegužė;birželis;liepa;rugpjūtis;rugsėjis;spalis;lapkritis;gruodis'),
    mmm:  _M('saus;vas;kov;bal;geg;birž;liep;rugp;rugs;spal;lapkr;gruod'),
    dddd: _W('sekmadienis;pirmadienis;antradienis;trečiadienis;ketvirtadienis;penktadienis;šeštadienis'),
    ddd:  _W('sk;pr;an;tr;kt;pn;št'),
    ampm: _B('priešpiet;popiet'),
    currency:  '€'
  }, 'lt');

  addLocale({
    decimal:  ',',
    mmmm: _M('janvāris;februāris;marts;aprīlis;maijs;jūnijs;jūlijs;augusts;septembris;oktobris;novembris;decembris'),
    mmm:  _M('janv;febr;marts;apr;maijs;jūn;jūl;aug;sept;okt;nov;dec'),
    dddd: _W('svētdiena;pirmdiena;otrdiena;trešdiena;ceturtdiena;piektdiena;sestdiena'),
    ddd:  _W('Svētd;Pirmd;Otrd;Trešd;Ceturtd;Piektd;Sestd'),
    ampm: _B('priekšp.;pēcp.'),
    currency: '€'
  }, 'lv');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('ജനുവരി;ഫെബ്രുവരി;മാര്‍‌ച്ച്;ഏപ്രില്‍;മേയ്;ജൂൺ;ജൂലൈ;ആഗസ്റ്റ്;സെപ്‌റ്റംബര്‍;ഒക്‌ടോബര്‍;നവംബര്‍;ഡിസംബര്‍'),
    mmm: _M('ജനു;ഫെബ്രു;മാർ;ഏപ്രി;മേയ്;ജൂൺ;ജൂലൈ;ഓഗ;സെപ്റ്റം;ഒക്ടോ;നവം;ഡിസം'),
    dddd: _W('ഞായറാഴ്‌ച;തിങ്കളാഴ്‌ച;ചൊവ്വാഴ്ച;ബുധനാഴ്‌ച;വ്യാഴാഴ്‌ച;വെള്ളിയാഴ്‌ച;ശനിയാഴ്‌ച'),
    ddd: _W('ഞായർ;തിങ്കൾ;ചൊവ്വ;ബുധൻ;വ്യാഴം;വെള്ളി;ശനി'),
    currency: '₹'
  }, 'ml');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('Нэгдүгээ~;Хоёрдугаа~;Гуравдугаа~;Дөрөвдүгээ~;Тавдугаа~;Зургаадугаа~;Долоодугаа~;Наймдугаа~;Есдүгээ~;Аравдугаа~;Арван нэгдүгээ~;Арван хоёрдугаар са', 'р сар'),
    mmm:  _M('1~;2~;3~;4~;5~;6~;7~;8~;9~;10~;11~;12~', '-р сар'),
    dddd: _W('ням;даваа;мягмар;лхагва;пүрэв;баасан;бямба'),
    ddd:  _W('Ня;Да;Мя;Лха;Пү;Ба;Бя'),
    ampm: _B('ү.ө.;ү.х.'),
    currency: '₮'
  }, 'mn');

  addLocale({
    group:  ',',
    decimal:  '.',
    ampm: [ 'म.पू.', 'म.नं.' ],
    mmmm: _M('जानेवारी;फेब्रुवारी;मार्च;एप्रिल;मे;जून;जुलै;ऑगस्ट;सप्टेंबर;ऑक्टोबर;नोव्हेंबर;डिसेंबर'),
    mmm:  _M('जाने;फेब्रु;मार्च;एप्रि;मे;जून;जुलै;ऑग;सप्टें;ऑक्टो;नोव्हें;डिसें'),
    dddd: _W('रविवार;सोमवार;मंगळवार;बुधवार;गुरुवार;शुक्रवार;शनिवार'),
    ddd:  _W('रवि;सोम;मंगळ;बुध;गुरु;शुक्र;शनि'),
    currency: '₹'
  }, 'mr');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    mmmm: _M('ဇန်နဝါရီ;ဖေဖော်ဝါရီ;မတ်;ဧပြီ;မေ;ဇွန်;ဇူလိုင်;ဩဂုတ်;စက်တင်ဘာ;အောက်တိုဘာ;နိုဝင်ဘာ;ဒီဇင်ဘာ'),
    mmm:  _M('ဇန်;ဖေ;မတ်;ဧ;မေ;ဇွန်;ဇူ;ဩ;စက်;အောက်;နို;ဒီ'),
    dddd: _W('တနင်္ဂနွေ;တနင်္လာ;အင်္ဂါ;ဗုဒ္ဓဟူး;ကြာသပတေး;သောကြာ;စနေ'),
    ampm: _B('နံနက်;ညနေ'),
    currency: 'K'
  }, -1, 0), 'my');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    mmmm: _M('ਜਨਵਰੀ;ਫ਼ਰਵਰੀ;ਮਾਰਚ;ਅਪ੍ਰੈਲ;ਮਈ;ਜੂਨ;ਜੁਲਾਈ;ਅਗਸਤ;ਸਤੰਬਰ;ਅਕਤੂਬਰ;ਨਵੰਬਰ;ਦਸੰਬਰ'),
    dddd: _W('ਐਤਵਾਰ;ਸੋਮਵਾਰ;ਮੰਗਲਵਾਰ;ਬੁੱਧਵਾਰ;ਵੀਰਵਾਰ;ਸ਼ੁੱਕਰਵਾਰ;ਸ਼ਨਿੱਚਰਵਾਰ'),
    ddd:  _W('ਐਤ;ਸੋਮ;ਮੰਗਲ;ਬੁੱਧ;ਵੀਰ;ਸ਼ੁਕਰ;ਸ਼ਨਿੱਚਰ'),
    ampm: [ 'ਸਵੇਰ', 'ਸ਼ਾਮ' ],
    currency: '₹'
  }), 'pa');

  addLocale({
    group:  '.',
    decimal:  ',',
    mmmm: _M('ianuarie;februarie;martie;aprilie;mai;iunie;iulie;august;septem~;octom~;noiem~;decem~', 'brie'),
    mmm:  _M('ian;feb;mar;apr;mai;iun;iul;aug;sept;oct;nov;dec'),
    dddd: _W('duminică;luni;marți;miercuri;joi;vineri;sâmbătă'),
    ddd:  _W('dum;lun;mar;mie;joi;vin;sâm'),
    ampm: _B('a.m.;p.m.'),
    currency: 'lei'
  }, 'ro');

  addLocale(xm({
    group:  '.',
    decimal:  ',',
    mmmm: _M('januar;februar;marec;april;maj;junij;julij;avgust;september;oktober;november;december'),
    dddd: _W('nedelja;ponedeljek;torek;sreda;četrtek;petek;sobota'),
    ampm: _B('dop.;pop.'),
    currency: '€'
  }, 3, 3), 'sl');

  addLocale(xm({
    group:  '.',
    decimal:  ',',
    mmmm: _M('januar;februar;mart;april;maj;jun;jul;avgust;septembar;oktobar;novembar;decembar'),
    dddd: _W('nedelja;ponedeljak;utorak;sreda;četvrtak;petak;subota'),
    currency: 'RSD'
  }, 3, 3), 'sr');

  addLocale(xm({
    group:  ',',
    decimal:  '.',
    ampm: [ 'காலை', 'மாலை' ],
    mmmm: _M('ஜனவரி;பிப்ரவரி;மார்ச்;ஏப்ரல்;மே;ஜூன்;ஜூலை;ஆகஸ்ட்;செப்டம்பர்;அக்டோபர்;நவம்பர்;டிசம்பர்'),
    dddd: _W('ஞாயிறு;திங்கள்;செவ்வாய்;புதன்;வியாழன்;வெள்ளி;சனி'),
    currency: '₹'
  }), 'ta');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('జనవరి;ఫిబ్రవరి;మార్చి;ఏప్రిల్;మే;జూన్;జులై;ఆగస్టు;సెప్టెంబర్;అక్టోబర్;నవంబర్;డిసెంబర్'),
    mmm:  _M('జన;ఫిబ్ర;మార్చి;ఏప్రి;మే;జూన్;జులై;ఆగ;సెప్టెం;అక్టో;నవం;డిసెం'),
    dddd: _W('ఆదివారం;సోమవారం;మంగళవారం;బుధవారం;గురువారం;శుక్రవారం;శనివారం'),
    ddd:  _W('ఆది;సోమ;మంగళ;బుధ;గురు;శుక్ర;శని'),
    currency: '₹'
  }, 'te');

  addLocale({
    decimal:  ',',
    mmmm: _M('січень;лютий;березень;квітень;травень;червень;липень;серпень;вересень;жовтень;листопад;грудень'),
    mmm:  _M('Січ;Лют;Бер;Кві;Тра;Чер;Лип;Сер;Вер;Жов;Лис;Гру'),
    dddd: _W("неділя;понеділок;вівторок;середа;четвер;п'ятниця;субота"),
    ddd:  _W('Нд;Пн;Вт;Ср;Чт;Пт;Сб'),
    ampm: _B('дп;пп'),
    currency: '₴'
  }, 'uk');

  addLocale({
    group: '.',
    decimal: ',',
    mmmm: _M('~Giêng;~Hai;~Ba;~Tư;~Năm;~Sáu;~Bảy;~Tám;~Chín;~Mười;~Mười Một;~Mười Hai', 'Tháng '),
    mmm:  _M('~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12', 'Thg'),
    dddd: _W('Chủ Nhật;~Hai;~Ba;~Tư;~Năm;~Sáu;~Bảy', 'Thứ '),
    ddd:  _W('CN;T2;T3;T4;T5;T6;T7'),
    ampm: _B('SA;CH'),
    currency: '₫'
  }, 'vi');

  addLocale(xm({
    group:  '٬',
    decimal:  '٫',
    ampm: _B('ص;م'),
    mmmm: _M('يناير;فبراير;مارس;أبريل;مايو;يونيو;يوليو;أغسطس;سبتمبر;أكتوبر;نوفمبر;ديسمبر'),
    dddd: _W('الأحد;الإثنين;الثلاثاء;الأربعاء;الخميس;الجمعة;السبت'),
    mmmm6: _M('رمضان;شوال;ذو القعدة;ذو الحجة;محرم;ربيع الأول;ربيع الآخرة;جمادى الأولى;جمادى الآخرة;رجب;شعبان;رمضان'),
    color: 'اللون',
    colors: {
      أسود: 'Black',
      أبيض: 'White',
      أحمر: 'Red',
      أخضر: 'Green',
      أزرق: 'Blue',
      أصفر: 'Yellow',
      ماجنتا: 'Magenta',
      سماوي: 'Cyan'
    },
    currency: '⃁'
  }, 0, 0), 'ar');

  addLocale({
    group: ',',
    decimal: '.',
    ampm: [ 'AM', 'PM' ],
    mmmm: _M('জানুয়ারী;ফেব্রুয়ারী;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগস্ট;সেপ্টেম্বর;অক্টোবর;নভেম্বর;ডিসেম্বর'),
    mmm:  _M('জানু;ফেব্রু;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগ;সেপ্টে;অক্টো;নভে;ডিসে'),
    dddd: _W('রবিবার;সোমবার;মঙ্গলবার;বুধবার;বৃহস্পতিবার;শুক্রবার;শনিবার'),
    ddd:  _W('রবি.;সোম.;মঙ্গল.;বুধ.;বৃহস্পতি.;শুক্র.;শনি.'),
    currency: '₹'
  }, 'bn');

  addLocale({
    group:  ',',
    decimal:  '.',
    mmmm: _M('जनवरी;फरवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितम्बर;अक्तूबर;नवम्बर;दिसम्बर'),
    mmm:  _M('जनवरी;फरवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितम्बर;अक्तूबर;नवम्बर;दिसम्बर'),
    dddd: _W('रविवार;सोमवार;मंगलवार;बुधवार;गुरुवार;शुक्रवार;शनिवार'),
    ddd:  _W('रवि.;सोम.;मंगल.;बुध.;गुरु.;शुक्र.;शनि.'),
    ampm: [ 'पूर्वाह्न', 'अपराह्न' ],
    currency: '₹'
  }, 'hi');
}
