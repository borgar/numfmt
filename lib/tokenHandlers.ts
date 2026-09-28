import {
  TOKEN_GENERAL, TOKEN_HASH, TOKEN_ZERO, TOKEN_QMARK, TOKEN_SLASH,
  TOKEN_BREAK, TOKEN_TEXT, TOKEN_PLUS, TOKEN_MINUS, TOKEN_POINT, TOKEN_SPACE,
  TOKEN_PERCENT, TOKEN_DIGIT, TOKEN_CALENDAR, TOKEN_ERROR, TOKEN_DATETIME, TOKEN_DURATION,
  TOKEN_CONDITION, TOKEN_DBNUM, TOKEN_NATNUM, TOKEN_LOCALE, TOKEN_COLOR, TOKEN_MODIFIER,
  TOKEN_AMPM, TOKEN_ESCAPED, TOKEN_STRING, TOKEN_SKIP, TOKEN_EXP, TOKEN_FILL, TOKEN_PAREN,
  TOKEN_CHAR,
  TOKEN_CURRENCY,
  currencySymbols
} from './constants.ts';
import type { LocaleData } from './locale.ts';
import type { TokenType } from './types.ts';

const reEsc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const reCurrencySymbol = new RegExp('^[' + reEsc(currencySymbols.join('')) + ']');

export function getTokenHandlers (l10n: LocaleData): [ TokenType, RegExp, number ][] {
  const handlers: [ TokenType, RegExp, number ][] = [];

  // match General
  handlers.push([ TOKEN_GENERAL, /^General/i, 0 ]);
  if (l10n.general && l10n.general !== 'General') {
    handlers.push([ TOKEN_GENERAL, new RegExp(`^${reEsc(l10n.general)}`, 'i'), 0 ]);
  }
  // match translated color names and indexed color
  if (l10n.colors) {
    handlers.push([ TOKEN_COLOR, new RegExp(`^\\[(${Object.keys(l10n.colors).map(reEsc).join('|')})\\]`, 'i'), 1 ]);
  }
  if (l10n.color) {
    handlers.push([ TOKEN_COLOR, new RegExp(`^\\[(${reEsc(l10n.color)}\\s*\\d+)\\]`, 'i'), 1 ]);
  }

  // match alternate locale date and time opcodes
  let reDatetime;
  let reDuration;
  if (l10n.opcodes) {
    const dy = reEsc(l10n.opcodes.dy ?? 'y');
    const dm = reEsc(l10n.opcodes.dm ?? 'm');
    const dd = reEsc(l10n.opcodes.dd ?? 'd');
    const th = reEsc(l10n.opcodes.th ?? 'h');
    const tm = reEsc(l10n.opcodes.tm ?? 'm');
    const ts = reEsc(l10n.opcodes.ts ?? 's');
    const wd = reEsc(l10n.opcodes.wd ?? 'a');
    const en = reEsc(l10n.opcodes.en ?? 'g');
    // AAA
    const ops = [
      dy + dy.toUpperCase(),
      dm + dm.toUpperCase(),
      dd + dd.toUpperCase(),
      th + th.toUpperCase(),
      tm + tm.toUpperCase(),
      ts + ts.toUpperCase(),
      wd + wd.toUpperCase(),
      en + en.toUpperCase(),
      'bB'
    ];
    reDatetime = new RegExp(`^(?:[${ops.join(']+|[')}]+|e+)`);
    reDuration = new RegExp(`^(?:\\[(${reEsc(th)}+|${reEsc(tm)}+|${reEsc(ts)}+)\\]+)`, 'i');
  }
  else {
    reDatetime = /^(?:[hH]+|[mM]+|[sS]+|[yY]+|[bB]+|[dD]+|[gG]+|[aA]{3,}|e+)/;
    reDuration = /^(?:\[(h+|m+|s+)\])/i;
  }

  // match currency from locale
  if (l10n.currency.length > 1 || !currencySymbols.includes(l10n.currency)) {
    handlers.push([ TOKEN_CURRENCY, new RegExp(`^(?:${reEsc(l10n.currency)})`), 0 ]);
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
    [ TOKEN_CURRENCY, reCurrencySymbol, 0 ],
    [ TOKEN_DIGIT, /^[1-9]/, 0 ],
    [ TOKEN_CALENDAR, /^(?:B[12])/i, 0 ],
    [ TOKEN_ERROR, /^B$/, 0 ], // pattern must not end in a "B"
    [ TOKEN_DATETIME, reDatetime, 0 ],
    [ TOKEN_DURATION, reDuration, 1 ],
    [ TOKEN_AMPM, /^(?:AM\/PM|am\/pm|A\/P)/, 0 ],
    [ TOKEN_CONDITION, /^\[((?:<[=>]?|>=?|=)\s*(?:-?[.\d]+))\]/, 1 ],
    [ TOKEN_DBNUM, /^\[(DBNum[0-4]?\d)\]/i, 1 ],
    [ TOKEN_NATNUM, /^\[(NatNum[0-4]?\d)\]/i, 1 ],
    [ TOKEN_LOCALE, /^\[\$([^\]]+)\]/, 1 ],
    [ TOKEN_COLOR, /^\[(black|blue|cyan|green|magenta|red|white|yellow|color\s*\d+)\]/i, 1 ],
    // conditionally allow these open ended directions?
    [ TOKEN_MODIFIER, /^\[([^\]]+)\]/, 1 ],
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
