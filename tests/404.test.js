const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("404 page meets acceptance criteria", () => {
  const html = fs.readFileSync("_site/404.html", "utf8");
  assert.ok(html.includes("<header>"));
  assert.ok(html.includes("<main>"));
  assert.ok(html.includes("<footer>"));

  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gs);
  assert.strictEqual(h1Matches ? h1Matches.length : 0, 1);
  assert.ok(html.includes(">Nothing at this table</h1>"));

  assert.ok(html.includes('href="/birt/"'));
});
