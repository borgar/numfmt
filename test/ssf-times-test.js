import path from 'path';
import { runTable } from './utils.js';

// -- running the full table takes a while
// runTable(path.join('tables/ssf-times-full.tsv'));

runTable(path.join('tables/ssf-times.tsv'));

