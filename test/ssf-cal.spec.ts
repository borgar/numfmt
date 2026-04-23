import { describe } from 'vitest';
import { runTable } from './utils.ts';

describe.skipIf(process.env.SKIPTABLES)('SSF table: tables/cal-updated.tsv', () => {
  runTable('tables/cal-updated.tsv');
});
