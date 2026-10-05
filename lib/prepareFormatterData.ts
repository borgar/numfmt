import { TOKEN_ERROR } from './constants.ts';
import { createPartition } from './createPartition.ts';
import { parsePattern } from './parsePattern.ts';
import type { FormatDateInfo, FormatInfo, PatternParseData } from './types.ts';

export type CacheData = PatternParseData & { dateInfo?: FormatDateInfo, info?: FormatInfo };

const _parseDataCache = new Map<string, CacheData>();

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
export function prepareFormatterData (pattern: string, shouldThrow = false): CacheData {
  if (!pattern) { pattern = 'General'; }

  let parseData = _parseDataCache.get(pattern);
  if (!parseData) {
    try {
      parseData = parsePattern(pattern);
      _parseDataCache.set(pattern, parseData);
    }
    catch (err) {
      // if the options say to throw errors, then do so
      if (shouldThrow) {
        throw err;
      }
      // else we set the parsedata to error
      const message = err && typeof err === 'object' && 'message' in err ? String(err.message) : 'Unknown error';
      const errPart = createPartition([ { type: TOKEN_ERROR } ]);
      errPart.error = true;
      parseData = {
        pattern: pattern,
        partitions: [ errPart, errPart, errPart, errPart ],
        error: message,
        locale: undefined
      };
    }
  }
  return parseData;
}
