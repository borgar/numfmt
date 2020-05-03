/* global __dirname */
import path from 'path';
import { runTable } from './utils';

// -- running the full table takes a while
// runTable(path.join(__dirname, '/tables/ssf-times-full.tsv'));

runTable(path.join(__dirname, '/tables/ssf-times.tsv'));

