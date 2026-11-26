const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { globSync } = require('node:fs');

test('all internal /birt/ links exist', () => {
  const files = globSync('_site/**/*.html');
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const links = [...content.matchAll(/href="(\/birt\/[^"]*)"/g)].map(m => m[1]);
    
    for (const link of links) {
      const relativePath = link.replace('/birt/', '');
      const target = path.join('_site', relativePath);
      
      if (fs.existsSync(target)) {
        const stats = fs.statSync(target);
        if (stats.isDirectory()) {
          assert.ok(fs.existsSync(path.join(target, 'index.html')), `Link ${link} points to directory without index.html`);
        }
      } else {
        assert.fail(`Broken internal link: ${link} in ${file}`);
      }
    }
  });
});