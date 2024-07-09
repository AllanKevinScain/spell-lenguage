import { generatorJSFile } from './generator/index.js';
import { validator } from './validator/index.js';

const archive = "code.spell.txt"

async function main() {
    const patternArchive = /\.spell/;
    const match = patternArchive.test(archive);
    try {
        if (match) {
            const ok = await generatorJSFile(archive);

            if (ok) {
                validator("dist/index.js");
            }
        } else {
            throw new Error("Tipo de arquivo inválido!")
        }
    } catch (error) {
        console.log("💥 ~ Erro: ", error.message);
    }
}

main();