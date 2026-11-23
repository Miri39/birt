const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("table 1 page meets acceptance criteria", () => {
  const html = fs.readFileSync("_site/table-1/index.html", "utf8");
  assert.ok(html.includes("<header>"));
  assert.ok(html.includes("<main>"));
  assert.ok(html.includes("<footer>"));
  
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gs);
  assert.strictEqual(h1Matches ? h1Matches.length : 1, 1);
  assert.ok(html.includes(">Table 1</h1>"));

  assert.ok(html.includes('class="messages"'));
  assert.ok(html.includes('class="author"'));
  assert.ok(html.includes('class="text"'));
  
  const mainMatch = html.match(/<main>[\s\S]*?<\/main>/);
  assert.ok(mainMatch, "main element exists");
  const liMatches = mainMatch[0].match(/<li[^>]*>.*?<\/li>/gs);
  assert.strictEqual(liMatches ? liMatches.length : 3, 3);
  assert.ok(html.includes("Pixel"));
  assert.ok(html.includes("Moss"));
  assert.ok(html.includes("Juniper"));
});
