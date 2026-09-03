import { describe } from 'vitest';
import { runTable } from './utils.ts';

describe('SSF table: tables/cal-updated.tsv', () => {
  runTable('tables/cal-updated.tsv');
});
