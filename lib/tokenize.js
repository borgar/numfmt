// Google Sheets and Excel diverge on "e" 😬

const tokenHandlers = [
  [ 'general', /^General/i, 0 ],
  [ 'hash', /^#/, 0 ],
  [ 'zero', /^0/, 0 ],
  [ 'qmark', /^\?/, 0 ],
  [ 'slash', /^\//, 0 ],
  // [ 'group', /^(,),*/, 1 ],
  // [ 'scale', /^(,),*/, 1 ],
  // [ 'comma', /^(,),*/, 1 ],
  [ 'break', /^;/, 0 ],
  [ 'text', /^@/, 0 ],
  [ 'plus', /^\+/, 0 ],
  [ 'minus', /^-/, 0 ],
  [ 'point', /^\./, 0 ],
  [ 'space', /^ /, 0 ],
  [ 'percent', /^%/, 0 ],
  [ 'digit', /^[1-9]/, 0 ],
  [ 'calendar', /^(?:B1|B2)/i, 0 ],
  [ 'error', /^B$/, 0 ], // pattern must not end in a "B"
  [ 'datetime', /^(?:([hHmMsSyYbBdDegG])\1*)/, 0 ],
  [ 'duration', /^(?:\[(h+|m+|s+)\])/i, 1 ],
  [ 'condition', /^\[(<[=>]?|>=?|=)\s*(-?[.\d]+)\]/, [ 1, 2 ] ],
  [ 'dbnum', /^\[(DBNum[0-4]?\d)\]/i, 1 ],
  [ 'natnum', /^\[(NatNum[0-4]?\d)\]/i, 1 ],
  // [ 'currency', /^\[\$\$([^\]]+)\]/, 1 ],
  [ 'locale', /^\[\$([^\]]+)\]/, 1 ],
  [ 'color', /^\[(black|blue|cyan|green|magenta|red|white|yellow|color\s*\d+)\]/i, 1 ],
  // conditionally allow these open ended directions?
  [ 'direction', /^\[([^\]]+)\]/, 1 ],
  [ 'ampm', /^(?:AM\/PM|am\/pm|A\/P)/, 0 ],
  [ 'quoted', /^\\(.)/, 1 ],
  [ 'string', /^"([^"]*?)"/, 1 ],
  [ 'skip', /^_(\\.|.)/, 1 ],
  [ 'exp', /^[Ee]([+-])/, 1 ],
  [ 'fill', /^\*(\\.|.)/, 1 ],
  [ 'paren', /^[()]/, 0 ],
  [ 'error', /^[EÈÉÊËèéêëĒēĔĕĖėĘęĚěȄȅȆȇȨȩNnÑñŃńŅņŇňǸǹ["*/\\_]/, 0 ], //  -- error chars
  [ 'char', /^./, 0 ]
];

const CODE_QMRK = 63;
const CODE_HASH = 35;
const CODE_ZERO = 48;
const CODE_NINE = 57;
const isNumOp = char => {
  const c = (char || '\0').charCodeAt(0);
  return (c === CODE_QMRK || c === CODE_HASH || (c >= CODE_ZERO && c <= CODE_NINE));
};

export function tokenize (pattern) {
  let i = 0;
  const tokens = [];
  const unresolvedCommas = [];
  while (i < pattern.length) {
    const curr = pattern.slice(i);
    let step = 0;
    // A comma is context sensitive and needs to be handled as a special case.
    // This needs to happen in the tokenizer because to be able to re-localize
    // the pattern we'll need to know what each comma means.
    const mComma = /^(,+)(.)?/.exec(curr);
    if (mComma) {
      // comma depends on what it follows
      const raw = mComma[1];
      step = raw.length;
      const lookBehind = pattern[i - 1] || '';
      let maybeGROUP = false;
      let maybeSCALE = false;
      if (isNumOp(lookBehind)) { // 0-9, '#', or '?': may be GROUP or SCALE
        maybeGROUP = true;
        maybeSCALE = true;
      }
      else if (lookBehind === '.') { // '.': may be SCALE only
        maybeGROUP = false;
      }
      // if at the end of the pattern or section, then this can't be a GROUP op
      const lookAhead = mComma[2] || '';
      if (maybeGROUP && (!lookAhead || lookAhead === ';')) {
        maybeGROUP = false;
      }
      // if next char is a num token, then this cannot be a SCALE op
      if (maybeSCALE && isNumOp(lookAhead)) {
        maybeSCALE = false;
      }
      if (maybeGROUP && !maybeSCALE) {
        tokens.push({ type: 'group', value: ',', raw });
      }
      else if (!maybeGROUP && maybeSCALE) {
        tokens.push({ type: 'scale', value: ',', raw });
      }
      else if (maybeGROUP && maybeSCALE) {
        // this token will be set to scale, but switched to group if we hit a
        // num token later on in the pattern...
        const t = { type: 'scale', value: ',', raw };
        tokens.push(t);
        unresolvedCommas.push(t);
      }
      else {
        tokens.push({ type: 'comma', value: ',', raw });
      }
    }
    // all other symbols are matched using 
    else {
      let token;
      for (const [ type, expr, group ] of tokenHandlers) {
        const m = expr.exec(curr);
        if (m) {
          const value = Array.isArray(group)
            ? group.map(d => m[d])
            : m[group || 0];
          token = { type, value, raw: m[0] };
          tokens.push(token);
          step = m[0].length;
          break;
        }
      }
      // if we just matched a num operator, then deal with any unresolved commas
      if (unresolvedCommas.length && isNumOp(token.raw)) {
        unresolvedCommas.forEach(d => (d.type = 'group'));
        unresolvedCommas.length = 0;
      }
    }
    if (!step) {
      const raw = curr[0];
      step = 1;
      tokens.push({ type: 'char', value: raw, raw });
    }
    i += step;
  }
  return tokens;
}
