
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const projectRoot = path.join(__dirname, "..");
const htmlPath = path.join(projectRoot, "src", "index.html");

test("College ERP contains its main sections", () => {
  const html = fs.readFileSync(htmlPath, "utf8");

  for (const section of [
    "My Profile",
    "Attendance",
    "Class Timetable",
    "Examination Results",
    "Fee Details",
    "College Notices"
  ]) {
    assert.ok(html.includes(section), `Missing ERP section: ${section}`);
  }
});

test("College ERP contains student dashboard information", () => {
  const html = fs.readFileSync(htmlPath, "utf8");

  assert.match(html, /Student Details/);
  assert.match(html, /Academic Year 2026–27|Academic Year 2026-27/i);
});

test("College ERP includes navigation and search functionality", () => {
  const html = fs.readFileSync(htmlPath, "utf8");

  assert.match(html, /data-page/);
  assert.match(html, /showPage/);
  assert.match(html, /searchInput/);
  assert.match(html, /notificationButton/);
});

test("build creates the output HTML file", () => {
  execFileSync(process.execPath, ["build.js"], {
    cwd: projectRoot,
    stdio: "pipe"
  });

  const outputPath = path.join(projectRoot, "dist", "index.html");

  assert.ok(fs.existsSync(outputPath), "Build should create dist/index.html");

  const builtHtml = fs.readFileSync(outputPath, "utf8");
  assert.match(builtHtml, /College ERP|Campus ERP/i);
});
