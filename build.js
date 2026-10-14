const fs = require("node:fs");
const path = require("node:path");

fs.mkdirSync("dist", { recursive: true });

fs.copyFileSync(
    path.join("src", "index.html"),
    path.join("dist", "index.html")
);

console.log("Build successful: dist/index.html created.");