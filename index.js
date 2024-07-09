import fs from "node:fs";
import { newLenguageLexer } from './lexers.js';
import { replacedTokensValuesForJS } from './replace-tokens-for-js.js'
import { constructTokens } from "./construct-tokens.js";
import { generateFile } from "./generate-file.js";
import { concatValuesForLine } from "./identify-tokens-for-single-line.js";

const file = fs.readFileSync("code.txt", "utf-8");
const splitedFile = file.split("\r\n");
const concertArrayForLexerRead = splitedFile.map(s => ` ${s}`);

const ignoreTokens = ["buses", "arrow", "comparators", "operators", "pointers", "spaces", "numero", "string", "fim_de_linha", "identificadores"];

const tokens = constructTokens(concertArrayForLexerRead, newLenguageLexer, ignoreTokens);
const refactorTokensForLines = concatValuesForLine(tokens);
const jSTokensWithOriginalLines = replacedTokensValuesForJS(refactorTokensForLines, concertArrayForLexerRead);
const addBreakLines = jSTokensWithOriginalLines.join("\r\n");

generateFile(addBreakLines)