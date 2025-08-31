import fs from "fs-extra";
import path from "path";
import sharp from "sharp";
import { createLogger } from "./utils/logger.js";

const log = createLogger("analyze-images");

const IMG_DIR = path.resolve("img");
const OPT_DIR = path.join(IMG_DIR, "opt");
const LOG_DONE_FILE = path.resolve("logs/analyze-images.done");

// Larguras para srcset (px)
const SRCSET_WIDTHS = [480, 768, 1024, 1920];

// Máximo permitido (px)
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

async function processImage(file) {
  try {
    const inputPath = path.join(IMG_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const outputDir = OPT_DIR;

    await fs.ensureDir(outputDir);

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    log.info(`Imagem: ${file} (${metadata.width}x${metadata.height})`);

    const scale = Math.min(1, MAX_WIDTH / metadata.width, MAX_HEIGHT / metadata.height);
    const resizedWidth = Math.round(metadata.width * scale);
    const resizedHeight = Math.round(metadata.height * scale);

    let pipeline = image;
    if (scale < 1) {
      pipeline = pipeline.resize(resizedWidth, resizedHeight);
      log.info(`Redimensionando para ${resizedWidth}x${resizedHeight}`);
    } else {
      log.info("Dimensão adequada, mantenho original.");
    }

    // Salvar formato original otimizado
    const optimizedPath = path.join(outputDir, `${baseName}${ext}`);
    await pipeline.toFile(optimizedPath);
    log.info(`Salvo otimizado (formato original): ${optimizedPath}`);

    // Salvar versão WebP otimizada
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await pipeline.webp({ quality: 80 }).toFile(webpPath);
    log.info(`Salvo versão WebP: ${webpPath}`);

    // Gerar múltiplas versões para srcset
    for (const width of SRCSET_WIDTHS) {
      if (width >= resizedWidth) continue;

      const scaledHeight = Math.round((metadata.height * width) / metadata.width);
      const resizedFile = ext === ".png" ? `${baseName}-${width}w.png` : `${baseName}-${width}w${ext}`;
      const resizedWebpFile = `${baseName}-${width}w.webp`;

      // Versão resize (igual ao formato original)
      await image.resize(width, scaledHeight).toFile(path.join(outputDir, resizedFile));
      log.info(`Versão srcset salva: ${resizedFile}`);

      // Versão resize WebP
      await image.resize(width, scaledHeight).webp({ quality: 80 }).toFile(path.join(outputDir, resizedWebpFile));
      log.info(`Versão srcset WebP salva: ${resizedWebpFile}`);
    }

  } catch (error) {
    log.error(`Erro ao processar imagem ${file}: ${error.message}`);
  }
}

async function analyzeAndOptimizeImages() {
  try {
    log.info(`Iniciando análise e otimização de imagens na pasta: ${IMG_DIR}`);
    const files = await fs.readdir(IMG_DIR);
    const imageFiles = files.filter((file) =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length === 0) {
      log.warn("Nenhuma imagem JPG ou PNG encontrada para processar.");
      return;
    }

    for (const file of imageFiles) {
      await processImage(file);
    }

    log.info("Processo completo de análise e otimização de imagens.");

    // Grava o arquivo .done ao final com timestamp ISO
    await fs.writeFile(LOG_DONE_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_DONE_FILE}`);

  } catch (err) {
    log.error(`Erro ao listar arquivos da pasta img/: ${err.message}`);
    process.exit(1);
  }
}

analyzeAndOptimizeImages();

