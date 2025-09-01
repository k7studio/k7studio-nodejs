import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("replace-build-refs");
const BUILD_DIR = path.resolve("build");
const INDEX_HTML = path.join(BUILD_DIR, "index.html");
const LOG_FILE = path.resolve("logs", "replace-build-refs.done");

async function replaceRefs() {
  try {
    log.info(`Lendo arquivo ${INDEX_HTML} para substituir referências...`);

    let html = await fs.readFile(INDEX_HTML, "utf-8");

    // Substitui CSS para versão minificada
    html = html.replace(/href=["']css\/style\.css["']/g, 'href="style.min.css"');

    // Substitui JS para versão minificada
    html = html.replace(/src=["']js\/main\.js["']/g, 'src="app.min.js"');

    // Substitui referências genéricas de imagens para apontar para img/opt
    html = html.replace(/src=["']([^"']+\.(jpg|png|webp))["']/gi, (match, p1) => {
      if (p1.startsWith("img/opt/")) {
        return match; // já está correto
      }
      if (p1.startsWith("img/")) {
        // Remove prefixo img/ para não duplicar
        const subPath = p1.slice(4);
        return `src="img/opt/${subPath}"`;
      }
      return `src="img/opt/${p1}"`;
    });

    await fs.writeFile(INDEX_HTML, html, "utf-8");

    log.info("Substituição de referências no HTML concluída com sucesso.");

    await fs.writeFile(LOG_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_FILE}`);
  } catch (error) {
    log.error(`Erro ao substituir referências no HTML: ${error.message}`);
    process.exit(1);
  }
}

replaceRefs();

