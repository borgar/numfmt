import { codeToLocale } from './codeToLocale.ts';
import { resolveLocale } from './locale.ts';

export type LocaleInstruction = {
  numberStyle?: number;
  calendar?: number;
  locale?: string;
  currency?: string;
  sysdate?: boolean;
  systime?: boolean;
};

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
export function parseLocaleInstr (value: string): LocaleInstruction {
  let cal: number | undefined;
  let num = 0;
  let locale: string | undefined;
  let currency = '';

  // LCID number style: [$-0409]
  // See: https://stackoverflow.com/questions/54134729/what-does-the-130000-in-excel-locale-code-130000-mean/54540455#54540455
  const numStyle = /^([^-]*)-([0-9a-fA-F]{3,8})$/.exec(value);
  if (numStyle) {
    if (numStyle[1]) {
      currency = numStyle[1];
    }
    const code = parseInt(numStyle[2], 16);
    // code is a hex number that follows the convention xxyyzzzz, where:
    // ... xx = number system (unsupported currently)
    const c = (code >> 24) & 0xff;
    if (c) { num = c; }
    // ... yy = calendar format (Gregorian, Hijri, ...)
    const d = (code >> 16) & 0xff;
    if (d) { cal = d; }
    // ... zzzz = LCID (locale code)
    const e = code & 0xffff;
    if (e === 0xF800) {
      return { sysdate: true };
    }
    else if (e === 0xF400) {
      return { systime: true };
    }
    else if (e && codeToLocale[e]) {
      locale = codeToLocale[e];
    }
  }
  else {
    const bcpStyle = /^([^-]*)-([a-z\d][a-z\d_.@-]*)?(?:,([a-f\d]{1,4}))?$/i.exec(value);
    if (bcpStyle) {
      let loc = bcpStyle[2];
      if (/^x-sysdate$/.test(loc)) {
        return { sysdate: true };
      }
      else if (/^x-systime$/.test(loc)) {
        return { systime: true };
      }
      else {
        if (bcpStyle[1]) {
          currency = bcpStyle[1];
        }
        if (loc) {
          if (/-x-gannen$/i.test(loc)) {
            // TODO: https://stackoverflow.com/a/64403179/27388
            // > In addition, a gannen suffix `-x-gannen` is allowed on Japanese locale codes, which
            // > replaces a `1` value (first year of emperor reign) for `e` formats with `元`.
            // > For example:
            // > `5/1/2019` with number format `[$-ja-JP-x-gannen]ggg e` is `令和 元` instead of `令和 1`
            // > without the gannen indicator.
            loc = loc.slice(0, -9);
          }
          locale = resolveLocale(loc);
        }
        if (bcpStyle[3]) {
          const code = parseInt(bcpStyle[3], 16);
          // code is a hex number that follows the convention xxyy, where:
          // ... xx = number system (unsupported currently)
          const c = (code >> 8) & 0xff;
          if (c) { num = c; }
          // ... yy = calendar format (Gregorian, Hijri, ...)
          const d = code & 0xff;
          if (d) { cal = d; }
        }
      }
    }
    else if (!value.includes('-')) {
      return { currency: value };
    }
    else {
      return { currency: value };
      // Illegal tag: Excel seems to mostly ignore these
    }
  }

  // output
  const out: LocaleInstruction = {};
  if (cal) {
    out.calendar = cal;
  }
  if (num) {
    out.numberStyle = num;
  }
  if (locale) {
    out.locale = locale;
  }
  if (currency) {
    out.currency = currency;
  }
  return out;
}
