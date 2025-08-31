import { exec } from "child_process";
import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("full-build");
const LOG_DIR = path.resolve("logs");

function runCommand(command) {
  return new Promise((resolve, reject) => {
    log.info(`Executando: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (stdout) log.info(`stdout: ${stdout.trim()}`);
      if (stderr) log.warn(`stderr: ${stderr.trim()}`);
      if (error) {
        log.error(`Erro: ${error.message}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function waitForDone(filename, timeout = 30000) {
  const filePath = path.join(LOG_DIR, filename);
  const start = Date.now();
  while (true) {
    if (await fs.pathExists(filePath)) {
      log.info(`Arquivo de status encontrado: ${filePath}`);
      return;
    }
    if (Date.now() - start > timeout) {
      throw new Error(`Timeout esperando arquivo de status: ${filePath}`);
    }
    await new Promise((res) => setTimeout(res, 500));
  }
}

async function fullBuild() {
  try {
    log.info("Início do fluxo completo de build.");

    // 1. Analisar e otimizar imagens
    await runCommand("node scripts/analyze-images.js");
    await waitForDone("analyze-images.done");

    // 2. Executar build
    await runCommand("npm run build");
    await waitForDone("build.done");

    // 3. Substituir referências minificadas de CSS e JS
    await runCommand("node scripts/replace-build-refs.js");
    await waitForDone("replace-build-refs.done");

    // 4. Atualizar referências das imagens para usar srcset e WebP
    await runCommand("node scripts/update-image-refs.js");
    // Criar o arquivo .done para sinalizar sucesso
    await fs.writeFile(path.resolve(LOG_DIR, "update-image-refs.done"), new Date().toISOString());
    await waitForDone("update-image-refs.done");

    // 5. Criar backup automático
    await runCommand("node scripts/backup.js create");
    await waitForDone("backup.done");

    // 6. Validar build com Lighthouse
    await runCommand("node scripts/validate.js");
    await waitForDone("validate.done");

    log.info("Processo completo de build finalizado com sucesso.");
  } catch (error) {
    log.error(`Build completo falhou: ${error.message}`, error);
    process.exit(1);
  }
}

fullBuild();

