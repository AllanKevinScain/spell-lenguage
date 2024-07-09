// lexer
import { newLenguageLexer } from "../lexers.js";

// helpers
import { fileReader } from "../helpers/file-reader.js";
import { tokensConstructor } from "../helpers/construct-tokens.js";
import { generateFile, groupValuesIntoArray, replacedTokensValuesForJSTokens } from "./helpers/index.js";

// global constants
import { ignoreTokens } from '../constants/index.js'

export function generatorJSFile(filePath) {
    const separedtedFileByLines = fileReader(filePath);

    const tokens = tokensConstructor(separedtedFileByLines, newLenguageLexer, ignoreTokens);
    const reassembleTokenValues = groupValuesIntoArray(tokens);
    const jSTokensWithOriginalLines = replacedTokensValuesForJSTokens(reassembleTokenValues, separedtedFileByLines);

    const addBreakLines = jSTokensWithOriginalLines.join("\r\n");

    return new Promise((resolve, _) => resolve(generateFile(addBreakLines)))
}
