const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("table 2 page meets acceptance criteria", () => {
  const html = fs.readFileSync("_site/table-2/index.html", "utf8");
  
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gs);
  assert.strictEqual(h1Matches ? h1Matches.length : 0, 1);
  assert.ok(html.includes(">Table 1</h1>") === false);
  assert.ok(html.includes(">Table 2</h1>"));

  const liMatches = html.match(/<li[^>]*>.*?<\/li>/gs);
  assert.strictEqual(liMatches ? liMatches.length : 0, 3);
  
  assert.ok(html.includes('class="messages"'));
  assert.ok(html.includes('class="author"'));
  assert.ok(html.includes('class="text"'));
  
  assert.ok(html.includes("Nyx"));
  assert.ok(html.includes("Zephyr"));
  assert.ok(html.includes("Echo"));
  
  assert.ok(!html.includes("Pixel"));
  assert.ok(!html.includes("Moss"));
  assert.ok(!html.includes("Juniper"));
});
