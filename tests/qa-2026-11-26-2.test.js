const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const { globSync } = require('node:fs');

test('pages have correct lang and meta tags', () => {
  const files = globSync('_site/**/*.html');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    assert.ok(content.includes('lang="en"'), `Missing lang="en" in ${file}`);
    assert.ok(content.includes('<meta name="description"'), `Missing description meta in ${file}`);
    assert.ok(content.includes('<meta name="theme-color"'), `Missing theme-color meta in ${file}`);
    assert.ok(content.includes('property="og:title"'), `Missing og:title in ${file}`);
  }
});