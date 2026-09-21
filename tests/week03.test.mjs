// Week 3 — Grade calculator.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load, need, closeTo } from "./_harness.mjs";

const FILE = "week03-grade-calculator.js";
const NAMES = ["average", "getGrade", "isValidScore"];

describe("Week 3 — Grade calculator", () => {
  test("the file runs without throwing", () => load(FILE, NAMES));

  test("average works", () => {
    const f = need(load(FILE, NAMES).fns, "average", FILE);
    assert.ok(closeTo(f([10, 20, 30]), 20));
    assert.ok(closeTo(f([50]), 50));
  });

  test("average does not crash on an empty list", () => {
    const f = need(load(FILE, NAMES).fns, "average", FILE);
    const got = f([]);
    assert.ok(got === 0 || got === null || Number.isNaN(got),
      "an empty list should give 0, null or NaN — never a crash");
  });

  test("getGrade maps scores to letters", () => {
    const f = need(load(FILE, NAMES).fns, "getGrade", FILE);
    assert.equal(String(f(95)).toUpperCase()[0], "A");
    assert.equal(String(f(85)).toUpperCase()[0], "B");
    assert.equal(String(f(75)).toUpperCase()[0], "C");
    assert.notEqual(String(f(20)).toUpperCase()[0], "A", "20 is not an A");
  });

  test("isValidScore rejects out-of-range scores", () => {
    const f = need(load(FILE, NAMES).fns, "isValidScore", FILE);
    assert.equal(f(50), true);
    assert.equal(f(0), true);
    assert.equal(f(100), true);
    assert.equal(f(-1), false, "-1 is not a valid score");
    assert.equal(f(101), false, "101 is not a valid score");
  });
});
