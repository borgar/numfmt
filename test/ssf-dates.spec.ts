import { describe } from 'vitest';
import { runTable } from './utils.ts';

describe('SSF table: tables/ssf-dates.tsv', () => {
  runTable('tables/ssf-dates.tsv');
});
