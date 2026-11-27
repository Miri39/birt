const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('node:fs');

test('All internal /birt/ links resolve to files', () => {
  const files = globSync('_site/**/*.html');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const links = content.match(/href="(\/birt\/[^"]*)"/g) || [];
    
    for (const linkMatch of links) {
      const href = linkMatch.match(/href="([^"]*)"/)[1];
      const relativePath = href.replace('/birt/', '');
      const target = path.join('_site', relativePath, relativePath === '' ? 'index.html' : 'index.html');
      
      if (relativePath !== '' && !relativePath.endsWith('/')) {
          // Check if file or folder/index.html exists
          const exists = fs.existsSync(path.join('_site', relativePath)) || fs.existsSync(path.join('_site', relativePath, 'index.html'));
          assert.ok(exists, `Broken internal link ${href} in ${file}`);
      }
    }
  }
});