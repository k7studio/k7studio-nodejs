import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("update");
const LOG_DONE_FILE = path.resolve("logs/update.done");

// Lista apenas arquivos ou pastas importantes do projeto a serem copiados para ./build
const ITEMS_TO_COPY = [
  "index.html",
  "css",
  "img",
  "js",
  // adicione outras pastas ou arquivos conforme necessário (ex: "fonts", "media", etc)
];

async function updateContent() {
  try {
    log.info("Iniciando atualização incremental de conteúdo...");
    for (const item of ITEMS_TO_COPY) {
      const src = path.join(".", item);
      const dest = path.join("build", item);
      if (await fs.pathExists(src)) {
        await fs.copy(src, dest, { overwrite: true });
        log.info(`Copiado: ${src} -> ${dest}`);
      } else {
        log.warn(`Não encontrado, ignorado: ${src}`);
      }
    }
    log.info("Atualização incremental concluída.");

    // Criar arquivo .done para sinalizar conclusão
    await fs.writeFile(LOG_DONE_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_DONE_FILE}`);

  } catch (error) {
    log.error(`Erro ao atualizar conteúdo: ${error.message}`);
    process.exit(1);
  }
}

updateContent();

