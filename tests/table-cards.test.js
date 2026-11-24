const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("home page table cards meet acceptance criteria", () => {
  const html = fs.readFileSync("_site/index.html", "utf8");

  // Exactly 2 elements with class "table-card"
  const cardMatches = html.match(/class="table-card"/g);
  assert.strictEqual(cardMatches ? cardMatches.length : 0, 2);

  // Links to /birt/table-1/ and /birt/table-2/
  assert.ok(html.includes('href="/birt/table-1/"'));
  assert.ok(html.includes('href="/birt/table-2/"'));

  // Page has exactly one h1
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gs);
  assert.strictEqual(h1Matches ? h1Matches.length : 0, 1);
});
