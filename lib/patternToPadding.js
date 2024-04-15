import { pad } from './pad.js';

const _pattcache = {};

export function patternToPadding (pattern, nbsp = false) {
  const key = (nbsp ? '+' : '-') + pattern;
  if (_pattcache[key] == null) {
    let padding = '';
    let numSeq = false;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === '0') {
        padding += pad(numSeq ? '?' : '0', nbsp);
      }
      else if ('123456789?'.includes(pattern[i])) {
        numSeq = pattern[i] !== '?';
        padding += pad('?', nbsp);
      }
      else {
        numSeq = false;
      }
    }
    _pattcache[key] = padding;
  }
  return _pattcache[key];
}
