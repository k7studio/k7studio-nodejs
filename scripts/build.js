import fs from "fs-extra";
import path from "path";
import CleanCSS from "clean-css";
import * as terser from "terser";
import { minify as htmlMinifier } from "html-minifier-terser";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import glob from "glob";
import { createLogger } from "./utils/logger.js";

const log = createLogger("build");
const LOG_DONE_FILE = path.resolve("logs/build.done");

async function build() {
  try {
    log.info("Iniciando otimização...");

    // Limpa a pasta build
    await fs.emptyDir("build");

    // CSS: minificar e salvar
    const css = await fs.readFile("css/style.css", "utf-8");
    const minifiedCSS = new CleanCSS({}).minify(css).styles;
    await fs.outputFile("build/style.min.css", minifiedCSS);

    // JS: minificar e salvar
    const js = await fs.readFile("js/main.js", "utf-8");
    const minifiedJS = await terser.minify(js);
    await fs.outputFile("build/app.min.js", minifiedJS.code);

    // HTML: minificar e salvar
    const html = await fs.readFile("index.html", "utf-8");
    const minifiedHTML = await htmlMinifier(html, {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
    });
    await fs.outputFile("build/index.html", minifiedHTML);

    // Imagens WebP simples (sem srcset) para build/img
    await imagemin(["img/*.{jpg,png}"], {
      destination: "build/img",
      plugins: [imageminWebp({ quality: 80 })],
    });

    // Copiar arquivos .ico (ex: favicon.ico) para build/img/
    const icoFiles = glob.sync("img/*.ico");
    for (const icoFile of icoFiles) {
      const filename = path.basename(icoFile);
      await fs.copy(icoFile, path.join("build", "img", filename));
      log.info(`Arquivo ${filename} copiado para build/img/`);
    }

    // Copiar toda a pasta img/opt com as imagens otimizadas e srcsets para build/img/opt
    const optSrc = path.resolve("img/opt");
    const optDest = path.join("build", "img", "opt");
    await fs.copy(optSrc, optDest);
    log.info("Pasta img/opt copiada para build/img/opt com imagens otimizadas e srcsets.");

    log.info("Pulando geração de CSS crítico para evitar timeout persistente.");
    log.info("Build concluído com sucesso!");

    // Grava arquivo .done para sinalizar sucesso
    await fs.writeFile(LOG_DONE_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_DONE_FILE}`);
  } catch (err) {
    log.error(`Erro no build: ${err.message}`);
    process.exit(1);
  }
}

build();

