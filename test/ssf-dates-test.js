/* global __dirname */
import path from 'path';
import { runTable } from './utils';

runTable(path.join(__dirname, '/tables/ssf-dates.tsv'));

