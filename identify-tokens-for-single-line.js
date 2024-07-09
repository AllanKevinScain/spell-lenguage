export function concatValuesForLine(data) {
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