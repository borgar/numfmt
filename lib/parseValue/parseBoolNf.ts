import { type LocaleData } from '../locale.ts';
import type { ParseDataBool } from './types.ts';

export function parseBoolNf (value: string, l10n: LocaleData): ParseDataBool | undefined {
  const v = value.trim().toLowerCase();
  const bT = l10n.bool[0].toLowerCase();
  if (v === 'true' || v === bT) {
    return { v: true };
  }
  const bF = l10n.bool[1].toLowerCase();
  if (v === 'false' || v === bF) {
    return { v: false };
  }
  return undefined;
}
