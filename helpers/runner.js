import shell from "shelljs";

export function runner(command) {
    try {
        shell.exec(command);

        return true
    } catch (err) {
        console.log("🚀 ~ ocorreu um erro ao executar o arquivo index.js", err)
    }
}