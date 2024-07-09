import fs from "node:fs";

export function fileReader(filePath) {
    const file = fs.readFileSync(filePath, "utf-8");
    const splitedFile = file.split("\r\n");
    const splitedArrayWithSpaces = splitedFile.map(s => ` ${s}`);

    return splitedArrayWithSpaces
}