// Week 2 — Unit converter.  Run: node --test
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load, need, closeTo } from "./_harness.mjs";

const FILE = "week02-converter.js";
const NAMES = ["cedisToDollars", "kmToMiles", "celsiusToFahrenheit"];

describe("Week 2 — Unit converter", () => {
  test("the file runs without throwing", () => {
    load(FILE, NAMES);
  });

  test("celsiusToFahrenheit converts correctly", () => {
    const { fns } = load(FILE, NAMES);
    const f = need(fns, "celsiusToFahrenheit", FILE);
    assert.ok(closeTo(f(0), 32), "0°C should be 32°F");
    assert.ok(closeTo(f(100), 212), "100°C should be 212°F");
    assert.ok(closeTo(f(25), 77), "25°C should be 77°F");
  });

  test("kmToMiles converts correctly", () => {
    const { fns } = load(FILE, NAMES);
    const f = need(fns, "kmToMiles", FILE);
    assert.ok(closeTo(f(0), 0));
    assert.ok(closeTo(f(10), 6.21, 0.05), "10 km is about 6.21 miles");
  });

  test("cedisToDollars converts and does not return the input unchanged", () => {
    const { fns } = load(FILE, NAMES);
    const f = need(fns, "cedisToDollars", FILE);
    assert.equal(typeof f(100), "number", "it should return a number");
    assert.notEqual(f(100), 100, "100 cedis is not 100 dollars — apply a rate");
  });

  test("results are rounded sensibly — nobody needs 14 decimal places", () => {
    const { fns } = load(FILE, NAMES);
    for (const name of NAMES) {
      const out = need(fns, name, FILE)(37);
      const decimals = String(out).split(".")[1]?.length ?? 0;
      assert.ok(decimals <= 4, `${name}(37) returned ${out} — round it`);
    }
  });

  test("it prints something a human can read", () => {
    const { output } = load(FILE, NAMES);
    assert.ok(output.length > 0, "the file should print its results with console.log");
    assert.ok(
      output.some((line) => /[a-zA-Z°₵$]/.test(line) && /\d/.test(line)),
      "print units and labels, not a bare number: `25°C = 77°F`, not `77`"
    );
  });
});
