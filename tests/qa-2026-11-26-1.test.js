const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('node:fs');

test('no external http/https resources', () => {
  const files = globSync('_site/**/*.html');
  const externalRegex = /https?:\/\//;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    assert.strictEqual(externalRegex.test(content), false, `External URL found in ${file}`);
  }
});