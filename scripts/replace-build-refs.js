import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("replace-build-refs");
const BUILD_DIR = path.resolve("build");
const HTML_FILE = path.join(BUILD_DIR, "index.html");
const CSS_FILE = path.join(BUILD_DIR, "style.min.css");
const IMG_OPT_DIR = path.join(BUILD_DIR, "img", "opt");
const LOG_FILE = path.join(process.cwd(), "logs", "replace-build-refs.log");

async function replaceRefs() {
  try {
    // Processar HTML
    log.info(`Processing HTML file: ${HTML_FILE}`);
    let html = await fs.readFile(HTML_FILE, "utf-8");

    // Replace CSS and JS references in HTML
    html = html.replace(/href=["']css\/style\.css["']/g, 'href="style.min.css"');
    html = html.replace(/src=["']js\/main\.js["']/g, 'src="app.min.js"');

    // Replace img src references in HTML to point to optimized folder
    html = html.replace(/src=["']([^"']+\.(jpg|png|webp))["']/gi, (match, p1) => {
      if (p1.startsWith("img/")) {
        const withoutPrefix = p1.slice(4);
        return `src="img/opt/${withoutPrefix}"`;
      }
      return `src="img/opt/${p1}"`;
    });

    await fs.writeFile(HTML_FILE, html, "utf-8");
    log.info("HTML references updated successfully.");

    // Process CSS file
    if (await fs.pathExists(CSS_FILE)) {
      log.info(`Processing CSS file: ${CSS_FILE}`);
      let css = await fs.readFile(CSS_FILE, "utf-8");

      // Replace URL paths ../img/... to img/...
      css = css.replace(/url\((['"]?)\.\.\/img\/([^'")]+)\1\)/g, (match, quote, p1) => {

        // Check if optimized .webp exists for this image
        const originalImgPath = path.join(BUILD_DIR, 'img', p1);
        const webpName = p1.replace(/\.(jpg|png)$/i, '.webp');
        const webpImgPath = path.join(IMG_OPT_DIR, webpName);

        if (fs.existsSync(webpImgPath)) {
          return `url(${quote}img/${webpName}${quote})`;  // Use optimized webp in CSS if exists
        } else if (fs.existsSync(originalImgPath)) {
          return `url(${quote}img/${p1}${quote})`;  // fallback to original
        } else {
          log.warn(`Image ${p1} not found in img/ or img/opt/`);
          return match;  // leave original as fallback
        }
      });

      await fs.writeFile(CSS_FILE, css, "utf-8");
      log.info("CSS image URLs updated successfully.");
    } else {
      log.warn(`CSS file ${CSS_FILE} not found, skipping CSS update.`);
    }

    await fs.appendFile(LOG_FILE, `[${new Date().toISOString()}] replaceRefs completed\n`);
  } catch (error) {
    log.error(`Error in replaceRefs: ${error.message}`);
    process.exit(1);
  }
}

replaceRefs();

