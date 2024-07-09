function _keywordIdentifierBeforeKey(tokens, index, lineBreaket) {
    let aux = false;

    tokens.forEach((obj, internalIndex) => {
        if (index > internalIndex) {
            if (obj.type === 'wordkeys') {
                if (obj.line === lineBreaket) {
                    aux = true;
                }
            }
        }
    });

    return aux;
}

export function verifyBuses(tokens) {
    tokens.forEach((obj, index) => {
        if (obj.type === "buses" && obj.value === "{") {
            const hasWordKey = _keywordIdentifierBeforeKey(tokens, index, obj.line);

            if (!hasWordKey) {
                throw new Error(`Uma chave foi aberta, e não possui nenhuma declaração associada. ${obj.line} <-- linha`);
            }
        }
    })
}

function _countingBuses(tokens) {
    let keyCount = 0, keyLines = [];
    let parenthCount = 0, parenthLines = [];

    tokens.forEach(obj => {
        if (obj.type === 'buses') {
            if (obj.value === '(' || obj.value === ')') {
                parenthCount++
                keyLines.push(obj.line);
            };
            if (obj.value === '{' || obj.value === '}') {
                keyCount++
                parenthLines.push(obj.line);
            };
        }
    });

    if (keyCount % 2 === 0) {
        if (parenthCount % 2 === 0) {
            return {
                ok: true
            }
        }
        return {
            ok: false,
            parenth: parenthLines
        }
    };
    return {
        ok: false,
        key: keyLines
    }
}

export function verifyBusesByQuantity(tokens) {
    const buses = _countingBuses(tokens);

    if (!buses.ok) {
        let lines = [];
        if (buses.key) {
            lines = buses.key
        } else if (buses.parenth) {
            lines = buses.parenth
        }

        throw new Error(`Uma chave foi aberta, mas não foi fechada!\n Verifique se as linhas ${JSON.stringify(lines)} estão corretas! <-- linhas`);
    }
}