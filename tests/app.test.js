const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("application has the correct title", () => {
    const html = fs.readFileSync("src/index.html", "utf8");
    assert.match(html, /College Task Manager/);
});

test("application has a task input form", () => {
    const html = fs.readFileSync("src/index.html", "utf8");
    assert.match(html, /task-form/);
    assert.match(html, /Add Task/);
});

test("application supports completing and deleting tasks", () => {
    const html = fs.readFileSync("src/index.html", "utf8");
    assert.match(html, /Complete/);
    assert.match(html, /Delete/);
});

test("build creates the output HTML file", () => {
    require("../build.js");
    assert.ok(fs.existsSync("dist/index.html"));
});