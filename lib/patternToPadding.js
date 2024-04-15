import { _numchars } from './constants.js';

const _pattcache = {};

export function patternToPadding (ss) {
  if (_pattcache[ss] == null) {
    let pad = '';
    let numSeq = false;
    for (let i = 0; i < ss.length; i++) {
      if (ss[i] === '0') {
        pad += _numchars[numSeq ? '?' : '0'];
      }
      else if ('123456789?'.includes(ss[i])) {
        numSeq = ss[i] !== '?';
        pad += _numchars['?'];
      }
      else {
        numSeq = false;
      }
    }
    _pattcache[ss] = pad;
  }
  return _pattcache[ss];
}
