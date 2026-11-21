const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

const hasHome = fs.readdirSync("src").some((f) => /^index\./.test(f));

test(
  "the build produces an index page",
  { skip: !hasHome && "no home page in src/ yet" },
  () => {
    assert.ok(fs.existsSync("_site/index.html"));
  }
);
