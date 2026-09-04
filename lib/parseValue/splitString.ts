const C_ZERO = 48;
const C_NINE = 57;
const C_SPACE = 32;
const C_COMMA = 44;
const C_POINT = 46;
const C_SLASH = 47;
const C_COLON = 58;
const C_A = 65;

// [ "0"..."9" ] [ " " "," "-" "/", "." ] [ * ]
export function dateSplitter (code: number): string {
  if (code >= C_ZERO && code <= C_NINE) { // 0-9
    return '0';
  }
  if (code === C_SPACE || code >= C_COMMA && code <= C_SLASH) { // \x20 , - . /
    return '_';
  }
  return '?';
}

export function timeSplitter (code: number, lastCode: number): string {
  if (code >= C_ZERO && code <= C_NINE) { // 0-9
    return '0';
  }
  if (code === C_COLON) { // :
    return ':';
  }
  if (code === C_POINT && lastCode < C_A) { // .
    return '.';
  }
  if (code === C_SPACE) { // \x20
    return '_';
  }
  if (code === 160 || code === 8239) { // \xA0 \u202F
    return '~';
  }
  return '?';
}

export type Classifier = (charCode: number, lastCharCode: number) => string;
export type TokenS = { type: string, value: string };

export function splitString (value: string, classifier: Classifier): TokenS[] {
  const tokens: TokenS[] = [];
  let currToken: TokenS = { type: '', value: '' };
  let lastCharCode = -1;
  for (let i = 0; i < value.length; i++) {
    const curr = value.charCodeAt(i);
    const c0 = classifier(curr, lastCharCode);
    if (currToken.type !== c0) {
      if (currToken.value) {
        tokens.push(currToken);
      }
      currToken = { type: c0, value: '' };
    }
    currToken.value += value[i];
    lastCharCode = curr;
  }
  if (currToken.value) {
    tokens.push(currToken);
  }
  return tokens;
}
