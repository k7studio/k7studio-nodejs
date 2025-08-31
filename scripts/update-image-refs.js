import fs from "fs-extra";
import path from "path";
import { load } from "cheerio";
import { createLogger } from "./utils/logger.js";

const log = createLogger("update-image-refs");

const BUILD_DIR = path.resolve("build");
const HTML_PATH = path.join(BUILD_DIR, "index.html");
const IMG_OPT_DIR = path.join(BUILD_DIR, "img", "opt");

// Lista as larguras disponíveis para um dado baseName na pasta img/opt
function listAvailableWidths(baseName) {
  try {
    const files = fs.readdirSync(IMG_OPT_DIR);
    // Filtra arquivos que correspondem ao padrão baseName-<width>w.webp
    const widths = files
      .map((file) => {
        const match = file.match(new RegExp(`^${baseName}-(\\d+)w\\.webp$`));
        return match ? Number(match[1]) : null;
      })
      .filter((w) => w !== null)
      .sort((a, b) => a - b);
    return widths;
  } catch (err) {
    log.error(`Erro ao ler diretório de imagens otimizadas: ${err.message}`);
    return [];
  }
}

async function updateImageRefs() {
  try {
    log.info(`Lendo arquivo HTML: ${HTML_PATH}`);

    let html = await fs.readFile(HTML_PATH, "utf-8");
    const $ = load(html);

    $("img").each(function () {
      const img = $(this);
      const src = img.attr("src");
      if (!src || !src.startsWith("img/")) return;

      const ext = path.extname(src);
      const baseName = path.basename(src, ext);

      // Listar larguras geradas para o baseName
      const widths = listAvailableWidths(baseName);

      if (widths.length === 0) {
        log.warn(`Nenhuma versão WebP de srcset encontrada para ${baseName}`);
        return;
      }

      // Monta o srcset usando só os arquivos existentes
      const srcsetEntries = widths
        .map((width) => `img/opt/${baseName}-${width}w.webp ${width}w`)
        .join(", ");

      // Atualiza src para a versão principal WebP (sem largura especificada)
      const newSrc = `img/opt/${baseName}.webp`;

      img.attr("src", newSrc);
      img.attr("srcset", srcsetEntries);
      img.attr("sizes", "(max-width: 768px) 100vw, 768px");
    });

    // Salvar arquivo HTML atualizado
    await fs.writeFile(HTML_PATH, $.html(), "utf-8");
    log.info("Atualização das referências de imagens concluída com sucesso.");
  } catch (error) {
    log.error(`Erro ao atualizar referências de imagens: ${error.message}`);
    process.exit(1);
  }
}

updateImageRefs();

