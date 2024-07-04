import moo from "moo";
import fs from "node:fs";


const lexer = moo.compile({
  expelliarmus: "let",
  estupefaça: "function",
  reducto: "return",
  expecto: "if",
  patronum: "else",
  arrestoMomentum: "for",
  oculosReparo: /\bconsole.log/,
});

const code = `\r\n${fs.readFileSync("code.txt", "utf-8")}`;

lexer.reset(code);

let token;
let tokens = [];

while ((token = lexer.next())) {
  const next = lexer.next();
  if (next) {
    tokens.push({ type: next.type, value: next.value });
  }
}
console.log("🚀 ~ tokens:", tokens);
