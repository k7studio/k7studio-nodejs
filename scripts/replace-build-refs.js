import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("replace-build-refs");

const BUILD_DIR = path.resolve("build");
const INDEX_HTML = path.join(BUILD_DIR, "index.html");
const LOG_DONE_FILE = path.resolve("logs/replace-build-refs.done");

async function replaceRefs() {
  try {
    log.info(`Lendo arquivo ${INDEX_HTML} para substituir referências...`);
    let html = await fs.readFile(INDEX_HTML, "utf-8");

    // Substituir CSS original pela versão minificada
    html = html.replace(/href=["']css\/style\.css["']/g, 'href="style.min.css"');

    // Substituir JS original pela versão minificada
    html = html.replace(/src=["']js\/main\.js["']/g, 'src="app.min.js"');

    // Substituir referência genérica de imagens para apontar para img/opt/
    // Encontra src="nome.ext" onde ext é jpg, png ou webp, e acrescenta img/opt/ no caminho
    html = html.replace(/src=["']([^"']+\.(jpg|png|webp))["']/gi, (match, p1) => {
      // Se já contém img/opt, não altera
      if (p1.startsWith('img/opt/')) return match;
      return `src="img/opt/${p1}"`;
    });

    await fs.writeFile(INDEX_HTML, html, "utf-8");

    log.info("Substituição de referências no HTML concluída com sucesso.");
    // Criação do arquivo .done para indicar sucesso
    await fs.writeFile(LOG_DONE_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_DONE_FILE}`);
  } catch (error) {
    log.error(`Erro ao substituir referências no build/index.html: ${error.message}`);
    process.exit(1);
  }
}

replaceRefs();

