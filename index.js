import fs from "node:fs";
import shell from "shelljs";
import { newLenguageLexer } from './lexers.js';
import { dictionary } from './dictionary.js'

const file = fs.readFileSync("code.wich.txt", "utf-8");
const splitedFile = file.split("\r\n");
const concertArrayForLexerRead = splitedFile.map(s => ` ${s}`);

let token;
let lines = NaN;
let tokens = [];
const ignoreTokens = ["buses", "arrow", "comparators", "operators", "pointers", "spaces", "numero", "string", "fim_de_linha", "identificadores"];

function constructTokensForEachLine(code) {
    newLenguageLexer.reset(code);
    if (!isNaN(lines)) {
        lines++
    } else {
        lines = 0
    };

    while ((token = newLenguageLexer.next())) {
        const next = newLenguageLexer.next();
        if (next) {
            const index = ignoreTokens.findIndex(i => i === next.type);
            if (index === -1) {
                tokens.push({ ...next, line: lines });
            }
        }
    }
}
concertArrayForLexerRead.map(line => constructTokensForEachLine(line));


const lineConstruct = tokens.map(tok => {
    const dictionaryWord = dictionary.filter(i => i.type === tok.value)[0];

    return {
        value: concertArrayForLexerRead[tok.line].replace(tok.value, dictionaryWord.value),
        line: tok.line
    };
})


const codeAdjustments = concertArrayForLexerRead.map((j, index) => {
    const replacedLine = lineConstruct.filter(i => index === i.line);
    if (replacedLine.length > 0) {
        return replacedLine[0].value;
    }

    return j;
});

const addBreakLines = codeAdjustments.join("\r\n")

if (!shell.test('-d', 'dist')) {
    shell.mkdir("dist");
}

shell.echo(addBreakLines).to('dist/index.js');
shell.exec("lexprd")
