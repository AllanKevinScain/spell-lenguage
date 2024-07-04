import moo from "moo";
import fs from "node:fs";


const lexer = moo.compile({
  buses: ["(", ")", "{", "}"],
  arrow: "=>",
  variables: ["var", "let", "const"],
  comparators: ["=", "<", ">", "<=", ">=", "==", "==="],
  operators: ["+", "-", "/", "*", "%"],
  pointers: [";", ","],
  spaces: /[ \t]+/,
  workeys: { match: [/\bif/, /\belse/, /\bfor/, /\breturn/, /\bfunction/], value: s => s },
  log: /\bconsole.log/,
  identificadores: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
  numero: /0|[1-9][0-9]*/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  fim_de_linha: { match: /\r/, lineBreaks: true },
});

const ignoreTokens = ["buses", "arrow", "comparators", "operators", "pointers", "spaces", "fim_de_linha"];

const file = fs.readFileSync("code.txt", "utf-8");
const splitedFile = file.split("\r\n");
const concertArrayForLexerRead = splitedFile.map(s => ` ${s}`)

let token;
let tokens = [];

function constructTokens(code) {
  lexer.reset(code);
  while ((token = lexer.next())) {
    const next = lexer.next();
    if (next) {
      const index = ignoreTokens.findIndex(i => i === next.type);
      if (index === -1) {
        tokens.push({ type: next.type, value: next.value });
      }
    }
  }
}
concertArrayForLexerRead.map(line => constructTokens(line));

console.log("🚀 ~ tokens:", tokens)