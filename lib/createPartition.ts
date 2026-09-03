import { EPOCH_1900 } from './constants.ts';
import type { Partition, RenderToken } from './types.ts';

export function createPartition (tokens?: RenderToken[]): Partition {
  return {
    scale: 1,
    percent: false,
    text: false,
    parens: false,
    fractions: false,
    grouping: false,
    exponential: false,
    integer: false,
    locale: '',
    pattern: '',
    int_max: 0,
    frac_max: 0,
    man_p: '',
    num_p: '',
    num_min: 0,
    den_min: 0,
    den_max: 0,
    date: 0,
    tokensUsed: 0,
    date_eval: false,
    date_system: EPOCH_1900,
    sec_decimals: 0,
    general: false,
    clock: 24,
    int_min: 0, // ??
    int_pattern: [],
    frac_pattern: [],
    man_pattern: [],
    den_pattern: [],
    num_pattern: [],
    tokens: tokens ?? [],
    den_p: '',
    int_p: '',
    denominator: 0
  };
}
