const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const pages = [
  "index.html",
  "table-1/index.html",
  "table-2/index.html",
  "about/index.html",
  "404.html"
];
const assets = ["assets/style.css", "assets/favicon.svg"];

test("Check file existence", () => {
  pages.forEach(p => assert.ok(fs.existsSync(path.join("_site", p)), `${p} missing`));
  assets.forEach(a => assert.ok(fs.existsSync(path.join("_site", a)), `${a} missing`));
});

test("Check page structure (lang, h1, header, main, footer)", () => {
  pages.forEach(p => {
    const html = fs.readFileSync(path.join("_site", p), "utf8");
    assert.ok(html.includes('lang="en"'), `lang="en" missing in ${p}`);
    assert.strictEqual((html.match(/<h1/g) || []).length, 1, `Exactly one h1 required in ${p}`);
    assert.ok(html.includes("<header>"), `header missing in ${p}`);
    assert.ok(html.includes("<main>"), `main missing in ${p}`);
    assert.ok(html.includes("<footer>"), `footer missing in ${p}`);
  });
});

test("Check table message counts", () => {
  ["table-1/index.html", "table-2/index.html"].forEach(p => {
    const html = fs.readFileSync(path.join("_site", p), "utf8");
    const matches = html.match(/<li><strong class="author">/g) || [];
    assert.strictEqual(matches.length, 3, `Expected 3 messages in ${p}`);
  });
});

test("Check navigation links", () => {
  pages.forEach(p => {
    const html = fs.readFileSync(path.join("_site", p), "utf8");
    const navLinks = (html.match(/<nav.*?<\/nav>/s)[0].match(/href="/g) || []);
    assert.strictEqual(navLinks.length, 4, `Expected 4 nav links in ${p}`);
  });
});

test("Check internal links resolve", () => {
  pages.forEach(p => {
    const html = fs.readFileSync(path.join("_site", p), "utf8");
    const links = [...html.matchAll(/(href|src)="(\/birt\/[^"]*)"/g)];
    links.forEach(([, , url]) => {
      const relativePath = url.replace("/birt/", "");
      const target = path.join("_site", relativePath.endsWith("/") ? relativePath + "index.html" : relativePath);
      assert.ok(fs.existsSync(target), `Broken internal link: ${url}`);
    });
  });
});

test("No external http/https resources", () => {
  pages.forEach(p => {
    const html = fs.readFileSync(path.join("_site", p), "utf8");
    const external = html.match(/(href|src)="(https?:\/\/[^"]*)"/g);
    assert.strictEqual(external, null, `External resource found in ${p}: ${external}`);
  });
});