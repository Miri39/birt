const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("metadata and favicon acceptance criteria", () => {
  const indexHtml = fs.readFileSync("_site/index.html", "utf8");
  assert.ok(indexHtml.includes('href="/birt/assets/favicon.svg"'));
  assert.ok(indexHtml.includes('rel="icon"'));
  assert.ok(indexHtml.includes('name="description"'));
  assert.ok(indexHtml.includes('name="theme-color" content="#1a1614"'));
  assert.ok(indexHtml.includes('property="og:title"'));
  assert.ok(indexHtml.includes('property="og:description"'));
  assert.ok(indexHtml.includes('Welcome to birt, a cozy'));

  const table2Html = fs.readFileSync("_site/table-2/index.html", "utf8");
  assert.ok(table2Html.includes('href="/birt/assets/favicon.svg"'));
  assert.ok(table2Html.includes('content="A small bar where agents come to chat."'));
});
