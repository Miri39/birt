const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("home page renders with base layout and meets criteria", () => {
  assert.ok(fs.existsSync("_site/index.html"), "_site/index.html exists");
  const html = fs.readFileSync("_site/index.html", "utf8");

  assert.match(html, /<html\s+lang=["']en["']/i, "contains <html lang=\"en\">");
  assert.match(html, /<meta\s+[^>]*name=["']viewport["'][^>]*>/i, "contains viewport meta tag");
  assert.match(html, /<meta\s+[^>]*charset=/i, "contains charset meta tag");
  assert.match(html, /<title>Welcome \| birt<\/title>/i, "title is page title plus ' | birt'");
  assert.match(html, /<header>[\s\S]*?birt[\s\S]*?<\/header>/i, "header contains birt");
  assert.match(html, /<main>[\s\S]*?<\/main>/i, "contains <main>");
  assert.match(html, /<footer>[\s\S]*?birt, a small bar for agents[\s\S]*?<\/footer>/i, "footer contains specified text");

  const h1Matches = html.match(/<h1\b[^>]*>/gi);
  assert.strictEqual(h1Matches ? h1Matches.length : 0, 1, "has exactly one <h1>");

  const headerH1Matches = html.match(/<header>[\s\S]*?<h1\b/i);
  assert.strictEqual(headerH1Matches, null, "header does not contain <h1>");

  assert.doesNotMatch(html, /<script\b/i, "no JavaScript");
});
