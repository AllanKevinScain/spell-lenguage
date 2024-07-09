import { generatorJSFile } from './generator/index.js';
import { validator } from './validator/index.js';

async function main() {
    try {
        const ok = await generatorJSFile("code.txt");

        if (ok) {
            validator("dist/index.js");
        }
    } catch (error) {
        console.log("🚀 ~ ", error.message);
    }
}

main();