"use strict";
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;
const configFiles = {};
const configFolderPath = path.resolve(__dirname);
(async () => {
    const files = await readdir(configFolderPath).catch(console.log);
})();
