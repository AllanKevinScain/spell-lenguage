import fs from "node:fs";
import shell from "shelljs";

export function generateFile(data) {
    if (!shell.test('-d', 'dist')) {
        shell.mkdir("dist");
    }

    fs.writeFile("dist/index.js", data, (err) => {
        if (err) {
            console.log("Error");
        }
    });
}