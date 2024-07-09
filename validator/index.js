// lexer
import { javascriptLexer } from "../lexers.js";

import { fileReader } from '../helpers/file-reader.js';
import { tokensConstructor } from '../helpers/construct-tokens.js';
import { runner } from '../helpers/runner.js';

import { verifyBuses, verifyBusesByQuantity } from "./verify-buses.js";
import { verifyReturn } from "./verify-return.js";

export function validator(filePath) {
    const separedtedFileByLines = fileReader(filePath);

    const tokens = tokensConstructor(separedtedFileByLines, javascriptLexer, ["spaces"]);

    // validadores
    verifyBuses(tokens);
    verifyBusesByQuantity(tokens);
    verifyReturn(separedtedFileByLines);

    // roda o código js
    return new Promise((resolve, _) => resolve(runner("npm run build")))
}