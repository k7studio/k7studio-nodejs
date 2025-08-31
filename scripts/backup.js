import fs from "fs-extra";
import path from "path";
import { createLogger } from "./utils/logger.js";

const log = createLogger("backup");

const BACKUP_DIR = "backup";
const BUILD_DIR = "build";
const LOG_DONE_FILE = path.resolve("logs/backup.done");

async function createBackup() {
  try {
    if (!(await fs.pathExists(BUILD_DIR))) {
      log.warn("Nenhuma pasta build/ encontrada para backup.");
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const dest = path.join(BACKUP_DIR, `build_backup_${timestamp}`);

    await fs.ensureDir(BACKUP_DIR);
    await fs.copy(BUILD_DIR, dest);

    log.info(`Backup criado em ${dest}`);

    // Indica fim com sucesso no arquivo .done
    await fs.writeFile(LOG_DONE_FILE, new Date().toISOString(), "utf-8");
    log.info(`Arquivo de status criado: ${LOG_DONE_FILE}`);

  } catch (error) {
    log.error(`Erro ao criar backup: ${error.message}`);
    process.exit(1);
  }
}

async function rollback() {
  try {
    if (!(await fs.pathExists(BACKUP_DIR))) {
      log.warn("Nenhuma pasta backup/ encontrada para rollback.");
      return;
    }

    const backups = (await fs.readdir(BACKUP_DIR))
      .filter((f) => f.startsWith("build_backup_"))
      .sort()
      .reverse();

    if (backups.length === 0) {
      log.warn("Nenhum backup disponível para rollback.");
      return;
    }

    const latestBackup = path.join(BACKUP_DIR, backups[0]);
    await fs.emptyDir(BUILD_DIR);
    await fs.copy(latestBackup, BUILD_DIR);

    log.info(`Rollback concluído. Restaurado backup: ${latestBackup}`);

    // Remove arquivo .done pois rollback altera build
    if (await fs.pathExists(LOG_DONE_FILE)) {
      await fs.remove(LOG_DONE_FILE);
      log.info(`Arquivo de status removido: ${LOG_DONE_FILE}`);
    }
  } catch (error) {
    log.error(`Erro ao executar rollback: ${error.message}`);
    process.exit(1);
  }
}

// CLI básico
const action = process.argv[2];

if (action === "create") {
  createBackup();
} else if (action === "rollback") {
  rollback();
} else {
  console.log("Uso: node scripts/backup.js [create|rollback]");
}

