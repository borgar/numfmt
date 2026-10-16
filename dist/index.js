Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region lib/codeToLocale.ts
const codeToLocale = Object.freeze({
	1078: "af",
	1052: "sq",
	1118: "am",
	5121: "ar-DZ",
	15361: "ar-BH",
	3073: "ar-EG",
	2049: "ar-IQ",
	11265: "ar-JO",
	13313: "ar-KW",
	12289: "ar-LB",
	4097: "ar-LY",
	6145: "ar-MA",
	8193: "ar-OM",
	16385: "ar-QA",
	1025: "ar-SA",
	10241: "ar-SY",
	7169: "ar-TN",
	14337: "ar-AE",
	9217: "ar-YE",
	1067: "hy",
	1101: "as",
	2092: "az-AZ",
	1068: "az-AZ",
	1069: "eu",
	1059: "be",
	2117: "bn",
	1093: "bn-IN",
	5146: "bs",
	1026: "bg",
	1109: "my",
	1027: "ca",
	2052: "zh-CN",
	3076: "zh-HK",
	5124: "zh-MO",
	4100: "zh-SG",
	1028: "zh-TW",
	1050: "hr",
	1029: "cs",
	1030: "da",
	1125: "dv",
	2067: "nl-BE",
	1043: "nl-NL",
	1126: "bin",
	3081: "en-AU",
	10249: "en-BZ",
	4105: "en-CA",
	9225: "en-CB",
	2057: "en-GB",
	16393: "en-IN",
	6153: "en-IE",
	8201: "en-JM",
	5129: "en-NZ",
	13321: "en-PH",
	7177: "en-ZA",
	11273: "en-TT",
	1033: "en-US",
	12297: "en-ZW",
	1061: "et",
	1071: "mk",
	1080: "fo",
	1065: "fa",
	1124: "fil",
	1035: "fi",
	2060: "fr-BE",
	11276: "fr-CM",
	3084: "fr-CA",
	9228: "fr-CG",
	12300: "fr-CI",
	1036: "fr-FR",
	5132: "fr-LU",
	13324: "fr-ML",
	6156: "fr-MC",
	14348: "fr-MA",
	10252: "fr-SN",
	4108: "fr-CH",
	7180: "fr",
	1122: "fy-NL",
	2108: "gd-IE",
	1084: "gd",
	1110: "gl",
	1079: "ka",
	3079: "de-AT",
	1031: "de-DE",
	5127: "de-LI",
	4103: "de-LU",
	2055: "de-CH",
	1032: "el",
	1140: "gn",
	1095: "gu",
	1279: "en",
	1037: "he",
	1081: "hi",
	1038: "hu",
	1039: "is",
	1136: "ig-NG",
	1057: "id",
	1040: "it-IT",
	2064: "it-CH",
	1041: "ja",
	1099: "kn",
	1120: "ks",
	1087: "kk",
	1107: "km",
	1111: "kok",
	1042: "ko",
	1088: "ky",
	1108: "lo",
	1142: "la",
	1062: "lv",
	1063: "lt",
	2110: "ms-BN",
	1086: "ms-MY",
	1100: "ml",
	1082: "mt",
	1112: "mni",
	1153: "mi",
	1102: "mr",
	1104: "mn",
	2128: "mn",
	1121: "ne",
	1044: "no-NO",
	2068: "no-NO",
	1096: "or",
	1045: "pl",
	1046: "pt-BR",
	2070: "pt-PT",
	1094: "pa",
	1047: "rm",
	2072: "ro-MO",
	1048: "ro-RO",
	1049: "ru",
	2073: "ru-MO",
	1083: "se",
	1103: "sa",
	3098: "sr-SP",
	2074: "sr-SP",
	1072: "st",
	1074: "tn",
	1113: "sd",
	1115: "si",
	1051: "sk",
	1060: "sl",
	1143: "so",
	1070: "sb",
	11274: "es-AR",
	16394: "es-BO",
	13322: "es-CL",
	9226: "es-CO",
	5130: "es-CR",
	7178: "es-DO",
	12298: "es-EC",
	17418: "es-SV",
	4106: "es-GT",
	18442: "es-HN",
	2058: "es-MX",
	19466: "es-NI",
	6154: "es-PA",
	15370: "es-PY",
	10250: "es-PE",
	20490: "es-PR",
	1034: "es-ES",
	14346: "es-UY",
	8202: "es-VE",
	1089: "sw",
	2077: "sv-FI",
	1053: "sv-SE",
	1114: "syc",
	1064: "tg",
	1097: "ta",
	1092: "tt",
	1098: "te",
	1054: "th",
	1105: "bo",
	1073: "ts",
	1055: "tr",
	1090: "tk",
	1058: "uk",
	1056: "ur",
	2115: "uz-UZ",
	1091: "uz-UZ",
	1075: "ve",
	1066: "vi",
	1106: "cy",
	1076: "xh",
	1085: "yi",
	1077: "zu"
});
const TOKEN_GENERAL = "GENERAL";
const TOKEN_HASH = "HASH";
const TOKEN_ZERO = "ZERO";
const TOKEN_QMARK = "QMARK";
const TOKEN_SLASH = "SLASH";
const TOKEN_GROUP = "GROUP";
const TOKEN_SCALE = "SCALE";
const TOKEN_COMMA = "COMMA";
const TOKEN_BREAK = "BREAK";
const TOKEN_TEXT = "TEXT";
const TOKEN_PLUS = "PLUS";
const TOKEN_MINUS = "MINUS";
const TOKEN_POINT = "POINT";
const TOKEN_SPACE = "SPACE";
const TOKEN_PERCENT = "PERCENT";
const TOKEN_DIGIT = "DIGIT";
const TOKEN_CALENDAR = "CALENDAR";
const TOKEN_ERROR = "ERROR";
const TOKEN_DATETIME = "DATETIME";
const TOKEN_DURATION = "DURATION";
const TOKEN_CONDITION = "CONDITION";
const TOKEN_DBNUM = "DBNUM";
const TOKEN_NATNUM = "NATNUM";
const TOKEN_LOCALE = "LOCALE";
const TOKEN_COLOR = "COLOR";
const TOKEN_MODIFIER = "MODIFIER";
const TOKEN_AMPM = "AMPM";
const TOKEN_ESCAPED = "ESCAPED";
const TOKEN_STRING = "STRING";
const TOKEN_SKIP = "SKIP";
const TOKEN_EXP = "EXP";
const TOKEN_FILL = "FILL";
const TOKEN_PAREN = "PAREN";
const TOKEN_CHAR = "CHAR";
const TOKEN_CURRENCY = "CURRENCY";
const T_TYPE_FRAC = "FRAC";
const T_TYPE_YEAR = "YEAR";
const T_TYPE_YEAR_S = "YEAR-SHORT";
const T_TYPE_MON = "MONTH";
const T_TYPE_MNAME_1 = "MONTHNAME-SINGLE";
const T_TYPE_MNAME_S = "MONTHNAME-SHORT";
const T_TYPE_MNAME = "MONTHNAME";
const T_TYPE_WEEKDAY_S = "WEEKDAY-SHORT";
const T_TYPE_WEEKDAY = "WEEKDAY";
const T_TYPE_HOUR = "HOUR";
const T_TYPE_SUBSEC = "SUBSEC";
const T_TYPE_HOUR_E = "HOUR-ELAP";
const T_TYPE_MIN_E = "MIN-ELAP";
const T_TYPE_SEC_E = "SEC-ELAP";
const T_TYPE_B_YEAR = "B-YEAR";
const T_TYPE_B_YEAR_S = "B-YEAR-SHORT";
/**
* How many parsed patterns are kept. Past this, the oldest one is dropped, so a
* long-running process that formats many distinct patterns doesn't grow forever.
*/
const MAX_CACHED_PATTERNS = 1e3;
const indexColors = [
	"#000000",
	"#FFFFFF",
	"#FF0000",
	"#00FF00",
	"#0000FF",
	"#FFFF00",
	"#FF00FF",
	"#00FFFF",
	"#800000",
	"#008000",
	"#000080",
	"#808000",
	"#800080",
	"#008080",
	"#C0C0C0",
	"#808080",
	"#9999FF",
	"#993366",
	"#FFFFCC",
	"#CCFFFF",
	"#660066",
	"#FF8080",
	"#0066CC",
	"#CCCCFF",
	"#000080",
	"#FF00FF",
	"#FFFF00",
	"#00FFFF",
	"#800080",
	"#800000",
	"#008080",
	"#0000FF",
	"#00CCFF",
	"#CCFFFF",
	"#CCFFCC",
	"#FFFF99",
	"#99CCFF",
	"#FF99CC",
	"#CC99FF",
	"#FFCC99",
	"#3366FF",
	"#33CCCC",
	"#99CC00",
	"#FFCC00",
	"#FF9900",
	"#FF6600",
	"#666699",
	"#969696",
	"#003366",
	"#339966",
	"#003300",
	"#333300",
	"#993300",
	"#993366",
	"#333399",
	"#333333"
];
const currencySymbols = [
	"¤",
	"$",
	"£",
	"¥",
	"֏",
	"؋",
	"৳",
	"฿",
	"៛",
	"₡",
	"₦",
	"₩",
	"₪",
	"₫",
	"€",
	"₭",
	"₮",
	"₱",
	"₲",
	"₴",
	"₸",
	"₹",
	"₺",
	"₼",
	"₽",
	"₾",
	"₿"
];
//#endregion
//#region lib/locales.ts
/**
* Split a semicolon delimited string and replace instances of characters
* @internal
* @param str Semicolon delimited string
* @param [tilde] String to be inserted on every instance of ~
* @returns Array of strings
*/
const _B = (str, tilde = "") => str.replaceAll("~", tilde).split(";");
const _W = (str, tilde = "") => _B(str, tilde);
const _M = (str, tilde = "") => _B(str, tilde);
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
const xm = (o, ml = 0, dl = 0) => {
	if (!o.mmm) o.mmm = ml < 1 ? o.mmmm.concat() : o.mmmm.map((d) => {
		const s = d.slice(0, ml % 10);
		return s + (ml < 10 || d === s ? "" : ".");
	});
	if (!o.ddd) o.ddd = dl < 1 ? o.dddd.concat() : o.dddd.map((d) => {
		const s = d.slice(0, dl % 10);
		return s + (dl < 10 || d === s ? "" : ".");
	});
	if (!o.mmm6 && o.mmmm6) o.mmm6 = o.mmmm6;
	return o;
};
/**
* Expand CompressedFormat to LocalFormat.
* Note that the defaults are not the same as in LocalFormat.
* This is done to save bytes across the wire.
* @internal
* @param p Compressed format params
* @returns Expanded format params
*/
const xf = (p) => {
	return {
		minus: !p.p,
		sign: !!p.s,
		dateOrder: p.o ?? 1,
		currencyPos: p.f ?? 3,
		padMm: p.m == null ? true : !!p.m,
		padDd: p.d == null ? true : !!p.d,
		padHh: p.h == null ? true : !!p.h,
		padHhAlt: !!p.i,
		dateSep: p.k ?? "/",
		shortDateSep: p.l ?? "-",
		timeSep: p.b ?? ":",
		shortYear: !!p.y,
		spacePercent: !!p.c
	};
};
const C_BLACK = "Black";
const C_WHITE = "White";
const C_RED = "Red";
const C_GREEN = "Green";
const C_BLUE = "Blue";
const C_YELLOW = "Yellow";
const C_MAGENTA = "Magenta";
const C_CYAN = "Cyan";
const fp1 = {
	k: ".",
	l: "."
};
const fp2 = {
	d: 0,
	h: 0,
	m: 0,
	k: ".",
	l: "."
};
const fp3 = {
	d: 1,
	y: 1,
	f: 0,
	o: 1,
	k: "-",
	b: ":",
	s: 1
};
const fp4 = {
	...fp3,
	y: 0
};
const fp5 = {
	h: 0,
	d: 0,
	f: 0,
	m: 0,
	s: 1
};
function initLocales() {
	const _zhM4 = _M("一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月");
	const _zhCl = {
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
		group: ",",
		ampm: _B("上午;下午"),
		mmmm: _zhM4,
		mmm: _M("1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月"),
		dddd: _W("~日;~一;~二;~三;~四;~五;~六", "星期"),
		ddd: _W("周日;周一;周二;周三;周四;周五;周六"),
		color: "颜色",
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
		general: "G/通用格式",
		currency: "¥",
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			m: 0,
			o: 2,
			s: 1
		}),
		sysdate: "yyyy年m月d日",
		systime: "h:mm:ss"
	}, "zh-CN");
	addLocale({
		group: ",",
		ampm: _B("上午;下午"),
		mmmm: _zhM4,
		mmm: _zhM4,
		dddd: _W("~日;~一;~二;~三;~四;~五;~六", "星期"),
		ddd: _W("週日;週一;週二;週三;週四;週五;週六"),
		nan: "非數值",
		color: "色彩",
		colors: _zhCl,
		general: "G/通用格式",
		currency: "NT$",
		format: xf({
			d: 0,
			f: 0,
			o: 2,
			m: 0,
			i: 1
		}),
		sysdate: "yyyy年m月d日",
		systime: "AM/PM hh:mm:ss"
	}, "zh-TW");
	addLocale({
		group: ",",
		ampm: _B("上午;下午"),
		mmmm: _zhM4,
		mmm: _zhM4,
		dddd: _W("~日;~一;~二;~三;~四;~五;~六", "星期"),
		ddd: _W("週日;週一;週二;週三;週四;週五;週六"),
		color: "色彩",
		colors: _zhCl,
		currency: "HK$",
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			m: 0,
			p: 1
		}),
		sysdate: "yyyy年m月d日",
		systime: "h:mm:ss"
	}, "zh-HK");
	addLocale({
		group: ",",
		mmmm: _M("1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月"),
		mmm: _M("1;2;3;4;5;6;7;8;9;10;11;12"),
		dddd: _W("日曜日;月曜日;火曜日;水曜日;木曜日;金曜日;土曜日"),
		ddd: _W("日;月;火;水;木;金;土"),
		ampm: _B("午前;午後"),
		general: "G/標準",
		currency: "¥",
		color: "色",
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
		format: xf({
			h: 0,
			f: 0,
			o: 2,
			d: 1
		}),
		sysdate: "yyyy年m月d日",
		systime: "h:mm:ss"
	}, "ja");
	addLocale({
		group: ",",
		ampm: _B("오전;오후"),
		mmmm: _M("1월;2월;3월;4월;5월;6월;7월;8월;9월;10월;11월;12월"),
		mmm: _M("1;2;3;4;5;6;7;8;9;10;11;12"),
		dddd: _W("일요일;월요일;화요일;수요일;목요일;금요일;토요일"),
		ddd: _W("일;월;화;수;목;금;토"),
		color: "색",
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
		general: "G/표준",
		currency: "₩",
		format: xf({
			h: 0,
			f: 0,
			o: 2,
			k: "-"
		}),
		sysdate: "yyyy년 mmmm d일 dddd",
		systime: "AM/PM h:mm:ss"
	}, "ko");
	addLocale({
		group: ",",
		mmmm: _M("มกร~;กุมภาพันธ์;มีน~;เมษายน;พฤษภ~;มิถุนายน;กรกฎ~;สิงห~;กันยายน;ตุล~;พฤศจิกายน;ธันว~", "าคม"),
		mmm: _M("ม.ค.;ก.พ.;มี.ค.;เม.ย.;พ.ค.;มิ.ย.;ก.ค.;ส.ค.;ก.ย.;ต.ค.;พ.ย.;ธ.ค."),
		dddd: _W("อาทิตย์;จันทร์;อังคาร;พุธ;พฤหัสบดี;ศุกร์;เสาร์"),
		ddd: _W("อา.;จ.;อ.;พ.;พฤ.;ศ.;ส."),
		color: "สี",
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
		currency: "฿",
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			m: 0,
			o: 1
		}),
		sysdate: "d mmmm yyyy",
		systime: "h:mm:ss"
	}, "th");
	addLocale(xm({
		decimal: ",",
		ampm: _B("dop.;odp."),
		mmmm: _M("leden;únor;březen;duben;květen;červen;červenec;srpen;září;říjen;listopad;prosinec"),
		mmm: _M("I;II;III;IV;V;VI;VII;VIII;IX;X;XI;XII"),
		dddd: _W("neděle;pondělí;úterý;středa;čtvrtek;pátek;sobota"),
		bool: _B("PRAVDA;NEPRAVDA"),
		color: "Barva",
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
		general: "Všeobecný",
		opcodes: { dy: "r" },
		currency: "Kč",
		format: xf({
			h: 0,
			k: ".",
			l: "."
		}),
		sysdate: "dddd d. mmmm yyyy",
		systime: "h:mm:ss"
	}, -1, 2), "cs");
	addLocale(xm({
		group: ".",
		decimal: ",",
		mmmm: _M("januar;februar;marts;april;maj;juni;juli;august;september;oktober;november;december"),
		dddd: _W("søn~;man~;tirs~;ons~;tors~;fre~;lør~", "dag"),
		bool: _B("SAND;FALSK"),
		color: "Farve",
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
		general: "Standard",
		opcodes: {
			dy: "å",
			th: "t"
		},
		currency: "kr.",
		format: xf({ k: "-" }),
		sysdate: "d. mmmm yyyy",
		systime: "hh:mm:ss"
	}, 3, 2), "da");
	addLocale(xm({
		group: ".",
		decimal: ",",
		mmmm: _M("januari;februari;maart;april;mei;juni;juli;augustus;september;oktober;november;december"),
		mmm: _M("jan;feb;mrt;apr;mei;jun;jul;aug;sep;okt;nov;dec"),
		dddd: _W("zondag;maandag;dinsdag;woensdag;donderdag;vrijdag;zaterdag"),
		bool: _B("WAAR;ONWAAR"),
		color: "Kleur",
		colors: {
			zwart: C_BLACK,
			wit: C_WHITE,
			rood: C_RED,
			root: C_RED,
			groen: C_GREEN,
			blauw: C_BLUE,
			geel: C_YELLOW,
			magenta: C_MAGENTA,
			cyaan: C_CYAN
		},
		general: "Standaard",
		opcodes: {
			dy: "j",
			th: "u"
		},
		currency: "€",
		format: xf({
			d: 0,
			f: 2,
			m: 0,
			k: "-",
			s: 1
		}),
		sysdate: "dddd d mmmm yyyy",
		systime: "hh:mm:ss"
	}, -1, 2), "nl");
	addLocale({
		group: ",",
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			m: 0,
			o: 0,
			p: 1
		}),
		sysdate: "dddd, mmmm d, yyyy",
		systime: "h:mm:ss AM/PM"
	}, "en");
	addLocale({
		group: ",",
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			m: 0,
			o: 0,
			p: 1
		}),
		sysdate: "dddd, mmmm d, yyyy",
		systime: "h:mm:ss AM/PM"
	}, "en-US");
	addLocale({
		group: ",",
		format: xf({
			h: 0,
			f: 0,
			o: 2,
			p: 0,
			k: "-"
		}),
		sysdate: "mmmm d, yyyy",
		systime: "h:mm:ss AM/PM"
	}, "en-CA");
	addLocale({
		group: ",",
		color: "Colour",
		ampm: ["AM", "PM"],
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			p: 0
		}),
		sysdate: "dddd, d mmmm yyyy",
		systime: "h:mm:ss AM/PM"
	}, "en-AU");
	addLocale({
		group: ",",
		color: "Colour",
		ampm: ["AM", "PM"],
		currency: "£",
		format: xf({
			f: 0,
			p: 0
		}),
		sysdate: "dd mmmm yyyy",
		systime: "hh:mm:ss"
	}, "en-GB");
	addLocale({
		group: ",",
		mmm: _M("Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sept;Oct;Nov;Dec"),
		color: "Colour",
		ampm: ["am", "pm"],
		currency: "€",
		format: xf({
			f: 0,
			p: 0
		}),
		sysdate: "dddd d mmmm yyyy",
		systime: "hh:mm:ss"
	}, "en-IE");
	addLocale(xm({
		decimal: ",",
		nan: "epäluku",
		ampm: _B("ap.;ip."),
		mmmm: _M("tammi~;helmi~;maalis~;huhti~;touko~;kesä~;heinä~;elo~;syys~;loka~;marras~;joulu~", "kuu"),
		mmm: _M("tammi;helmi;maalis;huhti;touko;kesä;heinä;elo;syys;loka;marras;joulu"),
		dddd: _W("sunnun~;maanan~;tiis~;keskiviikko;tors~;perjan~;lauan~", "tai"),
		bool: _B("TOSI;EPÄTOSI"),
		color: "Väri",
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
		general: "Yleinen",
		currency: "€",
		opcodes: {
			dy: "v",
			dm: "k",
			dd: "p",
			th: "t"
		},
		format: xf({
			h: 0,
			d: 0,
			p: 0,
			k: ".",
			l: ".",
			m: 0,
			c: 1
		}),
		sysdate: "dddd d. mmmm yyyy",
		systime: "h.mm.ss"
	}, -1, 2), "fi");
	const _fr = xm({
		group: " ",
		decimal: ",",
		mmmm: _M("janvier;février;mars;avril;mai;juin;juillet;août;septembre;octobre;novembre;décembre"),
		mmm: _M("janv;févr;mars;avr;mai;juin;juil;août;sept;oct;nov;déc"),
		dddd: _W("~manche;lun~;mar~;mercre~;jeu~;vendre~;same~", "di"),
		ddd: [
			"dim",
			"lun",
			"mar",
			"mer",
			"jeu",
			"ven",
			"sam"
		],
		bool: _B("VRAI;FAUX"),
		color: "Couleur",
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
		opcodes: {
			dy: "a",
			dd: "j",
			wd: "o"
		},
		general: "Standard",
		systime: "hh:mm:ss"
	}, -1, -13);
	addLocale({
		..._fr,
		currency: "€",
		format: xf({}),
		sysdate: "dddd d mmmm yyyy"
	}, "fr");
	addLocale({
		..._fr,
		ampm: _B("AM;PM"),
		format: xf({
			p: 1,
			o: 2,
			d: 1,
			k: "-",
			l: "-",
			s: 1
		}),
		sysdate: "d mmmm yyyy"
	}, "fr-CA");
	addLocale({
		group: "'",
		decimal: ".",
		..._fr,
		currency: "CHF",
		format: xf({
			o: 1,
			d: 1,
			k: ".",
			l: "."
		}),
		sysdate: "dddd, d mmmm yyyy"
	}, "fr-CH");
	const _de = xm({
		mmmm: _M("Januar;Februar;März;April;Mai;Juni;Juli;August;September;Oktober;November;Dezember"),
		mmm: _M("Jan;Feb;Mrz;Apr;Mai;Jun;Jul;Aug;Sep;Okt;Nov;Dez"),
		dddd: _W("Sonn~;Mon~;Diens~;Mittwoch;Donners~;Frei~;Sams~", "tag"),
		bool: _B("WAHR;FALSCH"),
		color: "Farbe",
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
		opcodes: {
			dy: "j",
			dd: "t"
		},
		general: "Standard",
		sysdate: "dddd, d. mmmm yyyy",
		systime: "hh:mm:ss"
	}, -1, 2);
	addLocale({
		group: ".",
		decimal: ",",
		..._de,
		currency: "€",
		format: xf({
			k: ".",
			l: ". "
		})
	}, "de");
	addLocale({
		group: "’",
		decimal: ".",
		..._de,
		currency: "CHF",
		mmm: _M("Jan;Feb;Mär;Apr;Mai;Jun;Jul;Aug;Sep;Okt;Nov;Dez"),
		format: xf({
			o: 1,
			d: 1,
			k: ".",
			f: 2,
			s: 1,
			l: ". "
		})
	}, "de-CH");
	addLocale(xm({
		group: ".",
		decimal: ",",
		ampm: _B("πμ;μμ"),
		mmmm: _M("Ιανουαρ~;Φεβρουαρ~;Μαρτ~;Απριλ~;Μαΐου;Ιουν~;Ιουλ~;Αυγούστου;Σεπτεμβρ~;Οκτωβρ~;Νοεμβρ~;Δεκεμβρ~", "ίου"),
		mmm: _M("Ιαν;Φεβ;Μαρ;Απρ;Μαϊ;Ιουν;Ιουλ;Αυγ;Σεπ;Οκτ;Νοε;Δεκ"),
		dddd: _W("Κυριακή;Δευτέρα;Τρίτη;Τετάρτη;Πέμπτη;Παρασκευή;Σάββατο"),
		ddd: [
			"Κυρ",
			"Δευ",
			"Τρι",
			"Τετ",
			"Πεμ",
			"Παρ",
			"Σαβ"
		],
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
		general: "Γενικός τύπος",
		color: "Χρώμα",
		opcodes: {
			dy: "ε",
			dm: "μ",
			dd: "η",
			th: "ω",
			tm: "λ",
			ts: "δ"
		},
		currency: "€",
		format: xf({
			h: 0,
			d: 0,
			m: 0
		}),
		sysdate: "dddd, d mmmm yyyy",
		systime: "h:mm:ss AM/PM"
	}, -1, 3), "el");
	addLocale({
		decimal: ",",
		ampm: _B("de.;du."),
		mmmm: _M("január;február;március;április;május;június;július;augusztus;szeptember;október;november;december"),
		mmm: _M("jan;febr;márc;ápr;máj;jún;júl;aug;szept;okt;nov;dec"),
		dddd: _W("vasárnap;hétfő;kedd;szerda;csütörtök;péntek;szombat"),
		ddd: _W("V;H;K;Sze;Cs;P;Szo"),
		bool: _B("IGAZ;HAMIS"),
		currency: "Ft",
		general: "Normál",
		opcodes: {
			dy: "é",
			dm: "h",
			dd: "n",
			th: "ó",
			tm: "p",
			ts: "m"
		},
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
		color: "Szín",
		format: xf({
			h: 0,
			o: 2,
			k: ".",
			l: ".",
			d: 1
		}),
		sysdate: "yyyy. mmmm d\".\", dddd",
		systime: "h:mm:ss"
	}, "hu");
	addLocale(xm({
		group: ".",
		decimal: ",",
		ampm: _B("f.h.;e.h."),
		mmmm: _M("janúar;febrúar;mars;apríl;maí;júní;júlí;ágúst;september;október;nóvember;desember"),
		dddd: _W("sunnu~;mánu~;þriðju~;miðviku~;fimmtu~;föstu~;laugar~", "dagur"),
		currency: "kr.",
		format: xf({
			d: 0,
			m: 0,
			k: ".",
			l: "."
		}),
		sysdate: "dddd, d. mmmm yyyy",
		systime: "hh:mm:ss"
	}, 3, 3), "is");
	addLocale(xm({
		group: ".",
		decimal: ",",
		ampm: _B("AM;PM"),
		mmmm: _M("Januari;Februari;Maret;April;Mei;Juni;Juli;Agustus;September;Oktober;November;Desember"),
		dddd: _W("Minggu;Senin;Selasa;Rabu;Kamis;Jumat;Sabtu"),
		ddd: _W("Mgg;Sen;Sel;Rab;Kam;Jum;Sab"),
		color: "Warna",
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
		currency: "Rp",
		format: xf({
			f: 0,
			b: "."
		}),
		sysdate: "dddd, dd mmmm yyyy",
		systime: "hh.mm.ss"
	}, 3, 3), "id");
	const _it = xm({
		mmmm: _M("gennaio;febbraio;marzo;aprile;maggio;giugno;luglio;agosto;settembre;ottobre;novembre;dicembre"),
		dddd: _W("domenica;lunedì;martedì;mercoledì;giovedì;venerdì;sabato"),
		bool: _B("VERO;FALSO"),
		general: "Standard",
		color: "Colore",
		colors: {
			nero: C_BLACK,
			bianco: C_WHITE,
			rosso: C_RED,
			verde: C_GREEN,
			blu: C_BLUE,
			giallo: C_YELLOW,
			fucsia: C_MAGENTA,
			celeste: C_CYAN,
			ciano: C_CYAN
		},
		opcodes: {
			dy: "a",
			dd: "g",
			wd: "o",
			en: "x"
		},
		systime: "hh:mm:ss"
	}, 3, 3);
	addLocale({
		group: ".",
		decimal: ",",
		..._it,
		currency: "€",
		format: xf({}),
		sysdate: "dddd d mmmm yyyy"
	}, "it");
	addLocale({
		group: "’",
		decimal: ".",
		..._it,
		currency: "CHF",
		format: xf({
			o: 1,
			d: 1,
			k: ".",
			l: ".",
			f: 2,
			s: 1
		}),
		sysdate: "dddd, d mmmm yyyy"
	}, "it-CH");
	const _no = {
		decimal: ",",
		ampm: _B("a.m.;p.m."),
		mmmm: _M("januar;februar;mars;april;mai;juni;juli;august;september;oktober;november;desember"),
		mmm: _M("jan;feb;mar;apr;mai;jun;jul;aug;sep;okt;nov;des"),
		dddd: _W("søn~;man~;tirs~;ons~;tors~;fre~;lør~", "dag"),
		bool: _B("SANN;USANN"),
		color: "Farge",
		colors: {
			svart: C_BLACK,
			hvit: C_WHITE,
			rød: C_RED,
			grønn: C_GREEN,
			blå: C_BLUE,
			gul: C_YELLOW,
			magenta: C_MAGENTA,
			cyan: C_CYAN
		},
		general: "Standard",
		opcodes: {
			dy: "å",
			th: "t"
		},
		currency: "kr",
		sysdate: "dddd d. mmmm yyyy",
		systime: "hh:mm:ss"
	};
	addLocale(xm({
		..._no,
		format: xf({
			f: 2,
			c: 1,
			k: ".",
			l: ".",
			s: 1
		})
	}, -1, 3), "nb");
	addLocale(xm({
		..._no,
		format: xf({
			f: 2,
			c: 1,
			k: ".",
			l: ".",
			s: 1
		})
	}, -1, 3), "no");
	addLocale(xm({
		decimal: ",",
		mmmm: _M("styczeń;luty;marzec;kwiecień;maj;czerwiec;lipiec;sierpień;wrzesień;październik;listopad;grudzień"),
		dddd: _W("niedziela;poniedziałek;wtorek;środa;czwartek;piątek;sobota"),
		ddd: _W("niedz;pon;wt;śr;czw;pt;sob"),
		bool: _B("PRAWDA;FAŁSZ"),
		color: "Kolor",
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
		general: "Standardowy",
		opcodes: {
			dy: "r",
			th: "g"
		},
		currency: "zł",
		format: xf({
			d: 0,
			k: ".",
			l: "."
		}),
		sysdate: "dddd, d mmmm yyyy",
		systime: "hh:mm:ss"
	}, 3, -1), "pl");
	const _pt = {
		decimal: ",",
		mmmm: _M("janeiro;fevereiro;março;abril;maio;junho;julho;agosto;setembro;outubro;novembro;dezembro"),
		dddd: _W("domingo;segunda-feira;terça-feira;quarta-feira;quinta-feira;sexta-feira;sábado"),
		bool: _B("VERDADEIRO;FALSO"),
		opcodes: {
			dy: "a",
			wd: "o"
		},
		color: "Cor"
	};
	addLocale({
		...xm(_pt, 3, 3),
		group: " ",
		general: "Estandar",
		colors: {
			preto: C_BLACK,
			branco: C_WHITE,
			vermelho: C_RED,
			verde: C_GREEN,
			azul: C_BLUE,
			amarelo: C_YELLOW,
			magenta: C_MAGENTA,
			turquesa: C_CYAN,
			ciano: C_CYAN
		},
		currency: "€",
		format: xf({ l: "/" }),
		sysdate: "d \"de\" mmmm \"de\" yyyy",
		systime: "hh:mm:ss"
	}, "pt");
	addLocale({
		...xm(_pt, 3, 3),
		group: ".",
		general: "Geral",
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
		currency: "R$",
		format: xf({
			f: 2,
			l: "/"
		}),
		sysdate: "dddd, d \"de\" mmmm \"de\" yyyy",
		systime: "hh:mm:ss"
	}, "pt-BR");
	addLocale({
		decimal: ",",
		nan: "не\xA0число",
		mmmm: _M("Январь;Февраль;Март;Апрель;Май;Июнь;Июль;Август;Сентябрь;Октябрь;Ноябрь;Декабрь"),
		mmm: _M("янв;фев;мар;апр;май;июн;июл;авг;сен;окт;ноя;дек"),
		dddd: _W("воскресенье;понедельник;вторник;среда;четверг;пятница;суббота"),
		ddd: _W("Вс;Пн;Вт;Ср;Чт;Пт;Сб"),
		mmmm6: _M("рамадан;шавваль;зуль-каада;зуль-хиджжа;мухаррам;раби-уль-авваль;раби-уль-ахир;джумад-уль-авваль;джумад-уль-ахир;раджаб;шаабан;рамадан"),
		mmm6: _M("рам.;шав.;зуль-к.;зуль-х.;мух.;раб. I;раб. II;джум. I;джум. II;радж.;шааб.;рам."),
		bool: _B("ИСТИНА;ЛОЖЬ"),
		general: "Основной",
		opcodes: {
			dy: "г",
			dm: "м",
			dd: "д",
			th: "ч",
			tm: "м",
			ts: "с"
		},
		color: "Цвет",
		colors: {
			черный: C_BLACK,
			белый: C_WHITE,
			красный: C_RED,
			зеленый: C_GREEN,
			синий: C_BLUE,
			желтый: C_YELLOW,
			фиолетовый: C_MAGENTA,
			пурпурный: C_MAGENTA,
			голубой: C_CYAN
		},
		currency: "₽",
		format: xf({
			h: 0,
			k: ".",
			l: "."
		}),
		sysdate: "d mmmm yyyy \"г.\"",
		systime: "h:mm:ss"
	}, "ru");
	addLocale(xm({
		decimal: ",",
		mmmm: _M("január;február;marec;apríl;máj;jún;júl;august;september;október;november;december"),
		mmm: _M("1;2;3;4;5;6;7;8;9;10;11;12"),
		dddd: _W("nedeľa;pondelok;utorok;streda;štvrtok;piatok;sobota"),
		color: "Farba",
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
		currency: "€",
		format: xf(fp2),
		sysdate: "dddd d. mmmm yyyy",
		systime: "h:mm:ss"
	}, 3, 2), "sk");
	const _es = {
		group: ".",
		decimal: ",",
		ampm: _B("a.\xA0m.;p.\xA0m."),
		mmmm: _M("enero;febrero;marzo;abril;mayo;junio;julio;agosto;septiem~;octu~;noviem~;diciem~", "bre"),
		mmm: _M("ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic"),
		dddd: _W("domingo;lunes;martes;miércoles;jueves;viernes;sábado"),
		ddd: _W("dom;lun;mar;mié;jue;vie;sáb"),
		bool: _B("VERDADERO;FALSO"),
		colors: {
			negro: C_BLACK,
			blanco: C_WHITE,
			rojo: C_RED,
			verde: C_GREEN,
			azul: C_BLUE,
			amarillo: C_YELLOW,
			magenta: C_MAGENTA,
			cian: C_CYAN,
			ciano: C_CYAN
		},
		systime: "h:mm:ss",
		sysdate: "dddd, d \"de\" mmmm \"de\" yyyy"
	};
	const _esM3 = _M("ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic");
	const _esM3s = _M("ene;feb;mar;abr;may;jun;jul;ago;sept;oct;nov;dic");
	addLocale({
		..._es,
		ampm: _B("AM;PM"),
		ddd: _W("do;lu;ma;mi;ju;vi;sá"),
		general: "Estándar",
		opcodes: {
			dy: "a",
			wd: "o"
		},
		currency: "€",
		format: xf({
			h: 0,
			d: 1
		})
	}, "es");
	addLocale({
		..._es,
		mmm: _esM3s,
		format: xf({
			d: 0,
			f: 2,
			m: 0
		}),
		systime: "hh:mm:ss"
	}, "es-AR");
	addLocale({
		..._es,
		mmm: _esM3s,
		currency: "Bs",
		format: xf({
			d: 0,
			f: 0,
			m: 0
		}),
		systime: "hh:mm:ss"
	}, "es-BO");
	addLocale({
		..._es,
		mmm: _esM3s,
		format: xf({
			h: 0,
			f: 0,
			s: 1,
			k: "-"
		})
	}, "es-CL");
	addLocale({
		..._es,
		mmm: _esM3,
		format: xf({
			h: 0,
			d: 0,
			f: 2
		}),
		systime: "h:mm:ss AM/PM"
	}, "es-CO");
	addLocale({
		..._es,
		mmm: _esM3s,
		format: xf(fp5)
	}, "es-EC");
	addLocale({
		..._es,
		mmm: _esM3s,
		currency: "₲",
		format: xf({
			d: 0,
			f: 2,
			s: 1,
			m: 0
		}),
		systime: "hh:mm:ss"
	}, "es-PY");
	addLocale({
		..._es,
		group: ",",
		decimal: ".",
		mmm: _esM3,
		ampm: _B("a. m.;p. m."),
		opcodes: {
			dy: "a",
			wd: "o"
		},
		general: "Estándar",
		format: xf({
			f: 0,
			i: 1
		}),
		systime: "hh:mm:ss AM/PM"
	}, "es-MX");
	addLocale({
		..._es,
		mmmm: _M("Enero;Febrero;Marzo;Abril;Mayo;Junio;Julio;Agosto;Setiembre;Octubre;Noviembre;Diciembre"),
		mmm: _M("Ene;Feb;Mar;Abr;May;Jun;Jul;Ago;set;Oct;Nov;Dic"),
		format: xf({
			d: 0,
			f: 2,
			h: 0,
			m: 0
		})
	}, "es-UY");
	addLocale({
		..._es,
		mmm: _esM3s,
		currency: "Bs.S",
		format: xf(fp5),
		systime: "h:mm:ss AM/PM"
	}, "es-VE");
	addLocale(xm({
		decimal: ",",
		ampm: _B("fm;em"),
		mmmm: _M("januari;februari;mars;april;maj;juni;juli;augusti;september;oktober;november;december"),
		dddd: _W("sön~;mån~;tis~;ons~;tors~;fre~;lör~", "dag"),
		opcodes: {
			dy: "å",
			th: "t"
		},
		bool: ["SANT", "FALSKT"],
		general: "Standard",
		color: "Färg",
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
		currency: "kr",
		format: xf({
			o: 2,
			k: "-"
		}),
		sysdate: "\"den\" d mmmm yyyy",
		systime: "hh:mm:ss"
	}, 3, 3), "sv");
	addLocale(xm({
		group: ".",
		decimal: ",",
		ampm: _B("ÖÖ;ÖS"),
		mmmm: _M("Ocak;Şubat;Mart;Nisan;Mayıs;Haziran;Temmuz;Ağustos;Eylül;Ekim;Kasım;Aralık"),
		mmm: _M("Oca;Şub;Mar;Nis;May;Haz;Tem;Ağu;Eyl;Eki;Kas;Ara"),
		dddd: _W("Pazar;Pazartesi;Salı;Çarşamba;Perşembe;Cuma;Cumartesi"),
		ddd: _W("Paz;Pzt;Sal;Çar;Per;Cum;Cmt"),
		bool: _B("DOĞRU;YANLIŞ"),
		color: "Renk",
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
		opcodes: {
			dm: "a",
			dd: "g",
			th: "s",
			tm: "d",
			ts: "n"
		},
		general: "Genel",
		currency: "₺",
		format: xf({
			d: 0,
			f: 0,
			k: ".",
			l: "."
		}),
		sysdate: "d mmmm yyyy dddd",
		systime: "hh:mm:ss"
	}, 3, -1), "tr");
	addLocale({
		group: ",",
		ampm: _B("AM;PM"),
		mmmm: _M("Ionawr;Chwefror;Mawrth;Ebrill;Mai;Mehefin;Gorffennaf;Awst;Medi;Hydref;Tachwedd;Rhagfyr"),
		mmm: _M("Ion;Chwef;Maw;Ebr;Mai;Meh;Gorff;Awst;Medi;Hyd;Tach;Rhag"),
		dddd: _W("Dydd Sul;Dydd Llun;Dydd Mawrth;Dydd Mercher;Dydd Iau;Dydd Gwener;Dydd Sadwrn"),
		ddd: _W("Sul;Llun;Maw;Mer;Iau;Gwe;Sad"),
		currency: "£",
		format: xf({
			f: 0,
			p: 0
		}),
		sysdate: "dddd, d mmmm yyyy",
		systime: "hh:mm:ss"
	}, "cy");
	addLocale({
		group: ".",
		decimal: ",",
		mmmm: _M("yanvar;fevral;mart;aprel;may;iyun;iyul;avqust;sentyabr;oktyabr;noyabr;dekabr"),
		mmm: _M("yan;fev;mar;apr;may;iyn;iyl;avq;sen;okt;noy;dek"),
		dddd: _W("bazar;bazar ertəsi;çərşənbə axşamı;çərşənbə;cümə axşamı;cümə;şənbə"),
		ddd: _W("B;B.E;Ç.A;Ç;C.A;C;Ş"),
		currency: "₼",
		format: xf(fp1),
		sysdate: "d mmmm yyyy, dddd",
		systime: "hh:mm:ss"
	}, "az");
	addLocale(xm({
		decimal: ",",
		mmmm: _M("студзень;люты;сакавік;красавік;май;чэрвень;ліпень;жнівень;верасень;кастрычнік;лістапад;снежань"),
		mmm: _M("студз;лют;сак;крас;май;чэрв;ліп;жн;вер;кастр;ліст;снеж"),
		dddd: _W("нядзеля;панядзелак;аўторак;серада;чацвер;пятніца;субота"),
		ddd: _W("нд;пн;аўт;ср;чц;пт;сб"),
		currency: "Br",
		format: xf({
			y: 1,
			k: ".",
			l: "."
		}),
		sysdate: "d mmmm yyyy",
		systime: "hh:mm:ss"
	}, 3, -1), "be");
	addLocale({
		decimal: ",",
		mmmm: _M("януари;февруари;март;април;май;юни;юли;август;септември;октомври;ноември;декември"),
		mmm: _M("яну;фев;мар;апр;май;юни;юли;авг;сеп;окт;ное;дек"),
		dddd: _W("неделя;понеделник;вторник;сряда;четвъртък;петък;събота"),
		ddd: _W("нед;пон;вт;ср;четв;пет;съб"),
		currency: "лв.",
		format: xf(fp2),
		sysdate: "dd mmmm yyyy \"г.\"",
		systime: "h:mm:ss"
	}, "bg");
	addLocale({
		group: ".",
		decimal: ",",
		mmmm: _M("gener;febrer;març;abril;maig;juny;juliol;agost;setembre;octubre;novembre;desembre"),
		mmm: _M("gen;febr;març;abr;maig;juny;jul;ag;set;oct;nov;des"),
		dddd: _W("diumenge;dilluns;dimarts;dimecres;dijous;divendres;dissabte"),
		ddd: _W("dg;dl;dt;dc;dj;dv;ds"),
		general: "Estándar",
		opcodes: {
			dy: "a",
			wd: "o"
		},
		ampm: _B("a.\xA0m.;p.\xA0m."),
		currency: "€",
		format: xf({
			d: 0,
			o: 1,
			h: 0,
			m: 0
		}),
		sysdate: "dddd, d mmmm \"de\" yyyy",
		systime: "h:mm:ss"
	}, "ca");
	addLocale(xm({
		group: ",",
		decimal: ".",
		mmmm: _M("Enero;Pebrero;Marso;Abril;Mayo;Hunyo;Hulyo;Agosto;Setyembre;Oktubre;Nobyembre;Disyembre"),
		dddd: _W("Linggo;Lunes;Martes;Miyerkules;Huwebes;Biyernes;Sabado"),
		currency: "₱",
		format: xf({
			h: 0,
			d: 0,
			f: 0,
			m: 0,
			o: 0
		}),
		sysdate: "dddd, mmmm d, yyyy",
		systime: "h:mm:ss AM/PM"
	}, 3, 3), "fil");
	addLocale({
		group: ",",
		decimal: ".",
		ampm: ["પૂર્વ\xA0મધ્યાહ્ન", "ઉત્તર\xA0મધ્યાહ્ન"],
		mmmm: _M("જાન્યુઆરી;ફેબ્રુઆરી;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટેમ્બર;ઑક્ટોબર;નવેમ્બર;ડિસેમ્બર"),
		mmm: _M("જાન્યુ;ફેબ્રુ;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગ;સપ્ટે;ઑક્ટો;નવે;ડિસે"),
		dddd: _W("રવિ~;સોમ~;મંગળ~;બુધ~;ગુરુ~;શુક્ર~;શનિ~", "વાર"),
		ddd: _W("રવિ;સોમ;મંગળ;બુધ;ગુરુ;શુક્ર;શનિ"),
		currency: "₹",
		format: xf(fp3),
		sysdate: "dd mmmm yyyy",
		systime: "hh:mm:ss"
	}, "gu");
	addLocale({
		group: ",",
		decimal: ".",
		ampm: _B("לפ׳;אח׳"),
		dddd: [
			"יום\xA0ראשון",
			"יום\xA0שני",
			"יום\xA0שלישי",
			"יום\xA0רביעי",
			"יום\xA0חמישי",
			"יום\xA0שישי",
			"שבת"
		],
		ddd: [
			"יום\xA0א",
			"יום\xA0ב",
			"יום\xA0ג",
			"יום\xA0ד",
			"יום\xA0ה",
			"יום\xA0ו",
			"שבת"
		],
		mmmm: _M("ינואר;פברואר;מרץ;אפריל;מאי;יוני;יולי;אוגוסט;ספטמבר;אוקטובר;נובמבר;דצמבר"),
		mmm: _M("ינו;פבר;מרץ;אפר;מאי;יונ;יול;אוג;ספט;אוק;נוב;דצמ"),
		mmmm6: _M("רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע אל־אוול;רביע א־ת׳אני;ג׳ומאדא אל־אולא;ג׳ומאדא א־ת׳אניה;רג׳ב;שעבאן;רמדאן"),
		mmm6: _M("רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע א׳;רביע ב׳;ג׳ומאדא א׳;ג׳ומאדא ב׳;רג׳ב;שעבאן;רמדאן"),
		color: "צבע",
		colors: {
			"שחור": C_BLACK,
			"לבן": C_WHITE,
			"אדום": C_RED,
			"ירוק": C_GREEN,
			"כחול": C_BLUE,
			"צהוב": C_YELLOW,
			"אדום ארגמן": C_MAGENTA,
			"תכלת": C_CYAN
		},
		currency: "₪",
		format: xf({
			f: 2,
			s: 1
		}),
		sysdate: "dddd dd mmmm yyyy",
		systime: "hh:mm:ss"
	}, "he");
	addLocale(xm({
		group: ".",
		decimal: ",",
		mmmm: _M("siječanj;veljača;ožujak;travanj;svibanj;lipanj;srpanj;kolovoz;rujan;listopad;studeni;prosinac"),
		mmm: _M("sij;vlj;ožu;tra;svi;lip;srp;kol;ruj;lis;stu;pro"),
		dddd: _W("nedjelja;ponedjeljak;utorak;srijeda;četvrtak;petak;subota"),
		currency: "€",
		format: xf(fp2),
		sysdate: "d. mmmm yyyy.",
		systime: "h:mm:ss"
	}, -1, 3), "hr");
	addLocale({
		decimal: ",",
		mmmm: _M("Հունվար;Փետրվար;Մարտ;Ապրիլ;Մայիս;Հունիս;Հուլիս;Օգոստոս;Սեպտեմբեր;Հոկտեմբեր;Նոյեմբեր;Դեկտեմբեր"),
		mmm: _M("Հնվ;Փտվ;Մրտ;Ապր;Մյս;Հնս;Հլս;Օգս;Սպտ;Հկտ;Նյմ;Դկտ"),
		dddd: _W("Կիրակի;Երկուշաբթի;Երեքշաբթի;Չորեքշաբթի;Հինգշաբթի;Ուրբաթ;Շաբաթ"),
		ddd: _W("Կիր;Երկ;Երք;Չրք;Հնգ;Ուր;Շբթ"),
		currency: "֏",
		format: xf(fp1),
		sysdate: "d mmmm, yyyy",
		systime: "hh:mm:ss"
	}, "hy");
	addLocale(xm({
		decimal: ",",
		mmmm: _M("იანვარი;თებერვალი;მარტი;აპრილი;მაისი;ივნისი;ივლისი;აგვისტო;სექტემბერი;ოქტომბერი;ნოემბერი;დეკემბერი"),
		dddd: _W("კვირა;ორშაბათი;სამშაბათი;ოთხშაბათი;ხუთშაბათი;პარასკევი;შაბათი"),
		ddd: _W("კვ;ორშ;სამშ;ოთხშ;ხუთშ;პარ;შაბ"),
		currency: "₾",
		format: xf(fp1),
		sysdate: "dddd, dd mmmm, yyyy",
		systime: "hh:mm:ss"
	}, 3, -1), "ka");
	addLocale(xm({
		decimal: ",",
		mmmm: _M("Қаңтар;Ақпан;Наурыз;Сәуір;Мамыр;Маусым;Шілде;Тамыз;Қыркүйек;Қазан;Қараша;Желтоқсан"),
		mmm: _M("қаң;ақп;нау;сәу;мам;мау;шіл;там;қыр;қаз;қар;жел"),
		dddd: _W("жексенбі;дүйсенбі;сейсенбі;сәрсенбі;бейсенбі;жұма;сенбі"),
		ddd: _W("жек;дүй;сей;сәр;бей;жұм;сен"),
		opcodes: {
			dy: "г",
			dm: "м",
			dd: "д",
			th: "ч",
			tm: "м",
			ts: "с"
		},
		currency: "₸",
		general: "Основной",
		format: xf(fp1),
		sysdate: "yyyy ж. d mmmm, dddd",
		systime: "hh:mm:ss"
	}, -1, -1), "kk");
	addLocale({
		group: ",",
		mmmm: _M("ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಏಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್"),
		mmm: _M("ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಎಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್"),
		dddd: _W("ಭಾನು~;ಸೋಮ~;ಮಂಗಳ~;ಬುಧ~;ಗುರು~;ಶುಕ್ರ~;ಶನಿ~", "ವಾರ"),
		ddd: _W("ಭಾನು;ಸೋಮ;ಮಂಗಳ;ಬುಧ;ಗುರು;ಶುಕ್ರ;ಶನಿ"),
		ampm: _B("ಪೂರ್ವಾಹ್ನ;ಅಪರಾಹ್ನ"),
		currency: "₹",
		format: xf(fp3),
		sysdate: "dd mmmm yyyy",
		systime: "hh:mm:ss"
	}, "kn");
	addLocale({
		decimal: ",",
		mmmm: _M("sausis;vasaris;kovas;balandis;gegužė;birželis;liepa;rugpjūtis;rugsėjis;spalis;lapkritis;gruodis"),
		mmm: _M("saus;vas;kov;bal;geg;birž;liep;rugp;rugs;spal;lapkr;gruod"),
		dddd: _W("sekmadienis;pirmadienis;antradienis;trečiadienis;ketvirtadienis;penktadienis;šeštadienis"),
		ddd: _W("sk;pr;an;tr;kt;pn;št"),
		ampm: _B("priešpiet;popiet"),
		currency: "€",
		format: xf({
			o: 2,
			k: "-"
		}),
		sysdate: "yyyy \"m.\" mmmm d \"d.,\" dddd",
		systime: "hh:mm:ss"
	}, "lt");
	addLocale({
		decimal: ",",
		mmmm: _M("janvāris;februāris;marts;aprīlis;maijs;jūnijs;jūlijs;augusts;septembris;oktobris;novembris;decembris"),
		mmm: _M("janv;febr;marts;apr;maijs;jūn;jūl;aug;sept;okt;nov;dec"),
		dddd: _W("svētdiena;pirmdiena;otrdiena;trešdiena;ceturtdiena;piektdiena;sestdiena"),
		ddd: _W("Svētd;Pirmd;Otrd;Trešd;Ceturtd;Piektd;Sestd"),
		ampm: _B("priekšp.;pēcp."),
		currency: "€",
		format: xf(fp1),
		sysdate: "dddd, yyyy. \"gada\" d. mmmm",
		systime: "hh:mm:ss"
	}, "lv");
	addLocale({
		group: ",",
		decimal: ".",
		mmmm: _M("ജനുവരി;ഫെബ്രുവരി;മാര്‍‌ച്ച്;ഏപ്രില്‍;മേയ്;ജൂൺ;ജൂലൈ;ആഗസ്റ്റ്;സെപ്‌റ്റംബര്‍;ഒക്‌ടോബര്‍;നവംബര്‍;ഡിസംബര്‍"),
		mmm: _M("ജനു;ഫെബ്രു;മാർ;ഏപ്രി;മേയ്;ജൂൺ;ജൂലൈ;ഓഗ;സെപ്റ്റം;ഒക്ടോ;നവം;ഡിസം"),
		dddd: _W("ഞായറാഴ്‌ച;തിങ്കളാഴ്‌ച;ചൊവ്വാഴ്ച;ബുധനാഴ്‌ച;വ്യാഴാഴ്‌ച;വെള്ളിയാഴ്‌ച;ശനിയാഴ്‌ച"),
		ddd: _W("ഞായർ;തിങ്കൾ;ചൊവ്വ;ബുധൻ;വ്യാഴം;വെള്ളി;ശനി"),
		currency: "₹",
		format: xf({
			d: 0,
			m: 0,
			h: 0,
			y: 0,
			f: 0,
			o: 1,
			k: "/",
			b: ":",
			s: 0
		}),
		sysdate: "yyyy, mmmm d, dddd",
		systime: "h:mm:ss AM/PM"
	}, "ml");
	addLocale({
		group: ",",
		decimal: ".",
		mmmm: _M("Нэгдүгээ~;Хоёрдугаа~;Гуравдугаа~;Дөрөвдүгээ~;Тавдугаа~;Зургаадугаа~;Долоодугаа~;Наймдугаа~;Есдүгээ~;Аравдугаа~;Арван нэгдүгээ~;Арван хоёрдугаар са", "р сар"),
		mmm: _M("1~;2~;3~;4~;5~;6~;7~;8~;9~;10~;11~;12~", "-р сар"),
		dddd: _W("ням;даваа;мягмар;лхагва;пүрэв;баасан;бямба"),
		ddd: _W("Ня;Да;Мя;Лха;Пү;Ба;Бя"),
		ampm: _B("ү.ө.;ү.х."),
		currency: "₮",
		format: xf({
			o: 2,
			f: 2,
			k: ".",
			l: "."
		}),
		sysdate: "yyyy оны mmmmын d, dddd гараг",
		systime: "hh:mm:ss"
	}, "mn");
	addLocale({
		group: ",",
		decimal: ".",
		ampm: ["म.पू.", "म.नं."],
		mmmm: _M("जानेवारी;फेब्रुवारी;मार्च;एप्रिल;मे;जून;जुलै;ऑगस्ट;सप्टेंबर;ऑक्टोबर;नोव्हेंबर;डिसेंबर"),
		mmm: _M("जाने;फेब्रु;मार्च;एप्रि;मे;जून;जुलै;ऑग;सप्टें;ऑक्टो;नोव्हें;डिसें"),
		dddd: _W("रविवार;सोमवार;मंगळवार;बुधवार;गुरुवार;शुक्रवार;शनिवार"),
		ddd: _W("रवि;सोम;मंगळ;बुध;गुरु;शुक्र;शनि"),
		currency: "₹",
		format: xf(fp4),
		sysdate: "dd mmmm yyyy",
		systime: "hh:mm:ss"
	}, "mr");
	addLocale(xm({
		group: ",",
		decimal: ".",
		mmmm: _M("ဇန်နဝါရီ;ဖေဖော်ဝါရီ;မတ်;ဧပြီ;မေ;ဇွန်;ဇူလိုင်;ဩဂုတ်;စက်တင်ဘာ;အောက်တိုဘာ;နိုဝင်ဘာ;ဒီဇင်ဘာ"),
		mmm: _M("ဇန်;ဖေ;မတ်;ဧ;မေ;ဇွန်;ဇူ;ဩ;စက်;အောက်;နို;ဒီ"),
		dddd: _W("တနင်္ဂနွေ;တနင်္လာ;အင်္ဂါ;ဗုဒ္ဓဟူး;ကြာသပတေး;သောကြာ;စနေ"),
		ampm: _B("နံနက်;ညနေ"),
		currency: "K",
		format: xf({
			h: 0,
			d: 0,
			m: 0
		}),
		sysdate: "yyyy၊ mmmm d၊ dddd",
		systime: "h:mm:ss"
	}, -1, 0), "my");
	addLocale(xm({
		group: ",",
		decimal: ".",
		mmmm: _M("ਜਨਵਰੀ;ਫ਼ਰਵਰੀ;ਮਾਰਚ;ਅਪ੍ਰੈਲ;ਮਈ;ਜੂਨ;ਜੁਲਾਈ;ਅਗਸਤ;ਸਤੰਬਰ;ਅਕਤੂਬਰ;ਨਵੰਬਰ;ਦਸੰਬਰ"),
		dddd: _W("ਐਤਵਾਰ;ਸੋਮਵਾਰ;ਮੰਗਲਵਾਰ;ਬੁੱਧਵਾਰ;ਵੀਰਵਾਰ;ਸ਼ੁੱਕਰਵਾਰ;ਸ਼ਨਿੱਚਰਵਾਰ"),
		ddd: _W("ਐਤ;ਸੋਮ;ਮੰਗਲ;ਬੁੱਧ;ਵੀਰ;ਸ਼ੁਕਰ;ਸ਼ਨਿੱਚਰ"),
		ampm: ["ਸਵੇਰ", "ਸ਼ਾਮ"],
		currency: "₹",
		format: xf({
			d: 1,
			i: 1,
			y: 1,
			f: 2,
			o: 1,
			k: "-",
			b: ":",
			s: 1
		}),
		sysdate: "dd mmmm yyyy dddd",
		systime: "AM/PM hh:mm:ss"
	}), "pa");
	addLocale({
		group: ".",
		decimal: ",",
		mmmm: _M("ianuarie;februarie;martie;aprilie;mai;iunie;iulie;august;septem~;octom~;noiem~;decem~", "brie"),
		mmm: _M("ian;feb;mar;apr;mai;iun;iul;aug;sept;oct;nov;dec"),
		dddd: _W("duminică;luni;marți;miercuri;joi;vineri;sâmbătă"),
		ddd: _W("dum;lun;mar;mie;joi;vin;sâm"),
		ampm: _B("a.m.;p.m."),
		currency: "lei",
		format: xf(fp1),
		sysdate: "dddd, d mmmm yyyy",
		systime: "hh:mm:ss"
	}, "ro");
	addLocale(xm({
		group: ".",
		decimal: ",",
		mmmm: _M("januar;februar;marec;april;maj;junij;julij;avgust;september;oktober;november;december"),
		dddd: _W("nedelja;ponedeljek;torek;sreda;četrtek;petek;sobota"),
		ampm: _B("dop.;pop."),
		currency: "€",
		format: xf({
			d: 0,
			k: ".",
			l: "."
		}),
		sysdate: "dddd, d. mmmm yyyy",
		systime: "hh:mm:ss"
	}, 3, 3), "sl");
	addLocale(xm({
		group: ".",
		decimal: ",",
		mmmm: _M("januar;februar;mart;april;maj;jun;jul;avgust;septembar;oktobar;novembar;decembar"),
		dddd: _W("nedelja;ponedeljak;utorak;sreda;četvrtak;petak;subota"),
		currency: "RSD",
		format: xf({
			d: 0,
			m: 0,
			k: ".",
			l: "."
		}),
		sysdate: "dddd, d. mmmm yyyy.",
		systime: "hh:mm:ss"
	}, 3, 3), "sr");
	addLocale(xm({
		group: ",",
		decimal: ".",
		ampm: ["காலை", "மாலை"],
		mmmm: _M("ஜனவரி;பிப்ரவரி;மார்ச்;ஏப்ரல்;மே;ஜூன்;ஜூலை;ஆகஸ்ட்;செப்டம்பர்;அக்டோபர்;நவம்பர்;டிசம்பர்"),
		dddd: _W("ஞாயிறு;திங்கள்;செவ்வாய்;புதன்;வியாழன்;வெள்ளி;சனி"),
		currency: "₹",
		format: xf({
			d: 1,
			y: 0,
			f: 2,
			o: 1,
			k: "-",
			b: ":",
			s: 1
		}),
		sysdate: "dd mmmm yyyy",
		systime: "hh:mm:ss"
	}), "ta");
	addLocale({
		group: ",",
		decimal: ".",
		mmmm: _M("జనవరి;ఫిబ్రవరి;మార్చి;ఏప్రిల్;మే;జూన్;జులై;ఆగస్టు;సెప్టెంబర్;అక్టోబర్;నవంబర్;డిసెంబర్"),
		mmm: _M("జన;ఫిబ్ర;మార్చి;ఏప్రి;మే;జూన్;జులై;ఆగ;సెప్టెం;అక్టో;నవం;డిసెం"),
		dddd: _W("ఆదివారం;సోమవారం;మంగళవారం;బుధవారం;గురువారం;శుక్రవారం;శనివారం"),
		ddd: _W("ఆది;సోమ;మంగళ;బుధ;గురు;శుక్ర;శని"),
		currency: "₹",
		format: xf({
			d: 1,
			h: 0,
			y: 0,
			f: 0,
			o: 1,
			k: "-",
			b: ":",
			s: 0
		}),
		sysdate: "d, mmmm yyyy, dddd",
		systime: "h:mm:ss AM/PM"
	}, "te");
	addLocale({
		decimal: ",",
		mmmm: _M("січень;лютий;березень;квітень;травень;червень;липень;серпень;вересень;жовтень;листопад;грудень"),
		mmm: _M("Січ;Лют;Бер;Кві;Тра;Чер;Лип;Сер;Вер;Жов;Лис;Гру"),
		dddd: _W("неділя;понеділок;вівторок;середа;четвер;п'ятниця;субота"),
		ddd: _W("Нд;Пн;Вт;Ср;Чт;Пт;Сб"),
		ampm: _B("дп;пп"),
		currency: "₴",
		format: xf({
			h: 0,
			k: ".",
			l: "."
		}),
		sysdate: "d mmmm yyyy \"р.\"",
		systime: "h:mm:ss"
	}, "uk");
	addLocale({
		group: ".",
		decimal: ",",
		mmmm: _M("~Giêng;~Hai;~Ba;~Tư;~Năm;~Sáu;~Bảy;~Tám;~Chín;~Mười;~Mười Một;~Mười Hai", "Tháng "),
		mmm: _M("~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12", "Thg"),
		dddd: _W("Chủ Nhật;~Hai;~Ba;~Tư;~Năm;~Sáu;~Bảy", "Thứ "),
		ddd: _W("CN;T2;T3;T4;T5;T6;T7"),
		ampm: _B("SA;CH"),
		currency: "₫",
		format: xf({
			h: 0,
			d: 1
		}),
		sysdate: "dd mmmm yyyy",
		systime: "h:mm:ss AM/PM"
	}, "vi");
	addLocale(xm({
		group: "٬",
		decimal: "٫",
		ampm: _B("ص;م"),
		percent: "٪",
		mmmm: _M("يناير;فبراير;مارس;أبريل;مايو;يونيو;يوليو;أغسطس;سبتمبر;أكتوبر;نوفمبر;ديسمبر"),
		dddd: _W("الأحد;الإثنين;الثلاثاء;الأربعاء;الخميس;الجمعة;السبت"),
		mmmm6: _M("رمضان;شوال;ذو القعدة;ذو الحجة;محرم;ربيع الأول;ربيع الآخرة;جمادى الأولى;جمادى الآخرة;رجب;شعبان;رمضان"),
		color: "اللون",
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
		currency: "⃁",
		format: xf({
			f: 2,
			i: 1,
			y: 1,
			s: 1
		}),
		sysdate: "dd/mmmm/yyyy",
		systime: "hh:mm:ss AM/PM"
	}, 0, 0), "ar");
	addLocale({
		group: ",",
		decimal: ".",
		ampm: ["AM", "PM"],
		mmmm: _M("জানুয়ারী;ফেব্রুয়ারী;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগস্ট;সেপ্টেম্বর;অক্টোবর;নভেম্বর;ডিসেম্বর"),
		mmm: _M("জানু;ফেব্রু;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগ;সেপ্টে;অক্টো;নভে;ডিসে"),
		dddd: _W("রবিবার;সোমবার;মঙ্গলবার;বুধবার;বৃহস্পতিবার;শুক্রবার;শনিবার"),
		ddd: _W("রবি.;সোম.;মঙ্গল.;বুধ.;বৃহস্পতি.;শুক্র.;শনি."),
		currency: "₹",
		format: xf({
			f: 2,
			y: 1,
			k: "-",
			b: ".",
			s: 1
		}),
		sysdate: "dd mmmm yyyy",
		systime: "hh.mm.ss"
	}, "bn");
	addLocale({
		group: ",",
		decimal: ".",
		mmmm: _M("जनवरी;फरवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितम्बर;अक्तूबर;नवम्बर;दिसम्बर"),
		mmm: _M("जनवरी;फरवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितम्बर;अक्तूबर;नवम्बर;दिसम्बर"),
		dddd: _W("रविवार;सोमवार;मंगलवार;बुधवार;गुरुवार;शुक्रवार;शनिवार"),
		ddd: _W("रवि.;सोम.;मंगल.;बुध.;गुरु.;शुक्र.;शनि."),
		ampm: ["पूर्वाह्न", "अपराह्न"],
		currency: "₹",
		format: xf(fp4),
		sysdate: "dd mmmm yyyy",
		systime: "hh:mm:ss"
	}, "hi");
}
//#endregion
//#region lib/tokenHandlers.ts
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const reCurrencySymbol = new RegExp("^[" + reEsc(currencySymbols.join("")) + "]");
function getTokenHandlers(l10n) {
	const handlers = [];
	handlers.push([
		TOKEN_GENERAL,
		/^General/i,
		0
	]);
	if (l10n.general && l10n.general !== "General") handlers.push([
		TOKEN_GENERAL,
		new RegExp(`^${reEsc(l10n.general)}`, "i"),
		0
	]);
	if (l10n.colors) handlers.push([
		TOKEN_COLOR,
		new RegExp(`^\\[(${Object.keys(l10n.colors).map(reEsc).join("|")})\\]`, "i"),
		1
	]);
	if (l10n.color) handlers.push([
		TOKEN_COLOR,
		new RegExp(`^\\[(${reEsc(l10n.color)}\\s*\\d+)\\]`, "i"),
		1
	]);
	let reDatetime;
	let reDuration;
	if (l10n.opcodes) {
		const dy = reEsc(l10n.opcodes.dy ?? "y");
		const dm = reEsc(l10n.opcodes.dm ?? "m");
		const dd = reEsc(l10n.opcodes.dd ?? "d");
		const th = reEsc(l10n.opcodes.th ?? "h");
		const tm = reEsc(l10n.opcodes.tm ?? "m");
		const ts = reEsc(l10n.opcodes.ts ?? "s");
		const wd = reEsc(l10n.opcodes.wd ?? "a");
		const en = reEsc(l10n.opcodes.en ?? "g");
		const ops = `[${dy + dy.toUpperCase()}]+|[${dm + dm.toUpperCase()}]+|[${dd + dd.toUpperCase()}]+|[${th + th.toUpperCase()}]+|[${tm + tm.toUpperCase()}]+|[${ts + ts.toUpperCase()}]+|[${wd + wd.toUpperCase()}]{3,}|[${en + en.toUpperCase()}]+|[bB]+|e+`;
		reDatetime = new RegExp(`^(?:${ops})`);
		reDuration = new RegExp(`^(?:\\[(${reEsc(th)}+|${reEsc(tm)}+|${reEsc(ts)}+)\\]+)`, "i");
	} else {
		reDatetime = /^(?:[hH]+|[mM]+|[sS]+|[yY]+|[bB]+|[dD]+|[gG]+|[aA]{3,}|e+)/;
		reDuration = /^(?:\[(h+|m+|s+)\])/i;
	}
	if (l10n.currency.length > 1 || !currencySymbols.includes(l10n.currency)) handlers.push([
		TOKEN_CURRENCY,
		new RegExp(`^(?:${reEsc(l10n.currency)})`),
		0
	]);
	handlers.push([
		TOKEN_HASH,
		/^#/,
		0
	], [
		TOKEN_ZERO,
		/^0/,
		0
	], [
		TOKEN_QMARK,
		/^\?/,
		0
	], [
		TOKEN_SLASH,
		/^\//,
		0
	], [
		TOKEN_BREAK,
		/^;/,
		0
	], [
		TOKEN_TEXT,
		/^@/,
		0
	], [
		TOKEN_PLUS,
		/^\+/,
		0
	], [
		TOKEN_MINUS,
		/^-/,
		0
	], [
		TOKEN_POINT,
		/^\./,
		0
	], [
		TOKEN_SPACE,
		/^ /,
		0
	], [
		TOKEN_PERCENT,
		/^%/,
		0
	], [
		TOKEN_AMPM,
		/^(?:AM\/PM|am\/pm|A\/P)/,
		0
	], [
		TOKEN_CURRENCY,
		reCurrencySymbol,
		0
	], [
		TOKEN_DIGIT,
		/^[1-9]/,
		0
	], [
		TOKEN_CALENDAR,
		/^(?:B[12])/i,
		0
	], [
		TOKEN_ERROR,
		/^B$/,
		0
	], [
		TOKEN_DATETIME,
		reDatetime,
		0
	], [
		TOKEN_DURATION,
		reDuration,
		1
	], [
		TOKEN_CONDITION,
		/^\[((?:<[=>]?|>=?|=)\s*(?:-?[.\d]+))\]/,
		1
	], [
		TOKEN_DBNUM,
		/^\[(DBNum[0-4]?\d)\]/i,
		1
	], [
		TOKEN_NATNUM,
		/^\[(NatNum[0-4]?\d)\]/i,
		1
	], [
		TOKEN_LOCALE,
		/^\[\$([^\]]*)\]/,
		1
	], [
		TOKEN_COLOR,
		/^\[(black|blue|cyan|green|magenta|red|white|yellow|color\s*\d+)\]/i,
		1
	], [
		TOKEN_MODIFIER,
		/^\[([^\]]+)\]/,
		1
	], [
		TOKEN_ESCAPED,
		/^\\(.)/,
		1
	], [
		TOKEN_STRING,
		/^"([^"]*?)"/,
		1
	], [
		TOKEN_SKIP,
		/^_(\\.|.)/,
		1
	], [
		"EXP",
		/^[Ee]([+-])/,
		1
	], [
		TOKEN_FILL,
		/^\*(\\.|.)/,
		1
	], [
		TOKEN_PAREN,
		/^[()]/,
		0
	], [
		TOKEN_ERROR,
		/^[EÈÉÊËèéêëĒēĔĕĖėĘęĚěȄȅȆȇȨȩNnÑñŃńŅņŇňǸǹ["*/\\_]/,
		0
	], [
		TOKEN_CHAR,
		/^./,
		0
	]);
	return handlers;
}
//#endregion
//#region lib/tokenize.ts
const CODE_QMRK = 63;
const CODE_HASH = 35;
const CODE_ZERO = 48;
const CODE_NINE = 57;
const isNumOp$2 = (char) => {
	const c = (char || "\0").charCodeAt(0);
	return c === CODE_QMRK || c === CODE_HASH || c >= CODE_ZERO && c <= CODE_NINE;
};
function lexer(pattern, handlers) {
	let i = 0;
	const tokens = [];
	const unresolvedCommas = [];
	while (i < pattern.length) {
		const curr = pattern.slice(i);
		let step = 0;
		const mComma = /^(,+)(.)?/.exec(curr);
		if (mComma) {
			const raw = mComma[1];
			step = raw.length;
			const lookBehind = pattern[i - 1] || "";
			let maybeGROUP = false;
			let maybeSCALE = false;
			if (isNumOp$2(lookBehind)) {
				maybeGROUP = true;
				maybeSCALE = true;
			} else if (lookBehind === ".") maybeSCALE = true;
			const lookAhead = mComma[2] || "";
			if (maybeGROUP && (!lookAhead || lookAhead === ";")) maybeGROUP = false;
			if (maybeSCALE && isNumOp$2(lookAhead)) maybeSCALE = false;
			if (maybeGROUP && !maybeSCALE) tokens.push({
				type: TOKEN_GROUP,
				value: ",",
				raw
			});
			else if (!maybeGROUP && maybeSCALE) tokens.push({
				type: TOKEN_SCALE,
				value: ",",
				raw
			});
			else if (maybeGROUP && maybeSCALE) {
				const t = {
					type: TOKEN_SCALE,
					value: ",",
					raw
				};
				tokens.push(t);
				unresolvedCommas.push(t);
			} else tokens.push({
				type: TOKEN_COMMA,
				value: ",",
				raw
			});
		} else {
			let token;
			for (const [type, expr, group] of handlers) {
				const m = expr.exec(curr);
				if (m) {
					token = {
						type,
						value: m[group || 0],
						raw: m[0]
					};
					tokens.push(token);
					step = m[0].length;
					break;
				}
			}
			if (unresolvedCommas.length && token?.raw === ";") unresolvedCommas.length = 0;
			if (token && unresolvedCommas.length && isNumOp$2(token.raw)) {
				unresolvedCommas.forEach((d) => d.type = TOKEN_GROUP);
				unresolvedCommas.length = 0;
			}
		}
		if (!step) {
			const raw = curr[0];
			step = 1;
			tokens.push({
				type: TOKEN_CHAR,
				value: raw,
				raw
			});
		}
		i += step;
	}
	return tokens;
}
/**
* Breaks a format pattern string into a list of tokens.
*
* The returned output will be an array of objects representing the tokens:
*
* ```js
* [
*   { type: TOKEN_ZERO, value: '0', raw: '0' },
*   { type: TOKEN_POINT, value: '.', raw: '.' },
*   { type: TOKEN_ZERO, value: '0', raw: '0' },
*   { type: TOKEN_PERCENT, value: '%', raw: '%' }
* ]
* ```
*
* @param pattern The format pattern
* @returns A list of tokens
*/
function tokenize(pattern) {
	return lexer(pattern, getTokenHandlers(defaultLocale));
}
//#endregion
//#region lib/locale.ts
const re_locale = /^([a-z\d]+)(?:[_-]([a-z\d]+))?(?:\.([a-z\d]+))?(?:@([a-z\d]+))?$/i;
const locales = {};
/** @ignore */
const baseLocaleData = {
	group: "\xA0",
	decimal: ".",
	positive: "+",
	negative: "-",
	percent: "%",
	exponent: "E",
	nan: "NaN",
	infinity: "∞",
	ampm: ["AM", "PM"],
	mmmm6: [
		"Muharram",
		"Safar",
		"Rabiʻ I",
		"Rabiʻ II",
		"Jumada I",
		"Jumada II",
		"Rajab",
		"Shaʻban",
		"Ramadan",
		"Shawwal",
		"Dhuʻl-Qiʻdah",
		"Dhuʻl-Hijjah"
	],
	mmm6: [
		"Muh.",
		"Saf.",
		"Rab. I",
		"Rab. II",
		"Jum. I",
		"Jum. II",
		"Raj.",
		"Sha.",
		"Ram.",
		"Shaw.",
		"Dhuʻl-Q.",
		"Dhuʻl-H."
	],
	mmmm: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	mmm: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	],
	dddd: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	ddd: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	bool: ["TRUE", "FALSE"],
	general: "General",
	currency: "$",
	color: "Color",
	colors: {
		black: "Black",
		white: "White",
		red: "Red",
		green: "Green",
		blue: "Blue",
		yellow: "Yellow",
		magenta: "Magenta",
		cyan: "Cyan"
	},
	format: {
		minus: true,
		dateOrder: 1,
		currencyPos: 2,
		padMm: true,
		padDd: true,
		padHh: true
	}
};
/**
* Parse a regular IETF BCP 47 locale tag (`en-US`) and emit an object of its parts.
* Irregular tags and subtags are not supported.
*
* @param locale A BCP 47 string tag of the locale.
* @returns An object describing the locale.
* @throws If the locale tag is invalid.
*/
function parseLocale(locale) {
	const lm = re_locale.exec(locale);
	if (!lm) throw new SyntaxError(`Invalid locale: ${locale}`);
	return {
		lang: lm[1] + (lm[2] ? "-" + lm[2] : ""),
		language: lm[1],
		territory: lm[2] || ""
	};
}
function resolveLocale(l4e) {
	if (typeof l4e === "number") return codeToLocale[l4e & 65535] || void 0;
	const wincode = parseInt(l4e, 16);
	if (isFinite(wincode) && codeToLocale[wincode & 65535]) return codeToLocale[wincode & 65535] || void 0;
	if (re_locale.test(l4e)) return l4e;
}
/**
* Used by the formatter to pull a locate from its registered locales. If
* subtag isn't available but the base language is, the base language is used:
* So if `en-CA` is not found, the formatter tries to find `en` else it
* returns `undefined`.
*
* @param locale A BCP 47 string tag of the locale, or an Excel locale code.
* @returns An object of locale properties if one was found.
* @throws If the locale tag is invalid.
*/
function getLocale(locale) {
	const tag = resolveLocale(locale);
	let obj;
	if (tag) {
		const c = parseLocale(tag);
		obj = locales[c.lang] || locales[c.language] || void 0;
	}
	return obj;
}
function isMonthFirst(sysdate) {
	const t = tokenize(sysdate || "");
	const monthIndex = t.findIndex((tok) => tok.type === "DATETIME" && /^m/i.test(tok.value));
	const dayIndex = t.findIndex((tok) => tok.type === "DATETIME" && /^dd?$/i.test(tok.value));
	return monthIndex >= 0 && dayIndex >= 0 && monthIndex < dayIndex;
}
function createLocale(data) {
	const sysdate = data.sysdate ?? baseLocaleData.sysdate;
	return {
		...baseLocaleData,
		...data,
		opcodes: {
			...baseLocaleData.opcodes,
			...data.opcodes
		},
		format: {
			...baseLocaleData.format,
			...data.format,
			monthFirst: data.format?.monthFirst ?? isMonthFirst(sysdate)
		}
	};
}
/**
* Register locale data for a language to use when formatting.
*
* Any partial set of properties may be provided to have the defaults used where properties are missing.
*
* @param localeSettings - A collection of settings for a locale.
* @param l4e - A string BCP 47 tag of the locale.
* @returns A full collection of settings for a locale
*/
function addLocale(localeSettings, l4e) {
	const c = typeof l4e === "object" ? l4e : parseLocale(l4e);
	locales[c.lang] = createLocale(localeSettings);
	if (c.language !== c.lang && !locales[c.language]) locales[c.language] = createLocale(localeSettings);
	return locales[c.lang];
}
/**
* Get a list of locales that are registered with the formatter.
* @returns A list of locale tags
*/
function listLocales() {
	return Object.keys(locales);
}
const defaultLocale = createLocale({
	group: ",",
	format: {
		dateOrder: 1,
		monthFirst: false
	}
});
defaultLocale.isDefault = true;
initLocales();
//#endregion
//#region lib/options.ts
const defaultOptions = {
	overflow: "######",
	dateErrorThrows: false,
	dateErrorNumber: true,
	bigintErrorNumber: false,
	dateSpanLarge: true,
	leap1900: true,
	nbsp: false,
	throws: true,
	invalid: "######",
	locale: "",
	ignoreTimezone: false,
	grouping: [3, 3],
	indexColors: true,
	skipChar: "",
	fillChar: ""
};
//#endregion
//#region lib/delocalize.ts
const COLORS = {
	black: "Black",
	white: "White",
	red: "Red",
	green: "Green",
	blue: "Blue",
	yellow: "Yellow",
	magenta: "Magenta",
	cyan: "Cyan"
};
function isNumOp$1(token) {
	const type = token?.type;
	return type === "HASH" || type === "ZERO" || type === "QMARK";
}
function eq(a, b) {
	if (a === b) return true;
	if (a === "’" && b === "'" || b === "’" && a === "'") return true;
	if (a === "," && b === "٬" || b === "٬" && a === ",") return true;
	if (a === "." && b === "٫" || b === "٫" && a === ".") return true;
	if (/^\s$/.test(a) && /^\s$/.test(b)) return true;
	return false;
}
/**
* Translate a number format pattern from a locale into the default `en-US` variant.
*
* Group and decimal symbols will be flipped as needed, alternative operators letters
* will be changed to the default letters, color names will be translated.
*
* Additionally, non-operator characters as well as escaped characters and quoted strings
* will be collapsed to quoted strings as possible.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @param fromLocale A BCP 47 string tag or Excel [MsoLanguageID](https://docs.microsoft.com/en-us/office/vba/api/office.msolanguageid).
* @returns The default equivalent of the input pattern.
*/
function delocalize(pattern, fromLocale) {
	const l10n = getLocale(parseLocale(resolveLocale(fromLocale) ?? "en-US").lang) ?? defaultLocale;
	const flipNum = l10n?.decimal !== ".";
	const wsGroup = /^\s$/.test(l10n.group);
	const tokens = lexer(pattern, getTokenHandlers(l10n));
	const colorTag = (l10n.color ?? "Color").toLowerCase();
	const colorNames = l10n.colors ?? COLORS;
	const opcodes = l10n.opcodes;
	const out = [];
	for (let i = 0; i < tokens.length; i++) {
		const t = tokens[i];
		const type = t.type;
		if (type === "COLOR" || type === "MODIFIER") {
			const v = t.value.toLowerCase();
			const isLC = v === t.value;
			if (v.startsWith(colorTag)) {
				const o = `[${isLC ? "color" : "Color"}${t.value.slice(colorTag.length)}]`;
				out.push({
					type: TOKEN_COLOR,
					value: o,
					raw: o
				});
			} else if (v in colorNames) {
				const o = `[${isLC ? colorNames[v].toLowerCase() : colorNames[v]}]`;
				out.push({
					type: TOKEN_COLOR,
					value: o,
					raw: o
				});
			} else out.push(t);
		} else if (opcodes && type === "AMPM") out.push({
			type: TOKEN_AMPM,
			value: "",
			raw: "AM/PM"
		});
		else if (opcodes && type === "DATETIME") {
			const lc1 = t.value.charAt(0).toLowerCase();
			if (opcodes.dy && lc1 === opcodes.dy) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "Y".repeat(t.value.length)
			});
			else if (opcodes.dm && lc1 === opcodes.dm || opcodes.tm && lc1 === opcodes.tm) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "M".repeat(t.value.length)
			});
			else if (opcodes.dd && lc1 === opcodes.dd) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "D".repeat(t.value.length)
			});
			else if (opcodes.th && lc1 === opcodes.th) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "H".repeat(t.value.length)
			});
			else if (opcodes.ts && lc1 === opcodes.ts) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "S".repeat(t.value.length)
			});
			else if (opcodes.wd && lc1 === opcodes.wd) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "A".repeat(t.value.length)
			});
			else if (opcodes.en && lc1 === opcodes.en) out.push({
				type: TOKEN_DATETIME,
				value: "",
				raw: "G".repeat(t.value.length)
			});
			else out.push(t);
		} else if (opcodes && type === "DURATION") {
			const lc1 = t.value.charAt(0).toLowerCase();
			if (opcodes.th && lc1 === opcodes.th) out.push({
				type: TOKEN_DURATION,
				value: "",
				raw: "[H]"
			});
			else if (opcodes.tm && lc1 === opcodes.tm) out.push({
				type: TOKEN_DURATION,
				value: "",
				raw: "[M]"
			});
			else if (opcodes.ts && lc1 === opcodes.ts) out.push({
				type: TOKEN_DURATION,
				value: "",
				raw: "[S]"
			});
			else out.push(t);
		} else if (wsGroup && type === "SPACE" && isNumOp$1(tokens[i - 1]) && isNumOp$1(tokens[i + 1])) out.push({
			type: TOKEN_GROUP,
			value: ",",
			raw: ","
		});
		else if (flipNum && type === "POINT" && isNumOp$1(tokens[i - 1]) && isNumOp$1(tokens[i + 1])) out.push({
			type: TOKEN_GROUP,
			value: ",",
			raw: ","
		});
		else if (type === "CHAR" && eq(t.value, l10n.group)) out.push({
			type: TOKEN_GROUP,
			value: ",",
			raw: ","
		});
		else if (flipNum && (type === "COMMA" || type === "GROUP")) out.push({
			type: TOKEN_POINT,
			value: ".",
			raw: "."
		});
		else out.push(t);
	}
	let s = "";
	let inStr = false;
	for (const t of out) if (t.type === "POINT" && inStr) s += t.raw;
	else if (t.type === "CURRENCY") {
		const needEscaping = /[a-z.]/i.test(t.raw);
		if (inStr && !needEscaping) {
			s += "\"";
			inStr = false;
		} else if (!inStr && needEscaping) {
			s += "\"";
			inStr = true;
		}
		s += t.raw;
	} else if (t.type === "ESCAPED" && t.value === "\"") {
		if (inStr) {
			s += "\"";
			inStr = false;
		}
		s += t.raw;
	} else if (t.type === "ESCAPED" || t.type === "STRING") {
		if (!inStr && t.value !== " ") {
			s += "\"";
			inStr = true;
		}
		s += t.value;
	} else if (t.type === "GENERAL") s += "General";
	else if (t.type === "CHAR") {
		if (!inStr && t.value !== ":") {
			s += "\"";
			inStr = true;
		}
		s += t.raw;
	} else {
		if (inStr) {
			s += "\"";
			inStr = false;
		}
		s += t.raw;
	}
	if (inStr) s += "\"";
	return s;
}
//#endregion
//#region lib/dec15.ts
/** Powers of ten that are exactly representable as doubles. */
const POW10 = [];
for (let i = 0; i <= 22; i++) POW10[i] = 10 ** i;
const CHAR_0$1 = 48;
/** Smallest normal double. Values below this are subnormal. */
const MIN_NORMAL = 22250738585072014e-324;
const SPLIT = 134217729;
/**
* Returns 10 to the power of `n`, exact for 0 ≤ n ≤ 22.
*
* @internal
* @param n The exponent.
* @returns 10^n
*/
function pow10(n) {
	return n >= 0 && n <= 22 ? POW10[n] : 10 ** n;
}
function scale15(a, e) {
	const n = 14 - e;
	if (n >= 0 && n <= 22) {
		const b = POW10[n];
		const p = a * b;
		let t = SPLIT * a;
		const ah = t - (t - a);
		const al = a - ah;
		t = SPLIT * b;
		const bh = t - (t - b);
		const bl = b - bh;
		const err = ah * bh - p + ah * bl + al * bh + al * bl;
		const fl = Math.floor(p);
		return p - fl - .5 > -err ? fl + 1 : fl;
	}
	if (n < 0 && n >= -22) {
		const u = POW10[-n];
		const r = a % u;
		const q = Math.round((a - r) / u);
		return r > u / 2 ? q + 1 : q;
	}
	return NaN;
}
function fromExponential(s) {
	const ePos = s.indexOf("e");
	const e = +s.slice(ePos + 1);
	const digits = s.charAt(0) + s.slice(2, ePos);
	if (digits.length <= 15) return [+digits * POW10[15 - digits.length], e];
	let N = +digits.slice(0, 15);
	const next = digits.charCodeAt(15);
	if (next > 53 || next === 53 && /[1-9]/.test(digits.slice(16))) N++;
	return N >= 0x38d7ea4c68000 ? [N / 10, e + 1] : [N, e];
}
/**
* Round a positive finite number to 15 significant digits, as Excel does.
*
* The exact value is rounded, a tie going toward zero. Subnormal numbers start
* from their shortest representation instead.
*
* @internal
* @param a A positive, finite, non-zero number.
* @returns `[ N, e ]` where `N` is an integer with exactly 15 digits and the
*   rounded value is `N × 10^(e − 14)`.
*/
function toDec15(a) {
	if (a < MIN_NORMAL) return fromExponential(a.toExponential());
	let e = Math.floor(Math.log10(a));
	if (a < pow10(e)) e--;
	else if (a >= pow10(e + 1)) e++;
	let N = scale15(a, e);
	if (N >= 0x38d7ea4c68000) {
		e++;
		N = scale15(a, e);
	} else if (N < 0x5af3107a4000) {
		e--;
		N = scale15(a, e);
	}
	if (N !== N) return fromExponential(a.toExponential(14));
	if (N >= 0x38d7ea4c68000) return [N / 10, e + 1];
	return [N, e];
}
/**
* Convert a decimal `q × 10^k` back to a number, the reverse of `toDec15`.
*
* @internal
* @param q An integer below 2^53.
* @param k The decimal exponent.
* @returns The nearest double to `q × 10^k`.
*/
function fromDec(q, k) {
	if (k >= 0 && k <= 22) return q * POW10[k];
	if (k < 0 && k >= -22) return q / POW10[-k];
	return +(q + "e" + k);
}
/**
* Round a 15 digit integer to `keep` significant digits, a tie going away from zero.
*
* @internal
* @param N An integer with 15 digits.
* @param keep The number of leading digits to keep. May be 0 or negative.
* @returns The rounded integer. It equals `10^keep` when rounding carried over.
*/
function roundDigits(N, keep) {
	if (keep >= 15) return N;
	const u = pow10(15 - keep);
	const q = Math.floor(N / u);
	return (N - q * u) * 2 >= u ? q + 1 : q;
}
/**
* Round a non-negative number to a number of decimal places, as Excel does:
* first to 15 significant digits, then to the places, a tie going away from zero.
*
* @internal
* @param a A non-negative, finite number.
* @param places The number of decimals to round to. May be negative.
* @returns `[ q, k ]` where `q` is an integer and the rounded value is `q × 10^k`.
*/
function roundPlaces(a, places) {
	if (!a) return [0, 0];
	if (places >= 0 && a < 0x38d7ea4c68000 && Number.isInteger(a)) return [a, 0];
	const [N, e] = toDec15(a);
	const keep = e + 1 + places;
	return keep >= 15 ? [N, e - 14] : [roundDigits(N, keep), -places];
}
/**
* Split a non-negative number into a significand and an exponent for exponent
* notation, and round the significand to a number of decimal places as Excel
* does. If rounding carries into a new digit (9.99 → 10.0), the exponent moves.
*
* @internal
* @param a A non-negative, finite number.
* @param places The number of decimals in the significand.
* @param intMax The number of integer digits in the pattern. When above 1 the
*   exponent is a multiple of it (engineering notation).
* @param hasInt Whether the pattern has integer digits. Without them, the
*   significand is below 1.
* @returns `[ q, k, exp ]` where the significand is `q × 10^k` and the value is
*   that times `10^exp`.
*/
function roundSignificand(a, places, intMax, hasInt) {
	if (!a) return [
		0,
		0,
		0
	];
	let [N, e] = toDec15(a);
	for (;;) {
		let exp = intMax > 1 ? Math.floor(e / intMax) * intMax : e;
		if (!hasInt) exp++;
		const keep = e - exp + 1 + places;
		if (keep >= 15) return [
			N,
			e - 14 - exp,
			exp
		];
		const q = roundDigits(N, keep);
		if (keep < 0 || q < pow10(keep)) return [
			q,
			-places,
			exp
		];
		N = 0x5af3107a4000;
		e++;
	}
}
/**
* Write a decimal `q × 10^k` as integer and fraction digits. The integer digits
* are empty when the value is below 1, and the fraction digits have no
* trailing zeros.
*
* @internal
* @param q A non-negative integer below 2^53.
* @param k The decimal exponent.
* @returns The integer and fraction digits.
*/
function decToText(q, k) {
	if (!q) return ["", ""];
	const s = String(q);
	if (k >= 0) return [k ? s + "0".repeat(k) : s, ""];
	const p = s.length + k;
	let end = s.length;
	while (end > 0 && s.charCodeAt(end - 1) === CHAR_0$1) end--;
	return [p > 0 ? s.slice(0, p) : "", end > p ? (p >= 0 ? "" : "0".repeat(-p)) + s.slice(Math.max(p, 0), end) : ""];
}
//#endregion
//#region lib/round.ts
/**
* Round a number with plain binary arithmetic, a tie going away from zero.
* Faster than `round`, but rounds the stored double rather than its 15 digit
* decimal, so 1.005 rounds to 1.00.
*
* Used for vulgar fractions, where this matches Excel better than `round`
* does: Excel shows 36.305 as "36 30/100".
*
* @internal
* @param number The number to round.
* @param [places] The number of decimals to round to.
* @returns A rounded number.
*/
function roundBinary(number, places = 0) {
	if (number < 0) return -roundBinary(-number, places);
	if (places) {
		const p = 10 ** places || 1;
		return Math.round(number * p) / p;
	}
	return Math.round(number);
}
/**
* Return a number rounded to the specified amount of places. This is the
* rounding function used internally by the formatter (symmetric arithmetic
* rounding). It rounds the same way Excel does: the value is first rounded
* to 15 significant digits, and then to the requested places.
*
* @param number The number to round.
* @param [places] The number of decimals to round to.
* @returns A rounded number.
*/
function round(number, places = 0) {
	if (typeof number !== "number") return NaN;
	if (number < 0) return -round(-number, places);
	if (!number || !isFinite(number)) return number;
	return fromDec(...roundPlaces(number, places));
}
//#endregion
//#region lib/dec2frac.ts
const PRECISION = 1e-13;
/**
* Split a fractional number into a numerator and denominator for display as
* vulgar fractions.
*
* @param number The value to split
* @param [numeratorMaxDigits=2] Maximum digits the numerator may have.
* @param [denominatorMaxDigits=2] Maximum digits the denominator may have.
* @returns Tuple of two numbers, numerator and denominator.
*/
function dec2frac(number, numeratorMaxDigits = 2, denominatorMaxDigits = 2) {
	const sign = number < 0 ? -1 : 1;
	const maxdigits_n = 10 ** (numeratorMaxDigits || 2);
	const maxdigits_d = 10 ** (denominatorMaxDigits || 2);
	let z = Math.abs(number);
	let last_d = 0;
	let last_n = 0;
	let curr_n = 0;
	let curr_d = 1;
	let tmp;
	let r;
	number = z;
	if (number % 1 === 0) r = [number * sign, 1];
	else if (number < 1e-19) r = [sign, 0x8ac7230489e80000];
	else if (number > 0x8ac7230489e80000) r = [0x8ac7230489e80000 * sign, 1];
	else {
		do {
			z = 1 / (z - Math.floor(z));
			tmp = curr_d;
			curr_d = curr_d * Math.floor(z) + last_d;
			last_d = tmp;
			last_n = curr_n;
			curr_n = Math.floor(number * curr_d + .5);
			if (curr_n >= maxdigits_n || curr_d >= maxdigits_d) return [sign * last_n, last_d];
		} while (Math.abs(number - curr_n / curr_d) >= PRECISION && z !== Math.floor(z));
		r = [sign * curr_n, curr_d];
	}
	return r;
}
//#endregion
//#region lib/toYMD.ts
const floor$1 = Math.floor;
function toYMD_1900(ord, leap1900 = true) {
	if (leap1900 && ord >= 0) {
		if (ord === 0) return [
			1900,
			1,
			0
		];
		if (ord === 60) return [
			1900,
			2,
			29
		];
		if (ord < 60) return [
			1900,
			ord < 32 ? 1 : 2,
			(ord - 1) % 31 + 1
		];
	}
	let l = ord + 68569 + 2415019;
	const n = floor$1(4 * l / 146097);
	l = l - floor$1((146097 * n + 3) / 4);
	const i = floor$1(4e3 * (l + 1) / 1461001);
	l = l - floor$1(1461 * i / 4) + 31;
	const j = floor$1(80 * l / 2447);
	const nDay = l - floor$1(2447 * j / 80);
	l = floor$1(j / 11);
	const nMonth = j + 2 - 12 * l;
	return [
		100 * (n - 49) + i + l | 0,
		nMonth | 0,
		nDay | 0
	];
}
function toYMD_1904(ord) {
	return toYMD_1900(ord + 1462);
}
function toYMD_1317(ord) {
	if (ord === 60) throw new Error("#VALUE!");
	if (ord <= 1) return [
		1317,
		8,
		29
	];
	if (ord < 60) return [
		1317,
		ord < 32 ? 9 : 10,
		1 + (ord - 2) % 30
	];
	const y = 10631 / 30;
	const shift1 = 8.01 / 60;
	let z = ord + 466935;
	const cyc = floor$1(z / 10631);
	z = z - 10631 * cyc;
	const j = floor$1((z - shift1) / y);
	z = z - floor$1(j * y + shift1);
	const m = floor$1((z + 28.5001) / 29.5);
	if (m === 13) return [
		30 * cyc + j,
		12,
		30
	];
	return [
		30 * cyc + j,
		m,
		z - floor$1(29.5001 * m - 29)
	];
}
function toYMD(ord, system = 0, leap1900 = true) {
	const int = floor$1(ord);
	if (system === 6) return toYMD_1317(int);
	if (system === -1) return toYMD_1904(int);
	return toYMD_1900(int, leap1900);
}
//#endregion
//#region lib/serialDate.ts
const floor = Math.floor;
const DAYSIZE$1 = 86400;
/**
* Convert a native JavaScript Date, or an array of date parts to an spreadsheet serial date.
*
* Returns a serial date number if input was a Date object or an array of
* numbers, else an undefined.
*
* ```js
* // input as Date
* dateToSerial(new Date(1978, 5, 17)); // 28627
* // input as [ Y, M, D, h, m, s ]
* dateToSerial([ 1978, 5, 17 ]); // 28627
* // other input
* dateToSerial("something else"); // undefined
* ```
*
* @param date A Date instance or an array of date parts in descending order.
* @param [options={}]  Options for this method
* @param [options.ignoreTimezone]
*   Normally time zone will be taken into account. This makes the conversion to
*   serial date ignore the timezone offset.
* @returns The date as a spreadsheet serial date, or undefined.
*/
function dateToSerial(date, options) {
	let ts = void 0;
	if (Array.isArray(date)) {
		const [y, m, d, hh, mm, ss] = date;
		ts = Date.UTC(y, m == null ? 0 : m - 1, d ?? 1, hh || 0, mm || 0, ss || 0);
	} else if (date instanceof Date) {
		ts = date.valueOf();
		if (!options?.ignoreTimezone) {
			const dt = /* @__PURE__ */ new Date();
			dt.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
			dt.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
			ts = dt.valueOf();
		}
	}
	if (ts != null && isFinite(ts)) {
		const d = ts / 864e5;
		return d - (d <= -25509 ? -25568 : -25569);
	}
}
/**
* Convert a spreadsheet serial date to an array of date parts.
* Accurate to a second.
*
* ```js
* // output as [ Y, M, D, h, m, s ]
* dateFromSerial(28627); // [ 1978, 5, 17, 0, 0, 0 ]
* ```
*
* @param serialDate The date
* @param [options] Options for this method
* @param [options.leap1900]
*   Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
*   True by default.
* @returns An array of date parts with parts in descending order: [ year, month, day, hour, minute, second ]
*/
function dateFromSerial(serialDate, options) {
	let date = serialDate | 0;
	const t = DAYSIZE$1 * (serialDate - date);
	let time = floor(t);
	if (t - time > .9999) {
		time += 1;
		if (time === DAYSIZE$1) {
			time = 0;
			date += 1;
		}
	}
	const x = time < 0 ? DAYSIZE$1 + time : time;
	const [y, m, d] = toYMD(serialDate, 0, options?.leap1900);
	return [
		y,
		m,
		d,
		floor(x / 60 / 60) % 60,
		floor(x / 60) % 60,
		floor(x) % 60
	];
}
//#endregion
//#region lib/parseValue/parseNumberNf.ts
const PT = ".";
const CM = ",";
const SP$1 = " ";
const NS$1 = "\xA0";
const NN$1 = " ";
const AP = "'";
const AG = "٬";
const dec2group = {
	".": [
		CM,
		NS$1,
		NN$1,
		AP,
		AG
	],
	",": [
		PT,
		NS$1,
		NN$1,
		AP,
		AG
	],
	"٫": [
		PT,
		NS$1,
		NN$1,
		AP,
		AG
	]
};
const isDigit$1 = (d) => d?.length === 1 && d >= "0" && d <= "9";
function parseNumberNf(value, l10n) {
	const dec = l10n.decimal;
	const grp = [...dec2group[dec] || [AP, AG]];
	if (!grp.includes(l10n.group) && l10n.group !== SP$1 && l10n.group !== dec) grp.push(l10n.group);
	let num = "";
	let exp = "";
	let sign = 1;
	let format = 0;
	let minus = false;
	let openParen = false;
	let closeParen = false;
	let percent = false;
	let currency = false;
	let i = 0;
	const prefixChars = [
		SP$1,
		NS$1,
		NN$1,
		"+",
		"%",
		"(",
		"-"
	].concat(currencySymbols);
	while (prefixChars.includes(value[i])) {
		const char = value[i];
		if (char === "-") {
			if (minus || openParen) return;
			minus = true;
			sign = -1;
		} else if (reCurrencySymbol.test(char)) {
			if (currency) return;
			currency = true;
		} else if (char === "(") {
			if (openParen || minus) return;
			openParen = true;
			sign = -1;
		} else if (char === "%") {
			if (percent) return;
			percent = true;
		}
		i++;
	}
	let haveDecimal = false;
	let g;
	if (value[i] === dec || isDigit$1(value[i])) while (i < value.length) {
		const ch = value[i];
		if (!g && grp.includes(ch)) g = ch;
		else if (g && g === ch) {} else if (ch === dec) {
			if (haveDecimal) break;
			num += ".";
			haveDecimal = true;
		} else if (isDigit$1(ch)) num += ch;
		else break;
		i++;
	}
	if (value[i] === "e" || value[i] === "E") {
		exp += value[i];
		i++;
		if (value[i] === "+" || value[i] === "-") {
			exp += value[i];
			i++;
		}
		const d = i;
		while (isDigit$1(value[i])) {
			exp += value[i];
			i++;
		}
		if (d === i) return;
	}
	const suffixChars = [
		SP$1,
		NS$1,
		NN$1,
		"%",
		"$",
		")"
	].concat(currencySymbols);
	while (suffixChars.includes(value[i])) {
		const char = value[i];
		if (reCurrencySymbol.test(char)) {
			if (currency) return;
			currency = true;
		} else if (char === ")") {
			if (closeParen || !openParen) return;
			closeParen = true;
		} else if (char === "%") {
			if (percent) return;
			percent = true;
		}
		i++;
	}
	if (i !== value.length) return;
	let numberValue = parseFloat(num + exp);
	if (!isFinite(numberValue)) return;
	if (exp) {
		if (percent || currency) return;
		format = 11;
	} else if (percent) {
		if (currency) return;
		format = num.includes(".") ? 10 : 9;
		numberValue *= .01;
	} else if (currency) format = num.includes(".") ? 7 : 5;
	else if (g) format = num.includes(".") ? 4 : 3;
	const ret = { value: numberValue * sign };
	if (format) ret.formatId = format;
	return ret;
}
//#endregion
//#region lib/parseValue/parseFloat15.ts
function parseFloat15(s) {
	let num = "";
	let digits = 0;
	let minus = "";
	let exp = false;
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c >= 48 && c <= 57) {
			num += digits >= 15 ? "0" : s[i];
			digits++;
		} else if (c === 46) num += ".";
		else if (c === 45) {
			if (exp) num += "-";
			else minus = "-";
		} else if (c === 101 || c === 69) {
			num += "e";
			exp = true;
			digits = 0;
		}
	}
	if (!num) return NaN;
	return Number(minus + num);
}
//#endregion
//#region lib/parseValue/parseNumberXl.ts
const SP = " ";
const NS = "\xA0";
const NN = " ";
const isDigit = (d) => d?.length === 1 && d >= "0" && d <= "9";
const isAltspace = (c) => c === NS || c === NN;
/**
* Parse a numeric string input and return its value and format. If the input
* was not recognized or valid, the function returns a `null`, for valid input
* it returns an object with two properties:
*
* * `v`: the parsed value.
* * `z`: the number format of the input (if applicable).
*
* @see parseValue
* @param value The number to parse
* @param [options] Options for the parsing behavior.
* @returns An object of the parsed value and a corresponding format string
*/
function parseNumberXl(value, l10n) {
	const dec = l10n.decimal;
	const grp = l10n.group !== SP && l10n.group !== dec ? l10n.group : "";
	const currencyPos = l10n.format?.currencyPos ?? 0;
	let num = "";
	let exp = "";
	let sign = 1;
	let minus = false;
	let plus = false;
	let openParen = false;
	let closeParen = false;
	let percent = false;
	let currency = false;
	let currencySymbol = null;
	let i = 0;
	if (isAltspace(value[i])) return;
	const cSymb = l10n.currency ?? "$";
	let char = "";
	do {
		char = value[i];
		if (char === "-") {
			if (minus || openParen || plus) return;
			minus = true;
			sign = -1;
		} else if (char === "+") {
			if (minus || plus) return;
			plus = true;
		} else if ((currencyPos === 0 || currencyPos === 2) && value.slice(i).startsWith(cSymb)) {
			if (currency) return;
			i += Math.max(0, cSymb.length - 1);
			currency = true;
			currencySymbol = char;
		} else if (char === "€") {
			if (currency) return;
			currency = true;
			currencySymbol = char;
		} else if (char === "(") {
			if (openParen || minus) return;
			openParen = true;
			sign = -1;
		} else if (char === "%") {
			if (percent) return;
			percent = true;
		} else if (char === SP || char === NN) {} else break;
		i++;
	} while (i < value.length);
	let haveDecimal = false;
	let groupSize = 0;
	let groups = 0;
	if (value[i] === dec || isDigit(value[i])) while (i < value.length) {
		const ch = value[i];
		if (ch === grp) {
			if (haveDecimal) return;
			if (!groups && (!num || !+num)) return;
			if (groups && groupSize < 3) return;
			groupSize = 0;
			groups++;
		} else if (ch === dec) {
			if (haveDecimal) return;
			if (groups && groupSize < 3) return;
			groupSize = 0;
			num += ".";
			haveDecimal = true;
		} else if (isDigit(ch)) {
			groupSize++;
			num += ch;
		} else break;
		i++;
	}
	if (!haveDecimal && groups && groupSize < 3) return;
	let haveFraction = false;
	let fraction = 0;
	let denominator = "";
	const fm = !haveDecimal && /^ +(\d+)\/(\d+)/.exec(value.slice(i));
	if (fm) {
		fraction = +fm[1] / +fm[2];
		haveFraction = true;
		denominator = fm[2];
		i += fm[0].length;
	}
	if (value[i] === "e" || value[i] === "E") {
		exp += value[i];
		i++;
		if (value[i] === "+" || value[i] === "-") {
			exp += value[i];
			i++;
		}
		const d = i;
		while (isDigit(value[i])) {
			exp += value[i];
			i++;
		}
		if (d === i) return;
	}
	let lastSuffix = "";
	while (i < value.length) {
		char = value[i];
		lastSuffix = char;
		if ((currencyPos === 1 || currencyPos === 3) && value.slice(i).startsWith(cSymb)) {
			if (currency) return;
			i += Math.max(0, cSymb.length - 1);
			currency = true;
			currencySymbol = char;
		} else if (char === "€") {
			if (currency) return;
			currency = true;
			currencySymbol = char;
		} else if (char === ")") {
			if (closeParen || !openParen) return;
			closeParen = true;
		} else if (char === "%") {
			if (percent) return;
			percent = true;
		} else if (char === SP || char === NN) {} else break;
		i++;
	}
	if (isAltspace(lastSuffix)) return;
	if (i !== value.length) return;
	if (currency && percent || closeParen !== openParen || closeParen && plus) return;
	let numberValue = parseFloat15(num + exp);
	if (haveFraction) numberValue += fraction;
	if (percent) numberValue = +(numberValue * .01).toPrecision(15);
	if (!isFinite(numberValue)) return;
	let fmt;
	if (exp) fmt = 11;
	else if (haveFraction) fmt = denominator.length > 1 ? 13 : 12;
	else if (percent) fmt = haveDecimal ? 10 : 9;
	else if (currency && currencySymbol !== "€") fmt = haveDecimal ? 8 : 6;
	else if (groups && currencySymbol !== "€") fmt = haveDecimal ? 4 : 3;
	const ret = { value: numberValue ? numberValue * sign : 0 };
	if (fmt) ret.formatId = fmt;
	return ret;
}
//#endregion
//#region lib/parseValue/parseNumber.ts
/**
* Parse a numeric string input and return its value and format. If the input
* was not recognized or valid, the function returns an `undefined`, for valid input
* it returns an object with two properties:
*
* * `v`: the parsed value.
* * `z`: the number format of the input (if applicable).
*
* @param value The number to parse
* @param [options] Options for the parser
* @returns An object of the parsed value and a corresponding format string
*/
function parseNumber(value, options) {
	const l10n = getLocale(options?.locale || "") || defaultLocale;
	if (options?.mode === 1) return parseNumberNf(value, l10n);
	return parseNumberXl(value, l10n);
}
//#endregion
//#region lib/isValidDate.ts
const daysInMonth = (y, m) => {
	if (m === 2) return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 || y === 1900 ? 29 : 28;
	else if (m === 4 || m === 6 || m === 9 || m === 11) return 30;
	return 31;
};
function isValidDate(y, m, d) {
	if (d < 1) return false;
	if (m < 1 || m > 12) return false;
	return d <= daysInMonth(y, m);
}
//#endregion
//#region lib/parseValue/parseTimeNf.ts
const normAMPMStr$1 = (s) => s.replace(/\s+/g, "").trim().replace(/\./g, "").toLowerCase();
function parseTimeNf(value, l10n) {
	const parts = /^\s*([10]?\d|2[0-4])(?::([0-5]\d|\d))?(?::([0-5]\d|\d))?(\.\d{1,10})?(?=\s*[^\s\d]|$)/.exec(value);
	let ampm = "";
	if (parts) {
		const tail = normAMPMStr$1(value.slice(parts[0].length));
		if (tail === normAMPMStr$1(l10n.ampm[0]) || tail === "a" || tail === "am") ampm = "a";
		else if (tail === normAMPMStr$1(l10n.ampm[1]) || tail === "p" || tail === "pm") ampm = "p";
		else if (tail === ":") {
			if (!parts[3]) parts[3] = "0";
			if (!parts[2]) parts[2] = "0";
		} else if (tail) return;
	}
	if (parts) {
		const [, h, m, s, f] = parts;
		if (f && !s) return;
		if (!ampm && !m && !s) return;
		let hrs = +(h || 0) * 1;
		if (ampm) {
			if (hrs >= 13) return;
			if (ampm === "a") {
				if (hrs === 12) hrs = 0;
			} else if (ampm === "p") {
				if (hrs !== 12) hrs += 12;
			}
		}
		const min = +(m || 0) * 1;
		const sec = +(s || 0) * 1;
		const mss = +(f || 0) * 1;
		let formatId = ampm ? 18 : 20;
		if (s) formatId++;
		return {
			value: (hrs * 60 * 60 + min * 60 + sec + mss) / 86400,
			formatId
		};
	}
}
//#endregion
//#region lib/lruCache.ts
/**
* A minimal least-recently-used cache.
*
* A `Map` keeps keys in insertion order, so re-inserting an entry on access moves it to
* the end, and the first key is always the least recently used one.
*
* @internal
*/
var LRUCache = class {
	maxSize;
	entries = /* @__PURE__ */ new Map();
	/**
	* @param maxSize The number of entries to keep before evicting the least recently used.
	*/
	constructor(maxSize) {
		this.maxSize = maxSize;
	}
	get(key) {
		const value = this.entries.get(key);
		if (value !== void 0) {
			this.entries.delete(key);
			this.entries.set(key, value);
		}
		return value;
	}
	set(key, value) {
		this.entries.delete(key);
		this.entries.set(key, value);
		if (this.entries.size > this.maxSize) this.entries.delete(this.entries.keys().next().value);
	}
	getOrSet(key, callback) {
		const value = this.entries.has(key) ? this.entries.get(key) : callback(key);
		this.set(key, value);
		return value;
	}
};
//#endregion
//#region lib/parseValue/parseDateNf.ts
const okDateFormats = [
	"!d-m-y",
	"!d-m-Y",
	"!j-m-y",
	"!j-m-Y",
	"!d-n-y",
	"!d-n-Y",
	"!j-n-y",
	"!j-n-Y",
	"?m-d-y",
	"?m-d-Y",
	"?m-j-y",
	"?m-j-Y",
	"?n-d-y",
	"?n-d-Y",
	"?n-j-y",
	"?n-j-Y",
	"d-M-y",
	"d-M-Y",
	"j-M-y",
	"j-M-Y",
	"M-d-y",
	"M-d-Y",
	"M-j-y",
	"M-j-Y",
	"d-F-y",
	"d-F-Y",
	"F-d-y",
	"F-d-Y",
	"F-j-y",
	"F-j-Y",
	"j-F-y",
	"j-F-Y",
	"y-F-d",
	"y-F-j",
	"y-M-d",
	"y-M-j",
	"Y-F-d",
	"Y-F-j",
	"Y-M-d",
	"Y-m-d",
	"Y-M-j",
	"Y-m-j",
	"Y-n-d",
	"Y-n-j",
	"j-F",
	"j-M",
	"d-F",
	"d-M",
	"n-d",
	"n-j",
	"n-Y",
	"m-d",
	"m-j",
	"m-Y",
	"M-Y",
	"M-y",
	"F-y",
	"F-Y",
	"Y-M",
	"Y-n",
	"Y-m",
	"Y-F",
	"Y-M"
];
const dateTrieDM = {};
const dateTrieMD = {};
function packDate(f, node, allowType = 1) {
	if (f) {
		const char = f[0];
		const next = f.slice(1);
		if (char === "!") packDate(next, node, 4);
		else if (char === "?") packDate(next, node, 2);
		else {
			node[char] = node[char] || {};
			packDate(next, node[char], allowType);
		}
	} else node.$ = allowType;
}
function addFormatToTrie(fmt, trie) {
	packDate(fmt, trie);
	packDate(fmt + " x", trie);
	packDate(fmt + " l", trie);
	packDate(fmt + " l x", trie);
	packDate("l " + fmt, trie);
	packDate("l " + fmt + " x", trie);
	packDate(fmt + " D", trie);
	packDate(fmt + " D x", trie);
	packDate("D " + fmt, trie);
	packDate("D " + fmt + " x", trie);
}
okDateFormats.forEach((fmt) => {
	if (!fmt.startsWith("?")) addFormatToTrie(fmt, dateTrieDM);
	if (!fmt.startsWith("!")) addFormatToTrie(fmt, dateTrieMD);
});
const currentYear$1 = (/* @__PURE__ */ new Date()).getUTCFullYear();
const matchRec = (str, data, skipPeriod = false) => {
	for (const item of data) if (str.startsWith(item[0])) {
		let l = item[0].length;
		if (skipPeriod && (item[2] === "D" || item[2] === "M") && str[l] === ".") l++;
		return [str.slice(0, l), item];
	}
	return ["", null];
};
const nextToken = (str, node, data, lData) => {
	const path = data.path || "";
	const matchOrder = Object.keys(node);
	for (const t of matchOrder) {
		let r;
		if (!node[t]) continue;
		if (t === "$" || t === "€") {
			if (!str) r = data;
		} else if (t === "-") {
			const m = /^(\s*([./-]|,\s)\s*|\s+)/.exec(str);
			if (m) {
				const sep = m[1] === "-" || m[1] === "/" || m[1] === "." ? m[1] : " ";
				if (!data.sep || data.sep === sep) {
					const s = m[0].replace(/\s+/g, " ");
					r = nextToken(str.slice(m[0].length), node[t], {
						...data,
						sep,
						path: path + s
					}, lData);
				}
			}
		} else if (t === " ") {
			const m = /^[,.]?\s+/.exec(str);
			if (m) {
				const s = m[0].replace(/\s+/g, " ");
				r = nextToken(str.slice(m[0].length), node[t], {
					...data,
					path: path + s
				}, lData);
			}
		} else if (t === "j" || t === "d") {
			const m = /^(0?[1-9]|1\d|2\d|3[01])\b/.exec(str);
			if (m) r = nextToken(str.slice(m[0].length), node[t], {
				...data,
				day: m[0],
				path: path + t
			}, lData);
		} else if (t === "n" || t === "m") {
			const m = /^(0?[1-9]|1[012])\b/.exec(str);
			if (m) r = nextToken(str.slice(m[0].length), node[t], {
				...data,
				month: +m[0],
				_mon: m[0],
				path: path + t
			}, lData);
		} else if (t === "F" || t === "M") {
			const [m, match] = matchRec(str, lData.mon, lData.mp);
			if (match?.[2] === t) r = nextToken(str.slice(m.length), node[t], {
				...data,
				month: match[1],
				_mon: m,
				path: path + t
			}, lData);
		} else if (t === "l" || t === "D") {
			const [m, match] = matchRec(str, lData.day, lData.dp);
			if (match?.[2] === t) r = nextToken(str.slice(m.length), node[t], {
				...data,
				path: path + t
			}, lData);
		} else if (t === "y") {
			const m = /^\d\d\b/.exec(str);
			if (m) {
				const y = +m[0] >= 30 ? +m[0] + 1900 : +m[0] + 2e3;
				r = nextToken(str.slice(m[0].length), node[t], {
					...data,
					year: y,
					path: path + t
				}, lData);
			}
		} else if (t === "Y") {
			const m = /^\d\d\d\d\b/.exec(str);
			if (m) r = nextToken(str.slice(m[0].length), node[t], {
				...data,
				year: +m[0],
				path: path + t
			}, lData);
		} else if (t === "x") {
			const time = parseTimeNf(str, lData.l10n);
			if (time) r = nextToken("", node[t], {
				...data,
				time: time.value,
				tf: time.formatId,
				path: path + t
			}, lData);
		} else throw new Error(`Unknown date token "${t}"`);
		if (r) {
			if (isValidDate(data.year || 1916, data.month || 1, data.day ? +data.day : 1)) return r;
		}
	}
};
const normDateStr$1 = (s) => s.replace(/\s+/g, " ").trim().replace(/’/, "'").replace(/\.$/, "").toLowerCase();
const getLookupArray = (arr, sym) => {
	const s = arr.map((d, i) => [
		normDateStr$1(d),
		i + 1,
		sym
	]);
	s.sort((a, b) => b[0].length - a[0].length);
	return s;
};
const getLookups$1 = (l10n) => {
	return {
		mon: [...getLookupArray(l10n.mmmm, "F"), ...getLookupArray(l10n.mmm, "M")],
		mp: l10n.mmm[0].at(-1) === ".",
		day: [...getLookupArray(l10n.dddd, "l"), ...getLookupArray(l10n.ddd, "D")],
		dp: l10n.ddd[0].at(-1) === ".",
		l10n
	};
};
const lookupsCache$1 = new LRUCache(10);
function parseDateNf(value, l10n) {
	const lData = lookupsCache$1.getOrSet(l10n, getLookups$1);
	const date = nextToken(normDateStr$1(value), !l10n.format?.dateOrder ? dateTrieMD : dateTrieDM, { path: "" }, lData);
	if (date) {
		if (date.sep === "." && date.path?.length === 3) return;
		const year = +(date.year ?? currentYear$1);
		if (!date.day) date.day = "1";
		let epoch = -Infinity;
		if (year < 1900) return;
		else if (year <= 1900 && (date.month ?? 0) <= 2) epoch = 25568;
		else if (year < 1e4) epoch = 25569;
		const dateValue = Date.UTC(year, (date.month ?? 1) - 1, +date.day) / 864e5 + epoch + (date.time || 0);
		if (dateValue >= 0 && dateValue <= 2958465) {
			let format = 0;
			let found = 0;
			if (date.path) {
				for (const a of date.path) if (a === "j" || a === "d") found |= 1;
				else if (a === "n" || a === "m" || a === "M" || a === "F") found |= 2;
				else if (a === "y" || a === "Y") found |= 4;
				if (found === 3) format = 16;
				if (found === 6) format = 17;
				if (found === 7) format = 14;
			}
			if (date.tf) format = 22;
			return {
				value: dateValue,
				formatId: format
			};
		}
	}
}
//#endregion
//#region lib/parseValue/splitString.ts
const C_ZERO$1 = 48;
const C_NINE$1 = 57;
const C_SPACE$1 = 32;
const C_COMMA$1 = 44;
const C_POINT = 46;
const C_COLON = 58;
const C_A = 65;
function timeSplitter(code, lastCode) {
	if (code >= C_ZERO$1 && code <= C_NINE$1) return "0";
	if (code === C_COLON) return ":";
	if (code === C_POINT && lastCode < C_A) return ".";
	if (code === C_SPACE$1) return "_";
	if (code === 160 || code === 8239) return "~";
	return "?";
}
function timeSplitterComma(code, lastCode) {
	if (code >= C_ZERO$1 && code <= C_NINE$1) return "0";
	if (code === C_COLON) return ":";
	if (code === C_COMMA$1 && lastCode < C_A) return ".";
	if (code === C_POINT && lastCode < C_A) return "!";
	if (code === C_SPACE$1) return "_";
	if (code === 160 || code === 8239) return "~";
	return "?";
}
function splitString(value, classifier) {
	const tokens = [];
	let currToken = {
		type: "",
		value: ""
	};
	let lastCharCode = -1;
	for (let i = 0; i < value.length; i++) {
		const curr = value.charCodeAt(i);
		const c0 = classifier(curr, lastCharCode);
		if (currToken.type !== c0) {
			if (currToken.value) tokens.push(currToken);
			currToken = {
				type: c0,
				value: ""
			};
		}
		currToken.value += value[i];
		lastCharCode = curr;
	}
	if (currToken.value) tokens.push(currToken);
	return tokens;
}
//#endregion
//#region lib/parseValue/toSerialTime.ts
function toSerialTime(h, m, s, f, ampm) {
	const min = +(m || 0);
	const sec = +(s || 0);
	const mss = f ? Number("." + (f.slice(0, 3) || "0")) : 0;
	let hrs = +(h || 0) * 1;
	if (ampm) {
		if (hrs >= 13 || sec >= 60 || min >= 60) return NaN;
		if (ampm === "a") {
			if (hrs === 12) hrs = 0;
		} else if (ampm === "p") {
			if (hrs !== 12) hrs += 12;
		}
	}
	let overflow = 0;
	if (min >= 60) overflow++;
	if (sec >= 60) overflow++;
	if (hrs >= 24) overflow++;
	if (overflow > 1) return NaN;
	return (hrs * 60 * 60 + min * 60 + sec + mss) / 86400;
}
//#endregion
//#region lib/parseValue/parseTimeXl.ts
const normAMPMStr = (s) => s.replace(/\s+/g, "").toLowerCase();
const TAILS = {
	"a": "a",
	"a.": "a",
	"a:": "a",
	"am": "a",
	"p": "p",
	"p.": "p",
	"p:": "p",
	"pm": "p"
};
function isDigits(str) {
	return /^\d\d?$/.test(str);
}
function isFrac(str) {
	return /^\d{0,10}$/.test(str);
}
const ampmMatch = (str, loc) => {
	const norm = normAMPMStr(loc);
	return str === norm || str === norm.charAt(0);
};
function hms1(p) {
	if (p[1]?.value !== ":") return null;
	return {
		h: p[0].value,
		m: p[2]?.value ?? "0",
		s: p[4]?.value ?? "0",
		f: "0",
		ap: "",
		z: +p[0].value > 23 ? 46 : p[4] ? 21 : 20
	};
}
function h_(p) {
	return {
		h: p[0].value,
		m: "0",
		s: "0",
		f: "0",
		ap: normAMPMStr(p[2].value),
		z: 18
	};
}
function hm_(p) {
	return {
		h: p[0].value,
		m: p[2].value,
		s: "0",
		f: "0",
		ap: normAMPMStr(p[4].value),
		z: 18
	};
}
const allowedPatterns = {
	"0:": hms1,
	"0:0": hms1,
	"0:0.": hms1,
	"0:0!": hms1,
	"0:0:": hms1,
	"0:0:0": hms1,
	"0:0.0": (p) => ({
		h: "0",
		m: p[0].value,
		s: p[2].value,
		f: p[4].value,
		ap: "",
		z: 47
	}),
	"0:0:0.0": (p) => ({
		h: p[0].value,
		m: p[2].value,
		s: p[4].value,
		f: p[6].value,
		ap: "",
		z: 47
	}),
	"0:0:0!0": (p, withDate) => {
		if (withDate) return {
			h: p[0].value,
			m: p[2].value,
			s: p[4].value,
			f: "0",
			ap: "",
			z: 21
		};
		return null;
	},
	"0_?": h_,
	"0_?:": h_,
	"0:0_?": hm_,
	"0:0_?:": hm_,
	"0:0:0_?": (p) => ({
		h: p[0].value,
		m: p[2].value,
		s: p[4].value,
		f: "0",
		ap: normAMPMStr(p[6].value),
		z: +p[0].value > 23 ? 46 : 19
	})
};
function parseTimeXl(value, l10n, withDate = false) {
	const parts = splitString(value, l10n.decimal === "," ? timeSplitterComma : timeSplitter);
	const pattern = parts.reduce((a, c) => a + c.type, "");
	const sss = allowedPatterns[pattern]?.(parts, withDate);
	if (!sss) return;
	const { h, m, s, f, ap, z } = sss;
	if (isDigits(h) && isDigits(m) && isDigits(s) && isFrac(f)) {
		let tail = TAILS[ap];
		if (!tail && (ap === "a," || ap === "p,") && l10n.decimal === ",") tail = TAILS[ap[0]];
		let ampm = "";
		if (ampmMatch(ap, l10n.ampm[0]) || tail === "a") ampm = "a";
		else if (ampmMatch(ap, l10n.ampm[1]) || tail === "p") ampm = "p";
		else if (ap) return;
		const v = toSerialTime(h, m, s, f, ampm);
		if (isFinite(v)) {
			const out = {
				value: v,
				formatId: z
			};
			if (+m > 59 || +s > 59) delete out.formatId;
			return out;
		}
	}
}
//#endregion
//#region lib/parseValue/parseDateXl.ts
const currentYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
const normDateStr = (s) => s.trim().replace(/\s+/g, " ").replace(/’/, "'").replace(/\.$/, "").toLowerCase();
const isNum = (d) => /^\d+$/.test(d);
const getLookups = (l10n) => {
	const l = {};
	l10n.dddd.forEach((d) => {
		if (!isNum(d)) {
			const k = normDateStr(d);
			for (let j = 3; j <= k.length; j++) l[k.slice(0, j)] = ["dddd", 0];
		}
	});
	for (const d of l10n.ddd) if (!isNum(d)) {
		const k = normDateStr(d);
		l[k] = ["ddd", 0];
	}
	l10n.mmmm.forEach((d, i) => {
		if (!isNum(d)) {
			const k = normDateStr(d);
			for (let j = 3; j <= k.length; j++) l[k.slice(0, j)] = ["mmmm", i + 1];
		}
	});
	l10n.mmm.forEach((d, i) => {
		if (!isNum(d)) {
			const k = normDateStr(d);
			l[k] = ["mmm", i + 1];
		}
	});
	return l;
};
const lookupsCache = new LRUCache(10);
function toSerialDate(year, month, day) {
	if (isValidDate(year, month, day)) {
		let epoch = -Infinity;
		if (year < 1900) return null;
		else if (year <= 1900 && month <= 2) epoch = 25568;
		else if (year < 1e4) epoch = 25569;
		const dateValue = Date.UTC(year, month - 1, day) / 864e5 + epoch;
		if (dateValue >= 0 && dateValue <= 2958465) return dateValue;
	}
	return null;
}
const C_ZERO = 48;
const C_NINE = 57;
const C_SPACE = 32;
const C_COMMA = 44;
const C_SLASH = 47;
const T_NUM = 1;
const T_SEP = 2;
const T_ELSE = 3;
function charClass(code) {
	if (code >= C_ZERO && code <= C_NINE) return T_NUM;
	if (code === C_SPACE || code >= C_COMMA && code <= C_SLASH) return T_SEP;
	return T_ELSE;
}
function tokenize$1(value) {
	const tokens = [];
	let last = -1;
	let currToken = "";
	for (let i = 0; i < value.length; i++) {
		const curr = value.charCodeAt(i);
		if (charClass(last) !== charClass(curr)) {
			if (currToken) tokens.push(currToken);
			currToken = "";
		}
		currToken += value[i];
		last = curr;
	}
	if (currToken) tokens.push(currToken);
	return tokens;
}
const isMM = (s) => {
	const v = Number(s);
	return s.length <= 2 && isFinite(v) && v > 0 && v <= 12;
};
const isDD = (s, month, year) => {
	const v = Number(s);
	return s.length <= 2 && isFinite(v) && v > 0 && v <= daysInMonth(year ?? currentYear, month ?? 1);
};
const isYYYY = (s) => s.length > 3 && isFinite(Number(s));
const isYY = (s) => s.length <= 2 && isFinite(Number(s));
const toYY = (s) => {
	let v = +s;
	v += v >= 30 ? 1900 : 2e3;
	return v;
};
const DATE_FULL = 14;
const DATE_SHORT = 15;
const DATE_DM = 16;
const DATE_MY = 17;
const DATE_ORDER_MDY = 0;
const DATE_ORDER_YMD = 2;
function parseDateXl(value, l10n) {
	const lang = lookupsCache.getOrSet(l10n, getLookups);
	const isMMM = (s) => !!lang[s] && lang[s][0] === "mmm";
	const isMMMM = (s) => !!lang[s] && lang[s][0] === "mmmm";
	const parseWord = (s) => lang[s] ? lang[s][1] : 0;
	const bits = tokenize$1(value.toLowerCase());
	let serialDate = null;
	let formatId;
	const year = currentYear;
	const day = 1;
	let timePart = "";
	if (bits.length > 5 && /^ +$/.test(bits[5])) {
		timePart = bits.slice(6).join("");
		bits.length = 5;
	}
	const dateOrder = l10n.format?.dateOrder ?? DATE_ORDER_MDY;
	const isMDY = dateOrder === DATE_ORDER_MDY;
	const isYMD = dateOrder === DATE_ORDER_YMD;
	const isDMY = !isMDY && !isYMD;
	const monthFirst = !!l10n.format?.monthFirst;
	const dotSep = l10n.format?.dateSep === ".";
	const isSep2 = (s) => {
		const t = s.trim();
		return t === "/" || t === "-" || dotSep && t === ".";
	};
	const isSep = (s) => s === " " || isSep2(s);
	const isSep3 = (s) => monthFirst && /^, +$/.test(s);
	const isSep4 = (s) => monthFirst && /^,? +$/.test(s);
	const isSepDMY = (s) => isSep(s) || !monthFirst && /^, +$/.test(s);
	if (bits.length === 5) {
		const [a, b, c, d, e] = bits;
		const [nMon, nDay] = isMDY ? [a, c] : [c, a];
		if ((isMMMM(a) || isMMM(a)) && isSep4(b) && isDD(c) && isSep3(d) && isYYYY(e)) {
			serialDate = toSerialDate(+e, parseWord(a), +c);
			formatId = DATE_SHORT;
		} else if ((isMMMM(a) || isMMM(a)) && isSep3(b) && isDD(c) && isSep3(d) && isYY(e)) {
			serialDate = toSerialDate(toYY(e), parseWord(a), +c);
			formatId = DATE_SHORT;
		} else if (isDD(a, parseWord(c), toYY(e)) && isSepDMY(b) && (isMMMM(c) || isMMM(c)) && isSepDMY(d) && isYY(e)) {
			serialDate = toSerialDate(toYY(e), parseWord(c), +a);
			formatId = DATE_SHORT;
		} else if (isDD(a, parseWord(c), +e) && isSepDMY(b) && (isMMMM(c) || isMMM(c)) && isSepDMY(d) && isYYYY(e)) {
			serialDate = toSerialDate(+e, parseWord(c), +a);
			formatId = DATE_SHORT;
		} else if (isYYYY(a) && isSep2(b) && isMM(c) && isSep2(d) && isDD(e, +c, +a)) {
			serialDate = toSerialDate(+a, +c, +e);
			formatId = DATE_FULL;
		} else if (isYMD) {
			if (isYY(a) && isSep2(b) && isMM(c) && isSep2(d) && isDD(e, +c, toYY(a))) {
				serialDate = toSerialDate(toYY(a), +c, +e);
				formatId = DATE_FULL;
			}
		} else if (isMM(nMon) && isSep2(b) && isDD(nDay, +nMon, +e) && isSep2(d) && isYYYY(e)) {
			serialDate = toSerialDate(+e, +nMon, +nDay);
			formatId = DATE_FULL;
		} else if (isMM(nMon) && isSep2(b) && isDD(nDay, +nMon, toYY(e)) && isSep2(d) && isYY(e)) {
			serialDate = toSerialDate(toYY(e), +nMon, +nDay);
			formatId = DATE_FULL;
		}
	} else if (bits.length === 3) {
		const [a, b, c] = bits;
		if (isMMM(c) && isDD(a, parseWord(c)) && isSep(b)) {
			serialDate = toSerialDate(year, parseWord(c), +a);
			formatId = DATE_DM;
		} else if (isMMMM(c) && isDD(a, parseWord(c)) && isSep(b)) {
			serialDate = toSerialDate(year, parseWord(c), +a);
			formatId = DATE_DM;
		} else if (isSep2(b) && isNum(a) && isNum(c)) {
			if (isYMD) {
				if (isMM(a) && isDD(c, +a)) {
					serialDate = toSerialDate(year, +a, +c);
					formatId = DATE_DM;
				} else if (isMM(c) && isDD(a, +c)) {
					serialDate = toSerialDate(year, +c, +a);
					formatId = DATE_DM;
				} else if ((isYY(a) && +a > 0 || isYYYY(a)) && isMM(c)) {
					serialDate = toSerialDate(isYY(a) ? toYY(a) : +a, +c, day);
					formatId = DATE_MY;
				}
			} else {
				const [nMon, nDay] = isMDY ? [a, c] : [c, a];
				if (isMM(nMon) && isDD(nDay, +nMon)) {
					serialDate = toSerialDate(year, +nMon, +nDay);
					formatId = DATE_DM;
				} else if (isMM(a) && isYY(c) && (isMDY || +c > 0)) {
					serialDate = toSerialDate(toYY(c), +a, day);
					formatId = DATE_MY;
				} else if (isMM(a) && isYYYY(c)) {
					serialDate = toSerialDate(+c, +a, day);
					formatId = DATE_MY;
				}
			}
		} else if (!isDMY && (isMMM(a) || isMMMM(a)) && isSep(b) && isDD(c, parseWord(a))) {
			serialDate = toSerialDate(year, parseWord(a), +c);
			formatId = DATE_DM;
		} else if ((isMMM(a) || isMMMM(a)) && isSep(b) && isYYYY(c)) {
			serialDate = toSerialDate(+c, parseWord(a), day);
			formatId = DATE_MY;
		} else if ((isMMM(a) || isMMMM(a)) && isSep(b) && isYY(c)) {
			serialDate = toSerialDate(toYY(c), parseWord(a), day);
			formatId = DATE_MY;
		} else if (isDD(a, parseWord(b), toYY(c)) && (isMMMM(b) || isMMM(b)) && isYY(c)) {
			serialDate = toSerialDate(toYY(c), parseWord(b), +a);
			formatId = DATE_SHORT;
		} else if (isDD(a, parseWord(b), +c) && (isMMMM(b) || isMMM(b)) && isYYYY(c)) {
			serialDate = toSerialDate(+c, parseWord(b), +a);
			formatId = DATE_SHORT;
		}
	} else if (bits.length === 2) {
		const [a, b] = bits;
		if (!isDMY && (isMMM(a) || isMMMM(a)) && isDD(b, parseWord(a))) {
			serialDate = toSerialDate(year, parseWord(a), +b);
			formatId = DATE_DM;
		} else if (isDD(a, parseWord(b)) && (isMMM(b) || isMMMM(b))) {
			serialDate = toSerialDate(year, parseWord(b), +a);
			formatId = DATE_DM;
		} else if ((isMMM(a) || isMMMM(a)) && isYYYY(b)) {
			serialDate = toSerialDate(+b, parseWord(a), 1);
			formatId = DATE_MY;
		} else if ((isMMM(a) || isMMMM(a)) && isYY(b)) {
			serialDate = toSerialDate(toYY(b), parseWord(a), 1);
			formatId = DATE_MY;
		}
	}
	if (serialDate != null && timePart) {
		const t = parseTimeXl(timePart, l10n, true);
		if (t) {
			serialDate += t.value;
			if (t.formatId) {
				if (t.formatId === 46) formatId = void 0;
				else if (formatId === DATE_FULL && t.formatId >= 18 && t.formatId <= 21) formatId = 22;
				else formatId = t.formatId;
			}
		} else serialDate = null;
	}
	if (serialDate != null) return {
		value: serialDate,
		formatId
	};
}
//#endregion
//#region lib/parseValue/parseDate.ts
/**
* Parse a date or datetime string input and return its value and format. If
* the input was not recognized or valid, the function returns an `undefined`, for
* valid input it returns an object with two properties:
*
* - `v`: the parsed value.
* - `z`: the number format of the input (if applicable).
*
* @param value The string to parse
* @param [options]  Options for the parser
* @returns An object of the parsed value and a corresponding format string
*/
function parseDate(value, options) {
	const l10n = getLocale(options?.locale || "") || defaultLocale;
	if (options?.mode === 1) return parseDateNf(value, l10n);
	return parseDateXl(value, l10n);
}
//#endregion
//#region lib/parseValue/parseTime.ts
/**
* Parse a time string input and return its value and format. If the input was
* not recognized or valid, the function returns an `undefined`, for valid input it
* returns an object with two properties:
*
* - `v`: the parsed value.
* - `z`: the number format of the input (if applicable).
*
* @param value The string to parse
* @param [options] Options for the parser
* @returns An object of the parsed value and a corresponding format string
*/
function parseTime(value, options) {
	const l10n = getLocale(options?.locale || "") || defaultLocale;
	if (options?.mode === 1) return parseTimeNf(value, l10n);
	return parseTimeXl(value, l10n);
}
//#endregion
//#region lib/parseValue/parseBoolNf.ts
function parseBoolNf(value, l10n) {
	const v = value.trim().toLowerCase();
	const bT = l10n.bool[0].toLowerCase();
	if (v === "true" || v === bT) return { value: true };
	const bF = l10n.bool[1].toLowerCase();
	if (v === "false" || v === bF) return { value: false };
}
//#endregion
//#region lib/parseValue/parseBoolXl.ts
function parseBoolXl(value, l10n) {
	const v = value.toLowerCase();
	const bT = l10n.bool[0].toLowerCase();
	if (v === "true" || v === bT) return { value: true };
	const bF = l10n.bool[1].toLowerCase();
	if (v === "false" || v === bF) return { value: false };
}
//#endregion
//#region lib/parseValue/parseBool.ts
/**
* Parse a string input and return its equivalent boolean value. If the input was not
* recognized or valid, the function returns an `undefined`, for valid input it
* returns an object with a single property:
*
* - `v`: the parsed value.
*
* @param value The supposed boolean to parse
* @param [options] Options for the parser
* @returns An object of the parsed value
*/
function parseBool(value, options) {
	const l10n = getLocale(options?.locale || "") || defaultLocale;
	if (options?.mode === 1) return parseBoolNf(value, l10n);
	return parseBoolXl(value, l10n);
}
//#endregion
//#region lib/parseValue/parseValue.ts
/**
* Attempt to parse a "spreadsheet input" string input and return its value and
* format. If the input was not recognized or valid, the function returns an
* `undefined`, for valid input it returns an object with two properties:
*
* - `v`: The parsed value. For dates, this will be an Excel style serial date.
* - `z`: (Optionally) the number format string of the input. This property will
*        not be present if it amounts to the `General` format.
*
* `parseValue()` recognizes a wide range of dates and date-times, times,
* numbers, and booleans. Some examples:
*
* ```js
* // basic number
* parseValue("-123");// { v: -123 }
* // formatted number
* parseValue("$1,234"); // { v: 1234, z: "$#,##0" }
* // a percent
* parseValue("12.3%"); // { v: 0.123, z: "0.00%" }
* // a date
* parseValue("07 October 1984"); // { v: 30962, z: 'dd mmmm yyyy' }
* // an ISO formatted date-time
* parseValue("1984-09-10 11:12:13.1234"); // { v: 30935.46681855787, z: "yyyy-mm-dd hh:mm:ss" }
* // a boolean
* parseValue("false"); // { v: false }
* ```
*
* The formatting string outputted may not correspond exactly to the input.
* Rather, is it composed of certain elements which the input controls. This is
* comparable to how Microsoft Excel and Google Sheets parse pasted input. Some
* things you may expect:
*
* - Whitespace is ignored.
* - Decimal fractions are always represented by `.00` regardless of how many
*   digits were shown in the input.
* - Negatives denoted by parentheses [`(1,234)`] will not include the
*   parentheses in the format string (the value will still be negative.)
* - All "scientific notation" returns the same format: `0.00E+00`.
*
* Internally the parser calls, `parseNumber`, `parseDate`,
* `parseTime` and `parseBool`. They work in the same way except
* with a more limited scope. You may prefer those functions if you are limiting
* input to a smaller scope.
*
* @param value The value to parse
* @param [options] Options for the parser
* @returns An object of the parsed value and a corresponding format string
*/
function parseValue(value, options) {
	const l10n = getLocale(options?.locale || "en-US") || defaultLocale;
	if (options?.mode === 1) return parseNumberNf(value, l10n) ?? parseDateNf(value, l10n) ?? parseTimeNf(value, l10n) ?? parseBoolNf(value, l10n);
	return parseNumberXl(value, l10n) ?? parseDateXl(value, l10n) ?? parseTimeXl(value, l10n) ?? parseBoolXl(value, l10n);
}
//#endregion
//#region lib/createPartition.ts
function createPartition(tokens) {
	return {
		scale: 1,
		percent: false,
		text: false,
		parens: false,
		fractions: false,
		grouping: false,
		exponential: false,
		integer: false,
		locale: "",
		pattern: "",
		int_max: 0,
		frac_max: 0,
		frac_min: 0,
		man_p: "",
		num_p: "",
		num_min: 0,
		den_min: 0,
		den_max: 0,
		date: 0,
		tokensUsed: 0,
		date_eval: false,
		date_system: 1,
		sec_decimals: 0,
		general: false,
		clock: 24,
		int_min: 0,
		int_pattern: [],
		frac_pattern: [],
		man_pattern: [],
		den_pattern: [],
		num_pattern: [],
		tokens: tokens ?? [],
		den_p: "",
		int_p: "",
		denominator: 0,
		sysdate: false,
		systime: false
	};
}
//#endregion
//#region lib/parseLocaleInstr.ts
/**
* Parse the contents of a locale instruction in a format pattern, such as
* `[$€-407]` or `[$-en-US,6]`.
*
* The instruction can take one of two forms. Each can be prefixed with a
* currency symbol, which is everything before the first `-`:
*
* - **LCID style:** `-xxyyzzzz`, a hexadecimal code where `xx` is the number
*   system, `yy` is the calendar, and `zzzz` is the Windows locale ID. Leading
*   parts can be omitted, as in `-409`.
* - **BCP 47 style:** `-tag[,xxyy]`, a locale tag such as `en-US`, optionally
*   followed by a hexadecimal number system (`xx`) and calendar (`yy`). A
*   Japanese `-x-gannen` suffix is accepted, but ignored.
*
* The special system date and time codes (`F800` and `F400`, or `x-sysdate` and
* `x-systime`) return only `{ sysdate: true }` or `{ systime: true }`, and
* discard any currency, number system, or calendar.
*
* Unrecognized instructions return an empty object, because Excel mostly
* ignores them.
*
* @internal
* @param value The instruction text between `[$` and `]`, such as `€-407`.
* @returns The parsed instruction. Properties that are absent or zero are omitted.
*/
function parseLocaleInstr(value) {
	let cal;
	let num = 0;
	let locale;
	let currency = "";
	const numStyle = /^([^-]*)-([0-9a-fA-F]{3,8})$/.exec(value);
	if (numStyle) {
		if (numStyle[1]) currency = numStyle[1];
		const code = parseInt(numStyle[2], 16);
		const c = code >> 24 & 255;
		if (c) num = c;
		const d = code >> 16 & 255;
		if (d) cal = d;
		const e = code & 65535;
		if (e === 63488) return { sysdate: true };
		else if (e === 62464) return { systime: true };
		else if (e && codeToLocale[e]) locale = codeToLocale[e];
	} else {
		const bcpStyle = /^([^-]*)-([a-z\d][a-z\d_.@-]*)?(?:,([a-f\d]{1,4}))?$/i.exec(value);
		if (bcpStyle) {
			let loc = bcpStyle[2];
			if (/^x-sysdate$/.test(loc)) return { sysdate: true };
			else if (/^x-systime$/.test(loc)) return { systime: true };
			else {
				if (bcpStyle[1]) currency = bcpStyle[1];
				if (loc) {
					if (/-x-gannen$/i.test(loc)) loc = loc.slice(0, -9);
					locale = resolveLocale(loc);
				}
				if (bcpStyle[3]) {
					const code = parseInt(bcpStyle[3], 16);
					const c = code >> 8 & 255;
					if (c) num = c;
					const d = code & 255;
					if (d) cal = d;
				}
			}
		} else if (!value.includes("-")) return { currency: value };
		else return { currency: value };
	}
	const out = {};
	if (cal) out.calendar = cal;
	if (num) out.numberStyle = num;
	if (locale) out.locale = locale;
	if (currency) out.currency = currency;
	return out;
}
//#endregion
//#region lib/parseFormatSection.ts
function add(s, tokens) {
	if (typeof s === "string") tokens.push({
		type: TOKEN_STRING,
		value: s
	});
	else tokens.push(s);
}
const countNonHash = (s) => {
	let n = 0;
	for (let i = 0; i < s.length; i++) if (s.charCodeAt(i) !== 35) n++;
	return n;
};
function isNumOp(token, activePattern) {
	const type = token?.type;
	return type === "HASH" || type === "ZERO" || type === "QMARK" || type === "DIGIT" && activePattern === "DEN";
}
function parseFormatSection(inputTokens) {
	const outputTokens = [];
	const part = createPartition(outputTokens);
	let currentPattern = "INT";
	let lastNumberChunk;
	const dateChunks = [];
	let last;
	let haveLocale = false;
	let index = -1;
	let partOver = false;
	let patternSource = "";
	let haveSlash = false;
	const getPattern = (p) => {
		if (p === "DEN") return part.den_pattern;
		if (p === "INT") return part.int_pattern;
		if (p === "FRAC") return part.frac_pattern;
		if (p === "MAN") return part.man_pattern;
		return [];
	};
	while (++index < inputTokens.length && !partOver) {
		const token = inputTokens[index];
		const type = token.type || "ERROR";
		patternSource += token.raw;
		if (type === "GENERAL") {
			part.general = true;
			add({ type }, outputTokens);
		} else if (isNumOp(token, currentPattern)) {
			const pt = getPattern(currentPattern);
			if (last && (isNumOp(last, currentPattern) || last.type === "GROUP")) {
				pt.push((pt.pop() || "") + token.value);
				if (lastNumberChunk && "num" in lastNumberChunk) lastNumberChunk.num += token.value;
			} else {
				pt.push(token.value);
				lastNumberChunk = {
					type: currentPattern,
					num: token.value
				};
				add(lastNumberChunk, outputTokens);
			}
		} else if (type === "PAREN") {
			if (token.value === "(") part.parens = true;
			add(token.value, outputTokens);
		} else if (type === "DIGIT") add(token.value, outputTokens);
		else if (type === "SLASH") {
			haveSlash = true;
			const pt = getPattern(currentPattern);
			if (pt.length) {
				if (!lastNumberChunk) throw new SyntaxError("Format pattern is missing a numerator");
				part.fractions = true;
				const xx = pt.pop();
				part.num_pattern.push(xx);
				lastNumberChunk.type = "NUM";
				currentPattern = "DEN";
				add({ type: "DIV" }, outputTokens);
			} else add(token.value, outputTokens);
		} else if (type === "COMMA") add(",", outputTokens);
		else if (type === "SCALE") part.scale = .001 ** token.raw.length;
		else if (type === "GROUP") {
			if (currentPattern === "INT") part.grouping = true;
			if (currentPattern === "DEN") throw new SyntaxError("Cannot group denominator digits");
		} else if (type === "SPACE") add({ type }, outputTokens);
		else if (type === "BREAK") {
			partOver = true;
			break;
		} else if (type === "TEXT") {
			part.text = true;
			add({
				type,
				value: token.value
			}, outputTokens);
		} else if (type === "PLUS" || type === "MINUS") add({ type }, outputTokens);
		else if (type === "DURATION") {
			const tokenValue = token.value.toLowerCase();
			const startsWith = tokenValue[0];
			let bit;
			if (startsWith === "h") bit = {
				type: T_TYPE_HOUR_E,
				size: 16,
				pad: tokenValue.length
			};
			else if (startsWith === "m") bit = {
				type: T_TYPE_MIN_E,
				size: 32,
				pad: tokenValue.length
			};
			else bit = {
				type: T_TYPE_SEC_E,
				size: 64,
				pad: tokenValue.length
			};
			part.date = part.date | bit.size;
			dateChunks.push(bit);
			add(bit, outputTokens);
		} else if (part.date && type === "POINT" && inputTokens[index + 1]?.type === "ZERO") {
			let dec = 1;
			index++;
			let raw = "0";
			if (inputTokens[index + 1]?.type === "ZERO") {
				raw += "0";
				dec = 2;
				index++;
			}
			if (inputTokens[index + 1]?.type === "ZERO") {
				raw += "0";
				dec = 3;
				index++;
			}
			patternSource += raw;
			const size = [
				64,
				128,
				256,
				512
			][dec];
			part.date = part.date | size;
			part.date_eval = true;
			part.sec_decimals = Math.max(part.sec_decimals, dec);
			add({
				type: T_TYPE_SUBSEC,
				size,
				decimals: dec
			}, outputTokens);
		} else if (type === "CALENDAR") {
			if (!haveLocale) {
				if (token.value === "B2" || token.value === "b2") part.date_system = 6;
				else part.date_system = 1;
			}
		} else if (type === "DATETIME") {
			let bit;
			const value = token.value.toLowerCase();
			const startsWith = value[0];
			if (value === "y" || value === "yy") bit = {
				type: T_TYPE_YEAR_S,
				size: 2
			};
			else if (startsWith === "y" || startsWith === "e") bit = {
				type: T_TYPE_YEAR,
				size: 2
			};
			else if (value === "b" || value === "bb") bit = {
				type: T_TYPE_B_YEAR_S,
				size: 2
			};
			else if (startsWith === "b") bit = {
				type: T_TYPE_B_YEAR,
				size: 2
			};
			else if (value === "d" || value === "dd") bit = {
				type: "DAY",
				size: 8,
				pad: value === "dd"
			};
			else if (value === "ddd" || value === "aaa") bit = {
				type: T_TYPE_WEEKDAY_S,
				size: 8
			};
			else if (startsWith === "d" || startsWith === "a") bit = {
				type: T_TYPE_WEEKDAY,
				size: 8
			};
			else if (startsWith === "h") bit = {
				type: T_TYPE_HOUR,
				size: 16,
				pad: value.length > 1
			};
			else if (startsWith === "m") {
				if (value.length === 3) bit = {
					type: T_TYPE_MNAME_S,
					size: 4
				};
				else if (value.length === 5) bit = {
					type: T_TYPE_MNAME_1,
					size: 4
				};
				else if (value.length >= 4) bit = {
					type: T_TYPE_MNAME,
					size: 4
				};
				const last_date_chunk = dateChunks[dateChunks.length - 1];
				if (!bit && last_date_chunk && !last_date_chunk.used && last_date_chunk.size & 80) {
					last_date_chunk.used = true;
					bit = {
						type: "MIN",
						size: 32,
						pad: value.length > 1
					};
				}
				if (!bit) bit = {
					type: T_TYPE_MON,
					size: 4,
					pad: value.length > 1,
					indeterminate: true
				};
			} else if (startsWith === "s") {
				bit = {
					type: "SEC",
					size: 64,
					pad: value.length > 1
				};
				const last_date_chunk = dateChunks[dateChunks.length - 1];
				if (last_date_chunk && last_date_chunk.size & 32) bit.used = true;
				else if (last_date_chunk && "indeterminate" in last_date_chunk) {
					delete last_date_chunk.indeterminate;
					last_date_chunk.size = 32;
					last_date_chunk.type = "MIN";
					bit.used = true;
				}
			} else if (startsWith === "g") {}
			if (bit) {
				part.date = part.date | bit.size;
				part.date_eval = true;
				dateChunks.push(bit);
				add(bit, outputTokens);
			}
		} else if (type === "AMPM") {
			part.clock = 12;
			part.date = part.date | 16;
			part.date_eval = true;
			add({
				type,
				short: token.value === "A/P"
			}, outputTokens);
		} else if (type === "STRING" || type === "ESCAPED" || type === "CHAR") add(token.value, outputTokens);
		else if (type === "CONDITION") {
			const parts = /^(<[=>]?|>=?|=)\s*(-?[.\d]+)$/.exec(token.value);
			if (parts) part.condition = [parts[1], parseFloat(parts[2])];
			else throw new Error("Invalid condition: " + token.value);
		} else if (type === "LOCALE") {
			const props = parseLocaleInstr(token.value);
			if (props.currency) add(props.currency, outputTokens);
			if (props.sysdate) part.sysdate = true;
			if (props.systime) part.systime = true;
			if (props.locale) part.locale = props.locale;
			if (props.calendar === 1 || props.calendar === 6) part.date_system = props.calendar;
			haveLocale = true;
		} else if (type === "COLOR") {
			let cm;
			const v = token.value.toLowerCase();
			if (cm = /^color\s*(\d+)$/i.exec(v)) part.color = parseInt(cm[1], 10);
			else part.color = v;
		} else if (type === "PERCENT") {
			part.scale = 100;
			part.percent = true;
			add("%", outputTokens);
		} else if (type === "POINT") {
			add({
				type,
				value: token.value
			}, outputTokens);
			if (!part.date) {
				part.dec_fractions = true;
				currentPattern = T_TYPE_FRAC;
			}
		} else if (type === "EXP") {
			part.exponential = true;
			const plus = token.value.includes("+");
			part.exp_plus = plus;
			currentPattern = "MAN";
			add({
				type: "EXP",
				plus
			}, outputTokens);
		} else if (type === "SKIP") add({
			type,
			value: token.value
		}, outputTokens);
		else if (type === "FILL") add({
			type,
			value: token.value
		}, outputTokens);
		else if (type === "CURRENCY") add({
			type,
			value: token.value
		}, outputTokens);
		else if (type === "DBNUM") {
			const n = parseInt(token.value.slice(5));
			if (n < 1 || n > 4) throw new SyntaxError("Unknown modifier: " + token.value);
		} else if (type === "NATNUM") throw new SyntaxError("Unknown modifier: " + token.value);
		else if (type === "MODIFIER") throw new SyntaxError("Unknown modifier: " + token.value);
		else if (type === "ERROR") throw new SyntaxError(`Illegal character: ${patternSource}`);
		else throw new SyntaxError(`Unknown token ${type} in ${patternSource}`);
		last = token;
	}
	part.tokensUsed = index;
	part.pattern = patternSource;
	if (part.fractions && part.dec_fractions || part.grouping && !part.int_pattern.length || part.fractions && part.exponential || part.fractions && part.den_pattern.length * part.num_pattern.length === 0 || haveSlash && !part.fractions && !part.date || part.exponential && (part.int_pattern.length || part.frac_pattern.length) * part.man_pattern.length === 0) throw new SyntaxError(`Invalid pattern: ${patternSource}`);
	const intPattern = part.int_pattern.join("");
	const manPattern = part.man_pattern.join("");
	const fracPattern = part.frac_pattern.join("");
	part.int_max = intPattern.length;
	part.int_min = countNonHash(intPattern);
	let min = 0;
	for (let i = 0; i < intPattern.length; i++) {
		const ch = intPattern[intPattern.length - 1 - i];
		if (/^[0-9?]/.test(ch)) min = i + 1;
	}
	part.int_min = min;
	part.frac_max = fracPattern.length;
	part.frac_min = countNonHash(fracPattern);
	let num_pat = part.num_pattern.join("");
	let den_pat = part.den_pattern[0] || "";
	if (den_pat.includes("?") || num_pat.includes("?")) {
		den_pat = den_pat.replace(/\d/g, "?");
		den_pat = den_pat.replace(/#$/g, "?");
		part.num_min = countNonHash(num_pat);
		part.den_max = den_pat.length;
		part.den_min = countNonHash(den_pat);
		num_pat = num_pat.replace(/#$/g, "?");
	} else {
		part.num_min = countNonHash(num_pat);
		part.den_max = den_pat.length;
		part.den_min = countNonHash(den_pat);
	}
	part.int_p = intPattern;
	part.man_p = manPattern;
	part.num_p = num_pat;
	part.den_p = den_pat;
	if (part.den_pattern.length) part.denominator = parseInt(part.den_pattern.join("").replace(/\D/g, ""), 10);
	part.integer = !!intPattern.length;
	if (!part.integer && !part.exponential && fracPattern.length) {
		const pointIdx = part.tokens.findIndex((d) => d.type === TOKEN_POINT);
		part.tokens.splice(pointIdx, 0, {
			type: "INT",
			num: "#"
		});
		part.integer = true;
		part.int_pattern = ["#"];
		part.int_p = "#";
	}
	if (!part.tokens.length && /^\[(?!\$)/.test(part.pattern)) {
		part.general = true;
		add({ type: TOKEN_GENERAL }, outputTokens);
	}
	if (part.fractions) for (let i = 0; i < outputTokens.length - 1; i++) {
		const tok = outputTokens[i];
		if (tok.type !== "STRING" && tok.type !== "SPACE") continue;
		const nextType = outputTokens[i + 1].type;
		if (nextType === "NUM") tok.rule = "num+int";
		else if (nextType === "DIV") tok.rule = "num";
		else if (nextType === "DEN") tok.rule = "den";
	}
	if (part.grouping) {
		if (part.int_pattern.length > 1) part.grouping = false;
	}
	return part;
}
//#endregion
//#region lib/parsePattern.ts
const maybeAddMinus = (part) => {
	const [op, val] = part.condition ?? ["", 0];
	if (!(val < 0 && (op === "<" || op === "<=" || op === "=") || val === 0 && op === "<")) part.tokens.unshift({
		type: TOKEN_MINUS,
		volatile: true
	});
};
const clonePart = (part, prefixToken) => {
	const r = {};
	for (const key in part) {
		const val = part[key];
		r[key] = Array.isArray(val) ? [...val] : val;
	}
	if (prefixToken && r.tokens) r.tokens.unshift(prefixToken);
	r.generated = true;
	return r;
};
function parsePattern(pattern) {
	const partitions = [];
	let conditional = false;
	let l10n_override;
	let text_partition = null;
	let more = 0;
	let part;
	let i = 0;
	let conditions = 0;
	let tokens = tokenize(pattern);
	do {
		part = parseFormatSection(tokens);
		if ((part.date || part.general) && (part.int_pattern.length || part.frac_pattern.length || part.scale !== 1 || part.text)) throw new Error("Illegal format");
		if (part.condition) {
			conditions++;
			conditional = true;
		}
		if (part.text) {
			if (text_partition) throw new Error("Unexpected partition");
			text_partition = part;
		}
		if (part.locale) l10n_override = resolveLocale(part.locale);
		partitions.push(part);
		more = tokens[part.tokensUsed]?.type === "BREAK" ? 1 : 0;
		tokens = tokens.slice(part.tokensUsed + more);
		i++;
	} while (more && i < 4 && conditions < 3);
	if (more) throw new Error("Unexpected partition");
	if (conditions > 2) throw new Error("Unexpected condition");
	const part3 = partitions[3];
	if (part3 && (part3.int_pattern.length || part3.frac_pattern.length || part3.date)) throw new Error("Unexpected partition");
	if (conditional) {
		if (!partitions[0].condition) partitions[0].condition = [">", 0];
		const numParts = partitions.length;
		if (numParts === 1) {
			partitions[1] = parseFormatSection(tokenize("General"));
			partitions[1].generated = true;
		}
		if (numParts <= 2) {}
		if (numParts < 3) {
			const part1 = partitions[0];
			const part2 = partitions[1];
			maybeAddMinus(part1);
			if (part2.condition) maybeAddMinus(part2);
			else {
				const cond = part1.condition;
				if (cond && (cond[0] === "=" || cond[1] >= 0 && (cond[0] === ">" || cond[0] === ">="))) part2.tokens.unshift({
					type: TOKEN_MINUS,
					volatile: true
				});
			}
		} else partitions.forEach(maybeAddMinus);
	} else {
		if (partitions.length < 4 && text_partition) {
			for (let pi = 0, pl = partitions.length; pi < pl; pi++) if (partitions[pi] === text_partition) partitions.splice(pi, 1);
		}
		if (partitions.length < 1 && text_partition) {
			partitions[0] = parseFormatSection(tokenize("General"));
			partitions[0].generated = true;
		}
		if (partitions.length < 2) {
			const volMinus = {
				type: TOKEN_MINUS,
				volatile: true
			};
			partitions.push(clonePart(partitions[0], volMinus));
		}
		if (partitions.length < 3) partitions.push(clonePart(partitions[0]));
		if (partitions.length < 4) {
			if (text_partition) partitions.push(text_partition);
			else {
				const p = parseFormatSection(tokenize("@"));
				p.generated = true;
				partitions.push(p);
			}
		}
		partitions[0].condition = [">", 0];
		partitions[1].condition = ["<", 0];
		partitions[2].condition = void 0;
	}
	return {
		pattern,
		partitions,
		locale: l10n_override
	};
}
//#endregion
//#region lib/prepareFormatterData.ts
const _parseDataCache = new LRUCache(MAX_CACHED_PATTERNS);
/**
* Parse a format pattern, caching the result so each pattern is only parsed once.
*
* If the pattern is invalid, this either throws or returns error partitions
* that format every value as an error. Error results are not cached.
*
* @internal
* @param pattern A format pattern in the ECMA-376 number format. An empty pattern is treated as `General`.
* @param [shouldThrow=false] Throw an error if the pattern is invalid.
* @returns The parsed pattern data.
*/
function prepareFormatterData(pattern, shouldThrow = false) {
	if (!pattern) pattern = "General";
	let parseData = _parseDataCache.get(pattern);
	if (!parseData) try {
		parseData = parsePattern(pattern);
		_parseDataCache.set(pattern, parseData);
	} catch (err) {
		if (shouldThrow) throw err;
		const message = err && typeof err === "object" && "message" in err ? String(err.message) : "Unknown error";
		const errPart = createPartition([{ type: TOKEN_ERROR }]);
		errPart.error = true;
		parseData = {
			pattern,
			partitions: [
				errPart,
				errPart,
				errPart,
				errPart
			],
			error: message,
			locale: void 0
		};
	}
	return parseData;
}
//#endregion
//#region lib/clamp.ts
function clamp(num) {
	if (num === 0) return num;
	const d = Math.ceil(Math.log10(num < 0 ? -num : num));
	const mag = 10 ** (16 - Math.floor(d));
	return isFinite(mag) ? Math.round(num * mag) / mag : 0;
}
//#endregion
//#region lib/numberProps.ts
function getExponent(num, int_max = 0) {
	const exp = Math.floor(Math.log10(num));
	return int_max > 1 ? Math.floor(exp / int_max) * int_max : exp;
}
function getSignificand(n, exp = 1) {
	if (exp < -300) return parseFloat(n.toExponential().split("e")[0]);
	return n * 10 ** -exp;
}
//#endregion
//#region lib/numdec.ts
const zero = {
	total: 1,
	sign: 0,
	digits: 1,
	period: 0,
	int: 1,
	frac: 0
};
function numdec(value, incl_sign = true) {
	const v = Math.abs(value);
	if (!v) return zero;
	const signSize = incl_sign && value < 0 ? 1 : 0;
	const intPart = Math.floor(v);
	const intSize = Math.floor(Math.log10(v) + 1);
	let periodSize = 0;
	let fracSize = 0;
	if (intPart !== v) {
		periodSize = 1;
		const n = String(round(v * 10 ** -intSize, 15));
		let f = n.length;
		let z = true;
		let i = 0;
		while (i <= n.length) {
			if (n[i] === ".") {
				f--;
				break;
			} else if (n[i] === "0" && z) f--;
			else z = false;
			i++;
		}
		fracSize = f - intSize;
		if (fracSize < 0) {
			fracSize = 0;
			periodSize = 0;
		}
	}
	return {
		total: signSize + Math.max(intSize, 1) + periodSize + fracSize,
		digits: Math.max(intSize, 0) + fracSize,
		sign: signSize,
		period: periodSize,
		int: Math.max(intSize, 1),
		frac: fracSize
	};
}
//#endregion
//#region lib/general.ts
const fixLocale = (s, l10n) => {
	return s.replace(/\./, l10n.decimal);
};
const getExp = (n, exp, l10n) => {
	const x = Math.abs(exp);
	let m;
	if (n === 1) m = n;
	else m = round(n, 5);
	return [
		fixLocale(m + "", l10n),
		l10n.exponent,
		exp < 0 ? l10n.negative : l10n.positive,
		x < 10 ? "0" : "",
		x
	];
};
function general(ret, value, l10n) {
	if (typeof value === "string") ret.push(value);
	else {
		const int = value | 0;
		if (value === int) ret.push(Math.abs(int));
		else {
			const v = Math.abs(value);
			let exp = getExponent(v);
			let n = getSignificand(v, exp);
			if (n === 10) {
				n = 1;
				exp++;
			}
			const num_dig = numdec(v);
			if (exp >= -4 && exp <= -1) {
				const o = v.toPrecision(10 + exp).replace(/\.?0+$/, "");
				ret.push(fixLocale(o, l10n));
			} else if (exp === 10) {
				const r = Math.round(v);
				if (r < 1e11) ret.push(r);
				else ret.push(...getExp(1, 11, l10n));
			} else if (Math.abs(exp) <= 9) {
				if (num_dig.total <= 11) {
					const o = round(v, 9).toFixed(num_dig.frac);
					ret.push(fixLocale(o, l10n));
				} else if (exp === 9) ret.push(Math.round(v));
				else if (exp >= 0 && exp < 9) ret.push(fixLocale(String(round(v, 9 - exp)), l10n));
				else ret.push(...getExp(n, exp, l10n));
			} else if (num_dig.total >= 12) ret.push(...getExp(n, exp, l10n));
			else ret.push(fixLocale(round(v, 9).toFixed(num_dig.frac), l10n));
		}
	}
	return ret;
}
//#endregion
//#region lib/pad.ts
/**
* @internal
* @param c Instruction character ('#' | '?' | '0')
* @param Use nonbreaking space or not?
* @returns Padding character
*/
function pad(c, nbsp = false) {
	if (c === "0") return "0";
	else if (c === "?") return nbsp ? "\xA0" : " ";
	return "";
}
//#endregion
//#region lib/runPart.ts
const DAYSIZE = 86400;
const CHAR_0 = 48;
const CHAR_9 = 57;
const dateOverflows = (inputValue, roundedValue, bigRange) => {
	if (bigRange) return inputValue < -694324 || roundedValue >= 35830291;
	return inputValue < 0 || roundedValue >= 2958466;
};
function runPart(value, part, opts, l10n_) {
	let mantissa = "";
	let mantissa_sign = "";
	let numerator = "";
	let denominator = "";
	let fraction = "";
	let integer = "";
	let exp = 0;
	let date = 0;
	if (typeof value === "bigint") {
		if (value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER) value = Number(value);
		else return opts.bigintErrorNumber ? String(value) : opts.overflow;
		date = value;
	} else if (typeof value === "number") date = Math.trunc(value);
	let time = 0;
	let year = 0;
	let month = 1;
	let day = 0;
	let weekday = 0;
	let hour = 0;
	let minute = 0;
	let second = 0;
	let subsec = 0;
	const l10n = l10n_ || defaultLocale;
	if (!part.text && isFinite(part.scale) && part.scale !== 1 && typeof value === "number") value = clamp(value * part.scale);
	if (typeof value === "number" && part.fractions) {
		if (part.integer) {
			const i = Math.abs(roundBinary(value, 1));
			integer += i < 1 ? "" : Math.floor(i);
		}
	} else if (typeof value === "number" && isFinite(value) && (part.exponential || part.integer || part.dec_fractions)) {
		let q;
		let k;
		if (part.exponential) {
			[q, k, exp] = roundSignificand(Math.abs(value), part.frac_max, part.int_max, !!part.integer);
			mantissa += Math.abs(exp);
			value = (value < 0 ? -q : q) * pow10(k);
		} else [q, k] = roundPlaces(Math.abs(value), part.frac_max);
		const [intDigits, fracDigits] = decToText(q, k);
		if (part.integer) integer = intDigits;
		if (part.dec_fractions) fraction = fracDigits;
	}
	const group_pri = opts.grouping[0] ?? 3;
	const group_sec = opts.grouping[1] ?? group_pri;
	const fixed_slash = !part.error && (part.num_p.includes("0") || part.den_p.includes("0"));
	let have_fraction = fixed_slash;
	if (part.fractions && typeof value === "number") {
		have_fraction = fixed_slash || !!(value % 1);
		const _dec = Math.abs(part.integer ? value % 1 : value);
		if (_dec) {
			have_fraction = true;
			if (part.denominator && isFinite(part.denominator)) {
				denominator += part.denominator;
				numerator += roundBinary(_dec * part.denominator);
				if (numerator === "0") {
					numerator = "";
					denominator = "";
					have_fraction = fixed_slash;
				}
			} else {
				const frt = dec2frac(_dec, Infinity, part.den_max);
				numerator += frt[0];
				denominator += frt[1];
				if (part.integer && numerator === "0") {
					numerator = "";
					denominator = "";
					have_fraction = fixed_slash;
				}
			}
		} else if (!value && !part.integer) {
			have_fraction = true;
			numerator = "0";
			denominator = "1";
		}
		if (part.integer && !have_fraction && !Math.trunc(value)) integer = "0";
	}
	if (part.date && typeof value === "number") {
		date = Math.trunc(value);
		const t = DAYSIZE * (value - date);
		time = Math.floor(t);
		subsec = t - time;
		if (Math.abs(subsec) < 1e-6) subsec = 0;
		else if (subsec > .9999) {
			subsec = 0;
			time += 1;
		}
		if (subsec) {
			const minU = part.date & 512 || part.date & 256 || part.date & 128;
			if (minU === 512 && subsec > .9995 || minU === 256 && subsec > .995 || minU === 128 && subsec > .95 || !minU && subsec >= .5) {
				time++;
				subsec = 0;
			}
		}
		if (time === DAYSIZE && part.date & 1008) {
			time = 0;
			date += 1;
		}
		if (date || part.date_system) {
			const dout = toYMD(value + date - Math.trunc(value), part.date_system, opts.leap1900);
			year = dout[0];
			month = dout[1];
			day = dout[2];
		}
		if (time) {
			const x = time < 0 ? DAYSIZE + time : time;
			second = Math.floor(x) % 60;
			minute = Math.floor(x / 60) % 60;
			hour = Math.floor(x / 60 / 60) % 60;
		}
		weekday = (6 + date) % 7;
		if (part.date_eval && dateOverflows(value, date + time / DAYSIZE, opts.dateSpanLarge)) {
			if (opts.dateErrorThrows) throw new Error("Date out of bounds");
			if (opts.dateErrorNumber) return general(value < 0 ? [l10n.negative] : [], value, l10n).join("");
			return opts.overflow;
		}
	}
	const padQ = pad("?", opts.nbsp);
	if (exp < 0) mantissa_sign = "-";
	else if (part.exp_plus) mantissa_sign = "+";
	const ret = [];
	const digitsStart = (numstr, pattern, prt, offset) => {
		const l = !offset && numstr.length > pattern.length ? prt.length + numstr.length - pattern.length : prt.length;
		if (numstr.length < pattern.length) offset += numstr.length - pattern.length;
		for (let i = 0; i < l; i++) ret.push(numstr[i + offset] || pad(prt[i], opts.nbsp));
		return l;
	};
	let denominator_fixed = false;
	const counter = {
		int: 0,
		frac: 0,
		man: 0,
		num: 0,
		den: 0
	};
	for (let ti = 0, tl = part.tokens.length; ti < tl; ti++) {
		const tok = part.tokens[ti];
		const tokenType = tok.type;
		const len = "num" in tok ? tok.num.length : 0;
		if (tokenType === "STRING") {
			const rule = tok.rule;
			if (rule) {
				if (rule === "num" && have_fraction || rule === "num+int" && have_fraction && integer || rule === "den" && have_fraction) ret.push(tok.value.replaceAll(" ", padQ));
				else if (rule === "num" && part.num_min > 0 || part.den_min > 0 || rule === "num+int" && part.den_min > 0 && (integer || part.num_min) || rule === "den" && part.den_min > 0 || part.den_min > 0) ret.push(padQ.repeat(tok.value.length));
			} else ret.push(tok.value.replaceAll(" ", padQ));
		} else if (tokenType === "SPACE") {
			if (tok.rule === "num+int") {
				if ((have_fraction || part.num_min || part.den_min) && (integer || part.num_min)) ret.push(padQ);
			} else ret.push(padQ);
		} else if (tokenType === "ERROR") ret.push(opts.invalid);
		else if (tokenType === "POINT") ret.push(part.date ? tok.value : l10n.decimal);
		else if (tokenType === "GENERAL") general(ret, value, l10n);
		else if (tokenType === "EXP") ret.push(l10n.exponent);
		else if (tokenType === "MINUS") {
			if (tok.volatile && part.date) {} else if (tok.volatile && (typeof value !== "number" || value >= 0)) {} else if (tok.volatile && !part.fractions && (part.integer || part.dec_fractions)) {
				if (typeof value === "number" && value < 0 && integer && integer !== "0" || fraction) ret.push(l10n.negative);
			} else ret.push(l10n.negative);
		} else if (tokenType === "PLUS") ret.push(l10n.positive);
		else if (tokenType === "TEXT") ret.push(value);
		else if (tokenType === "FILL") {
			if (opts.fillChar) ret.push(opts.fillChar, tok.value);
		} else if (tokenType === "SKIP") {
			if (opts.skipChar) ret.push(opts.skipChar, tok.value);
			else ret.push(opts.nbsp ? "\xA0" : " ");
		} else if (tokenType === "DIV") {
			if (have_fraction) ret.push("/");
			else if (part.num_min > 0 || part.den_min > 0) ret.push(padQ);
			else ret.push(pad("#", opts.nbsp));
		} else if (tokenType === "INT") {
			if (part.int_pattern.length === 1) {
				const pt = part.int_p;
				const special_case_zero = part.exponential && !value;
				const l = special_case_zero ? Math.max(part.int_min, part.int_max, integer.length) : Math.max(part.int_min, integer.length);
				let digits = "";
				for (let i = l; i > 0; i--) {
					let d = integer.charAt(integer.length - i);
					if (special_case_zero && !d) d = "0";
					const p = d ? "" : pt.charAt(pt.length - i) || pt[0];
					let sep = "";
					if (part.grouping) {
						const n = i - 1 - group_pri;
						if (n >= 0 && !(n % group_sec)) sep = d || p === "0" ? l10n.group : pad("?", opts.nbsp);
					}
					digits += (d || pad(p, opts.nbsp)) + sep;
				}
				ret.push(digits);
			} else counter.int += digitsStart(integer, part.int_p, tok.num, counter.int);
		} else if (tokenType === "FRAC") {
			const o = counter.frac;
			for (let i = 0; i < len; i++) ret.push(fraction[i + o] || pad(tok.num[i], opts.nbsp));
			counter.frac += len;
		} else if (tokenType === "MAN") {
			if (!counter.man) ret.push(mantissa_sign);
			counter.man += digitsStart(mantissa, part.man_p, tok.num, counter.man);
		} else if (tokenType === "NUM") counter.num += digitsStart(numerator, part.num_p, tok.num, counter.num);
		else if (tokenType === "DEN") {
			const o = counter.den;
			for (let i = 0; i < len; i++) {
				let digit = denominator[i + o];
				if (!digit) {
					const c = tok.num.charCodeAt(i);
					if (c > CHAR_0 && c <= CHAR_9 || denominator_fixed && c === CHAR_0) {
						denominator_fixed = true;
						digit = opts.nbsp ? "\xA0" : " ";
					} else if (!denominator_fixed && i === len - 1 && c === CHAR_0 && !denominator) digit = "1";
					else digit = pad(tok.num[i], opts.nbsp);
				}
				ret.push(digit);
			}
			counter.den += len;
		} else if (tokenType === "YEAR") {
			if (year < 0) ret.push(l10n.negative);
			ret.push(String(Math.abs(year)).padStart(4, "0"));
		} else if (tokenType === "YEAR-SHORT") {
			const y = year % 100;
			ret.push(y < 10 ? "0" : "", y);
		} else if (tokenType === "MONTH") ret.push(tok.pad && month < 10 ? "0" : "", month);
		else if (tokenType === "MONTHNAME-SINGLE") {
			if (part.date_system === 6) ret.push(l10n.mmmm6[month - 1].charAt(0));
			else ret.push(l10n.mmmm[month - 1].charAt(0));
		} else if (tokenType === "MONTHNAME-SHORT") {
			if (part.date_system === 6) ret.push(l10n.mmm6[month - 1]);
			else ret.push(l10n.mmm[month - 1]);
		} else if (tokenType === "MONTHNAME") {
			if (part.date_system === 6) ret.push(l10n.mmmm6[month - 1]);
			else ret.push(l10n.mmmm[month - 1]);
		} else if (tok.type === "WEEKDAY-SHORT") ret.push(l10n.ddd[weekday]);
		else if (tok.type === "CURRENCY") ret.push(tok.value);
		else if (tokenType === "WEEKDAY") ret.push(l10n.dddd[weekday]);
		else if (tokenType === "DAY") ret.push(tok.pad && day < 10 ? "0" : "", day);
		else if (tokenType === "HOUR") {
			const h = hour % part.clock || (part.clock < 24 ? part.clock : 0);
			ret.push(tok.pad && h < 10 ? "0" : "", h);
		} else if (tokenType === "MIN") ret.push(tok.pad && minute < 10 ? "0" : "", minute);
		else if (tokenType === "SEC") ret.push(tok.pad && second < 10 ? "0" : "", second);
		else if (tokenType === "SUBSEC") {
			ret.push(l10n.decimal);
			const f = subsec.toFixed(part.sec_decimals);
			ret.push(f.slice(2, 2 + tok.decimals));
		} else if (tokenType === "AMPM") {
			const idx = hour < 12 ? 0 : 1;
			if (tok.short && !l10n_) ret.push("AP"[idx]);
			else ret.push(l10n.ampm[idx]);
		} else if (tokenType === "HOUR-ELAP" && typeof value === "number") {
			if (value < 0) ret.push(l10n.negative);
			const hh = date * 24 + Math.floor(Math.abs(time) / 3600);
			ret.push(String(Math.abs(hh)).padStart(tok.pad, "0"));
		} else if (tokenType === "MIN-ELAP" && typeof value === "number") {
			if (value < 0) ret.push(l10n.negative);
			const mm = date * 1440 + Math.floor(Math.abs(time) / 60);
			ret.push(String(Math.abs(mm)).padStart(tok.pad, "0"));
		} else if (tokenType === "SEC-ELAP" && typeof value === "number") {
			if (value < 0) ret.push(l10n.negative);
			const ss = date * DAYSIZE + Math.abs(time);
			ret.push(String(Math.abs(ss)).padStart(tok.pad, "0"));
		} else if (tokenType === "B-YEAR") ret.push(year + 543);
		else if (tokenType === "B-YEAR-SHORT") {
			const y = (year + 543) % 100;
			ret.push(y < 10 ? "0" : "", y);
		}
	}
	return ret.join("");
}
//#endregion
//#region lib/formatNumber.ts
const default_text = parseFormatSection([{
	type: TOKEN_TEXT,
	value: "@",
	raw: "@"
}]);
function getPart(value, parts) {
	for (let pi = 0; pi < 3; pi++) {
		const part = parts[pi];
		if (part) {
			let cond = false;
			if (part.condition) {
				const operator = part.condition[0];
				const operand = part.condition[1];
				if (operator === "=") cond = value === operand;
				else if (operator === "<>") cond = value !== operand;
				else if (typeof value === "string") cond = false;
				else if (operator === ">") cond = value > operand;
				else if (operator === "<") cond = value < operand;
				else if (operator === ">=") cond = value >= operand;
				else if (operator === "<=") cond = value <= operand;
			} else cond = true;
			if (cond) return part;
		}
	}
}
function formatColor$1(value, parseData, opts) {
	const parts = parseData.partitions;
	let part = parts[3];
	let color;
	if ((typeof value === "number" || typeof value === "bigint") && Number.isFinite(value)) part = getPart(value, parts);
	if (part?.color) color = part.color;
	if (color && typeof color === "number" && opts.indexColors) color = indexColors[color - 1] || "#000";
	return color;
}
function formatValue(value, parseData, opts) {
	const parts = parseData.partitions;
	const l10n = getLocale(parseData.locale || opts.locale);
	const text_part = parts[3] ? parts[3] : default_text;
	if (typeof value === "boolean") value = (l10n || defaultLocale).bool[value ? 0 : 1];
	if (value == null) return "";
	const n = typeof value === "bigint";
	if (typeof value !== "number" && !n) return runPart(String(value), text_part, opts, l10n);
	if (!n && !Number.isFinite(value)) {
		const loc = l10n || defaultLocale;
		if (Number.isNaN(value)) return loc.nan;
		return (value < 0 ? loc.negative : "") + loc.infinity;
	}
	const v = value;
	let part = getPart(v, parts);
	if (part?.sysdate) part = prepareFormatterData(l10n?.sysdate ?? "dd mmmm yyyy", false).partitions[0];
	if (part?.systime) part = prepareFormatterData(l10n?.systime ?? "hh:mm:ss", false).partitions[0];
	return part ? runPart(v, part, opts, l10n) : opts.overflow;
}
//#endregion
//#region lib/formatInfo.ts
function isPercent(partitions) {
	return !!(partitions[0]?.percent || partitions[1]?.percent || partitions[2]?.percent || partitions[3]?.percent);
}
function isDate(partitions) {
	return !!(partitions[0]?.date || partitions[1]?.date || partitions[2]?.date || partitions[3]?.date);
}
function isText(partitions) {
	const [part1, part2, part3, part4] = partitions;
	return !!((!part1 || part1.generated) && (!part2 || part2.generated) && (!part3 || part3.generated) && part4?.text && !part4.generated);
}
const level = {
	text: 15,
	datetime: 10.8,
	date: 10.8,
	time: 10.8,
	percent: 10.6,
	currency: 10.4,
	grouped: 10.2,
	scientific: 6,
	number: 4,
	fraction: 2,
	general: 0,
	error: 0
};
const dateCodes = [
	["DMY", 1],
	["DM", 2],
	["MY", 3],
	["MDY", 4],
	["MD", 5],
	["hmsa", 6],
	["hma", 7],
	["hms", 8],
	["hm", 9]
];
function info(partitions) {
	const [partPos, partNeg] = partitions;
	const frac_max = partPos.frac_max;
	const output = {
		type: "general",
		isDate: isDate(partitions),
		isText: isText(partitions),
		isPercent: isPercent(partitions),
		maxDecimals: partPos.general ? 9 : frac_max,
		minDecimals: partPos.general ? 0 : partPos.frac_min,
		scale: partPos.scale ?? 1,
		color: 0,
		parentheses: 0,
		grouped: partPos.grouping ? 1 : 0,
		code: "",
		level: 0
	};
	const isCurrency = !output.isDate && !output.isText && !partPos.error && partPos.tokens.some((tok) => tok.type === "CURRENCY");
	let codeType = "G";
	let codeNum = frac_max >= 0 ? Math.min(15, frac_max) : 0;
	let codeParens = "";
	let codeDash = "";
	if (partNeg?.color) {
		codeDash = "-";
		output.color = 1;
	}
	if (partPos.parens) {
		codeParens = "()";
		output.parentheses = 1;
	}
	if (isCurrency) {
		codeType = "C";
		output.type = "currency";
	} else if (partPos.error) {
		output.type = "error";
		output.maxDecimals = 0;
	} else if (output.isDate) {
		let haveTime = 0;
		let haveDate = 0;
		let order = "";
		partPos.tokens.forEach((tok) => {
			const type = tok.type;
			if (type === "YEAR" || type === "YEAR-SHORT" || type === "B-YEAR" || type === "B-YEAR-SHORT") {
				order += "Y";
				haveDate++;
			} else if (type === "MONTH" || type === "MONTHNAME" || type === "MONTHNAME-SHORT" || type === "MONTHNAME-SINGLE") {
				order += "M";
				haveDate++;
			} else if (type === "WEEKDAY" || type === "WEEKDAY-SHORT" || type === "DAY") {
				order += "D";
				haveDate++;
			} else if (type === "HOUR") {
				order += "h";
				haveTime++;
			} else if (type === "MIN") {
				order += "m";
				haveTime++;
			} else if (type === "SEC") {
				order += "s";
				haveTime++;
			} else if (type === "AMPM") {
				order += "a";
				haveTime++;
			}
		});
		output.type = "date";
		if (haveDate && haveTime) output.type = "datetime";
		else if (!haveDate && haveTime) output.type = "time";
		const code = dateCodes.find((d) => order.startsWith(d[0]));
		codeType = code ? "D" : "G";
		codeNum = code ? code[1] : 0;
	} else if (output.isText) {
		codeType = "G";
		output.type = "text";
		output.maxDecimals = 0;
	} else if (partPos.general) {
		codeType = "G";
		output.type = "general";
	} else if (partPos.fractions) {
		codeType = "G";
		output.type = "fraction";
	} else if (partPos.exponential) {
		codeType = "S";
		output.type = "scientific";
	} else if (output.isPercent) {
		codeType = "P";
		output.type = "percent";
	} else if (partPos.grouping) {
		codeType = ",";
		output.type = "grouped";
	} else if (partPos.int_max || frac_max) {
		codeType = "F";
		output.type = "number";
	}
	output.code = codeType + (codeType === "G" ? "" : codeNum) + codeDash + codeParens;
	output.level = level[output.type];
	return output;
}
function dateInfo(partitions) {
	const [partPos] = partitions;
	return {
		year: !!(partPos.date & 2),
		month: !!(partPos.date & 4),
		day: !!(partPos.date & 8),
		hours: !!(partPos.date & 16),
		minutes: !!(partPos.date & 32),
		seconds: !!(partPos.date & 64),
		clockType: partPos.clock === 12 ? 12 : 24
	};
}
//#endregion
//#region lib/getFormatFromId.ts
function getFx(params, symbol) {
	if (!symbol) return ["", ""];
	const x = /[a-z.]/i.test(symbol) ? `"${symbol}"` : symbol;
	if (params.currencyPos === 1) return ["", x];
	else if (params.currencyPos === 2) return [x + " ", ""];
	else if (params.currencyPos === 3) return ["", " " + x];
	return [x, ""];
}
function getNum(params, color, frac, cur = "$") {
	const { sign, minus } = params;
	const red = color ? "[Red]" : "";
	const dec = frac ? ".00" : "";
	const c = getFx(params, cur);
	const s = sign ? ["", "-"] : ["-", ""];
	return !minus ? `${c[0]}#,##0${dec}${c[1]}_);${red}(${c[0]}#,##0${dec}${c[1]})` : `${c[0]}#,##0${dec}${c[1]};${red}${s[0]}${c[0]}${s[1]}#,##0${dec}${c[1]}`;
}
function getNum2(params, frac, cur = "$") {
	const { sign, minus } = params;
	const dec = frac ? ".00" : "";
	const c = getFx(params, cur);
	if (!minus) {
		if (sign) return `_ ${c[0]}* #,##0${dec}_)${c[1]}_ ;_ ${c[0]}* (#,##0${dec})${c[1]}_ ;_ ${c[0]}* "-"${frac ? "??" : ""}_)${c[1]}_ ;_ @_ `;
		return `_(${c[0]}* #,##0${dec}${c[1]}_);_(${c[0]}* (#,##0${dec}${c[1]});_(${c[0]}* "-"${frac ? "??" : ""}${c[1]}_);_(@_)`;
	}
	if (sign) return `_ ${c[0]}* #,##0${dec}${c[1]}_ ;_ ${c[0]}* -#,##0${dec}${c[1]}_ ;_ ${c[0]}* "-"${frac ? "??" : ""}${c[1]}_ ;_ @_ `;
	return `_-${c[0]}* #,##0${dec}${c[1]}_-;-${c[0]}* #,##0${dec}${c[1]}_-;_-${c[0]}* "-"${frac ? "??" : ""}${c[1]}_-;_-@_-`;
}
function getPer(params, frac) {
	return `0${frac ? ".00" : ""}${params.spacePercent ? " " : ""}%`;
}
function getDate(params) {
	const s = params.dateSep ?? "/";
	const d = params.padDd ? "dd" : "d";
	const m = params.padMm ? "mm" : "m";
	const y = params.shortYear ? "yy" : "yyyy";
	if (params.dateOrder === 2) return `${y}${s}${m}${s}${d}`;
	if (params.dateOrder === 1) return `${d}${s}${m}${s}${y}`;
	return `${m}${s}${d}${s}${y}`;
}
function getDate2(params, dx, yx) {
	return [
		dx ? params.padDd ? "dd" : "d" : "",
		dx ? params.shortDateSep ?? "-" : "",
		"mmm",
		yx ? (params.shortDateSep === ". " ? " " : params.shortDateSep) ?? "-" : "",
		yx ? "yy" : ""
	].filter(Boolean).join("");
}
function getTime(params, sec = false, ampm = false) {
	const am = ampm ? " AM/PM" : "";
	const s = params.timeSep ?? ":";
	return `${params.padHh ? "hh" : "h"}${s}mm${sec ? s + "ss" : ""}${am}`;
}
function getTime2(params, sec = false, ampm = false) {
	const am = ampm ? " AM/PM" : "";
	const s = params.timeSep ?? ":";
	return `${params.padHhAlt ? "hh" : "h"}${s}mm${sec ? s + "ss" : ""}${am}`;
}
/**
* Return the correct format for a given built-in ID in a locale.
*
* @param fmtId The format ID
* @param l10n The locale to use as either a BCP 47 string tag of the locale, an Excel locale code, or a locale data record.
* @returns The format pattern
*/
function getFormatFromId(fmtId, l10n) {
	if (typeof l10n === "string" || typeof l10n === "number") l10n = getLocale(l10n);
	const currency = l10n?.currency || "$";
	const params = l10n?.format || {};
	fmtId = fmtId > 0 ? 1 + (fmtId - 1) % 58 : 0;
	switch (fmtId) {
		case 0: return "General";
		case 1: return "0";
		case 2: return "0.00";
		case 3: return "#,##0";
		case 4: return "#,##0.00";
		case 5: return getNum(params, false, false, currency);
		case 6: return getNum(params, true, false, currency);
		case 7: return getNum(params, false, true, currency);
		case 8: return getNum(params, true, true, currency);
		case 9: return getPer(params, false);
		case 10: return getPer(params, true);
		case 11: return "0.00E+00";
		case 12: return "# ?/?";
		case 13: return "# ??/??";
		case 14: return getDate(params);
		case 15: return getDate2(params, true, true);
		case 16: return getDate2(params, true, false);
		case 17: return getDate2(params, false, true);
		case 18: return getTime2(params, false, true);
		case 19: return getTime2(params, true, true);
		case 20: return getTime(params);
		case 21: return getTime(params, true);
		case 22: return getDate(params) + " " + getTime(params);
		case 27:
		case 28:
		case 29:
		case 30:
		case 31: return getDate(params);
		case 32:
		case 33:
		case 34:
		case 35: return getTime(params, true);
		case 36: return getDate(params);
		case 37: return getNum(params, false, false, "");
		case 38: return getNum(params, true, false, "");
		case 39: return getNum(params, false, true, "");
		case 40: return getNum(params, true, true, "");
		case 41: return getNum2(params, false, "");
		case 42: return getNum2(params, false, currency);
		case 43: return getNum2(params, true, "");
		case 44: return getNum2(params, true, currency);
		case 45: return `mm${params.timeSep ?? ":"}ss`;
		case 46: return `[h]${params.timeSep ?? ":"}mm${params.timeSep ?? ":"}ss`;
		case 47: return `mm${params.timeSep ?? ":"}ss.0`;
		case 48: return "##0.0E+0";
		case 49: return "@";
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58: return getDate(params);
	}
	return "General";
}
//#endregion
//#region lib/index.ts
/**
* Formats a value as a string and returns the result.
*
* - Dates are normalized to spreadsheet style serial dates and then formatted.
* - Booleans are emitted as uppercase `TRUE` or `FALSE` by default, but will
*   be subject to locale (see {@link LocaleData}).
* - `null` and `undefined` will return an empty string `""`.
* - Any non number values will be stringified and passed through the text section of the format pattern.
* - `NaN`s and `Infinite`s will use the corresponding strings from the active locale.
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @param value - The value to format.
* @param [options={}]  Formatter options

* @returns A formatted value
*/
function format(pattern, value, options = {}) {
	const opts = Object.assign({}, defaultOptions, options);
	const data = prepareFormatterData(pattern, opts.throws);
	return formatValue(dateToSerial(value, opts) ?? value, data, opts);
}
/**
* Find the color appropriate to a value as dictated by a format pattern.
*
* If the pattern defines colors, this function will emit the color appropriate
* to the value. If no colors were specified this function returns `undefined`.
*
* ```js
* const color = formatColor("[green]#,##0;[red]-#,##0", -10);
* console.log(color); // "red"
* const color = formatColor("[green]#,##0;-#,##0", -10);
* console.log(color); // undefined
* ```
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @param value - The value to format.
* @param [options={}] Formatter options
* @param [options.throws=true]
*    Should the formatter throw an error if a provided pattern is invalid.
*    If false, a formatter will be constructed which instead outputs an error
*    string (see _invalid_ in {@link FormatOptions}).
*    `true` by default.
* @param [options.ignoreTimezone=false]
*    Normally when date objects are used with the formatter, time zone is taken
*    into account. This makes the formatter ignore the timezone offset.
*    `false` by default.
* @param [options.indexColors=true]
*    When indexed color modifiers are used (`[Color 1]`) the formatter will
*    convert the index into the corresponding hex color of the default palette.
*    When this option is set to false, the number will instead by emitted
*    allowing you to index against a custom palette.
*    `true` by default.
* @returns
*    A string color value as described by the pattern or a number if the
*    indexColors option has been set to false.
*/
function formatColor(pattern, value, options) {
	const opts = Object.assign({}, defaultOptions, options);
	const data = prepareFormatterData(pattern, opts.throws);
	return formatColor$1(dateToSerial(value, opts) ?? value, data, opts);
}
/**
* Determine if a given format pattern is a date pattern.
*
* The pattern is considered a date pattern if any of its sections (`"a;b;c;d"`)
* contains a date operator (such as `Y` or `H`). Each section is restricted to be
* _either_ a number or date format.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is a date pattern, False otherwise.
*/
function isDateFormat(pattern) {
	return isDate(prepareFormatterData(pattern, false).partitions);
}
/**
* Determine if a given format pattern is a percentage pattern.
*
* The pattern is considered a percentage pattern if any of its sections (`"a;b;c;d"`)
* contains an unescaped percentage symbol.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is a percent pattern, False otherwise.
*/
function isPercentFormat(pattern) {
	return isPercent(prepareFormatterData(pattern, false).partitions);
}
/**
* Determine if a given format pattern is a text only pattern.
*
* The pattern is considered text only if its definition is composed of a single
* section that includes that text symbol (`@`).
*
* For example `@` or `@" USD"` are text patterns but `#;@` is not.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is a text pattern, False otherwise.
*/
function isTextFormat(pattern) {
	return isText(prepareFormatterData(pattern, false).partitions);
}
/**
* Determine if a given format pattern is valid.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is valid, False otherwise.
*/
function isValidFormat(pattern) {
	try {
		prepareFormatterData(pattern, true);
		return true;
	} catch (err) {
		return false;
	}
}
/**
* Returns an object detailing the properties and internals of a format parsed
* format pattern.
*
* Note that output will always be a format info, even in the case where the
* format pattern is invalid and would cause the formatter to throw.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @returns An object of format properties.
*/
function getFormatInfo(pattern) {
	const data = prepareFormatterData(pattern, false);
	if (!data.info) data.info = info(data.partitions);
	return data.info;
}
/**
* Gets information about how date codes are used in a format string.
*
* Note that output will always be a format info, even in the case where the
* format pattern is invalid and would cause the formatter to throw.
*
* @param pattern A format pattern in the ECMA-376 number format.
* @returns An object of format date properties.
*/
function getFormatDateInfo(pattern) {
	const data = prepareFormatterData(pattern, false);
	if (!data.dateInfo) data.dateInfo = dateInfo(data.partitions);
	return data.dateInfo;
}
//#endregion
exports.TOKEN_AMPM = TOKEN_AMPM;
exports.TOKEN_BREAK = TOKEN_BREAK;
exports.TOKEN_CALENDAR = TOKEN_CALENDAR;
exports.TOKEN_CHAR = TOKEN_CHAR;
exports.TOKEN_COLOR = TOKEN_COLOR;
exports.TOKEN_COMMA = TOKEN_COMMA;
exports.TOKEN_CONDITION = TOKEN_CONDITION;
exports.TOKEN_CURRENCY = TOKEN_CURRENCY;
exports.TOKEN_DATETIME = TOKEN_DATETIME;
exports.TOKEN_DBNUM = TOKEN_DBNUM;
exports.TOKEN_DIGIT = TOKEN_DIGIT;
exports.TOKEN_DURATION = TOKEN_DURATION;
exports.TOKEN_ERROR = TOKEN_ERROR;
exports.TOKEN_ESCAPED = TOKEN_ESCAPED;
exports.TOKEN_EXP = TOKEN_EXP;
exports.TOKEN_FILL = TOKEN_FILL;
exports.TOKEN_GENERAL = TOKEN_GENERAL;
exports.TOKEN_GROUP = TOKEN_GROUP;
exports.TOKEN_HASH = TOKEN_HASH;
exports.TOKEN_LOCALE = TOKEN_LOCALE;
exports.TOKEN_MINUS = TOKEN_MINUS;
exports.TOKEN_MODIFIER = TOKEN_MODIFIER;
exports.TOKEN_NATNUM = TOKEN_NATNUM;
exports.TOKEN_PAREN = TOKEN_PAREN;
exports.TOKEN_PERCENT = TOKEN_PERCENT;
exports.TOKEN_PLUS = TOKEN_PLUS;
exports.TOKEN_POINT = TOKEN_POINT;
exports.TOKEN_QMARK = TOKEN_QMARK;
exports.TOKEN_SCALE = TOKEN_SCALE;
exports.TOKEN_SKIP = TOKEN_SKIP;
exports.TOKEN_SLASH = TOKEN_SLASH;
exports.TOKEN_SPACE = TOKEN_SPACE;
exports.TOKEN_STRING = TOKEN_STRING;
exports.TOKEN_TEXT = TOKEN_TEXT;
exports.TOKEN_ZERO = TOKEN_ZERO;
exports.addLocale = addLocale;
exports.dateFromSerial = dateFromSerial;
exports.dateToSerial = dateToSerial;
exports.dec2frac = dec2frac;
exports.delocalize = delocalize;
exports.format = format;
exports.formatColor = formatColor;
exports.getFormatDateInfo = getFormatDateInfo;
exports.getFormatFromId = getFormatFromId;
exports.getFormatInfo = getFormatInfo;
exports.getLocale = getLocale;
exports.isDateFormat = isDateFormat;
exports.isPercentFormat = isPercentFormat;
exports.isTextFormat = isTextFormat;
exports.isValidFormat = isValidFormat;
exports.listLocales = listLocales;
exports.parseBool = parseBool;
exports.parseDate = parseDate;
exports.parseLocale = parseLocale;
exports.parseNumber = parseNumber;
exports.parseTime = parseTime;
exports.parseValue = parseValue;
exports.round = round;
exports.tokenize = tokenize;

//# sourceMappingURL=index.js.map