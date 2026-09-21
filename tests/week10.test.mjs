// Week 10 — First Node script.  This one is mostly about repo hygiene, so it
// inspects the repository rather than importing a function.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

describe("Week 10 — First Node script", () => {
  test("there is a real package.json", () => {
    assert.ok(existsSync("package.json"), "run `npm init` — you need a package.json");
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    assert.ok(pkg.name, "package.json needs a name");
  });

  test("at least one package from npm is installed and used", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    assert.ok(Object.keys(deps).length > 0, "install one package and use it");
  });

  test(".gitignore exists and ignores node_modules", () => {
    assert.ok(existsSync(".gitignore"), "you need a .gitignore");
    const text = readFileSync(".gitignore", "utf8");
    assert.match(text, /node_modules/,
      "node_modules must be ignored — committing it is the classic beginner mistake");
  });

  test("node_modules was not committed", () => {
    assert.ok(!existsSync("node_modules/.package-lock.json") || existsSync(".gitignore"),
      "node_modules appears to be in the repo — add it to .gitignore and remove it");
  });

  test("the code is split across at least two files", () => {
    const js = readdirSync(".", { recursive: true })
      .filter((f) => typeof f === "string" && f.endsWith(".js") && !f.includes("node_modules") && !f.includes("tests"));
    assert.ok(js.length >= 2, `found ${js.length} .js file(s) — split the work across at least two`);
  });

  test("the script reads a file in and writes a file out", () => {
    const src = readdirSync(".", { recursive: true })
      .filter((f) => typeof f === "string" && f.endsWith(".js") && !f.includes("node_modules") && !f.includes("tests"))
      .map((f) => readFileSync(f, "utf8")).join("\n");
    assert.match(src, /readFile|readFileSync/, "read a data file in");
    assert.match(src, /writeFile|writeFileSync|appendFile/, "write a result file out");
  });
});
