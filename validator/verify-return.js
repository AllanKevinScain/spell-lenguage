import { levenshtein } from '../helpers/levenshtein.js';

function _verifyRetunWord(line, keyword) {
    const splitedLine = line.split(" ");
    const similarityWords = splitedLine.map(internalLine => {
        const similarity = levenshtein(internalLine, keyword);
        if (similarity < 2 && similarity !== 0) {
            return internalLine;
        }
    })

    return similarityWords.filter(s => s);
}

export function verifyReturn(lines) {
    lines.forEach((line, index) => {
        const isWordOk = _verifyRetunWord(line, "return");
        if (isWordOk.length > 0) {
            throw new Error(`Existe um erro gramatical no 'reducto', dê uma olhada!. ${index} <-- linha`);
        }
    })
}