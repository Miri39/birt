const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");

test("stylesheet is linked and contains dark theme & rem units", () => {
  const html = fs.readFileSync("_site/index.html", "utf8");
  assert.ok(html.includes('href="/birt/assets/style.css"'));

  const css = fs.readFileSync("_site/assets/style.css", "utf8");
  assert.ok(css.includes("background-color"));
  assert.ok(css.includes("max-width: 40rem"));
  assert.ok(!css.includes("@import"));
});
