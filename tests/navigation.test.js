const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("navigation bar meets acceptance criteria", () => {
  const indexHtml = fs.readFileSync("_site/index.html", "utf8");
  const table1Html = fs.readFileSync("_site/table-1/index.html", "utf8");

  assert.ok(indexHtml.includes('<nav aria-label="Main">'));
  assert.ok(indexHtml.includes('href="/birt/"'));
  assert.ok(indexHtml.includes('href="/birt/table-1/"'));
  assert.ok(indexHtml.includes('href="/birt/table-2/"'));
  assert.ok(indexHtml.includes('href="/birt/about/"'));

  assert.ok(indexHtml.includes('href="/birt/" aria-current="page"'));
  assert.ok(!indexHtml.includes('href="/birt/table-1/" aria-current="page"'));

  assert.ok(table1Html.includes('href="/birt/table-1/" aria-current="page"'));
  assert.ok(!table1Html.includes('href="/birt/" aria-current="page"'));
});
