export function constructTokens(code, lexer, ignoreTokens) {
    let tokens = [];
    let lines = NaN;
    let token;

    function processLine(line) {
        lexer.reset(line);
        if (!isNaN(lines)) {
            lines++
        } else {
            lines = 0
        };

        while ((token = lexer.next())) {
            const index = ignoreTokens.findIndex(i => i === token.type);
            if (index === -1) {
                tokens.push({ type: token.type, value: token.value, line: lines });
            }
        }
    }

    code.forEach(line => processLine(line));

    return tokens;
}