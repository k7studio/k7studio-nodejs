import fs from "fs-extra";
import penthouse from "penthouse";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("penthouse-critical");

async function generateCriticalCSS() {
  try {
    log.info("Iniciando geração de CSS crítico via Penthouse...");
    const criticalCSS = await penthouse({
      url: `file://${path.resolve("index.html")}`,
      css: path.resolve("css/style.css"),
      timeout: 120000, // timeout aumentado para 2 minutos
      width: 375,
      height: 667,
    });
    await fs.outputFile("build/critical.min.css", criticalCSS);
    log.info("CSS crítico gerado com sucesso.");
  } catch (error) {
    log.error(`Erro na geração do CSS crítico: ${error.message}`);
    process.exit(1);
  }
}

generateCriticalCSS();

