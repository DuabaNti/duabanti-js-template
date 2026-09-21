// Week 8 — Bug hunt.  Tests the FIXED behaviour of week08-broken.js.
// Each test is one of the seven planted bugs, so a student can see which
// remain. Names match the file we hand out, so nothing is renamed.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load, need, closeTo } from "./_harness.mjs";

const FILE = "week08-broken.js";
const NAMES = ["average", "getGrade", "hasPassed", "addBonus", "shout", "report"];

describe("Week 8 — Bug hunt (7 bugs)", () => {
  test("bug 1 — average no longer reads past the end of the array", () => {
    const f = need(load(FILE, NAMES).fns, "average", FILE);
    const got = f([72, 65, 80]);
    assert.ok(!Number.isNaN(got), "average() is returning NaN — the loop runs one step too far");
    assert.ok(closeTo(got, 72.33, 0.01), `expected about 72.33, got ${got}`);
  });

  test("bug 2 — average survives an empty list", () => {
    const f = need(load(FILE, NAMES).fns, "average", FILE);
    const got = f([]);
    assert.ok(!Number.isNaN(got), "an empty list divides by zero — guard it");
    assert.equal(got, 0, "an empty list should average to 0");
  });

  test("bug 3 — getGrade returns A instead of undefined", () => {
    const f = need(load(FILE, NAMES).fns, "getGrade", FILE);
    assert.equal(f(91), "A", "the A branch computes a value but never returns it");
    assert.equal(f(70), "B");
    assert.equal(f(55), "C");
    assert.equal(f(20), "F");
  });

  test("bug 4 — hasPassed actually compares", () => {
    const f = need(load(FILE, NAMES).fns, "hasPassed", FILE);
    assert.equal(f(50), true, "50 is the pass mark");
    assert.equal(f(80), true);
    assert.equal(f(49), false, "hasPassed is always true — check `=` against `===`");
    assert.equal(f(0), false);
  });

  test("bug 5 — addBonus adds instead of concatenating", () => {
    const f = need(load(FILE, NAMES).fns, "addBonus", FILE);
    assert.equal(f(72, "5"), 77, 'a string bonus concatenates: "72" + "5" is "725"');
    assert.equal(f(72, 5), 77);
  });

  test("bug 6 — shout copes with a missing name", () => {
    const f = need(load(FILE, NAMES).fns, "shout", FILE);
    assert.equal(f("ama"), "AMA");
    assert.doesNotThrow(() => f(undefined), "one student has no name — do not crash on them");
  });

  test("bug 7 — report runs to the end and returns a string", () => {
    const { fns } = load(FILE, NAMES);
    const f = need(fns, "report", FILE);
    const got = f([{ name: "Ama", scores: [72, 65, 80] }, { scores: [60, 70] }]);
    assert.equal(typeof got, "string", "report should return the finished report");
    assert.match(got, /AMA/, "it should include each student");
    assert.match(got, /2/, "it should end with how many students there were");
  });

  test("the whole file runs top to bottom without throwing", () => {
    const { output } = load(FILE, NAMES);
    assert.ok(output.length >= 1, "the file should still print its report at the end");
  });
});
