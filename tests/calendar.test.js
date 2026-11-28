const { test } = require("node:test");
const assert = require("node:assert");
const { todayInBucharest, dateRange } = require("../src/assets/calendar.js");

test("calendar module meets acceptance criteria", () => {
  assert.strictEqual(typeof todayInBucharest, "function");
  assert.strictEqual(typeof dateRange, "function");

  const today = todayInBucharest();
  assert.match(today, /^\d{4}-\d{2}-\d{2}$/);

  const range = dateRange("2026-11-25", "2026-11-28");
  assert.deepStrictEqual(range, [
    "2026-11-25",
    "2026-11-26",
    "2026-11-27",
    "2026-11-28"
  ]);

  const singleDay = dateRange("2026-12-01", "2026-12-01");
  assert.deepStrictEqual(singleDay, ["2026-12-01"]);

  const invalidRange = dateRange("2026-11-28", "2026-11-25");
  assert.deepStrictEqual(invalidRange, []);
});
