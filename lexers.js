import moo from "moo";

const commonLexers = {
    buses: ["(", ")", "{", "}"],
    arrow: "=>",
    comparators: ["=", "<", ">", "<=", ">=", "==", "==="],
    operators: ["+", "-", "/", "*", "%"],
    pointers: [";", ","],
    spaces: /[ \t]+/,
    numero: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    fim_de_linha: { match: /\r/, lineBreaks: true },
}

export const javascriptLexer = moo.compile({
    ...commonLexers,
    // variaveis
    variables: ["var", "let", "const"],

    // palavras reservadas
    wordkeys: { match: [/\bif\s/, /\belse\s/, /\bfor\s/, /\breturn\s/, /\bfunction\s/, /\bwhile\s/], value: s => s },
    log: /\bconsole.log/,

    // identificadores
    identificadores: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
});

export const newLenguageLexer = moo.compile({
    ...commonLexers,

    // palavras reservadas
    let: { match: /\bexpelliarmus/, value: s => s },
    function: { match: /\bestupefaça/, value: s => s },
    return: { match: /\breducto/, value: s => s },
    if: { match: /\bexpecto/, value: s => s },
    else: { match: /\bpatronum/, value: s => s },
    for: { match: /\barrestoMomentum/, value: s => s },
    while: { match: /\bwingardium_leviosa/, value: s => s },
    log: { match: /\boculosReparo/, value: s => s },

    // identificadores
    identificadores: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
});