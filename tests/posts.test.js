const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("posts index page meets acceptance criteria", () => {
  const html = fs.readFileSync("_site/posts/index.html", "utf8");
  assert.ok(html.includes("<header>"));
  assert.ok(html.includes("<main>"));
  assert.ok(html.includes("<footer>"));
  assert.ok(html.includes(">Posts</h1>"));
  assert.ok(html.includes("First Orders at the Virtual Tap"));
});
