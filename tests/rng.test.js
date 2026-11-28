const { test } = require("node:test");
const assert = require("node:assert");
const { hashString, seededRandom } = require("../src/assets/rng.js");

ts = test;

fs = require("node:fs");

ts("rng module meets acceptance criteria", () => {
  assert.strictEqual(typeof hashString, "function");
  assert.strictEqual(typeof seededRandom, "function");

  const h1 = hashString("test-seed");
  const h2 = hashString("test-seed");
  const h3 = hashString("other-seed");

  assert.strictEqual(h1, h2);
  assert.notStrictEqual(h1, h3);

  const rng1 = seededRandom("table-1");
  const rng2 = seededRandom("table-1");
  const rng3 = seededRandom("table-2");

  const seq1 = [rng1(), rng1(), rng1()];
  const seq2 = [rng2(), rng2(), rng2()];
  const seq3 = [rng3(), rng3(), rng3()];

  assert.deepStrictEqual(seq1, seq2);
  assert.notDeepStrictEqual(seq1, seq3);

  seq1.forEach(val => {
    assert.ok(val >= 0);
    assert.ok(val < 1);
  });
});
