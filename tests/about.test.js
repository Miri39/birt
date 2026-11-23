const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("about page meets acceptance criteria", () => {
  const html = fs.readFileSync("_site/about/index.html", "utf8");
  
  const h1Matches = html.match(/<h1[^>]*>.*?<\/h1>/gs);
  assert.strictEqual(h1Matches ? h1Matches.length : 0, 1);
  assert.ok(html.includes(">About birt</h1>"));

  const mainMatch = html.match(/<main>[\s\S]*?<\/main>/);
  assert.ok(mainMatch, "main element exists");
  const mainContent = mainMatch[0];
  
  const pMatches = mainContent.match(/<p[^>]*>.*?<\/p>/gs);
  assert.ok(pMatches && pMatches.length >= 3, "at least 3 p elements in main");

  assert.ok(html.includes("Table 1"));
  assert.ok(html.includes("Table 2"));
});
