import fs from 'fs-extra';
import path from 'path';
import { createLogger } from './utils/logger.js';

const log = createLogger('check-status');
const LOG_DIR = path.resolve('logs');

const STEPS = [
  { name: 'analyze-images', file: 'analyze-images.done' },
  { name: 'build', file: 'build.done' },
  { name: 'replace-refs', file: 'replace-refs.done' },
  { name: 'backup', file: 'backup.done' },
  { name: 'validate', file: 'validate.done' },
  { name: 'update', file: 'update.done' }
];

/**
 * Função principal para verificar a integridade dos passos concluídos
 * Retorna o nome da etapa a partir da qual é necessário reconstruir
 */
async function checkStatus() {
  try {
    for (const step of STEPS) {
      const filePath = path.join(LOG_DIR, step.file);
      if (!(await fs.pathExists(filePath))) {
        log.info(`Arquivo de status ausente para etapa: ${step.name}. Deve reexecutar a partir daqui.`);
        return step.name;
      } else {
        log.info(`Arquivo de status encontrado para etapa: ${step.name}.`);
      }
    }
    log.info('Todos os passos anteriores concluídos com sucesso. Nenhuma reconstrução é necessária.');
    return null;
  } catch (error) {
    log.error(`Erro ao verificar status: ${error.message}`);
    throw error;
  }
}

// Execução direta pelo CLI
if (require.main === module) {
  checkStatus()
    .then((res) => {
      if (res) {
        console.log(res);
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error('Erro crítico:', err);
      process.exit(2);
    });
}

export default checkStatus;

