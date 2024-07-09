// libs
import fs from "node:fs";
import shell from "shelljs";

// all imports
import { dictionary } from '../../dictionary.js';

export function groupValuesIntoArray(data) {
    const tokens = [];

    data.forEach(objc => {
        const hasLine = tokens.findIndex(i => i.line === objc.line);

        if (hasLine !== -1) {
            const removedItem = tokens.splice(hasLine)[0];
            const concatedItem = {
                ...removedItem,
                type: [removedItem.type, objc.type],
                value: [removedItem.value, objc.value]
            }

            tokens.push(concatedItem);
        } else {
            tokens.push(objc);
        }
    })

    return tokens;
}

function _addOriginalLines(originalLines, jsTokens) {
    return originalLines.map((line, index) => {
        const hasLineInJSTokensData = jsTokens.filter(i => index === i.line);
        if (hasLineInJSTokensData.length > 0) {
            return hasLineInJSTokensData[0].value;
        }

        return line;
    });
}

export function replacedTokensValuesForJSTokens(tokens, originLines) {
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

    return _addOriginalLines(originLines, jsTokens);
}

export function generateFile(data) {
    try {
        if (!shell.test('-d', 'dist')) {
            shell.mkdir("dist");
        }
        fs.writeFileSync("dist/index.js", data);

        return true;
    } catch (err) {
        console.error("Ocorreu um erro ao criar o arquivo index.js", err);
        return false;
    }
}