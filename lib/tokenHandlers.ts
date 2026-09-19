import {
  TOKEN_GENERAL, TOKEN_HASH, TOKEN_ZERO, TOKEN_QMARK, TOKEN_SLASH, TOKEN_GROUP, TOKEN_SCALE,
  TOKEN_COMMA, TOKEN_BREAK, TOKEN_TEXT, TOKEN_PLUS, TOKEN_MINUS, TOKEN_POINT, TOKEN_SPACE,
  TOKEN_PERCENT, TOKEN_DIGIT, TOKEN_CALENDAR, TOKEN_ERROR, TOKEN_DATETIME, TOKEN_DURATION,
  TOKEN_CONDITION, TOKEN_DBNUM, TOKEN_NATNUM, TOKEN_LOCALE, TOKEN_COLOR, TOKEN_MODIFIER,
  TOKEN_AMPM, TOKEN_ESCAPED, TOKEN_STRING, TOKEN_SKIP, TOKEN_EXP, TOKEN_FILL, TOKEN_PAREN,
  TOKEN_CHAR,
  TOKEN_CURRENCY,
  currencySymbols
} from './constants.ts';
import type { LocaleData } from './locale.ts';
import type { Token, TokenType } from './types.ts';

const reEsc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const reCurrencySymbol = new RegExp('^[' + reEsc(currencySymbols.join('')) + ']');

