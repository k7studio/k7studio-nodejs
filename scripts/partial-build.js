import checkStatus from "./check-status.js";
import { exec } from "child_process";
import { createLogger } from "./utils/logger.js";

const log = createLogger("partial-build");

function runCommand(command) {
  return new Promise((resolve, reject) => {
    log.info(`Executando: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (stdout) log.info(`stdout: ${stdout.trim()}`);
      if (stderr) log.warn(`stderr: ${stderr.trim()}`);
      if (error) {
        log.error(`Erro: ${error.message}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Mapeia as etapas para os scripts correspondentes e arquivos .done
 */
const STEPS_COMMANDS = {
  "analyze-images": "node scripts/analyze-images.js",
  "build": "npm run build",
  "replace-refs": "node scripts/replace-build-refs.js",
  "backup": "node scripts/backup.js create",
  "validate": "node scripts/validate.js",
  "update": "node scripts/update.js",
};

async function partialBuild(fromStep) {
  try {
    if (!fromStep) {
      // Executa full-build se não for especificada etapa
      log.info("Nenhuma etapa especificada. Executando full-build...");
      await runCommand("node scripts/full-build.js");
      return;
    }

    const steps = Object.keys(STEPS_COMMANDS);
    const idx = steps.indexOf(fromStep);

    if (idx === -1) {
      throw new Error(`Etapa desconhecida: ${fromStep}`);
    }

    log.info(`Iniciando reconstrução parcial a partir da etapa: ${fromStep}`);

    for (let i = idx; i < steps.length; i++) {
      await runCommand(STEPS_COMMANDS[steps[i]]);
    }

    log.info("Reconstrução parcial finalizada com sucesso.");
  } catch (error) {
    log.error(`Falha na reconstrução parcial: ${error.message}`);
    process.exit(1);
  }
}

// CLI: aceita argumento que indica a etapa de início da reconstrução
const stepArg = process.argv[2];

partialBuild(stepArg);

