import { format, parseValue } from "./index.js";

const v = '4:'
const parsed = parseValue(v);
console.log('parsed', parsed);
const formatted = format(parsed.z, parsed.v);
console.log('formatted', formatted);