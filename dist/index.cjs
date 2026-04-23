Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const TOKEN_GENERAL = "general";
const TOKEN_HASH = "hash";
const TOKEN_ZERO = "zero";
const TOKEN_QMARK = "qmark";
const TOKEN_SLASH = "slash";
const TOKEN_GROUP = "group";
const TOKEN_SCALE = "scale";
const TOKEN_COMMA = "comma";
const TOKEN_BREAK = "break";
const TOKEN_TEXT = "text";
const TOKEN_PLUS = "plus";
const TOKEN_MINUS = "minus";
const TOKEN_POINT = "point";
const TOKEN_SPACE = "space";
const TOKEN_PERCENT = "percent";
const TOKEN_DIGIT = "digit";
const TOKEN_CALENDAR = "calendar";
const TOKEN_ERROR = "error";
const TOKEN_DATETIME = "datetime";
const TOKEN_DURATION = "duration";
const TOKEN_CONDITION = "condition";
const TOKEN_DBNUM = "dbnum";
const TOKEN_NATNUM = "natnum";
const TOKEN_LOCALE = "locale";
const TOKEN_COLOR = "color";
const TOKEN_MODIFIER = "modifier";
const TOKEN_AMPM = "ampm";
const TOKEN_ESCAPED = "escaped";
const TOKEN_STRING = "string";
const TOKEN_SKIP = "skip";
const TOKEN_FILL = "fill";
const TOKEN_PAREN = "paren";
const TOKEN_CHAR = "char";
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
const reCurrencySymbols = new RegExp("[" + currencySymbols.join("") + "]");
//#endregion
//#region lib/codeToLocale.ts
var codeToLocale_default = Object.freeze({
	1078: "af",
	1052: "sq",
	1118: "am",
	5121: "ar_DZ",
	15361: "ar_BH",
	3073: "ar_EG",
	2049: "ar_IQ",
	11265: "ar_JO",
	13313: "ar_KW",
	12289: "ar_LB",
	4097: "ar_LY",
	6145: "ar_MA",
	8193: "ar_OM",
	16385: "ar_QA",
	1025: "ar_SA",
	10241: "ar_SY",
	7169: "ar_TN",
	14337: "ar_AE",
	9217: "ar_YE",
	1067: "hy",
	1101: "as",
	2092: "az_AZ",
	1068: "az_AZ",
	1069: "eu",
	1059: "be",
	2117: "bn",
	1093: "bn_IN",
	5146: "bs",
	1026: "bg",
	1109: "my",
	1027: "ca",
	2052: "zh_CN",
	3076: "zh_HK",
	5124: "zh_MO",
	4100: "zh_SG",
	1028: "zh_TW",
	1050: "hr",
	1029: "cs",
	1030: "da",
	1125: "dv",
	2067: "nl_BE",
	1043: "nl_NL",
	1126: "bin",
	3081: "en_AU",
	10249: "en_BZ",
	4105: "en_CA",
	9225: "en_CB",
	2057: "en_GB",
	16393: "en_IN",
	6153: "en_IE",
	8201: "en_JM",
	5129: "en_NZ",
	13321: "en_PH",
	7177: "en_ZA",
	11273: "en_TT",
	1033: "en_US",
	12297: "en_ZW",
	1061: "et",
	1071: "mk",
	1080: "fo",
	1065: "fa",
	1124: "fil",
	1035: "fi",
	2060: "fr_BE",
	11276: "fr_CM",
	3084: "fr_CA",
	9228: "fr_CG",
	12300: "fr_CI",
	1036: "fr_FR",
	5132: "fr_LU",
	13324: "fr_ML",
	6156: "fr_MC",
	14348: "fr_MA",
	10252: "fr_SN",
	4108: "fr_CH",
	7180: "fr",
	1122: "fy_NL",
	2108: "gd_IE",
	1084: "gd",
	1110: "gl",
	1079: "ka",
	3079: "de_AT",
	1031: "de_DE",
	5127: "de_LI",
	4103: "de_LU",
	2055: "de_CH",
	1032: "el",
	1140: "gn",
	1095: "gu",
	1279: "en",
	1037: "he",
	1081: "hi",
	1038: "hu",
	1039: "is",
	1136: "ig_NG",
	1057: "id",
	1040: "it_IT",
	2064: "it_CH",
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
	2110: "ms_BN",
	1086: "ms_MY",
	1100: "ml",
	1082: "mt",
	1112: "mni",
	1153: "mi",
	1102: "mr",
	1104: "mn",
	2128: "mn",
	1121: "ne",
	1044: "no_NO",
	2068: "no_NO",
	1096: "or",
	1045: "pl",
	1046: "pt_BR",
	2070: "pt_PT",
	1094: "pa",
	1047: "rm",
	2072: "ro_MO",
	1048: "ro_RO",
	1049: "ru",
	2073: "ru_MO",
	1083: "se",
	1103: "sa",
	3098: "sr_SP",
	2074: "sr_SP",
	1072: "st",
	1074: "tn",
	1113: "sd",
	1115: "si",
	1051: "sk",
	1060: "sl",
	1143: "so",
	1070: "sb",
	11274: "es_AR",
	16394: "es_BO",
	13322: "es_CL",
	9226: "es_CO",
	5130: "es_CR",
	7178: "es_DO",
	12298: "es_EC",
	17418: "es_SV",
	4106: "es_GT",
	18442: "es_HN",
	2058: "es_MX",
	19466: "es_NI",
	6154: "es_PA",
	15370: "es_PY",
	10250: "es_PE",
	20490: "es_PR",
	1034: "es_ES",
	14346: "es_UY",
	8202: "es_VE",
	1089: "sw",
	2077: "sv_FI",
	1053: "sv_SE",
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
	2115: "uz_UZ",
	1091: "uz_UZ",
	1075: "ve",
	1066: "vi",
	1106: "cy",
	1076: "xh",
	1085: "yi",
	1077: "zu"
});
//#endregion
//#region lib/locale.ts
const re_locale = /^([a-z\d]+)(?:[_-]([a-z\d]+))?(?:\.([a-z\d]+))?(?:@([a-z\d]+))?$/i;
const locales = {};
/**
* Split a semicolon delimited string and replace instances of characters
* @ignore
* @param str Semicolon delimited string
* @param [tilde=''] String to be inserted on every instance of ~
* @returns Array of strings
*/
const _ = (str, tilde = "") => str.replace(/~/g, tilde).split(";");
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
* @ignore
* @param o Locale object
* @param [ml=0] Month list rule
* @param [dl=0] Day list rule
* @returns The same input object, but with ddd and mmm filled in.
*/
function xm(o, ml = 0, dl = 0) {
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
}
const baseLocaleData = {
	group: "\xA0",
	decimal: ".",
	positive: "+",
	negative: "-",
	percent: "%",
	exponent: "E",
	nan: "NaN",
	infinity: "∞",
	ampm: _("AM;PM"),
	mmmm6: _("Muharram;Safar;Rabiʻ I;Rabiʻ II;Jumada I;Jumada II;Rajab;Shaʻban;Ramadan;Shawwal;Dhuʻl-Qiʻdah;Dhuʻl-Hijjah"),
	mmm6: _("Muh.;Saf.;Rab. I;Rab. II;Jum. I;Jum. II;Raj.;Sha.;Ram.;Shaw.;Dhuʻl-Q.;Dhuʻl-H."),
	mmmm: _("January;February;March;April;May;June;July;August;September;October;November;December"),
	mmm: _("Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec"),
	dddd: _("Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday"),
	ddd: _("Sun;Mon;Tue;Wed;Thu;Fri;Sat"),
	bool: _("TRUE;FALSE"),
	preferMDY: false
};
/**
* Parse a regular IETF BCP 47 locale tag and emit an object of its parts.
* Irregular tags and subtags are not supported.
*
* @param locale - A BCP 47 string tag of the locale.
* @returns - An object describing the locale.
*/
function parseLocale(locale) {
	const lm = re_locale.exec(locale);
	if (!lm) throw new SyntaxError(`Malformed locale: ${locale}`);
	return {
		lang: lm[1] + (lm[2] ? "_" + lm[2] : ""),
		language: lm[1],
		territory: lm[2] || ""
	};
}
function resolveLocale(l4e) {
	if (typeof l4e === "number") return codeToLocale_default[l4e & 65535] || null;
	const wincode = parseInt(l4e, 16);
	if (isFinite(wincode) && codeToLocale_default[wincode & 65535]) return codeToLocale_default[wincode & 65535] || null;
	if (re_locale.test(l4e)) return l4e;
	return null;
}
/**
* Used by the formatter to pull a locate from its registered locales. If
* subtag isn't available but the base language is, the base language is used.
* So if `en-CA` is not found, the formatter tries to find `en` else it
* returns a `null`.
*
* @param locale - A BCP 47 string tag of the locale, or an Excel locale code.
* @returns - An object of format date properties.
*/
function getLocale(locale) {
	const tag = resolveLocale(locale);
	let obj = null;
	if (tag) {
		const c = parseLocale(tag);
		obj = locales[c.lang] || locales[c.language] || null;
	}
	return obj;
}
function createLocale(data) {
	return Object.assign({}, baseLocaleData, data);
}
/**
* Register {@link LocaleData} for a language so for use when formatting.
*
* Any partial set of properties may be returned to have the defaults used where properties are missing.
*
* @param localeSettings - A collection of settings for a locale.
* @param [localeSettings.group="\u00a0"]
*    Symbol used as a grouping separator (`1,000,000` uses `,`)
* @param [localeSettings.decimal="."]
*    Symbol used to separate integers from fractions (usually `.`)
* @param [localeSettings.positive="+"]
*    Symbol used to indicate positive numbers (usually `+`)
* @param [localeSettings.negative="-"]
*    Symbol used to indicate positive numbers (usually `-`)
* @param [localeSettings.percent="%"]
*    Symbol used to indicate a percentage (usually `%`)
* @param [localeSettings.exponent="E"]
*    Symbol used to indicate an exponent (usually `E`)
* @param [localeSettings.nan="NaN"]
*    Symbol used to indicate NaN values (`NaN`)
* @param [localeSettings.infinity="∞"]
*    Symbol used to indicate infinite values (`∞`)
* @param [localeSettings.ampm=["AM","PM"]]
*    How AM and PM should be presented.
* @param [localeSettings.mmmm6=["Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah"]]
*    Long month names for the Islamic calendar (e.g. `Rajab`)
* @param [localeSettings.mmm6=["Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H."]]
*    Short month names for the Islamic calendar (e.g. `Raj.`)
* @param [localeSettings.mmmm=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]]
*    Long month names for the Gregorian calendar (e.g. `November`)
* @param [localeSettings.mmm=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]]
*    Short month names for the Gregorian calendar (e.g. `Nov`)
* @param [localeSettings.dddd=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]]
*    Long day names (e.g. `Wednesday`)
* @param [localeSettings.ddd=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]]
*    Shortened day names (e.g. `Wed`)
* @param [localeSettings.bool=["TRUE", "FALSE"]]
*    How TRUE and FALSE should be presented.
* @param [localeSettings.preferMDY=false]
*    Is the prefered date format month first (12/31/2025) or day first (31/12/2025)
* @param l4e - A string BCP 47 tag of the locale.
* @returns {LocaleData} - A full collection of settings for a locale
*/
function addLocale(localeSettings, l4e) {
	const c = typeof l4e === "object" ? l4e : parseLocale(l4e);
	locales[c.lang] = createLocale(localeSettings);
	if (c.language !== c.lang && !locales[c.language]) locales[c.language] = createLocale(localeSettings);
	return locales[c.lang];
}
const defaultLocale = createLocale({
	group: ",",
	preferMDY: true
});
addLocale({
	group: ",",
	ampm: _("上午;下午"),
	mmmm: _("一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月"),
	mmm: _("1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月"),
	dddd: _("~日;~一;~二;~三;~四;~五;~六", "星期"),
	ddd: _("周日;周一;周二;周三;周四;周五;周六")
}, "zh_CN");
const _zh = {
	group: ",",
	ampm: _("上午;下午"),
	mmmm: _("1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月"),
	mmm: _("1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月"),
	dddd: _("~日;~一;~二;~三;~四;~五;~六", "星期"),
	ddd: _("周日;周一;周二;周三;周四;周五;周六")
};
addLocale({
	..._zh,
	nan: "非數值",
	dddd: _("~日;~一;~二;~三;~四;~五;~六", "星期")
}, "zh_TW");
addLocale({
	..._zh,
	dddd: _("~日;~一;~二;~三;~四;~五;~六", "星期")
}, "zh_HK");
addLocale({
	..._zh,
	ampm: _("午前;午後"),
	dddd: _("日~;月~;火~;水~;木~;金~;土~", "曜日"),
	ddd: _("日;月;火;水;木;金;土")
}, "ja");
addLocale({
	group: ",",
	ampm: _("오전;오후"),
	mmmm: _("1월;2월;3월;4월;5월;6월;7월;8월;9월;10월;11월;12월"),
	mmm: _("1월;2월;3월;4월;5월;6월;7월;8월;9월;10월;11월;12월"),
	dddd: _("일요일;월요일;화요일;수요일;목요일;금요일;토요일"),
	ddd: _("일;월;화;수;목;금;토")
}, "ko");
addLocale({
	group: ",",
	ampm: _("ก่อนเที่ยง;หลังเที่ยง"),
	mmmm: _("มกร~;กุมภาพันธ์;มีน~;เมษายน;พฤษภ~;มิถุนายน;กรกฎ~;สิงห~;กันยายน;ตุล~;พฤศจิกายน;ธันว~", "าคม"),
	mmm: _("ม.ค.;ก.พ.;มี.ค.;เม.ย.;พ.ค.;มิ.ย.;ก.ค.;ส.ค.;ก.ย.;ต.ค.;พ.ย.;ธ.ค."),
	dddd: _("วันอาทิตย์;วันจันทร์;วันอังคาร;วันพุธ;วันพฤหัสบดี;วันศุกร์;วันเสาร์"),
	ddd: _("อา.;จ.;อ.;พ.;พฤ.;ศ.;ส.")
}, "th");
addLocale(xm({
	decimal: ",",
	ampm: _("dop.;odp."),
	mmmm: _("ledna;února;března;dubna;května;června;července;srpna;září;října;listopadu;prosince"),
	mmm: _("I;II;III;IV;V;VI;VII;VIII;IX;X;XI;XII"),
	dddd: _("neděle;pondělí;úterý;středa;čtvrtek;pátek;sobota"),
	bool: _("PRAVDA;NEPRAVDA")
}, -1, 2), "cs");
addLocale(xm({
	group: ".",
	decimal: ",",
	mmmm: _("januar;februar;marts;april;maj;juni;juli;august;september;oktober;november;december"),
	dddd: _("søn~;man~;tirs~;ons~;tors~;fre~;lør~", "dag"),
	bool: _("SAND;FALSK")
}, 13, 13), "da");
addLocale(xm({
	group: ".",
	decimal: ",",
	ampm: _("a.m.;p.m."),
	mmmm: _("januari;februari;maart;april;mei;juni;juli;augustus;september;oktober;november;december"),
	mmm: _("jan.;feb.;mrt.;apr.;mei;jun.;jul.;aug.;sep.;okt.;nov.;dec."),
	dddd: _("zondag;maandag;dinsdag;woensdag;donderdag;vrijdag;zaterdag"),
	bool: _("WAAR;ONWAAR")
}, -1, 2), "nl");
addLocale({
	group: ",",
	preferMDY: true
}, "en");
addLocale({
	group: ",",
	preferMDY: true
}, "en_US");
addLocale({ group: "," }, "en_AU");
addLocale({ group: "," }, "en_CA");
addLocale({ group: "," }, "en_GB");
addLocale({
	group: ",",
	mmm: _("Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sept;Oct;Nov;Dec")
}, "en_IE");
addLocale(xm({
	decimal: ",",
	nan: "epäluku",
	ampm: _("ap.;ip."),
	mmmm: _("tammi~;helmi~;maalis~;huhti~;touko~;kesä~;heinä~;elo~;syys~;loka~;marras~;joulu~", "kuuta"),
	mmm: _("tammik.;helmik.;maalisk.;huhtik.;toukok.;kesäk.;heinäk.;elok.;syysk.;lokak.;marrask.;jouluk."),
	dddd: _("sunnun~;maanan~;tiis~;keskiviikkona;tors~;perjan~;lauan~", "taina"),
	bool: _("TOSI;EPÄTOSI")
}, -1, 2), "fi");
const _fr = xm({
	group: " ",
	decimal: ",",
	mmmm: _("janvier;février;mars;avril;mai;juin;juillet;août;septembre;octobre;novembre;décembre"),
	mmm: _("janv.;févr.;mars;avr.;mai;juin;juil.;août;sept.;oct.;nov.;déc."),
	dddd: _("~manche;lun~;mar~;mercre~;jeu~;vendre~;same~", "di"),
	bool: _("VRAI;FAUX")
}, -1, 13);
addLocale({ ..._fr }, "fr");
addLocale({
	..._fr,
	mmm: _("janv.;févr.;mars;avr.;mai;juin;juill.;août;sept.;oct.;nov.;déc.")
}, "fr_CA");
addLocale({
	group: "'",
	decimal: ".",
	..._fr
}, "fr_CH");
const _de = xm({
	mmmm: _("Januar;Februar;März;April;Mai;Juni;Juli;August;September;Oktober;November;Dezember"),
	mmm: _("Jan.;Feb.;März;Apr.;Mai;Juni;Juli;Aug.;Sept.;Okt.;Nov.;Dez."),
	dddd: _("Sonn~;Mon~;Diens~;Mittwoch;Donners~;Frei~;Sams~", "tag"),
	bool: _("WAHR;FALSCH")
}, -1, 12);
addLocale({
	group: ".",
	decimal: ",",
	..._de
}, "de");
addLocale({
	group: "'",
	decimal: ".",
	..._de
}, "de_CH");
addLocale(xm({
	group: ".",
	decimal: ",",
	ampm: _("π.μ.;μ.μ."),
	mmmm: _("Ιανουαρ~;Φεβρουαρ~;Μαρτ~;Απριλ~;Μαΐου;Ιουν~;Ιουλ~;Αυγούστου;Σεπτεμβρ~;Οκτωβρ~;Νοεμβρ~;Δεκεμβρ~", "ίου"),
	mmm: _("Ιαν;Φεβ;Μαρ;Απρ;Μαΐ;Ιουν;Ιουλ;Αυγ;Σεπ;Οκτ;Νοε;Δεκ"),
	dddd: _("Κυριακή;Δευτέρα;Τρίτη;Τετάρτη;Πέμπτη;Παρασκευή;Σάββατο")
}, -1, 3), "el");
addLocale({
	decimal: ",",
	ampm: _("de.;du."),
	mmmm: _("január;február;március;április;május;június;július;augusztus;szeptember;október;november;december"),
	mmm: _("jan.;febr.;márc.;ápr.;máj.;jún.;júl.;aug.;szept.;okt.;nov.;dec."),
	dddd: _("vasárnap;hétfő;kedd;szerda;csütörtök;péntek;szombat"),
	ddd: _("V;H;K;Sze;Cs;P;Szo"),
	bool: _("IGAZ;HAMIS")
}, "hu");
addLocale(xm({
	group: ".",
	decimal: ",",
	ampm: _("f.h.;e.h."),
	mmmm: _("janúar;febrúar;mars;apríl;maí;júní;júlí;ágúst;september;október;nóvember;desember"),
	dddd: _("sunnu~;mánu~;þriðju~;miðviku~;fimmtu~;föstu~;laugar~", "dagur")
}, 13, 13), "is");
addLocale(xm({
	group: ".",
	decimal: ",",
	mmmm: _("Januari;Februari;Maret;April;Mei;Juni;Juli;Agustus;September;Oktober;November;Desember"),
	dddd: _("Minggu;Senin;Selasa;Rabu;Kamis;Jumat;Sabtu")
}, 3, 3), "id");
const _it = xm({
	mmmm: _("gennaio;febbraio;marzo;aprile;maggio;giugno;luglio;agosto;settembre;ottobre;novembre;dicembre"),
	dddd: _("domenica;lunedì;martedì;mercoledì;giovedì;venerdì;sabato"),
	bool: _("VERO;FALSO")
}, 3, 3);
addLocale({
	group: ".",
	decimal: ",",
	..._it
}, "it");
addLocale({
	group: "'",
	decimal: ".",
	..._it
}, "it_CH");
const _no = {
	decimal: ",",
	ampm: _("a.m.;p.m."),
	mmmm: _("januar;februar;mars;april;mai;juni;juli;august;september;oktober;november;desember"),
	mmm: _("jan.;feb.;mar.;apr.;mai;jun.;jul.;aug.;sep.;okt.;nov.;des."),
	dddd: _("søn~;man~;tirs~;ons~;tors~;fre~;lør~", "dag"),
	bool: _("SANN;USANN")
};
addLocale(xm({ ..._no }, -1, 13), "nb");
addLocale(xm({ ..._no }, -1, 13), "no");
addLocale(xm({
	decimal: ",",
	mmmm: _("stycznia;lutego;marca;kwietnia;maja;czerwca;lipca;sierpnia;września;października;listopada;grudnia"),
	dddd: _("niedziela;poniedziałek;wtorek;środa;czwartek;piątek;sobota"),
	ddd: _("niedz.;pon.;wt.;śr.;czw.;pt.;sob."),
	bool: _("PRAWDA;FAŁSZ")
}, 3, -1), "pl");
const _pt = {
	group: ".",
	decimal: ",",
	mmmm: _("janeiro;fevereiro;março;abril;maio;junho;julho;agosto;setembro;outubro;novembro;dezembro"),
	dddd: _("domingo;segunda-feira;terça-feira;quarta-feira;quinta-feira;sexta-feira;sábado"),
	bool: _("VERDADEIRO;FALSO")
};
addLocale(xm(_pt, 13, 13), "pt");
addLocale(xm(_pt, 13, 13), "pt_BR");
addLocale({
	decimal: ",",
	nan: "не\xA0число",
	mmmm: _("января;февраля;марта;апреля;мая;июня;июля;августа;сентября;октября;ноября;декабря"),
	mmm: _("янв.;февр.;мар.;апр.;мая;июн.;июл.;авг.;сент.;окт.;нояб.;дек."),
	dddd: _("воскресенье;понедельник;вторник;среда;четверг;пятница;суббота"),
	ddd: _("вс;пн;вт;ср;чт;пт;сб"),
	mmmm6: _("рамадан;шавваль;зуль-каада;зуль-хиджжа;мухаррам;раби-уль-авваль;раби-уль-ахир;джумад-уль-авваль;джумад-уль-ахир;раджаб;шаабан;рамадан"),
	mmm6: _("рам.;шав.;зуль-к.;зуль-х.;мух.;раб. I;раб. II;джум. I;джум. II;радж.;шааб.;рам."),
	bool: _("ИСТИНА;ЛОЖЬ")
}, "ru");
addLocale(xm({
	decimal: ",",
	mmmm: _("januára;februára;marca;apríla;mája;júna;júla;augusta;septembra;októbra;novembra;decembra"),
	dddd: _("nedeľa;pondelok;utorok;streda;štvrtok;piatok;sobota")
}, 3, 2), "sk");
const _es = {
	group: ".",
	decimal: ",",
	ampm: _("a.\xA0m.;p.\xA0m."),
	mmmm: _("enero;febrero;marzo;abril;mayo;junio;julio;agosto;septiem~;octu~;noviem~;diciem~", "bre"),
	mmm: _("ene;feb;mar;abr;may;jun;jul;ago;sept;oct;nov;dic"),
	dddd: _("domingo;lunes;martes;miércoles;jueves;viernes;sábado"),
	ddd: _("dom;lun;mar;mié;jue;vie;sáb"),
	bool: _("VERDADERO;FALSO")
};
const _esM3 = _("ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic");
const _esM13 = _("ene.;feb.;mar.;abr.;may.;jun.;jul.;ago.;sept.;oct.;nov.;dic.");
addLocale({ ..._es }, "es");
addLocale({ ..._es }, "es_AR");
addLocale({ ..._es }, "es_BO");
addLocale({ ..._es }, "es_CL");
addLocale({ ..._es }, "es_CO");
addLocale({ ..._es }, "es_EC");
addLocale({
	..._es,
	mmm: _esM3,
	ampm: _("a.m.;p.m.")
}, "es_MX");
addLocale({
	..._es,
	mmm: _esM13
}, "es_PY");
addLocale({
	..._es,
	mmm: _esM13
}, "es_UY");
addLocale({
	..._es,
	mmm: _esM13,
	mmmm: _("enero;febrero;marzo;abril;mayo;junio;julio;agosto;setiembre;octubre;noviembre;diciembre")
}, "es_VE");
addLocale({
	decimal: ",",
	ampm: _("fm;em"),
	mmmm: _("januari;februari;mars;april;maj;juni;juli;augusti;september;oktober;november;december"),
	mmm: _("jan.;feb.;mars;apr.;maj;juni;juli;aug.;sep.;okt.;nov.;dec."),
	dddd: _("sön~;mån~;tis~;ons~;tors~;fre~;lör~", "dag"),
	ddd: _("sön;mån;tis;ons;tors;fre;lör")
}, "sv");
addLocale(xm({
	group: ".",
	decimal: ",",
	ampm: _("ÖÖ;ÖS"),
	mmmm: _("Ocak;Şubat;Mart;Nisan;Mayıs;Haziran;Temmuz;Ağustos;Eylül;Ekim;Kasım;Aralık"),
	mmm: _("Oca;Şub;Mar;Nis;May;Haz;Tem;Ağu;Eyl;Eki;Kas;Ara"),
	dddd: _("Pazar;Pazartesi;Salı;Çarşamba;Perşembe;Cuma;Cumartesi"),
	ddd: _("Paz;Pzt;Sal;Çar;Per;Cum;Cmt"),
	bool: _("DOĞRU;YANLIŞ")
}, 3, -1), "tr");
addLocale({
	group: ",",
	ampm: _("yb;yh"),
	mmmm: _("Ionawr;Chwefror;Mawrth;Ebrill;Mai;Mehefin;Gorffennaf;Awst;Medi;Hydref;Tachwedd;Rhagfyr"),
	mmm: _("Ion;Chwef;Maw;Ebr;Mai;Meh;Gorff;Awst;Medi;Hyd;Tach;Rhag"),
	dddd: _("Dydd Sul;Dydd Llun;Dydd Mawrth;Dydd Mercher;Dydd Iau;Dydd Gwener;Dydd Sadwrn"),
	ddd: _("Sul;Llun;Maw;Mer;Iau;Gwen;Sad")
}, "cy");
addLocale({
	group: ".",
	decimal: ",",
	mmmm: _("yanvar;fevral;mart;aprel;may;iyun;iyul;avqust;sentyabr;oktyabr;noyabr;dekabr"),
	mmm: _("yan;fev;mar;apr;may;iyn;iyl;avq;sen;okt;noy;dek"),
	dddd: _("bazar;bazar ertəsi;çərşənbə axşamı;çərşənbə;cümə axşamı;cümə;şənbə"),
	ddd: _("B.;B.e.;Ç.a.;Ç.;C.a.;C.;Ş.")
}, "az");
addLocale(xm({
	decimal: ",",
	mmmm: _("студзеня;лютага;сакавіка;красавіка;мая;чэрвеня;ліпеня;жніўня;верасня;кастрычніка;лістапада;снежня"),
	dddd: _("нядзеля;панядзелак;аўторак;серада;чацвер;пятніца;субота"),
	ddd: _("нд;пн;аў;ср;чц;пт;сб")
}, 3, -1), "be");
addLocale({
	decimal: ",",
	ampm: _("пр.об.;сл.об."),
	mmmm: _("януари;февруари;март;април;май;юни;юли;август;септември;октомври;ноември;декември"),
	mmm: _("яну;фев;март;апр;май;юни;юли;авг;сеп;окт;ное;дек"),
	dddd: _("неделя;понеделник;вторник;сряда;четвъртък;петък;събота"),
	ddd: _("нд;пн;вт;ср;чт;пт;сб"),
	bool: _("ИСТИНА;ЛОЖЬ")
}, "bg");
addLocale({
	group: ".",
	decimal: ",",
	mmmm: _("de gener;de febrer;de març;d’abril;de maig;de juny;de juliol;d’agost;de setembre;d’octubre;de novembre;de desembre"),
	mmm: _("de gen.;de febr.;de març;d’abr.;de maig;de juny;de jul.;d’ag.;de set.;d’oct.;de nov.;de des."),
	dddd: _("diumenge;dilluns;dimarts;dimecres;dijous;divendres;dissabte"),
	ddd: _("dg.;dl.;dt.;dc.;dj.;dv.;ds."),
	ampm: _("a.\xA0m.;p.\xA0m.")
}, "ca");
addLocale(xm({
	group: ",",
	decimal: ".",
	mmmm: _("Enero;Pebrero;Marso;Abril;Mayo;Hunyo;Hulyo;Agosto;Setyembre;Oktubre;Nobyembre;Disyembre"),
	dddd: _("Linggo;Lunes;Martes;Miyerkules;Huwebes;Biyernes;Sabado")
}, 3, 3), "fil");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("જાન્યુઆરી;ફેબ્રુઆરી;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટેમ્બર;ઑક્ટોબર;નવેમ્બર;ડિસેમ્બર"),
	mmm: _("જાન્યુ;ફેબ્રુ;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટે;ઑક્ટો;નવે;ડિસે"),
	dddd: _("રવિ~;સોમ~;મંગળ~;બુધ~;ગુરુ~;શુક્ર~;શનિ~", "વાર"),
	ddd: _("રવિ;સોમ;મંગળ;બુધ;ગુરુ;શુક્ર;શનિ")
}, "gu");
addLocale({
	group: ",",
	decimal: ".",
	ampm: _("לפנה״צ;אחה״צ"),
	dddd: _("~ראשון;~שני;~שלישי;~רביעי;~חמישי;~שישי;~שבת", "יום "),
	ddd: _("~א׳;~ב׳;~ג׳;~ד׳;~ה׳;~ו׳;שבת", "יום "),
	mmmm: _("ינואר;פברואר;מרץ;אפריל;מאי;יוני;יולי;אוגוסט;ספטמבר;אוקטובר;נובמבר;דצמבר"),
	mmm: _("ינו׳;פבר׳;מרץ;אפר׳;מאי;יוני;יולי;אוג׳;ספט׳;אוק׳;נוב׳;דצמ׳"),
	mmmm6: _("רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע אל־אוול;רביע א־ת׳אני;ג׳ומאדא אל־אולא;ג׳ומאדא א־ת׳אניה;רג׳ב;שעבאן;רמדאן"),
	mmm6: _("רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע א׳;רביע ב׳;ג׳ומאדא א׳;ג׳ומאדא ב׳;רג׳ב;שעבאן;רמדאן")
}, "he");
addLocale(xm({
	group: ".",
	decimal: ",",
	mmmm: _("siječnja;veljače;ožujka;travnja;svibnja;lipnja;srpnja;kolovoza;rujna;listopada;studenoga;prosinca"),
	mmm: _("sij;velj;ožu;tra;svi;lip;srp;kol;ruj;lis;stu;pro"),
	dddd: _("nedjelja;ponedjeljak;utorak;srijeda;četvrtak;petak;subota")
}, -1, 3), "hr");
addLocale({
	decimal: ",",
	mmmm: _("հունվարի;փետրվարի;մարտի;ապրիլի;մայիսի;հունիսի;հուլիսի;օգոստոսի;սեպտեմբերի;հոկտեմբերի;նոյեմբերի;դեկտեմբերի"),
	mmm: _("հնվ;փտվ;մրտ;ապր;մյս;հնս;հլս;օգս;սեպ;հոկ;նոյ;դեկ"),
	dddd: _("կիրակի;երկուշաբթի;երեքշաբթի;չորեքշաբթի;հինգշաբթի;ուրբաթ;շաբաթ"),
	ddd: _("կիր;երկ;երք;չրք;հնգ;ուր;շբթ")
}, "hy");
addLocale(xm({
	decimal: ",",
	mmmm: _("იანვარი;თებერვალი;მარტი;აპრილი;მაისი;ივნისი;ივლისი;აგვისტო;სექტემბერი;ოქტომბერი;ნოემბერი;დეკემბერი"),
	dddd: _("კვირა;ორშაბათი;სამშაბათი;ოთხშაბათი;ხუთშაბათი;პარასკევი;შაბათი")
}, 3, 3), "ka");
addLocale(xm({
	decimal: ",",
	mmmm: _("қаңтар;ақпан;наурыз;сәуір;мамыр;маусым;шілде;тамыз;қыркүйек;қазан;қараша;желтоқсан"),
	dddd: _("жексенбі;дүйсенбі;сейсенбі;сәрсенбі;бейсенбі;жұма;сенбі"),
	ddd: _("жс;дс;сс;ср;бс;жм;сб")
}, 13, -1), "kk");
addLocale({
	group: ",",
	mmmm: _("ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟೆಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್"),
	mmm: _("ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಪ್ರಿ;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟೆಂ;ಅಕ್ಟೋ;ನವೆಂ;ಡಿಸೆಂ"),
	dddd: _("ಭಾನು~;ಸೋಮ~;ಮಂಗಳ~;ಬುಧ~;ಗುರು~;ಶುಕ್ರ~;ಶನಿ~", "ವಾರ"),
	ddd: _("ಭಾನು;ಸೋಮ;ಮಂಗಳ;ಬುಧ;ಗುರು;ಶುಕ್ರ;ಶನಿ"),
	ampm: _("ಪೂರ್ವಾಹ್ನ;ಅಪರಾಹ್ನ")
}, "kn");
addLocale({
	decimal: ",",
	mmmm: _("sausio;vasario;kovo;balandžio;gegužės;birželio;liepos;rugpjūčio;rugsėjo;spalio;lapkričio;gruodžio"),
	mmm: _("saus.;vas.;kov.;bal.;geg.;birž.;liep.;rugp.;rugs.;spal.;lapkr.;gruod."),
	dddd: _("sekmadienis;pirmadienis;antradienis;trečiadienis;ketvirtadienis;penktadienis;šeštadienis"),
	ddd: _("sk;pr;an;tr;kt;pn;št"),
	ampm: _("priešpiet;popiet")
}, "lt");
addLocale({
	decimal: ",",
	mmmm: _("janvāris;februāris;marts;aprīlis;maijs;jūnijs;jūlijs;augusts;septembris;oktobris;novembris;decembris"),
	mmm: _("janv.;febr.;marts;apr.;maijs;jūn.;jūl.;aug.;sept.;okt.;nov.;dec."),
	dddd: _("svētdiena;pirmdiena;otrdiena;trešdiena;ceturtdiena;piektdiena;sestdiena"),
	ddd: _("svētd.;pirmd.;otrd.;trešd.;ceturtd.;piektd.;sestd."),
	ampm: _("priekšpusdienā;pēcpusdienā")
}, "lv");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("ജനുവരി;ഫെബ്രുവരി;മാർച്ച്;ഏപ്രിൽ;മേയ്;ജൂൺ;ജൂലൈ;ഓഗസ്റ്റ്;സെപ്റ്റംബർ;ഒക്‌ടോബർ;നവംബർ;ഡിസംബർ"),
	mmm: _("ജനു;ഫെബ്രു;മാർ;ഏപ്രി;മേയ്;ജൂൺ;ജൂലൈ;ഓഗ;സെപ്റ്റം;ഒക്ടോ;നവം;ഡിസം"),
	dddd: _("ഞായറാഴ്‌ച;തിങ്കളാഴ്‌ച;ചൊവ്വാഴ്ച;ബുധനാഴ്‌ച;വ്യാഴാഴ്‌ച;വെള്ളിയാഴ്‌ച;ശനിയാഴ്‌ച"),
	ddd: _("ഞായർ;തിങ്കൾ;ചൊവ്വ;ബുധൻ;വ്യാഴം;വെള്ളി;ശനി")
}, "ml");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("нэгдүгээ~;хоёрдугаа~;гуравдугаа~;дөрөвдүгээ~;тавдугаа~;зургаадугаа~;долоодугаа~;наймдугаа~;есдүгээ~;аравдугаа~;арван нэгдүгээ~;арван хоёрдугаа~", "р сар"),
	mmm: _("1~;2~;3~;4~;5~;6~;7~;8~;9~;10~;11~;12~", "-р сар"),
	dddd: _("ням;даваа;мягмар;лхагва;пүрэв;баасан;бямба"),
	ddd: _("Ня;Да;Мя;Лх;Пү;Ба;Бя"),
	ampm: _("ү.ө.;ү.х.")
}, "mn");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("जानेवारी;फेब्रुवारी;मार्च;एप्रिल;मे;जून;जुलै;ऑगस्ट;सप्टेंबर;ऑक्टोबर;नोव्हेंबर;डिसेंबर"),
	mmm: _("जाने;फेब्रु;मार्च;एप्रि;मे;जून;जुलै;ऑग;सप्टें;ऑक्टो;नोव्हें;डिसें"),
	dddd: _("रविवार;सोमवार;मंगळवार;बुधवार;गुरुवार;शुक्रवार;शनिवार"),
	ddd: _("रवि;सोम;मंगळ;बुध;गुरु;शुक्र;शनि")
}, "mr");
addLocale(xm({
	group: ",",
	decimal: ".",
	mmmm: _("ဇန်နဝါရီ;ဖေဖော်ဝါရီ;မတ်;ဧပြီ;မေ;ဇွန်;ဇူလိုင်;ဩဂုတ်;စက်တင်ဘာ;အောက်တိုဘာ;နိုဝင်ဘာ;ဒီဇင်ဘာ"),
	mmm: _("ဇန်;ဖေ;မတ်;ဧ;မေ;ဇွန်;ဇူ;ဩ;စက်;အောက်;နို;ဒီ"),
	dddd: _("တနင်္ဂနွေ;တနင်္လာ;အင်္ဂါ;ဗုဒ္ဓဟူး;ကြာသပတေး;သောကြာ;စနေ"),
	ampm: _("နံနက်;ညနေ")
}, -1, 0), "my");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("ਜਨਵਰੀ;ਫ਼ਰਵਰੀ;ਮਾਰਚ;ਅਪ੍ਰੈਲ;ਮਈ;ਜੂਨ;ਜੁਲਾਈ;ਅਗਸਤ;ਸਤੰਬਰ;ਅਕਤੂਬਰ;ਨਵੰਬਰ;ਦਸੰਬਰ"),
	mmm: _("ਜਨ;ਫ਼ਰ;ਮਾਰਚ;ਅਪ੍ਰੈ;ਮਈ;ਜੂਨ;ਜੁਲਾ;ਅਗ;ਸਤੰ;ਅਕਤੂ;ਨਵੰ;ਦਸੰ"),
	dddd: _("ਐਤਵਾਰ;ਸੋਮਵਾਰ;ਮੰਗਲਵਾਰ;ਬੁੱਧਵਾਰ;ਵੀਰਵਾਰ;ਸ਼ੁੱਕਰਵਾਰ;ਸ਼ਨਿੱਚਰਵਾਰ"),
	ddd: _("ਐਤ;ਸੋਮ;ਮੰਗਲ;ਬੁੱਧ;ਵੀਰ;ਸ਼ੁੱਕਰ;ਸ਼ਨਿੱਚਰ"),
	ampm: _("ਪੂ.ਦੁ.;ਬਾ.ਦੁ.")
}, "pa");
addLocale({
	group: ".",
	decimal: ",",
	mmmm: _("ianuarie;februarie;martie;aprilie;mai;iunie;iulie;august;septem~;octom~;noiem~;decem~", "brie"),
	mmm: _("ian.;feb.;mar.;apr.;mai;iun.;iul.;aug.;sept.;oct.;nov.;dec."),
	dddd: _("duminică;luni;marți;miercuri;joi;vineri;sâmbătă"),
	ddd: _("dum.;lun.;mar.;mie.;joi;vin.;sâm."),
	ampm: _("a.m.;p.m.")
}, "ro");
addLocale(xm({
	group: ".",
	decimal: ",",
	mmmm: _("januar;februar;marec;april;maj;junij;julij;avgust;september;oktober;november;december"),
	mmm: _("jan.;feb.;mar.;apr.;maj;jun.;jul.;avg.;sep.;okt.;nov.;dec."),
	dddd: _("nedelja;ponedeljek;torek;sreda;četrtek;petek;sobota"),
	ampm: _("dop.;pop.")
}, -1, 13), "sl");
addLocale(xm({
	group: ".",
	decimal: ",",
	mmmm: _("јануар;фебруар;март;април;мај;јун;јул;август;септембар;октобар;новембар;децембар"),
	dddd: _("недеља;понедељак;уторак;среда;четвртак;петак;субота")
}, 3, 3), "sr");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("ஜனவரி;பிப்ரவரி;மார்ச்;ஏப்ரல்;மே;ஜூன்;ஜூலை;ஆகஸ்ட்;செப்டம்பர்;அக்டோபர்;நவம்பர்;டிசம்பர்"),
	mmm: _("ஜன.;பிப்.;மார்.;ஏப்.;மே;ஜூன்;ஜூலை;ஆக.;செப்.;அக்.;நவ.;டிச."),
	dddd: _("ஞாயிறு;திங்கள்;செவ்வாய்;புதன்;வியாழன்;வெள்ளி;சனி"),
	ddd: _("ஞாயி.;திங்.;செவ்.;புத.;வியா.;வெள்.;சனி")
}, "ta");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("జనవరి;ఫిబ్రవరి;మార్చి;ఏప్రిల్;మే;జూన్;జులై;ఆగస్టు;సెప్టెంబర్;అక్టోబర్;నవంబర్;డిసెంబర్"),
	mmm: _("జన;ఫిబ్ర;మార్చి;ఏప్రి;మే;జూన్;జులై;ఆగ;సెప్టెం;అక్టో;నవం;డిసెం"),
	dddd: _("ఆదివారం;సోమవారం;మంగళవారం;బుధవారం;గురువారం;శుక్రవారం;శనివారం"),
	ddd: _("ఆది;సోమ;మంగళ;బుధ;గురు;శుక్ర;శని")
}, "te");
addLocale({
	decimal: ",",
	mmmm: _("січня;лютого;березня;квітня;травня;червня;липня;серпня;вересня;жовтня;листопада;грудня"),
	mmm: _("січ.;лют.;бер.;квіт.;трав.;черв.;лип.;серп.;вер.;жовт.;лист.;груд."),
	dddd: _("неділю;понеділок;вівторок;середу;четвер;пʼятницю;суботу"),
	ddd: _("нд;пн;вт;ср;чт;пт;сб"),
	ampm: _("дп;пп")
}, "uk");
addLocale({
	group: ".",
	decimal: ",",
	mmmm: _("~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12", "tháng "),
	mmm: _("~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12", "thg "),
	dddd: _("Chủ Nhật;Thứ Hai;Thứ Ba;Thứ Tư;Thứ Năm;Thứ Sáu;Thứ Bảy"),
	ddd: _("CN;Th 2;Th 3;Th 4;Th 5;Th 6;Th 7"),
	ampm: _("SA;CH")
}, "vi");
addLocale(xm({
	group: "٬",
	decimal: "٫",
	ampm: _("ص;م"),
	mmmm: _("يناير;فبراير;مارس;أبريل;مايو;يونيو;يوليو;أغسطس;سبتمبر;أكتوبر;نوفمبر;ديسمبر"),
	dddd: _("الأحد;الاثنين;الثلاثاء;الأربعاء;الخميس;الجمعة;السبت"),
	mmmm6: _("رمضان;شوال;ذو القعدة;ذو الحجة;محرم;ربيع الأول;ربيع الآخرة;جمادى الأولى;جمادى الآخرة;رجب;شعبان;رمضان")
}, 0, 0), "ar");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("জানুয়ারী;ফেব্রুয়ারী;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগস্ট;সেপ্টেম্বর;অক্টোবর;নভেম্বর;ডিসেম্বর"),
	mmm: _("জানু;ফেব;মার্চ;এপ্রি;মে;জুন;জুল;আগ;সেপ্টেঃ;অক্টোঃ;নভেঃ;ডিসেঃ"),
	dddd: _("রবিবার;সোমবার;মঙ্গলবার;বুধবার;বৃহস্পতিবার;শুক্রবার;শনিবার"),
	ddd: _("রবি;সোম;মঙ্গল;বুধ;বৃহস্পতি;শুক্র;শনি")
}, "bn");
addLocale({
	group: ",",
	decimal: ".",
	mmmm: _("जनवरी;फ़रवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितंबर;अक्तूबर;नवंबर;दिसंबर"),
	mmm: _("जन॰;फ़र॰;मार्च;अप्रैल;मई;जून;जुल॰;अग॰;सित॰;अक्तू॰;नव॰;दिस॰"),
	dddd: _("रविवार;सोमवार;मंगलवार;बुधवार;गुरुवार;शुक्रवार;शनिवार"),
	ddd: _("रवि;सोम;मंगल;बुध;गुरु;शुक्र;शनि"),
	ampm: _("am;pm")
}, "hi");
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
//#region lib/round.ts
/**
* Return a number rounded to the specified amount of places. This is the
* rounding function used internally by the formatter (symmetric arithmetic
* rounding).
*
* @param number - The number to round.
* @param [places=0] - The number of decimals to round to.
* @returns A rounded number.
*/
function round(number, places = 0) {
	if (typeof number !== "number") return number;
	if (number < 0) return -round(-number, places);
	if (places) {
		const p = 10 ** places || 1;
		return round(number * p, 0) / p;
	}
	return Math.round(number);
}
//#endregion
//#region lib/dec2frac.ts
const PRECISION = 1e-13;
/**
* Split a fractional number into a numerator and denominator for display as
* vulgar fractions.
*
* @ignore
* @param number The value to split
* @param [numeratorMaxDigits=2] The maxdigits number
* @param [denominatorMaxDigits=2] The maxdigits de
* @returns Array of two numbers, numerator and denominator.
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
* Convert a native JavaScript Date, or array to an spreadsheet serial date.
*
* Returns a serial date number if input was a Date object or an array of
* numbers, a null.
*
* ```js
* // input as Date
* dateToSerial(new Date(1978, 5, 17)); // 28627
* // input as [ Y, M, D, h, m, s ]
* dateToSerial([ 1978, 5, 17 ]); // 28627
* // other input
* dateToSerial("something else"); // null
* ````
*
* @param date The date
* @param [options.ignoreTimezone=false]
*   Normally time zone will be taken into account. This makes the conversion to
*   serial date ignore the timezone offset.
* @returns The date as a spreadsheet serial date, or null.
*/
function dateToSerial(date, options) {
	let ts = null;
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
	return null;
}
/**
* Convert a spreadsheet serial date to an array of date parts.
* Accurate to a second.
*
* ```js
* // output as [ Y, M, D, h, m, s ]
* dateFromSerial(28627); // [ 1978, 5, 17, 0, 0, 0 ]
* ````
*
* @param serialDate The date
* @param [options={}] The options
* @param [options.leap1900=true]
*   Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
* @returns returns an array of date parts
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
//#region lib/parseValue.ts
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
const tx0 = {
	j: "d",
	d: "d",
	D: "ddd",
	l: "dddd",
	n: "m",
	m: "m",
	M: "mmm",
	F: "mmmm",
	y: "yy",
	Y: "yyyy"
};
const tx00 = {
	j: "dd",
	d: "dd",
	D: "ddd",
	l: "dddd",
	n: "mm",
	m: "mm",
	M: "mmm",
	F: "mmmm",
	y: "yy",
	Y: "yyyy"
};
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
const currentYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
const PT = ".";
const CM = ",";
const SP = " ";
const NS = "\xA0";
const NN = " ";
const AP = "'";
const AG = "٬";
const dec2group = {
	".": [
		CM,
		NS,
		NN,
		AP,
		AG
	],
	",": [
		PT,
		NS,
		NN,
		AP,
		AG
	],
	"٫": [
		PT,
		NS,
		NN,
		AP,
		AG
	]
};
const isDigit = (d) => d?.length === 1 && d >= "0" && d <= "9";
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
* @param [options.locale=""]
*    A BCP 47 string tag. Locale default is english with a `\u00a0`
*    grouping symbol (see [addLocale](#addLocale))
* @returns An object of the parsed value and a corresponding format string
*/
function parseNumber(value, options = {}) {
	const l10n = getLocale(options.locale || "") || defaultLocale;
	const dec = l10n.decimal;
	const grp = [...dec2group[dec] || [AP, AG]];
	if (!grp.includes(l10n.group) && l10n.group !== SP && l10n.group !== dec) grp.push(l10n.group);
	let num = "";
	let exp = "";
	let sign = 1;
	let format = "";
	let minus = false;
	let openParen = false;
	let closeParen = false;
	let percent = false;
	let currency = false;
	let currencySymbol = null;
	let currencyTrailing = false;
	let i = 0;
	const prefixChars = [
		SP,
		NS,
		NN,
		"+",
		"%",
		"(",
		"-"
	].concat(currencySymbols);
	while (prefixChars.includes(value[i])) {
		const char = value[i];
		if (char === "-") {
			if (minus || openParen) return null;
			minus = true;
			sign = -1;
		} else if (reCurrencySymbols.test(char)) {
			if (currency) return null;
			currency = true;
			currencySymbol = char;
		} else if (char === "(") {
			if (openParen || minus) return null;
			openParen = true;
			sign = -1;
		} else if (char === "%") {
			if (percent) return null;
			percent = true;
		}
		i++;
	}
	let haveDecimal = false;
	let g;
	if (value[i] === dec || isDigit(value[i])) while (i < value.length) {
		const ch = value[i];
		if (!g && grp.includes(ch)) g = ch;
		else if (g && g === ch) {} else if (ch === dec) {
			if (haveDecimal) break;
			num += ".";
			haveDecimal = true;
		} else if (isDigit(ch)) num += ch;
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
		while (isDigit(value[i])) {
			exp += value[i];
			i++;
		}
		if (d === i) return null;
	}
	const suffixChars = [
		SP,
		NS,
		NN,
		"%",
		"$",
		")"
	].concat(currencySymbols);
	while (suffixChars.includes(value[i])) {
		const char = value[i];
		if (reCurrencySymbols.test(char)) {
			if (currency) return null;
			currency = true;
			currencySymbol = char;
			currencyTrailing = true;
		} else if (char === ")") {
			if (closeParen || !openParen) return null;
			closeParen = true;
		} else if (char === "%") {
			if (percent) return null;
			percent = true;
		}
		i++;
	}
	if (i !== value.length) return null;
	let numberValue = parseFloat(num + exp);
	if (!isFinite(numberValue)) return null;
	if (exp) {
		if (percent || currency) return null;
		format = "0.00E+00";
	} else if (percent) {
		if (currency) return null;
		format = num.includes(".") ? "0.00%" : "0%";
		numberValue *= .01;
	} else if (currency) {
		const currencyFormat = num.includes(".") ? "#,##0.00" : "#,##0";
		if (currencyTrailing) format = currencyFormat + currencySymbol;
		else format = currencySymbol + currencyFormat;
	} else if (g) format = num.includes(".") ? "#,##0.00" : "#,##0";
	const ret = { v: numberValue * sign };
	if (format) ret.z = format;
	return ret;
}
function isValidDate(y, m, d) {
	if (d < 1) return false;
	if (m < 1 || m > 12) return false;
	if (m === 2) {
		if (d > (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 || y === 1900 ? 29 : 28)) return false;
	} else if ((m === 4 || m === 6 || m === 9 || m === 11) && d > 30 || (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) && d > 31) return false;
	return true;
}
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
			const time = parseTime(str, { locale: lData.locale });
			if (time) r = nextToken("", node[t], {
				...data,
				time: time.v,
				tf: time.z,
				path: path + t
			}, lData);
		} else throw new Error(`Unknown date token "${t}"`);
		if (r) {
			if (isValidDate(data.year || 1916, data.month || 1, data.day ? +data.day : 1)) return r;
		}
	}
};
const normDateStr = (s) => s.replace(/\s+/g, " ").trim().replace(/’/, "'").replace(/\.$/, "").toLowerCase();
const getLookups = (arr, sym) => {
	const s = arr.map((d, i) => [
		normDateStr(d),
		i + 1,
		sym
	]);
	s.sort((a, b) => b[0].length - a[0].length);
	return s;
};
/**
* Parse a date or datetime string input and return its value and format. If
* the input was not recognized or valid, the function returns a `null`, for
* valid input it returns an object with two properties:
*
* - `v`: the parsed value.
* - `z`: the number format of the input (if applicable).
*
* @see parseValue
* @param value The date to parse
* @param [options.locale=""]
*    A BCP 47 string tag. Locale default is english with a `\u00a0`
*    grouping symbol (see [addLocale](#addLocale))
* @returns An object of the parsed value and a corresponding format string
*/
function parseDate(value, options) {
	const l10n = getLocale(options?.locale || "") || defaultLocale;
	const lData = {
		mon: getLookups(l10n.mmmm, "F").concat(getLookups(l10n.mmm, "M")),
		mp: l10n.mmm[0].at(-1) === ".",
		day: getLookups(l10n.dddd, "l").concat(getLookups(l10n.ddd, "D")),
		dp: l10n.ddd[0].at(-1) === ".",
		locale: options?.locale
	};
	const date = nextToken(normDateStr(value), l10n.preferMDY ? dateTrieMD : dateTrieDM, { path: "" }, lData);
	if (date) {
		if (date.sep === "." && date.path.length === 3) return null;
		const year = +(date.year ?? currentYear);
		if (!date.day) date.day = 1;
		let epoch = -Infinity;
		if (year < 1900) return null;
		else if (year <= 1900 && date.month <= 2) epoch = 25568;
		else if (year < 1e4) epoch = 25569;
		const dateValue = Date.UTC(year, date.month - 1, date.day) / 864e5 + epoch + (date.time || 0);
		if (dateValue >= 0 && dateValue <= 2958465) {
			const lead0 = date._mon[0] === "0" || date.day[0] === "0" || date._mon.length === 2 && date.day.length === 2;
			return {
				v: dateValue,
				z: date.path.replace(/[jdlDnmMFyYx]/g, (a) => {
					if (a === "x") return date.tf || "";
					return (lead0 ? tx00[a] : tx0[a]) || a;
				})
			};
		}
	}
	return null;
}
const normAMPMStr = (s) => s.replace(/\s+/g, "").trim().replace(/\./g, "").toLowerCase();
/**
* Parse a time string input and return its value and format. If the input was
* not recognized or valid, the function returns a `null`, for valid input it
* returns an object with two properties:
*
* - `v`: the parsed value.
* - `z`: the number format of the input (if applicable).
*
* @see parseValue
* @param value The date to parse
* @param [options={}]  Options
* @param [options.locale=""]
*    A BCP 47 string tag. Locale default is english with a `\u00a0`
*    grouping symbol (see [addLocale](#addLocale))
* @returns An object of the parsed value and a corresponding format string
*/
function parseTime(value, options = {}) {
	const l10n = getLocale(options.locale || "") || defaultLocale;
	const parts = /^\s*([10]?\d|2[0-4])(?::([0-5]\d|\d))?(?::([0-5]\d|\d))?(\.\d{1,10})?(?=\s*[^\s\d]|$)/.exec(value);
	let ampm = "";
	if (parts) {
		const tail = normAMPMStr(value.slice(parts[0].length));
		if (tail === normAMPMStr(l10n.ampm[0]) || tail === "a" || tail === "am") ampm = "a";
		else if (tail === normAMPMStr(l10n.ampm[1]) || tail === "p" || tail === "pm") ampm = "p";
		else if (tail === ":") {
			if (!parts[3]) parts[3] = "0";
			if (!parts[2]) parts[2] = "0";
		} else if (tail) return null;
	}
	if (parts) {
		const [, h, m, s, f] = parts;
		if (f && !s) return null;
		if (!ampm && !m && !s) return null;
		let hrs = +(h || 0) * 1;
		if (ampm) {
			if (hrs >= 13) return null;
			if (ampm === "a") {
				if (hrs === 12) hrs = 0;
			} else if (ampm === "p") {
				if (hrs !== 12) hrs += 12;
			}
		}
		const min = +(m || 0) * 1;
		const sec = +(s || 0) * 1;
		const mss = +(f || 0) * 1;
		return {
			v: (hrs * 60 * 60 + min * 60 + sec + mss) / (3600 * 24),
			z: (h.length === 2 ? "hh" : "h") + ":mm" + (s ? ":ss" : "") + (ampm ? " AM/PM" : "")
		};
	}
	return null;
}
/**
* Parse a string input and return its boolean value. If the input was not
* recognized or valid, the function returns a `null`, for valid input it
* returns an object with one property:
*
* - `v`: the parsed value.
*
* @see parseValue
* @param value The supposed boolean to parse
* @param [options.locale=""]
*    A BCP 47 string tag. Locale default is english with a `\u00a0`
*    grouping symbol (see [addLocale](#addLocale))
* @returns An object of the parsed value and a corresponding format string
*/
function parseBool(value, options) {
	const l10n = getLocale(options?.locale || "") || defaultLocale;
	const v = value.trim().toLowerCase();
	const bT = l10n.bool[0].toLowerCase();
	if (v === "true" || v === bT) return { v: true };
	const bF = l10n.bool[1].toLowerCase();
	if (v === "false" || v === bF) return { v: false };
	return null;
}
/**
* Attempt to parse a "spreadsheet input" string input and return its value and
* format. If the input was not recognized or valid, the function returns a
* `null`, for valid input it returns an object with two properties:
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
*   parentheses in the format string (the value will still by negative.)
* - All "scientific notation" returns the same format: `0.00E+00`.
*
* Internally the parser calls, `parseNumber`, `parseDate`,
* `parseTime` and `parseBool`. They work in the same way except
* with a more limited scope. You may want those function if you are limiting
* input to a smaller scope.
*
* Be warned that the parser do not (yet) take locale into account so all input
* is assumed to be in "en-US". This means that `1,234.5` will parse, but
* `1.234,5` will not. Similarly, the order of date parts will be US centric.
* This may change in the future so be careful what options you pass the
* functions.
*
* @param value The value to parse
* @param [options.locale=""]
*    A BCP 47 string tag. Locale default is english with a `\u00a0`
*    grouping symbol (see [addLocale](#addLocale))
* @returns An object of the parsed value and a corresponding format string
*/
function parseValue(value, options) {
	return parseNumber(value, options) ?? parseDate(value, options) ?? parseTime(value, options) ?? parseBool(value, options);
}
//#endregion
//#region lib/parseFormatSection.ts
function minMaxPad(str, part, prefix) {
	part[prefix + "_max"] = str.length;
	part[prefix + "_min"] = str.replace(/#/g, "").length;
	return part;
}
function add(s, tokens) {
	if (typeof s === "string") tokens.push({
		type: "string",
		value: s,
		raw: s
	});
	else tokens.push(s);
}
function isNumOp$1(token, activePattern) {
	const type = token?.type;
	return type === "hash" || type === "zero" || type === "qmark" || type === "digit" && activePattern === "den";
}
function getEmptyPatternPart() {
	return {
		scale: 1,
		percent: false,
		text: false,
		date: 0,
		date_eval: false,
		date_system: 1,
		sec_decimals: 0,
		general: false,
		clock: 24,
		int_pattern: [],
		frac_pattern: [],
		man_pattern: [],
		den_pattern: [],
		num_pattern: [],
		tokens: [],
		pattern: ""
	};
}
function parseFormatSection(inputTokens) {
	const part = getEmptyPatternPart();
	const outputTokens = part.tokens;
	let currentPattern = "int";
	let lastNumberChunk = null;
	const dateChunks = [];
	let last;
	let haveLocale = false;
	let index = -1;
	let partOver = false;
	let patternSource = "";
	let haveSlash = false;
	while (++index < inputTokens.length && !partOver) {
		const token = inputTokens[index];
		const type = token.type || "error";
		patternSource += token.raw;
		if (type === "general") {
			part.general = true;
			add(token, outputTokens);
		} else if (isNumOp$1(token, currentPattern)) {
			const pt = part[currentPattern + "_pattern"];
			if (isNumOp$1(last, currentPattern) || last?.type === "group") {
				pt.push((pt.pop() || "") + token.value);
				lastNumberChunk.num += token.value;
			} else {
				pt.push(token.value);
				lastNumberChunk = {
					type: currentPattern,
					num: token.value
				};
				add(lastNumberChunk, outputTokens);
			}
		} else if (type === "paren") {
			if (token.value === "(") part.parens = true;
			add(token.value, outputTokens);
		} else if (type === "digit") add(token.value, outputTokens);
		else if (type === "slash") {
			haveSlash = true;
			if (part[currentPattern + "_pattern"].length) {
				if (!lastNumberChunk) throw new SyntaxError("Format pattern is missing a numerator");
				part.fractions = true;
				part.num_pattern.push(part[currentPattern + "_pattern"].pop());
				lastNumberChunk.type = "num";
				currentPattern = "den";
				add({ type: "div" }, outputTokens);
			} else add(token.value, outputTokens);
		} else if (type === "comma") add(",", outputTokens);
		else if (type === "scale") part.scale = .001 ** token.raw.length;
		else if (type === "group") {
			if (currentPattern === "int") part.grouping = true;
			if (currentPattern === "den") throw new SyntaxError("Cannot group denominator digits");
		} else if (type === "space") add(token, outputTokens);
		else if (type === "break") {
			partOver = true;
			break;
		} else if (type === "text") {
			part.text = true;
			add(token, outputTokens);
		} else if (type === "plus" || type === "minus") add(token, outputTokens);
		else if (type === "duration") {
			const tokenValue = token.value.toLowerCase();
			const startsWith = tokenValue[0];
			const bit = {
				type: "",
				size: 0,
				date: 1,
				pad: tokenValue.length
			};
			if (startsWith === "h") {
				bit.size = 16;
				bit.type = "hour-elap";
			} else if (startsWith === "m") {
				bit.size = 32;
				bit.type = "min-elap";
			} else {
				bit.size = 64;
				bit.type = "sec-elap";
			}
			part.date = part.date | bit.size;
			dateChunks.push(bit);
			add(bit, outputTokens);
		} else if (part.date && type === "point" && inputTokens[index + 1]?.type === "zero") {
			let dec = 1;
			index++;
			let raw = "0";
			if (inputTokens[index + 1]?.type === "zero") {
				raw += "0";
				dec = 2;
				index++;
			}
			if (inputTokens[index + 1]?.type === "zero") {
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
				type: "subsec",
				size,
				decimals: dec,
				date: 1
			}, outputTokens);
		} else if (type === "calendar") {
			if (!haveLocale) if (token.value === "B2" || token.value === "b2") part.date_system = 6;
			else part.date_system = 1;
		} else if (type === "datetime") {
			const bit = {
				type: "",
				size: 0,
				date: 1
			};
			const value = token.value.toLowerCase();
			const startsWith = value[0];
			if (value === "y" || value === "yy") {
				bit.size = 2;
				bit.type = "year-short";
			} else if (startsWith === "y" || startsWith === "e") {
				bit.size = 2;
				bit.type = "year";
			} else if (value === "b" || value === "bb") {
				bit.size = 2;
				bit.type = "b-year-short";
			} else if (startsWith === "b") {
				bit.size = 2;
				bit.type = "b-year";
			} else if (value === "d" || value === "dd") {
				bit.size = 8;
				bit.type = "day";
				bit.pad = /dd/.test(value) ? 1 : 0;
			} else if (value === "ddd" || value === "aaa") {
				bit.size = 8;
				bit.type = "weekday-short";
			} else if (startsWith === "d" || startsWith === "a") {
				bit.size = 8;
				bit.type = "weekday";
			} else if (startsWith === "h") {
				bit.size = 16;
				bit.type = "hour";
				bit.pad = /hh/i.test(value) ? 1 : 0;
			} else if (startsWith === "m") {
				if (value.length === 3) {
					bit.size = 4;
					bit.type = "monthname-short";
				} else if (value.length === 5) {
					bit.size = 4;
					bit.type = "monthname-single";
				} else if (value.length >= 4) {
					bit.size = 4;
					bit.type = "monthname";
				}
				const last_date_chunk = dateChunks[dateChunks.length - 1];
				if (!bit.type && last_date_chunk && !last_date_chunk.used && last_date_chunk.size & 80) {
					last_date_chunk.used = true;
					bit.size = 32;
					bit.type = "min";
					bit.pad = /mm/.test(value) ? 1 : 0;
				}
				if (!bit.type) {
					bit.size = 4;
					bit.type = "month";
					bit.pad = /mm/.test(value) ? 1 : 0;
					bit.indeterminate = true;
				}
			} else if (startsWith === "s") {
				bit.size = 64;
				bit.type = "sec";
				bit.pad = /ss/.test(value) ? 1 : 0;
				const last_date_chunk = dateChunks[dateChunks.length - 1];
				if (last_date_chunk && last_date_chunk.size & 32) bit.used = true;
				else if (last_date_chunk?.indeterminate) {
					delete last_date_chunk.indeterminate;
					last_date_chunk.size = 32;
					last_date_chunk.type = "min";
					bit.used = true;
				}
			} else if (startsWith === "g") {}
			part.date = part.date | bit.size;
			part.date_eval = true;
			dateChunks.push(bit);
			add(bit, outputTokens);
		} else if (type === "ampm") {
			part.clock = 12;
			part.date = part.date | 16;
			part.date_eval = true;
			token.short = token.value === "A/P";
			add(token, outputTokens);
		} else if (type === "string" || type === "escaped" || type === "char") add(token.value, outputTokens);
		else if (type === "condition") part.condition = [token.value[0], parseFloat(token.value[1])];
		else if (type === "locale") {
			const bits = token.value.split("-");
			const code = bits.length < 2 ? "" : bits.slice(1).join("-");
			const currency = bits[0];
			if (currency) add(currency, outputTokens);
			const l4e = resolveLocale(code);
			if (l4e) part.locale = l4e;
			const wincode = parseInt(code, 16);
			if (isFinite(wincode) && wincode & 16711680) {
				if ((wincode >> 16 & 255) === 6) part.date_system = 6;
			}
			haveLocale = true;
		} else if (type === "color") {
			let cm;
			let v = token.value.toLowerCase();
			if (cm = /^color\s*(\d+)$/i.exec(v)) v = parseInt(cm[1], 10);
			part.color = v;
		} else if (type === "percent") {
			part.scale = 100;
			part.percent = true;
			add("%", outputTokens);
		} else if (type === "point") {
			add(token, outputTokens);
			if (!part.date) {
				part.dec_fractions = true;
				currentPattern = "frac";
			}
		} else if (type === "exp") {
			part.exponential = true;
			part.exp_plus = token.value.includes("+");
			currentPattern = "man";
			add({
				type: "exp",
				plus: part.exp_plus
			}, outputTokens);
		} else if (type === "skip") add(token, outputTokens);
		else if (type === "fill") add(token, outputTokens);
		else if (type === "dbnum" || type === "natnum") {} else if (type === "error") throw new SyntaxError(`Illegal character: ${patternSource}`);
		else throw new SyntaxError(`Unknown token ${type} in ${patternSource}`);
		last = token;
	}
	part.tokensUsed = index;
	part.pattern = patternSource;
	if (/^((?:\[[^\]]+\])+)(;|$)/.test(part.pattern) && !/^\[(?:h+|m+|s+)\]/.test(part.pattern)) add({ type: "text" }, outputTokens);
	if (part.fractions && part.dec_fractions || part.grouping && !part.int_pattern.length || part.fractions && part.exponential || part.fractions && part.den_pattern.length * part.num_pattern.length === 0 || haveSlash && !part.fractions && !part.date || part.exponential && (part.int_pattern.length || part.frac_pattern.length) * part.man_pattern.length === 0) throw new SyntaxError(`Invalid pattern: ${patternSource}`);
	const intPattern = part.int_pattern.join("");
	const manPattern = part.man_pattern.join("");
	const fracPattern = part.frac_pattern.join("");
	minMaxPad(intPattern, part, "int");
	let min = 0;
	for (let i = 0; i < intPattern.length; i++) {
		const ch = intPattern[intPattern.length - 1 - i];
		if (/^[0-9?]/.test(ch)) min = i + 1;
	}
	part.int_min = min;
	minMaxPad(fracPattern, part, "frac");
	minMaxPad(manPattern, part, "man");
	let num_pat = part.num_pattern.join("");
	let den_pat = part.den_pattern[0] || "";
	if (den_pat.includes("?") || num_pat.includes("?")) {
		den_pat = den_pat.replace(/\d/g, "?");
		den_pat = den_pat.replace(/#$/g, "?");
		minMaxPad(num_pat, part, "num");
		minMaxPad(den_pat, part, "den");
		num_pat = num_pat.replace(/#$/g, "?");
	} else {
		minMaxPad(num_pat, part, "num");
		minMaxPad(den_pat, part, "den");
	}
	part.int_p = intPattern;
	part.man_p = manPattern;
	part.num_p = num_pat;
	part.den_p = den_pat;
	if (part.den_pattern.length) part.denominator = parseInt(part.den_pattern.join("").replace(/\D/g, ""), 10);
	part.integer = !!intPattern.length;
	if (!part.integer && !part.exponential && fracPattern.length) {
		const pointIdx = part.tokens.findIndex((d) => d.type === "point");
		part.tokens.splice(pointIdx, 0, {
			type: "int",
			value: "#",
			raw: "#"
		});
		part.integer = true;
		part.int_pattern = ["#"];
		part.int_p = "#";
	}
	if (part.fractions) for (let i = 0; i < outputTokens.length - 1; i++) {
		const tok = outputTokens[i];
		if (tok.type !== "string" && tok.type !== "space") continue;
		const nextType = outputTokens[i + 1].type;
		if (nextType === "num") tok.rule = "num+int";
		else if (nextType === "div") tok.rule = "num";
		else if (nextType === "den") tok.rule = "den";
	}
	if (part.grouping) {
		if (part.int_pattern.length > 1) part.grouping = false;
	}
	return part;
}
//#endregion
//#region lib/clamp.ts
function clamp(number) {
	if (number === 0) return number;
	const d = Math.ceil(Math.log10(number < 0 ? -number : number));
	const mag = 10 ** (16 - Math.floor(d));
	return isFinite(mag) ? Math.round(number * mag) / mag : 0;
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
	period: 0,
	digits: 1,
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
function general(ret, part, value, l10n) {
	const int = value | 0;
	if (typeof value === "string") ret.push(value);
	else if (value === int) ret.push(Math.abs(int));
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
			const o = v.toFixed(10).slice(0, 12).replace(/\.$/, "");
			ret.push(fixLocale(o, l10n));
		} else if (Math.abs(exp) <= 9) if (num_dig.total <= 11) {
			const o = round(v, 9).toFixed(num_dig.frac);
			ret.push(fixLocale(o, l10n));
		} else if (exp === 9) ret.push(Math.floor(v));
		else if (exp >= 0 && exp < 9) ret.push(fixLocale(String(round(v, 9 - exp)), l10n));
		else ret.push(...getExp(n, exp, l10n));
		else if (num_dig.total >= 12) ret.push(...getExp(n, exp, l10n));
		else ret.push(fixLocale(round(v, 9).toFixed(num_dig.frac), l10n));
	}
	return ret;
}
//#endregion
//#region lib/pad.ts
/**
* @ignore
* @param c Instruction character (['#', '?', '0'])
* @param [nbsp=false] Use nonbreaking space or not?
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
	} else date = Math.trunc(value);
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
	if (!part.text && isFinite(part.scale) && part.scale !== 1) value = clamp(value * part.scale);
	if (part.exponential) {
		let v = Math.abs(value);
		if (v) exp = getExponent(v, part.int_max);
		if (value && !part.integer) exp++;
		v = getSignificand(v, exp);
		if (part.int_max === 1 && round(v, part.frac_max) === 10) {
			v = 1;
			exp++;
		}
		value = value < 0 ? -v : v;
		mantissa += Math.abs(exp);
	}
	if (part.integer) {
		const i = Math.abs(round(value, part.fractions ? 1 : part.frac_max));
		integer += i < 1 ? "" : Math.floor(i);
	}
	const group_pri = opts.grouping[0] ?? 3;
	const group_sec = opts.grouping[1] ?? group_pri;
	if (part.dec_fractions) fraction = String(round(value, part.frac_max)).split(".")[1] || "";
	const fixed_slash = !part.error && (part.num_p.includes("0") || part.den_p.includes("0"));
	let have_fraction = fixed_slash;
	if (part.fractions) {
		have_fraction = fixed_slash || !!(value % 1);
		const _dec = Math.abs(part.integer ? value % 1 : value);
		if (_dec) {
			have_fraction = true;
			if (part.denominator && isFinite(part.denominator)) {
				denominator += part.denominator;
				numerator += round(_dec * part.denominator);
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
	if (part.date) {
		date = Math.trunc(value);
		const t = DAYSIZE * (value - date);
		time = Math.floor(t);
		subsec = t - time;
		if (Math.abs(subsec) < 1e-6) subsec = 0;
		else if (subsec > .9999) {
			subsec = 0;
			time += 1;
			if (time === DAYSIZE) {
				time = 0;
				date += 1;
			}
		}
		if (subsec) {
			const minU = part.date & 512 || part.date & 256 || part.date & 128;
			if (minU === 512 && subsec > .9995 || minU === 256 && subsec > .995 || minU === 128 && subsec > .95 || !minU && subsec >= .5) {
				time++;
				subsec = 0;
			}
		}
		if (date || part.date_system) {
			const dout = toYMD(value, part.date_system, opts.leap1900);
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
			if (opts.dateErrorNumber) return general(value < 0 ? [l10n.negative] : [], {}, value, l10n).join("");
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
		const len = tok.num ? tok.num.length : 0;
		if (tokenType === "string") if (tok.rule) {
			if (tok.rule === "num") {
				if (have_fraction) ret.push(tok.value.replace(/ /g, padQ));
				else if (part.num_min > 0 || part.den_min > 0) ret.push(tok.value.replace(/./g, padQ));
			} else if (tok.rule === "num+int") {
				if (have_fraction && integer) ret.push(tok.value.replace(/ /g, padQ));
				else if (part.den_min > 0 && (integer || part.num_min)) ret.push(tok.value.replace(/./g, padQ));
			} else if (tok.rule === "den") {
				if (have_fraction) ret.push(tok.value.replace(/ /g, padQ));
				else if (part.den_min > 0 || part.den_min > 0) ret.push(tok.value.replace(/./g, padQ));
			}
		} else ret.push(tok.value.replace(/ /g, padQ));
		else if (tokenType === "space") if (tok.rule === "num+int") {
			if ((have_fraction || part.num_min || part.den_min) && (integer || part.num_min)) ret.push(padQ);
		} else ret.push(padQ);
		else if (tokenType === "error") ret.push(opts.invalid);
		else if (tokenType === "point") ret.push(part.date ? tok.value : l10n.decimal);
		else if (tokenType === "general") general(ret, part, value, l10n);
		else if (tokenType === "exp") ret.push(l10n.exponent);
		else if (tokenType === "minus") if (tok.volatile && part.date) {} else if (tok.volatile && (value >= 0 || typeof value !== "number")) {} else if (tok.volatile && !part.fractions && (part.integer || part.dec_fractions)) {
			if (value < 0 && integer && integer !== "0" || fraction) ret.push(l10n.negative);
		} else ret.push(l10n.negative);
		else if (tokenType === "plus") ret.push(l10n.positive);
		else if (tokenType === "text") ret.push(value);
		else if (tokenType === "fill") {
			if (opts.fillChar) ret.push(opts.fillChar, tok.value);
		} else if (tokenType === "skip") if (opts.skipChar) ret.push(opts.skipChar, tok.value);
		else ret.push(opts.nbsp ? "\xA0" : " ");
		else if (tokenType === "div") if (have_fraction) ret.push("/");
		else if (part.num_min > 0 || part.den_min > 0) ret.push(padQ);
		else ret.push(pad("#", opts.nbsp));
		else if (tokenType === "int") if (part.int_pattern.length === 1) {
			const pt = part.int_p;
			const l = Math.max(part.int_min, integer.length);
			let digits = "";
			for (let i = l; i > 0; i--) {
				const d = integer.charAt(integer.length - i);
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
		else if (tokenType === "frac") {
			const o = counter.frac;
			for (let i = 0; i < len; i++) ret.push(fraction[i + o] || pad(tok.num[i], opts.nbsp));
			counter.frac += len;
		} else if (tokenType === "man") {
			if (!counter[tokenType] && !counter.man) ret.push(mantissa_sign);
			counter.man += digitsStart(mantissa, part.man_p, tok.num, counter.man);
		} else if (tokenType === "num") counter.num += digitsStart(numerator, part.num_p, tok.num, counter.num);
		else if (tokenType === "den") {
			const o = counter.den;
			for (let i = 0; i < len; i++) {
				let digit = denominator[i + o];
				if (!digit) {
					const ch = tok.num[i];
					if ("123456789".includes(ch) || denominator_fixed && ch === "0") {
						denominator_fixed = true;
						digit = opts.nbsp ? "\xA0" : " ";
					} else if (!denominator_fixed && i === len - 1 && ch === "0" && !denominator) digit = "1";
					else digit = pad(ch, opts.nbsp);
				}
				ret.push(digit);
			}
			counter.den += len;
		} else if (tokenType === "year") {
			if (year < 0) ret.push(l10n.negative);
			ret.push(String(Math.abs(year)).padStart(4, "0"));
		} else if (tokenType === "year-short") {
			const y = year % 100;
			ret.push(y < 10 ? "0" : "", y);
		} else if (tokenType === "month") ret.push(tok.pad && month < 10 ? "0" : "", month);
		else if (tokenType === "monthname-single") if (part.date_system === 6) ret.push(l10n.mmmm6[month - 1].charAt(0));
		else ret.push(l10n.mmmm[month - 1].charAt(0));
		else if (tokenType === "monthname-short") if (part.date_system === 6) ret.push(l10n.mmm6[month - 1]);
		else ret.push(l10n.mmm[month - 1]);
		else if (tokenType === "monthname") if (part.date_system === 6) ret.push(l10n.mmmm6[month - 1]);
		else ret.push(l10n.mmmm[month - 1]);
		else if (tok.type === "weekday-short") ret.push(l10n.ddd[weekday]);
		else if (tokenType === "weekday") ret.push(l10n.dddd[weekday]);
		else if (tokenType === "day") ret.push(tok.pad && day < 10 ? "0" : "", day);
		else if (tokenType === "hour") {
			const h = hour % part.clock || (part.clock < 24 ? part.clock : 0);
			ret.push(tok.pad && h < 10 ? "0" : "", h);
		} else if (tokenType === "min") ret.push(tok.pad && minute < 10 ? "0" : "", minute);
		else if (tokenType === "sec") ret.push(tok.pad && second < 10 ? "0" : "", second);
		else if (tokenType === "subsec") {
			ret.push(l10n.decimal);
			const f = subsec.toFixed(part.sec_decimals);
			ret.push(f.slice(2, 2 + tok.decimals));
		} else if (tokenType === "ampm") {
			const idx = hour < 12 ? 0 : 1;
			if (tok.short && !l10n_) ret.push("AP"[idx]);
			else ret.push(l10n.ampm[idx]);
		} else if (tokenType === "hour-elap") {
			if (value < 0) ret.push(l10n.negative);
			const hh = date * 24 + Math.floor(Math.abs(time) / 3600);
			ret.push(String(Math.abs(hh)).padStart(tok.pad, "0"));
		} else if (tokenType === "min-elap") {
			if (value < 0) ret.push(l10n.negative);
			const mm = date * 1440 + Math.floor(Math.abs(time) / 60);
			ret.push(String(Math.abs(mm)).padStart(tok.pad, "0"));
		} else if (tokenType === "sec-elap") {
			if (value < 0) ret.push(l10n.negative);
			const ss = date * DAYSIZE + Math.abs(time);
			ret.push(String(Math.abs(ss)).padStart(tok.pad, "0"));
		} else if (tokenType === "b-year") ret.push(year + 543);
		else if (tokenType === "b-year-short") {
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
			let cond;
			if (part.condition) {
				const operator = part.condition[0];
				const operand = part.condition[1];
				if (operator === "=") cond = value === operand;
				else if (operator === ">") cond = value > operand;
				else if (operator === "<") cond = value < operand;
				else if (operator === ">=") cond = value >= operand;
				else if (operator === "<=") cond = value <= operand;
				else if (operator === "<>") cond = value !== operand;
			} else cond = true;
			if (cond) return part;
		}
	}
}
function formatColor$1(value, parseData, opts) {
	const parts = parseData.partitions;
	let part = parts[3];
	let color = null;
	if (typeof value === "number" && Number.isFinite(value) || typeof value === "bigint") part = getPart(value, parts);
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
	if (typeof value !== "number" && !n) return runPart(value, text_part, opts, l10n);
	if (!n && !isFinite(value)) {
		const loc = l10n || defaultLocale;
		if (isNaN(value)) return loc.nan;
		return (value < 0 ? loc.negative : "") + loc.infinity;
	}
	const part = getPart(value, parts);
	return part ? runPart(value, part, opts, l10n) : opts.overflow;
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
function info(partitions, currencyId = null) {
	const [partPos, partNeg] = partitions;
	const frac_max = partPos.frac_max;
	const output = {
		type: "general",
		isDate: isDate(partitions),
		isText: isText(partitions),
		isPercent: isPercent(partitions),
		maxDecimals: partPos.general ? 9 : frac_max,
		scale: partPos.scale ?? 1,
		color: 0,
		parentheses: 0,
		grouped: partPos.grouping ? 1 : 0,
		code: "G",
		level: 0
	};
	const isCurrency = !output.isDate && !output.isText && !partPos.error && partPos.tokens.some((tok) => tok.type === "string" && (currencyId ? tok.value === currencyId : reCurrencySymbols.test(tok.value)));
	let codeType = "G";
	let codeNum = frac_max >= 0 ? Math.min(15, frac_max) : "";
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
			if (/^(b-)?year/.test(type)) {
				order += "Y";
				haveDate++;
			} else if (type.startsWith("month")) {
				order += "M";
				haveDate++;
			} else if (/^(week)?day/.test(type)) {
				order += "D";
				haveDate++;
			} else if (type === "hour" || type === "min" || type === "sec" || type === "ampm") {
				order += type[0];
				haveTime++;
			}
		});
		output.type = "date";
		if (haveDate && haveTime) output.type = "datetime";
		else if (!haveDate && haveTime) output.type = "time";
		const code = dateCodes.find((d) => order.startsWith(d[0]));
		codeType = code ? "D" : "G";
		codeNum = code ? code[1] : "";
	} else if (output.isText) {
		codeType = "G";
		output.type = "text";
		codeNum = "";
		output.maxDecimals = 0;
	} else if (partPos.general) {
		codeType = "G";
		output.type = "general";
		codeNum = "";
	} else if (partPos.fractions) {
		codeType = "G";
		output.type = "fraction";
		codeNum = "";
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
	output.code = codeType + codeNum + codeDash + codeParens;
	output.level = level[output.type];
	return Object.freeze(output);
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
//#region lib/tokenize.ts
const tokenHandlers = [
	[
		TOKEN_GENERAL,
		/^General/i,
		0
	],
	[
		TOKEN_HASH,
		/^#/,
		0
	],
	[
		TOKEN_ZERO,
		/^0/,
		0
	],
	[
		TOKEN_QMARK,
		/^\?/,
		0
	],
	[
		TOKEN_SLASH,
		/^\//,
		0
	],
	[
		TOKEN_BREAK,
		/^;/,
		0
	],
	[
		TOKEN_TEXT,
		/^@/,
		0
	],
	[
		TOKEN_PLUS,
		/^\+/,
		0
	],
	[
		TOKEN_MINUS,
		/^-/,
		0
	],
	[
		TOKEN_POINT,
		/^\./,
		0
	],
	[
		TOKEN_SPACE,
		/^ /,
		0
	],
	[
		TOKEN_PERCENT,
		/^%/,
		0
	],
	[
		TOKEN_DIGIT,
		/^[1-9]/,
		0
	],
	[
		TOKEN_CALENDAR,
		/^(?:B[12])/i,
		0
	],
	[
		TOKEN_ERROR,
		/^B$/,
		0
	],
	[
		TOKEN_DATETIME,
		/^(?:[hH]+|[mM]+|[sS]+|[yY]+|[bB]+|[dD]+|[gG]+|[aA]{3,}|e+)/,
		0
	],
	[
		TOKEN_DURATION,
		/^(?:\[(h+|m+|s+)\])/i,
		1
	],
	[
		TOKEN_CONDITION,
		/^\[(<[=>]?|>=?|=)\s*(-?[.\d]+)\]/,
		[1, 2]
	],
	[
		TOKEN_DBNUM,
		/^\[(DBNum[0-4]?\d)\]/i,
		1
	],
	[
		TOKEN_NATNUM,
		/^\[(NatNum[0-4]?\d)\]/i,
		1
	],
	[
		TOKEN_LOCALE,
		/^\[\$([^\]]+)\]/,
		1
	],
	[
		TOKEN_COLOR,
		/^\[(black|blue|cyan|green|magenta|red|white|yellow|color\s*\d+)\]/i,
		1
	],
	[
		TOKEN_MODIFIER,
		/^\[([^\]]+)\]/,
		1
	],
	[
		TOKEN_AMPM,
		/^(?:AM\/PM|am\/pm|A\/P)/,
		0
	],
	[
		TOKEN_ESCAPED,
		/^\\(.)/,
		1
	],
	[
		TOKEN_STRING,
		/^"([^"]*?)"/,
		1
	],
	[
		TOKEN_SKIP,
		/^_(\\.|.)/,
		1
	],
	[
		"exp",
		/^[Ee]([+-])/,
		1
	],
	[
		TOKEN_FILL,
		/^\*(\\.|.)/,
		1
	],
	[
		TOKEN_PAREN,
		/^[()]/,
		0
	],
	[
		TOKEN_ERROR,
		/^[EÈÉÊËèéêëĒēĔĕĖėĘęĚěȄȅȆȇȨȩNnÑñŃńŅņŇňǸǹ["*/\\_]/,
		0
	],
	[
		TOKEN_CHAR,
		/^./,
		0
	]
];
const CODE_QMRK = 63;
const CODE_HASH = 35;
const CODE_ZERO = 48;
const CODE_NINE = 57;
const isNumOp = (char) => {
	const c = (char || "\0").charCodeAt(0);
	return c === CODE_QMRK || c === CODE_HASH || c >= CODE_ZERO && c <= CODE_NINE;
};
/**
* Breaks a format pattern string into a list of tokens.
*
* The returned output will be an array of objects representing the tokens:
*
* ```js
* [
*   { type: 'zero', value: '0', raw: '0' },
*   { type: 'point', value: '.', raw: '.' },
*   { type: 'zero', value: '0', raw: '0' },
*   { type: 'percent', value: '%', raw: '%' }
* ]
* ```
*
* Token types may be found as an Object as the
* [`tokenTypes` export]{@link tokenTypes} of the package.
*
* @param pattern The format pattern
* @returns a list of tokens
*/
function tokenize(pattern) {
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
			if (isNumOp(lookBehind)) {
				maybeGROUP = true;
				maybeSCALE = true;
			} else if (lookBehind === ".") maybeSCALE = true;
			const lookAhead = mComma[2] || "";
			if (maybeGROUP && (!lookAhead || lookAhead === ";")) maybeGROUP = false;
			if (maybeSCALE && isNumOp(lookAhead)) maybeSCALE = false;
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
			for (const [type, expr, group] of tokenHandlers) {
				const m = expr.exec(curr);
				if (m) {
					token = {
						type,
						value: Array.isArray(group) ? group.map((d) => m[d]) : m[group || 0],
						raw: m[0]
					};
					tokens.push(token);
					step = m[0].length;
					break;
				}
			}
			if (unresolvedCommas.length && token.raw === ";") unresolvedCommas.length = 0;
			if (unresolvedCommas.length && isNumOp(token.raw)) {
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
//#endregion
//#region lib/parsePattern.ts
const maybeAddMinus = (part) => {
	const [op, val] = part.condition ?? [];
	if (!(val < 0 && (op === "<" || op === "<=" || op === "=") || val === 0 && op === "<")) part.tokens.unshift({
		type: "minus",
		volatile: true
	});
};
const clonePart = (part, prefixToken = null) => {
	const r = {};
	for (const key in part) if (Array.isArray(part[key])) r[key] = [...part[key]];
	else r[key] = part[key];
	if (prefixToken) r.tokens.unshift(prefixToken);
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
		more = tokens[part.tokensUsed]?.type === "break" ? 1 : 0;
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
				if (cond[0] === "=" || cond[1] >= 0 && (cond[0] === ">" || cond[0] === ">=")) part2.tokens.unshift({
					type: "minus",
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
		if (partitions.length < 2) partitions.push(clonePart(partitions[0], {
			type: "minus",
			volatile: true
		}));
		if (partitions.length < 3) partitions.push(clonePart(partitions[0]));
		if (partitions.length < 4) if (text_partition) partitions.push(text_partition);
		else {
			const p = parseFormatSection(tokenize("@"));
			p.generated = true;
			partitions.push(p);
		}
		partitions[0].condition = [">", 0];
		partitions[1].condition = ["<", 0];
		partitions[2].condition = null;
	}
	return {
		pattern,
		partitions,
		locale: l10n_override
	};
}
//#endregion
//#region lib/index.ts
const _parseDataCache = Object.create({});
function prepareFormatterData(pattern, shouldThrow = false) {
	if (!pattern) pattern = "General";
	let parseData = _parseDataCache[pattern];
	if (!parseData) try {
		parseData = parsePattern(pattern);
		_parseDataCache[pattern] = parseData;
	} catch (err) {
		if (shouldThrow) throw err;
		const errPart = {
			tokens: [{ type: "error" }],
			error: err.message
		};
		parseData = {
			pattern,
			partitions: [
				errPart,
				errPart,
				errPart,
				errPart
			],
			error: err.message,
			locale: null
		};
	}
	return parseData;
}
/**
* Formats a value as a string and returns the result.
*
* - Dates are normalized to spreadsheet style serial dates and then formatted.
* - Booleans are emitted as uppercase "TRUE" or "FALSE".
* - Null and Undefined will return an empty string "".
* - Any non number values will be stringified and passed through the text section of the format pattern.
* - NaNs and infinites will use the corresponding strings from the active locale.
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @param value - The value to format.
* @param [options] - Formatter options
* @returns A formatted value
*/
function format(pattern, value, options) {
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
* console.log(color); // null
* ```
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @param value - The value to format.
* @param [options] - Formatter options
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
* The pattern is considered a date pattern if any of its sections contain a
* date symbol (such as `Y` or `H`). Each section is restricted to be
* _either_ a number or date format.
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is date pattern, False otherwise.
*/
function isDateFormat(pattern) {
	return isDate(prepareFormatterData(pattern, false).partitions);
}
/**
* Determine if a given format pattern is a percentage pattern.
*
* The pattern is considered a percentage pattern if any of its sections
* contains an unescaped percentage symbol.
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is date pattern, False otherwise.
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
* @param pattern - A format pattern in the ECMA-376 number format.
* @returns True if the specified pattern is date pattern, False otherwise.
*/
function isTextFormat(pattern) {
	return isText(prepareFormatterData(pattern, false).partitions);
}
/**
* Determine if a given format pattern is valid.
*
* @param pattern - A format pattern in the ECMA-376 number format.
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
* @param pattern - A format pattern in the ECMA-376 number format.
* @param [options.currency]
*   Limit the patterns identified as currency to those that use the give string.
*   If nothing is provided, patterns will be tagged as currency if one of the
*   following currency symbols is used: ¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿
* @returns An object of format properties.
*/
function getFormatInfo(pattern, options = {}) {
	const data = prepareFormatterData(pattern, false);
	if (!data.info) data.info = info(data.partitions, options?.currency);
	return data.info;
}
/**
* Gets information about date codes use in a format string.
*
* @param pattern - A format pattern in the ECMA-376 number format.
* @returns An object of format date properties.
*/
function getFormatDateInfo(pattern) {
	const data = prepareFormatterData(pattern, false);
	if (!data.dateInfo) data.dateInfo = dateInfo(data.partitions);
	return data.dateInfo;
}
/**
* A dictionary of the types used to identify token variants.
*
* @readonly
* @constant {Object<string>} tokenTypes
* @property {string} AMPM - AM/PM operator (`AM/PM`, `A/P`)
* @property {string} BREAK - Semicolon operator indicating a break between format sections (`;`)
* @property {string} CALENDAR - Calendar modifier (`B2`)
* @property {string} CHAR - Single non-operator character (`m`)
* @property {string} COLOR - Color modifier (`[Black]`, `[color 5]`)
* @property {string} COMMA - Plain non-operator comma (`,`)
* @property {string} CONDITION - Condition modifier for a section (`[>=10]`)
* @property {string} DATETIME - Date-time operator (`mmmm`, `YY`)
* @property {string} DBNUM - Number display modifier (`[DBNum23]`)
* @property {string} DIGIT - A digit between 1 and 9 (`3`)
* @property {string} DURATION - Time duration (`[ss]`)
* @property {string} ERROR - Unidentifiable or illegal character (`Ň`)
* @property {string} ESCAPED - Escaped character (`\E`)
* @property {string} EXP - Exponent operator (`E+`)
* @property {string} FILL - Fill with char operator and operand (`*_`)
* @property {string} GENERAL - General format operator (`General`)
* @property {string} GROUP - Number grouping operator (`,`)
* @property {string} HASH - Hash operator (digit if available) (`#`)
* @property {string} LOCALE - Locale modifier (`[$-1E020404]`)
* @property {string} MINUS - Minus sign (`-`)
* @property {string} MODIFIER - An unidentified modifier (`[Schwarz]`)
* @property {string} NATNUM - Number display modifier (`[NatNum3]`)
* @property {string} PAREN - Parenthesis character (`)`)
* @property {string} PERCENT - Percent operator (`%`)
* @property {string} PLUS - Plus sign (`+`)
* @property {string} POINT - Decimal point operator (`.`)
* @property {string} QMARK - Question mark operator (digit or space if not available) (`?`)
* @property {string} SCALE - Scaling operator (`,`)
* @property {string} SKIP - Skip with char operator and operand (`*_`)
* @property {string} SLASH - Slash operator (`/`)
* @property {string} SPACE - Space (` `)
* @property {string} STRING - Quoted string (`"days"`)
* @property {string} TEXT - Text output operator (`@`)
* @property {string} ZERO - Zero operator (digit or zero if not available) (`0`)
* @see tokenize
*/
const tokenTypes = Object.freeze({
	AMPM: TOKEN_AMPM,
	BREAK: TOKEN_BREAK,
	CALENDAR: TOKEN_CALENDAR,
	CHAR: TOKEN_CHAR,
	COLOR: TOKEN_COLOR,
	COMMA: TOKEN_COMMA,
	CONDITION: TOKEN_CONDITION,
	DATETIME: TOKEN_DATETIME,
	DBNUM: TOKEN_DBNUM,
	DIGIT: TOKEN_DIGIT,
	DURATION: TOKEN_DURATION,
	ERROR: TOKEN_ERROR,
	ESCAPED: TOKEN_ESCAPED,
	EXP: "exp",
	FILL: TOKEN_FILL,
	GENERAL: TOKEN_GENERAL,
	GROUP: TOKEN_GROUP,
	HASH: TOKEN_HASH,
	LOCALE: TOKEN_LOCALE,
	MINUS: TOKEN_MINUS,
	MODIFIER: TOKEN_MODIFIER,
	NATNUM: TOKEN_NATNUM,
	PAREN: TOKEN_PAREN,
	PERCENT: TOKEN_PERCENT,
	PLUS: TOKEN_PLUS,
	POINT: TOKEN_POINT,
	QMARK: TOKEN_QMARK,
	SCALE: TOKEN_SCALE,
	SKIP: TOKEN_SKIP,
	SLASH: TOKEN_SLASH,
	SPACE: TOKEN_SPACE,
	STRING: TOKEN_STRING,
	TEXT: TOKEN_TEXT,
	ZERO: TOKEN_ZERO
});
//#endregion
exports.addLocale = addLocale;
exports.dateFromSerial = dateFromSerial;
exports.dateToSerial = dateToSerial;
exports.dec2frac = dec2frac;
exports.format = format;
exports.formatColor = formatColor;
exports.getFormatDateInfo = getFormatDateInfo;
exports.getFormatInfo = getFormatInfo;
exports.getLocale = getLocale;
exports.isDateFormat = isDateFormat;
exports.isPercentFormat = isPercentFormat;
exports.isTextFormat = isTextFormat;
exports.isValidFormat = isValidFormat;
exports.parseBool = parseBool;
exports.parseDate = parseDate;
exports.parseLocale = parseLocale;
exports.parseNumber = parseNumber;
exports.parseTime = parseTime;
exports.parseValue = parseValue;
exports.round = round;
exports.tokenTypes = tokenTypes;
exports.tokenize = tokenize;
