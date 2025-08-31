import fs from "fs-extra";
import path from "path";

export function createLogger(scriptName) {
  const logDir = path.resolve("logs");
  fs.ensureDirSync(logDir);

  const logFile = path.join(logDir, `${scriptName}_${new Date().toISOString().slice(0, 10)}.log`);

  async function writeLog(level, msg) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level.toUpperCase()}] ${msg}\n`;

    // Exibe no console conforme nível
    switch (level) {
      case "error":
        console.error(line.trim());
        break;
      case "warn":
        console.warn(line.trim());
        break;
      default:
        console.log(line.trim());
        break;
    }

    try {
      await fs.appendFile(logFile, line);
    } catch (err) {
      console.error(`Falha ao gravar log: ${err.message}`);
    }
  }

  return {
    info: (msg) => writeLog("info", msg),
    warn: (msg) => writeLog("warn", msg),
    error: (msg) => writeLog("error", msg),
  };
}