export const TOKEN_HANDLERS: [ TokenType, RegExp, number ][] = [
  [ TOKEN_GENERAL, /^General/i, 0 ],
  [ TOKEN_HASH, /^#/, 0 ],
  [ TOKEN_ZERO, /^0/, 0 ],
  [ TOKEN_QMARK, /^\?/, 0 ],
  [ TOKEN_SLASH, /^\//, 0 ],
  // Commas are dealt with as a special case in the tokenizer but will end up
  // as one of these:
  // [ TOKEN_GROUP, /^(,),*/, 1 ],
  // [ TOKEN_SCALE, /^(,),*/, 1 ],
  // [ TOKEN_COMMA, /^(,),*/, 1 ],
  [ TOKEN_BREAK, /^;/, 0 ],
  [ TOKEN_TEXT, /^@/, 0 ],
  [ TOKEN_PLUS, /^\+/, 0 ],
  [ TOKEN_MINUS, /^-/, 0 ],
  [ TOKEN_POINT, /^\./, 0 ],
  [ TOKEN_SPACE, /^ /, 0 ],
  [ TOKEN_PERCENT, /^%/, 0 ],
  [ TOKEN_CURRENCY, reCurrencySymbol, 0 ],
  [ TOKEN_DIGIT, /^[1-9]/, 0 ],
  [ TOKEN_CALENDAR, /^(?:B[12])/i, 0 ],
  [ TOKEN_ERROR, /^B$/, 0 ], // pattern must not end in a "B"
  [ TOKEN_DATETIME, /^(?:[hH]+|[mM]+|[sS]+|[yY]+|[bB]+|[dD]+|[gG]+|[aA]{3,}|e+)/, 0 ],
  [ TOKEN_DURATION, /^(?:\[(h+|m+|s+)\])/i, 1 ],
  [ TOKEN_CONDITION, /^\[((?:<[=>]?|>=?|=)\s*(?:-?[.\d]+))\]/, 1 ],
  [ TOKEN_DBNUM, /^\[(DBNum[0-4]?\d)\]/i, 1 ],
  [ TOKEN_NATNUM, /^\[(NatNum[0-4]?\d)\]/i, 1 ],
  [ TOKEN_LOCALE, /^\[\$([^\]]+)\]/, 1 ],
  [ TOKEN_COLOR, /^\[(black|blue|cyan|green|magenta|red|white|yellow|color\s*\d+)\]/i, 1 ],
  // conditionally allow these open ended directions?
  [ TOKEN_MODIFIER, /^\[([^\]]+)\]/, 1 ],
  [ TOKEN_AMPM, /^(?:AM\/PM|am\/pm|A\/P)/, 0 ],
  [ TOKEN_ESCAPED, /^\\(.)/, 1 ],
  [ TOKEN_STRING, /^"([^"]*?)"/, 1 ],
  [ TOKEN_SKIP, /^_(\\.|.)/, 1 ],
  // Google Sheets and Excel diverge on "e": Excel only accepts E.
  [ TOKEN_EXP, /^[Ee]([+-])/, 1 ],
  [ TOKEN_FILL, /^\*(\\.|.)/, 1 ],
  [ TOKEN_PAREN, /^[()]/, 0 ],
  [ TOKEN_ERROR, /^[EÈÉÊËèéêëĒēĔĕĖėĘęĚěȄȅȆȇȨȩNnÑñŃńŅņŇňǸǹ["*/\\_]/, 0 ],
  [ TOKEN_CHAR, /^./, 0 ]
];

export function getTokenHandlers (l10n: LocaleData): [ TokenType, RegExp, number ][] {
  // match General
  const reGeneral = !(l10n.general === 'General' || !l10n.general)
    ? new RegExp(`^(?:General|${reEsc(l10n.general)})`, 'i')
    : null;

  // colors
  const reColors = l10n.colors
    ? new RegExp(`^\\[(${Object.keys(l10n.colors).map(reEsc).join('|')})\\]`, 'i')
    : null;

  const reColor = l10n.color
    ? new RegExp(`^\\[(${reEsc(l10n.color)}\\s*\\d+)\\]`, 'i')
    : null;

  //
  let reDatetime;
  let reDuration;
  if (l10n.opcodes) {
    // console.log(l10n.opcodes);
    const dy = l10n.opcodes.dy ?? 'y';
    const dm = l10n.opcodes.dm ?? 'm';
    const dd = l10n.opcodes.dd ?? 'd';
    const th = l10n.opcodes.th ?? 'h';
    const tm = l10n.opcodes.tm ?? 'm';
    const ts = l10n.opcodes.ts ?? 's';
    // AAA
    const ddd = [
      dy + dy.toUpperCase(),
      dm + dm.toUpperCase(),
      dd + dd.toUpperCase(),
      th + th.toUpperCase(),
      tm + tm.toUpperCase(),
      ts + ts.toUpperCase(),
      'bB',
      'gG'
    ];
    // console.log(ddd);
    // [aA]{3,} --- need to mine this 😭
    reDatetime = new RegExp(`^(?:[${ddd.join(']+|[')}]+|e+)`);
    reDuration = new RegExp(`^(?:\\[(${th}+|${tm}+|${ts}+)\\]+)`, 'i');
  }
  else {
    reDatetime = /^(?:[hH]+|[mM]+|[sS]+|[yY]+|[bB]+|[dD]+|[gG]+|[aA]{3,}|e+)/;
    reDuration = /^(?:\[(h+|m+|s+)\])/i;
  }

  const reCurrency = l10n.currency.length > 1 || !currencySymbols.includes(l10n.currency)
    ? new RegExp(`^(?:${reEsc(l10n.currency)})`)
    : null;

  const handlers: [ TokenType, RegExp, number ][] = [
    [ TOKEN_GENERAL, /^General/, 0 ]
  ];
  if (reGeneral) {
    handlers.push([ TOKEN_GENERAL, reGeneral, 0 ]);
  }
  handlers.push(
    [ TOKEN_HASH, /^#/, 0 ],
    [ TOKEN_ZERO, /^0/, 0 ],
    [ TOKEN_QMARK, /^\?/, 0 ],
    [ TOKEN_SLASH, /^\//, 0 ],
    [ TOKEN_BREAK, /^;/, 0 ],
    [ TOKEN_TEXT, /^@/, 0 ],
    [ TOKEN_PLUS, /^\+/, 0 ],
    [ TOKEN_MINUS, /^-/, 0 ],
    [ TOKEN_POINT, /^\./, 0 ],
    [ TOKEN_SPACE, /^ /, 0 ],
    [ TOKEN_PERCENT, /^%/, 0 ],
    [ TOKEN_CURRENCY, reCurrencySymbol, 0 ]
  );
  if (reCurrency) {
    handlers.push([ TOKEN_CURRENCY, reCurrency, 0 ]);
  }
  handlers.push(
    [ TOKEN_DIGIT, /^[1-9]/, 0 ],
    [ TOKEN_CALENDAR, /^(?:B[12])/i, 0 ],
    [ TOKEN_ERROR, /^B$/, 0 ], // pattern must not end in a "B"
    // [ TOKEN_DATETIME, /^(?:[hH]+|[mM]+|[sS]+|[yY]+|[bB]+|[dD]+|[gG]+|[aA]{3,}|e+)/, 0 ],
    [ TOKEN_DATETIME, reDatetime, 0 ],
    // [ TOKEN_DURATION, /^(?:\[(h+|m+|s+)\])/i, 1 ],
    [ TOKEN_DURATION, reDuration, 1 ],
    [ TOKEN_CONDITION, /^\[((?:<[=>]?|>=?|=)\s*(?:-?[.\d]+))\]/, 1 ],
    [ TOKEN_DBNUM, /^\[(DBNum[0-4]?\d)\]/i, 1 ],
    [ TOKEN_NATNUM, /^\[(NatNum[0-4]?\d)\]/i, 1 ],
    [ TOKEN_LOCALE, /^\[\$([^\]]+)\]/, 1 ],
    [ TOKEN_COLOR, /^\[(black|blue|cyan|green|magenta|red|white|yellow|color\s*\d+)\]/i, 1 ]
  );
  if (reColors) {
    handlers.push([ TOKEN_COLOR, reColors, 1 ]);
  }
  if (reColor) {
    handlers.push([ TOKEN_COLOR, reColor, 1 ]);
  }
  handlers.push(
    // conditionally allow these open ended directions?
    [ TOKEN_MODIFIER, /^\[([^\]]+)\]/, 1 ],
    [ TOKEN_AMPM, /^(?:AM\/PM|am\/pm|A\/P)/, 0 ],
    [ TOKEN_ESCAPED, /^\\(.)/, 1 ],
    [ TOKEN_STRING, /^"([^"]*?)"/, 1 ],
    [ TOKEN_SKIP, /^_(\\.|.)/, 1 ],
    // Google Sheets and Excel diverge on "e": Excel only accepts E.
    [ TOKEN_EXP, /^[Ee]([+-])/, 1 ],
    [ TOKEN_FILL, /^\*(\\.|.)/, 1 ],
    [ TOKEN_PAREN, /^[()]/, 0 ],
    [ TOKEN_ERROR, /^[EÈÉÊËèéêëĒēĔĕĖėĘęĚěȄȅȆȇȨȩNnÑñŃńŅņŇňǸǹ["*/\\_]/, 0 ],
    [ TOKEN_CHAR, /^./, 0 ]
  );
  return handlers;
}
