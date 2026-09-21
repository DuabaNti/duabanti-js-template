// Week 7 — Class design.  Students pick their own subject (a trotro route, a
// shop, a team), so this checks the shape of the design rather than guessing
// names. Structure is read from the source; behaviour from the class itself.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { load } from "./_harness.mjs";

const FILE = "week07-classes.js";

const classesIn = (src) => [...src.matchAll(/\bclass\s+([A-Za-z_$][\w$]*)/g)].map((m) => m[1]);

describe("Week 7 — Class design", () => {
  test("the file runs without throwing", () => load(FILE));

  test("there are at least two classes, and one extends the other", () => {
    const { source } = load(FILE);
    const names = classesIn(source);
    assert.ok(names.length >= 2, `found ${names.length} class(es) — the brief asks for two`);
    assert.match(source, /\bclass\s+[A-Za-z_$][\w$]*\s+extends\s+/,
      "one class should `extends` another");
  });

  test("the base class has a constructor", () => {
    const { source } = load(FILE);
    assert.match(source, /constructor\s*\(/, "a class needs a constructor that takes its data");
  });

  test("a class has at least three methods of its own", () => {
    const { source } = load(FILE);
    const body = source.slice(source.indexOf("class"));
    const methods = [...body.matchAll(/^\s{2,}(?:static\s+|get\s+|async\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{/gm)]
      .map((m) => m[1])
      .filter((n) => n !== "constructor" && n !== "if" && n !== "for" && n !== "while" && n !== "switch" && n !== "catch");
    assert.ok(methods.length >= 3,
      `found ${methods.length} method(s) (${methods.join(", ") || "none"}) — the brief asks for three`);
  });

  test("at least three instances are created", () => {
    const { source } = load(FILE);
    const news = [...source.matchAll(/\bnew\s+[A-Za-z_$][\w$]*\s*\(/g)];
    assert.ok(news.length >= 3, `found ${news.length} \`new\` — create at least three instances and use them`);
  });

  test("something returns a formatted summary, and the file prints it", () => {
    const { output } = load(FILE);
    assert.ok(output.length > 0, "use your instances and print a summary");
    assert.ok(output.some((l) => l.trim().length > 10),
      "the summary should be a readable sentence, not a bare value");
  });
});
