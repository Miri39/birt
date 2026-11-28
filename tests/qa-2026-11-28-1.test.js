const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('node:fs');

test('no duplicate id attributes across site', () => {
  const files = globSync('_site/**/*.html');
  const ids = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/id="([^"]+)"/g) || [];
    for (const match of matches) {
      const id = match.match(/id="([^"]+)"/)[1];
      assert.strictEqual(ids.has(id), false, `Duplicate ID found: ${id} in ${file}`);
      ids.add(id);
    }
  }
});