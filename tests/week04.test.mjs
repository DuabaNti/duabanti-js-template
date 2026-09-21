// Week 4 — Function workout.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load, need, closeTo } from "./_harness.mjs";

const FILE = "week04-functions.js";
const NAMES = ["calculateAverage", "getGrade", "formatCedis", "isValidScore"];

describe("Week 4 — Function workout", () => {
  test("the file runs without throwing", () => load(FILE, NAMES));

  test("all four named functions exist", () => {
    const { fns } = load(FILE, NAMES);
    for (const n of NAMES) need(fns, n, FILE);
  });

  test("calculateAverage returns a value instead of printing it", () => {
    const { fns, output } = load(FILE, NAMES);
    const before = output.length;
    const got = need(fns, "calculateAverage", FILE)([2, 4, 6]);
    assert.ok(closeTo(got, 4), "calculateAverage([2,4,6]) should be 4");
    assert.equal(output.length, before,
      "calculateAverage should `return` its answer, not console.log it");
  });

  test("formatCedis formats money", () => {
    const f = need(load(FILE, NAMES).fns, "formatCedis", FILE);
    const got = String(f(1250));
    assert.match(got, /1[,.]?250/, "1250 should appear in the output");
    assert.match(got, /(GH|₵|cedi)/i, "it should be marked as cedis");
    assert.match(got, /\.\d{2}/, "money shows two decimal places: GH₵1,250.00");
  });

  test("isValidScore still rejects out-of-range scores", () => {
    const f = need(load(FILE, NAMES).fns, "isValidScore", FILE);
    assert.equal(f(50), true);
    assert.equal(f(-1), false);
    assert.equal(f(101), false);
  });
});
