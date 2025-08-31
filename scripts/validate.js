import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("validate");
const LOG_DONE_FILE = path.resolve("logs/validate.done");

async function runLighthouse(url = "http://localhost:8080") {
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-zygote",
    ],
  });

  try {
    log.info("Chrome iniciado em modo headless");
    const options = { port: chrome.port, output: "html" };
    const runnerResult = await lighthouse(url, options);

    log.info(`Performance: ${runnerResult.lhr.categories.performance.score * 100}`);
    log.info(`Best Practices: ${runnerResult.lhr.categories['best-practices'].score * 100}`);
    log.info(`SEO: ${runnerResult.lhr.categories.seo.score * 100}`);

    await chrome.kill();

    await fs.outputFile("logs/lighthouse-report.html", runnerResult.report);
    log.info("Relatório salvo em logs/lighthouse-report.html");

    // Grava arquivo .done para sinalizar sucesso
    await fs.writeFile(LOG_DONE_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_DONE_FILE}`);

  } catch (err) {
    log.error(`Erro no Lighthouse: ${err.message}`);
    await chrome.kill();
    process.exit(1);
  }
}

runLighthouse().catch((err) => {
  log.error(`Falha na execução do validate.js: ${err.message}`);
  process.exit(1);
});

