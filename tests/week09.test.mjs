// Week 9 — Fetch and wait.  The grader must not depend on the network or on
// whichever API the student picked, so `fetch` is stubbed and we check that the
// code awaits properly, formats for a human, and survives a failure.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load, need } from "./_harness.mjs";

const FILE = "week09-async.js";
const NAMES = ["fetchData", "formatResult"];

describe("Week 9 — Fetch and wait", () => {
  test("the file runs without throwing", () => load(FILE, NAMES));

  test("fetchData is async — it returns a promise", () => {
    const f = need(load(FILE, NAMES).fns, "fetchData", FILE);
    const returned = f("https://example.test/data");
    assert.ok(returned && typeof returned.then === "function",
      "fetchData should be `async`, so calling it gives you a promise");
    returned.catch(() => {});
  });

  test("fetchData awaits the response rather than returning the promise raw", async () => {
    const { fns } = load(FILE, NAMES);
    const got = await need(fns, "fetchData", FILE)("https://example.test/data");
    assert.ok(got === undefined || typeof got !== "object" || !("then" in Object(got)),
      "you are returning the promise itself — `await` it first");
  });

  test("a failing request is caught, not thrown at the user", async () => {
    const { fns } = load(FILE, NAMES);
    const f = need(fns, "fetchData", FILE);
    await assert.doesNotReject(
      async () => { await f("https://definitely-not-a-real-host.invalid/x"); },
      "wrap the call in try/catch — test it by turning your wifi off"
    );
  });

  test("formatResult turns data into something a human reads", () => {
    const f = need(load(FILE, NAMES).fns, "formatResult", FILE);
    const got = f({ name: "Accra", temperature: 31, humidity: 78 });
    assert.equal(typeof got, "string", "formatResult should return a string");
    assert.ok(got.length > 5, "format it into a sentence, not a bare value");
    assert.ok(!got.includes("[object Object]"), "you are printing the object instead of its fields");
  });

  test("it says Loading before the data arrives", () => {
    const { source } = load(FILE, NAMES);
    assert.match(source, /loading/i, 'show a "Loading..." message before the data arrives');
  });

  test("there is a comment explaining why await is needed", () => {
    const { source } = load(FILE, NAMES);
    const comments = [...source.matchAll(/\/\/(.*)|\/\*([\s\S]*?)\*\//g)]
      .map((m) => (m[1] || m[2] || "")).join(" ");
    assert.match(comments, /await|async|wait/i,
      "one comment should explain, in your words, why `await` is needed");
  });
});
