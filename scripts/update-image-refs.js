import fs from "fs-extra";
import path from "path";
import { load } from "cheerio";
import { createLogger } from "./utils/logger.js";

const log = createLogger("update-image-refs");

const BUILD_DIR = path.resolve("build");
const HTML_PATH = path.join(BUILD_DIR, "index.html");
const IMG_OPT_DIR = path.join(BUILD_DIR, "img", "opt");

// Lista os arquivos de largura disponível para um baseName
function listAvailableWidths(baseName) {
  try {
    const files = fs.readdirSync(IMG_OPT_DIR);
    const widths = files
      .map((file) => {
        const match = file.match(new RegExp(`^${baseName}-(\\d+)w\\.webp$`));
        return match ? Number(match[1]) : null;
      })
      .filter(w => w !== null)
      .sort((a, b) => a - b);
    return widths;
  } catch (err) {
    log.error(`Erro ao ler diretório ${IMG_OPT_DIR}: ${err.message}`);
    return [];
  }
}

async function updateImageRefs() {
  try {
    log.info(`Lendo arquivo ${HTML_PATH} para atualização de referências...`);
    let html = await fs.readFile(HTML_PATH, "utf-8");
    const $ = load(html);

    $("img").each(function () {
      const img = $(this);
      let src = img.attr("src");

      if (!src || !src.startsWith("img/")) {
        // Opcional: log para imagens externas ou outras pastas
        return;
      }

      const ext = path.extname(src);
      const baseName = path.basename(src, ext);

      const hasWebpMain = fs.existsSync(path.join(IMG_OPT_DIR, `${baseName}.webp`));
      if (!hasWebpMain) {
        log.warn(`Arquivo principal WebP não encontrado para ${baseName}, mantendo src original.`);
        return;
      }

      const widths = listAvailableWidths(baseName);
      if (widths.length === 0) {
        log.warn(`Nenhuma versão WebP para srcset encontrada para ${baseName}, utilizando apenas principal.`);
      }

      // Monta srcset somente se houver larguras
      const srcsetEntries = widths.length > 0
        ? widths.map(w => `img/opt/${baseName}-${w}w.webp ${w}w`).join(", ")
        : null;

      // Atualização dos atributos
      img.attr("src", `img/opt/${baseName}.webp`);
      if (srcsetEntries) {
        img.attr("srcset", srcsetEntries);
        img.attr("sizes", "(max-width: 768px) 100vw, 768px");
      } else {
        img.removeAttr("srcset");
        img.removeAttr("sizes");
      }

      log.info(`Atualizada imagem: base=${baseName}, src=img/opt/${baseName}.webp, srcset=${srcsetEntries ? srcsetEntries : "n/a"}`);
    });

    await fs.writeFile(HTML_PATH, $.html(), "utf-8");
    log.info("Atualização das referências de imagens concluída com sucesso.");
  } catch (error) {
    log.error(`Erro na atualização das referências de imagens: ${error.message}`);
    process.exit(1);
  }
}

updateImageRefs();

