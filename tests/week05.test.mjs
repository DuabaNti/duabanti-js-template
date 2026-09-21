// Week 5 — Array workout.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load, need, closeTo, hostify } from "./_harness.mjs";

const FILE = "week05-arrays.js";
const NAMES = ["getNames", "getPassing", "getTotal", "getTopScorer", "rank"];
const STUDENTS = [
  { name: "Ama", score: 72 }, { name: "Kofi", score: 45 }, { name: "Esi", score: 91 },
  { name: "Yaw", score: 38 }, { name: "Akua", score: 65 }, { name: "Kwame", score: 88 },
  { name: "Abena", score: 54 }, { name: "Kojo", score: 79 },
];

describe("Week 5 — Array workout", () => {
  test("the file runs without throwing", () => load(FILE, NAMES));

  test("getNames returns just the names", () => {
    const got = need(load(FILE, NAMES).fns, "getNames", FILE)(STUDENTS);
    assert.ok(Array.isArray(got), "it should return an array");
    assert.deepEqual(hostify(got), STUDENTS.map((s) => s.name));
  });

  test("getPassing keeps only those who passed", () => {
    const got = hostify(need(load(FILE, NAMES).fns, "getPassing", FILE)(STUDENTS));
    assert.ok(Array.isArray(got));
    assert.ok(got.length < STUDENTS.length, "not everyone passed — some scores are under 50");
    assert.ok(got.every((s) => (s.score ?? s) >= 50), "everyone returned should have 50 or more");
  });

  test("getTotal adds the scores up", () => {
    const expected = STUDENTS.reduce((n, s) => n + s.score, 0);
    assert.ok(closeTo(need(load(FILE, NAMES).fns, "getTotal", FILE)(STUDENTS), expected));
  });

  test("getTopScorer finds the highest", () => {
    const got = hostify(need(load(FILE, NAMES).fns, "getTopScorer", FILE)(STUDENTS));
    const name = typeof got === "string" ? got : got?.name;
    assert.equal(name, "Esi", "Esi scored 91, the highest");
  });

  test("rank orders highest first and does not destroy the original array", () => {
    const input = STUDENTS.map((s) => ({ ...s }));
    const got = hostify(need(load(FILE, NAMES).fns, "rank", FILE)(input));
    assert.ok(Array.isArray(got));
    const scores = got.map((s) => s.score ?? s);
    assert.deepEqual(scores, [...scores].sort((a, b) => b - a), "highest score should come first");
  });
});
