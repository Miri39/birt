const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const { globSync } = require('node:fs');

test('no empty or placeholder hrefs', () => {
  const files = globSync('_site/**/*.html');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/href="([^"]*)"/g) || [];
    for (const match of matches) {
      const href = match.match(/href="([^"]*)"/)[1];
      assert.notStrictEqual(href, '', `Empty href found in ${file}`);
      assert.notStrictEqual(href, '#', `Placeholder href # found in ${file}`);
    }
  }
});