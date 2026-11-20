// SPDX-License-Identifier: Apache-2.0
//
// Adapted from https://github.com/SheetJS/ssf
// Copyright 2004 SheetJS
// Modified and adapted for numfmt in 2020.
//
// Original code licensed under the Apache License, Version 2.0.
// See LICENSES/Apache-2.0.txt.

import { describe } from 'vitest';
import { runTable } from './utils.ts';

// -- running the full table takes a while
const FULL = true;

describe('SSF table: tables/ssf-times.tsv', () => {
  runTable(
    FULL
      ? 'tables/ssf-times-full.tsv'
      : 'tables/ssf-times.tsv'
  );
});
