import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = fileURLToPath(new URL('../data/', import.meta.url));
const files = (await readdir(dir)).filter((name) => name.endsWith('.json')).sort();
let total = 0;
for (const name of files) {
  const records = JSON.parse(await readFile(join(dir, name), 'utf8'));
  if (!Array.isArray(records) || records.length === 0) throw new Error(`${name} phải là JSON array không rỗng`);
  const ids = new Set(records.map((row) => row._id));
  if (ids.size !== records.length) throw new Error(`${name} có _id trùng`);
  total += records.length;
  console.log(`OK ${name}: ${records.length} documents`);
}
console.log(`Validated ${files.length} collections / ${total} documents.`);
