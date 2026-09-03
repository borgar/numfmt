export const u_YEAR = 2;
export const u_MONTH = 2 ** 2;
export const u_DAY = 2 ** 3;
export const u_HOUR = 2 ** 4;
export const u_MIN = 2 ** 5;
export const u_SEC = 2 ** 6;
export const u_DSEC = 2 ** 7; // decisecond
export const u_CSEC = 2 ** 8; // centisecond
export const u_MSEC = 2 ** 9; // millisecond

// Excel date boundaries
export const MIN_S_DATE = 0;
export const MAX_S_DATE = 2958466;
// Google date boundaries
export const MIN_L_DATE = -694324;
export const MAX_L_DATE = 35830291;

// if more calendars are added, they should conform to MS CALID identifiers
// https://docs.microsoft.com/en-us/windows/win32/intl/calendar-identifiers
export const EPOCH_1904 = -1;
export const EPOCH_1900 = 1;
export const EPOCH_1317 = 6;

export const TOKEN_GENERAL = 'GENERAL';
export const TOKEN_HASH = 'HASH';
export const TOKEN_ZERO = 'ZERO';
export const TOKEN_QMARK = 'QMARK';
export const TOKEN_SLASH = 'SLASH';
export const TOKEN_GROUP = 'GROUP';
export const TOKEN_SCALE = 'SCALE';
export const TOKEN_COMMA = 'COMMA';
export const TOKEN_BREAK = 'BREAK';
export const TOKEN_TEXT = 'TEXT';
export const TOKEN_PLUS = 'PLUS';
export const TOKEN_MINUS = 'MINUS';
export const TOKEN_POINT = 'POINT';
export const TOKEN_SPACE = 'SPACE';
export const TOKEN_PERCENT = 'PERCENT';
export const TOKEN_DIGIT = 'DIGIT';
export const TOKEN_CALENDAR = 'CALENDAR';
export const TOKEN_ERROR = 'ERROR';
export const TOKEN_DATETIME = 'DATETIME';
export const TOKEN_DURATION = 'DURATION';
export const TOKEN_CONDITION = 'CONDITION';
export const TOKEN_DBNUM = 'DBNUM';
export const TOKEN_NATNUM = 'NATNUM';
export const TOKEN_LOCALE = 'LOCALE';
export const TOKEN_COLOR = 'COLOR';
export const TOKEN_MODIFIER = 'MODIFIER';
export const TOKEN_AMPM = 'AMPM';
export const TOKEN_ESCAPED = 'ESCAPED';
export const TOKEN_STRING = 'STRING';
export const TOKEN_SKIP = 'SKIP';
export const TOKEN_EXP = 'EXP';
export const TOKEN_FILL = 'FILL';
export const TOKEN_PAREN = 'PAREN';
export const TOKEN_CHAR = 'CHAR';

export const T_TYPE_INT = 'INT';
export const T_TYPE_NUM = 'NUM';
export const T_TYPE_MAN = 'MAN';
export const T_TYPE_DEN = 'DEN';
export const T_TYPE_FRAC = 'FRAC';
export const T_TYPE_DIV = 'DIV';
export const T_TYPE_YEAR = 'YEAR';
export const T_TYPE_YEAR_S = 'YEAR-SHORT';
export const T_TYPE_MON = 'MONTH';
export const T_TYPE_MNAME_1 = 'MONTHNAME-SINGLE';
export const T_TYPE_MNAME_S = 'MONTHNAME-SHORT';
export const T_TYPE_MNAME = 'MONTHNAME';
export const T_TYPE_WEEKDAY_S = 'WEEKDAY-SHORT';
export const T_TYPE_WEEKDAY = 'WEEKDAY';
export const T_TYPE_DAY = 'DAY';
export const T_TYPE_HOUR = 'HOUR';
export const T_TYPE_MIN = 'MIN';
export const T_TYPE_SEC = 'SEC';
export const T_TYPE_SUBSEC = 'SUBSEC';
export const T_TYPE_HOUR_E = 'HOUR-ELAP';
export const T_TYPE_MIN_E = 'MIN-ELAP';
export const T_TYPE_SEC_E = 'SEC-ELAP';
export const T_TYPE_B_YEAR = 'B-YEAR';
export const T_TYPE_B_YEAR_S = 'B-YEAR-SHORT';

export const indexColors = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#800000',
  '#008000',
  '#000080',
  '#808000',
  '#800080',
  '#008080',
  '#C0C0C0',
  '#808080',
  '#9999FF',
  '#993366',
  '#FFFFCC',
  '#CCFFFF',
  '#660066',
  '#FF8080',
  '#0066CC',
  '#CCCCFF',
  '#000080',
  '#FF00FF',
  '#FFFF00',
  '#00FFFF',
  '#800080',
  '#800000',
  '#008080',
  '#0000FF',
  '#00CCFF',
  '#CCFFFF',
  '#CCFFCC',
  '#FFFF99',
  '#99CCFF',
  '#FF99CC',
  '#CC99FF',
  '#FFCC99',
  '#3366FF',
  '#33CCCC',
  '#99CC00',
  '#FFCC00',
  '#FF9900',
  '#FF6600',
  '#666699',
  '#969696',
  '#003366',
  '#339966',
  '#003300',
  '#333300',
  '#993300',
  '#993366',
  '#333399',
  '#333333'
];

export const currencySymbols = [
  '¤',
  '$',
  '£',
  '¥',
  '֏',
  '؋',
  '৳',
  '฿',
  '៛',
  '₡',
  '₦',
  '₩',
  '₪',
  '₫',
  '€',
  '₭',
  '₮',
  '₱',
  '₲',
  '₴',
  '₸',
  '₹',
  '₺',
  '₼',
  '₽',
  '₾',
  '₿'
];

export const reCurrencySymbols = new RegExp('[' + currencySymbols.join('') + ']');
