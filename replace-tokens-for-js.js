import { dictionary } from './dictionary.js'

function _additionalLines(originalLines, jsTokens) {
    return originalLines.map((line, index) => {
        const hasLineInJSTokensData = jsTokens.filter(i => index === i.line);
        if (hasLineInJSTokensData.length > 0) {
            return hasLineInJSTokensData[0].value;
        }

        return line;
    });
}


export function replacedTokensValuesForJS(tokens, originLines) {
    const jsTokens = [];

    tokens.forEach(token => {
        const dictionaryWord = dictionary.filter(i => i.type === token.value)[0];


        if (typeof token.type === 'object') {
            let replacedValue = originLines[token.line];
            token.type.forEach((type, index) => {
                const dictionaryWord = dictionary.filter(i => i.value === type)[0];
                replacedValue = replacedValue.replace(token.value[index], dictionaryWord.value);
            });

            jsTokens.push({
                value: replacedValue,
                line: token.line
            })
        } else {
            jsTokens.push({
                value: originLines[token.line].replace(token.value, dictionaryWord.value),
                line: token.line
            })
        }
    });

    return _additionalLines(originLines, jsTokens);
}