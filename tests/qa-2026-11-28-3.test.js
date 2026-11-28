const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const { globSync } = require('node:fs');

test('no inline event handlers', () => {
  const files = globSync('_site/**/*.html');
  const eventHandlerRegex = /\son[a-z]+="[^"]*"/i;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const hasHandler = eventHandlerRegex.test(content);
    assert.strictEqual(hasHandler, false, `Inline event handler found in ${file}`);
  }
});