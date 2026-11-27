const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('node:fs');

test('No page contains external http/https links', () => {
  const files = globSync('_site/**/*.html');
  const externalRegex = /https?:\/\//g;
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(externalRegex);
    assert.strictEqual(matches, null, `External link found in ${file}: ${matches}`);
  }
});