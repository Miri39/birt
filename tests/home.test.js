const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("home page meets acceptance criteria", () => {
  const html = fs.readFileSync("_site/index.html", "utf8");
  assert.ok(html.includes('<html lang="en">'));
  assert.ok(html.includes('meta name="viewport"'));
  assert.ok(html.includes('<header>'));
  assert.ok(html.includes('<main>'));
  assert.ok(html.includes('<footer>'));
  assert.ok(html.includes('birt'));
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gs);
  assert.strictEqual(h1Matches ? h1Matches.length : 0, 1);
});
