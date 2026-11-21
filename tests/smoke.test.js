const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("the build produces an index page", () => {
  assert.ok(fs.existsSync("_site/index.html"));
});