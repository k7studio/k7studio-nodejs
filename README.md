# 🎯 K7 Studio – Build, Otimização e CI/CD com Node.js

## Este projeto implementa uma cadeia **DevOps moderna em Node.js**, garantindo:

✅ Performance mobile-first
✅ Automação CI/CD robusta
✅ Fluxo simplificado sem dependência de Docker
✅ Compatibilidade total com GitHub Pages e Cloudflare Pages

## 📌 Principais Recursos

### Scripts Node.js unificados para todas as tarefas de build:

- Minificação de CSS, JS e HTML  
- Conversão de imagens para WebP  
- Geração de Critical CSS  
- Atualização incremental de conteúdo  
- Rotinas de backup e rollback com logs padronizados  
- Ajuste automático das referências no HTML para arquivos otimizados (CSS, JS e imagens) 

### SCI/CD no GitHub Actions rodando em ambiente Node.js nativo, sem necessidade de imagem Docker.

### Logs automáticos gerados a cada execução na pasta logs/.

## 📦 Setup Inicial

### 1. Pré-requisitos

- [Node.js 18+](https://nodejs.org/en/download) instalado
- Git configurado localmente

### 2. Clonar o repositório

```
git clone git@github.com:k7studio/k7studio-nodejs.git
cd k7studio-nodejs
```

### 3. Instalar dependências Node.js

```
npm install
```
### 4. Estrutura de diretórios

```
k7studio-nodejs/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
├── build/            # saída otimizada (gerada no build)
├── backup/           # backups automáticos timestampados
├── logs/             # logs de execuções locais e no CI/CD
├── scripts/          # scripts Node.js utilitários
│   ├── build.js
│   ├── replace-build-refs.js
│   ├── update.js
│   ├── validate.js
│   ├── backup.js
│   └── utils/logger.js
│   ├── outros scripts utilitários...
└── package.json
```

## 🚀 Uso dos Scripts (npm run)

Todos os processos do projeto foram padronizados em **scripts npm**.  

### 🏗️ Build completo

```
npm run build
```
- Minifica CSS, JS e HTML  
- Converte imagens para WebP  
- Atualiza referências de imagens, CSS e JS no HTML para versões otimizadas  
- Gera Critical CSS (configurado para evitar timeout em algumas execuções)  
- Salva saída otimizada em `build/`  
- Gera log detalhado em `logs/build_*.log``

---

### ✅ Substituir referências no HTML do build

```
npm run replace-build-refs
```

- Atualiza o arquivo `build/index.html` para apontar para os arquivos minificados `style.min.css`, `app.min.js` e para as imagens otimizadas em `img/opt/`  
- Evita erros de carregamento de recursos no navegador  
- Gera arquivo de status `.done` e logs específicos

---

### 🔄 Atualização incremental do conteúdo

```
npm run update
```

- Copia alterações recentes do projeto para `build/` sem reprocessar otimizações antigas  
- Útil para modificações rápidas em conteúdo  
- Log gerado em `logs/update_*.log`

---

### 💾 Backup e rollback

- Criar backup do último build:

```
npm run backup:create
```

- Restaurar último backup disponível:

```
npm run backup:rollback
```

- Permite segurança para reverter alterações após erros críticos  
- Backups são salvos em `backup/build_backup_YYYY-MM-DD-HH-MM-SS/`  
- Logs gerados em `logs/backup_*.log`

---

### ✅ Validação pós-build (Lighthouse)
```
npm run validate
```

- Executa Lighthouse em modo headless via Chrome  
- Usa flags para evitar falhas de sandbox  
- Salva relatório detalhado em `logs/lighthouse-report.html`  
- Gera logs de validação  

---

### 👀 Preview local do build

```
npm run preview
```

- Sobe um servidor local em `http://localhost:8080` servido pelo script `server.js`  
- Permite teste rápido local sem necessidade de deploy  
- Facilita validação imediata após build

---

## 📝 Fluxo de Trabalho Local Recomendado

- 1. Editar `index.html`, `css/*`, `js/*` ou imagens  
- 2. Rodar:

```
npm run build
npm run replace-build-refs
npm run validate
npm run preview
```

3. Confirmar que está tudo OK e criar backup:

```
npm run backup:create
git add .
git commit -m "chore: atualização incremental"
git push origin main
```

4. Commitar e enviar alterações para o repositório:

```
git add .
git commit -m "chore: atualização incremental"
git push origin main
```

5. A pipeline CI/CD será disparada automaticamente (GitHub ou Cloudflare Pages, conforme integração configurada)

---

## 🚀 Uso dos Scripts Node.js isoladamente

### 1. Build completo

```
node scripts/build.js
```
- Script principal do build completo:
  - Limpa pasta `build/`.
  - Minifica CSS (css/style.css) para build/style.min.css usando CleanCSS.
  - Minifica JS (js/main.js) para build/app.min.js usando terser.
  - Minifica HTML (index.html) para build/index.html com html-minifier-terser.
  - Converte imagens jpg/png da pasta img/ para WebP na build/img/ com qualidade 80.
  - Copia arquivos .ico e pasta img/opt (imagens otimizadas e srcsets) para build/img/.
  - Gera arquivo de status logs/build.done para sinalizar sucesso.
- Usa logger para rastrear passos e erros.
- Tem observação para pular a geração de CSS crítico devido a timeout persistente.
- Salva saída otimizada em `build/`  
- Gera log detalhado em `logs/build_*.log`

### 2. Substituir referências no HTML do build

```
node scripts/replace-build-refs.js
```
- Atualiza referências no build/index.html:
  - Troca href css/style.css por style.min.css.
  - Troca src js/main.js por app.min.js.
  - Altera src de imagens jpg/png/webp para apontar para img/opt/.
- Gera arquivo de status logs/replace-build-refs.done após sucesso.
- Utiliza expressões regulares para substituir paths.
- Usa logger para etapas e erros.

### 3. Atualização incremental

```
node scripts/update.js
```
- Copia alterações do projeto para build/ sem sobrescrever otimizações já feitas.
- Útil para mudanças rápidas em conteúdo.
- Log gerado em logs/.

### 4. Atualização incremental do conteúdo

```
node scripts/update.js
```
- Atualização incremental copiando apenas arquivos listados (index.html, css, img, js) para build/, sem reprocessar otimizações.
- Útil para mudanças rápidas de conteúdo.
- Gera arquivo logs/update.done para sinalizar sucesso.
- Logs do processo de cópia ou avisos para arquivos/pastas não encontradas.
- Usa logger para registro das operações.
- Log gerado em `logs/update_*.log`

### 5. Backup e rollback

- O script backup.js é responsável por garantir segurança e restauração do estado da pasta build/ por meio de backups timestampados e restaurações automáticas. Ele é integrado ao fluxo completo de build para criar backups automáticos e pode ser acionado manualmente para rollback rápido em caso de problemas.

#### Função createBackup()

- Criar backup da pasta build:
```
node scripts/backup.js create
```
- Verifica se a pasta `build/` existe; se não, registra aviso e retorna, pois não há nada para backup.
- Cria um timestamp ISO formatado para nomear o diretório do backup, substituindo caracteres incompatíveis (":" e ".") por "-".
- Garante que a pasta `backup/` exista.
- Copia a pasta `build/` inteira para `backup/build_backup_<timestamp>/`.
- Loga o caminho onde o backup foi criado.
- Cria um arquivo de sucesso `logs/backup.done` com timestamp ISO para sinalizar que o backup foi concluído.
- Em caso de erro, loga o erro e encerra o processo com código 1.

#### Função rollback()

- Restaurar último backup disponível:
```
node scripts/backup.js rollback
```

- Verifica se a pasta `backup/` existe; se não, registra aviso e retorna.
- Lista os backups disponíveis na pasta `backup/` filtrando por prefixo `"build_backup_"` e ordena em ordem decrescente para obter o mais recente.
- Se não há backups disponíveis, registra aviso e retorna.
- Copia o backup mais recente para a pasta `build/`:
  - Apaga o conteúdo atual da pasta `build/` antes de copiar.
  - Loga qual backup foi restaurado.
- Remove o arquivo `logs/backup.done` para sinalizar que o estado build foi alterado pelo rollback.
- Em caso de erro, loga erro e encerra processo.
- Permite segurança para reverter alterações após erros críticos  
- Backups são salvos em `backup/build_backup_YYYY-MM-DD-HH-MM-SS/`  
- Logs gerados em `logs/backup_*.log`
- Gera logs das operações e do arquivo logs/backup.done.
- Usa logger para informar sucesso, avisos e erros.
- Pode ser usado por CLI com comandos "create" e "rollback".

#### CLI Simples
- Pode ser executado com parâmetro na linha de comando:
  - `node scripts/backup.js create` para criar backup.
  - `node scripts/backup.js rollback` para restaurar o último backup.
- Se o comando estiver incorreto ou ausente, exibe mensagem de uso.

#### Logs
- Usa o sistema de logger customizado (`createLogger`) para registrar informações, avisos e erros.
- Arquivos `.done` gerados para sinalizar o sucesso das operações.

### 6. Validação pós-build (Lighthouse)

```
node scripts/validate.js
```
- Executa Lighthouse via Chrome em modo headless:
  - Usa chrome-launcher para iniciar Chrome com flags para ambiente sem sandbox.
  - Roda Lighthouse contra http://localhost:8080 (espera que preview local esteja rodando).
  - Gera relatório HTML na pasta logs/lighthouse-report.html.
  - Log das métricas performance, melhores práticas e SEO.
- Cria arquivo logs/validate.done no fim para sinalizar sucesso.
- Usa logger para registrar todas as etapas e erros.

### 7. Preview local do build

```
node scripts/preview.js
```
- Sobe um servidor local em `http://localhost:8080` servido pelo script `server.js`  
- Permite teste rápido local sem necessidade de deploy  
- Facilita validação imediata após build

### Outros scripts 

#### server.js
- Usa Express para criar um servidor local simples.
- Serve arquivos estáticos da pasta `build`.
- Implementa fallback para rota `*` que serve `build/index.html` para suportar single page apps.
- Configura porta padrão 3000, usa variável ambiente PORT se definida.
- Roda servidor e loga no console a porta usada.

#### analyze-images.js

- Analisa e otimiza imagens originais na pasta img/:
  - Usa sharp para redimensionar imagens caso excedam largura 1920px e altura 1080px.
  - Salva versões otimizadas no formato original e em WebP na pasta img/opt.
  - Gera versões otimizadas menores (srcset) para larguras 480, 768, 1024, 1920px.
- Log detalhado de cada etapa da otimização e geração.
- Cria arquivo logs/analyze-images.done para indicar o fim.
- Garante otimização responsiva das imagens para melhorar performance.
- Executar sempre após adicionar, atualizar ou remover imagens do projeto e antes de rodar o processo de build principal.

```
npm run analyze-images
node scripts/analyze-images.js
```

#### check-status.js

- Verifica arquivos .done nas logs para checar quais etapas já foram concluídas.
- Retorna nome da etapa a partir da qual deve-se reexecutar o build.
- Para cada etapa na ordem predefinida, checa se o .done está presente; caso não, indica para reexecutar.
- Logs informativos das verificações e tratamento de erros.
- Pode ser executado direto via CLI retornando o resultado para scripts que precisem decidir por reconstrução parcial.
- Executar após rodar o build ou scripts críticos, para garantir que todos os passos importantes foram completados com sucesso.

```
npm run check-status
node scripts/check-status.js
```

#### full-build.js

- Orquestração da build completa via execuções sequenciais:
  1. Analisar/imagem otimização via analyze-images.js
  2. Executar build (npm run build)
  3. Substituir referências minificadas (replace-build-refs.js)
  4. Atualizar referências de imagens (update-image-refs.js)
  5. Criar backup automático (backup.js create)
  6. Validar build (validate.js)
- Espera e verifica arquivos .done entre etapas para garantir sequência correta.
- Log detalhado de cada comando, erros possíveis abortam o processo.
-Executar quando for necessária uma otimização total do projeto (principalmente em deploys limpos ou releases).

```
npm run full-build
node scripts/full-build.js
```

#### partial-build.js

- Permite executar build parcial a partir de uma etapa especificada via argumento CLI.
- Se nenhuma etapa especificada, executa full-build completo.
- Etapas mapeadas para comandos específicos: analyze-images, build, replace-refs, backup, validate, update.
- Sequência executa comandos do ponto indicado até o fim.
- Usa exec para rodar comandos e logger para monitorar.
- Executar em atualizações rápidas e iterativas, quando não é necessário otimizar tudo.

```
npm run partial-build
node scripts/partial-build.js
```

#### penthouse-critical.js

- Geração de CSS crítico usando a biblioteca Penthouse.
- Roda Penthouse contra o arquivo local `index.html` e CSS original `css/style.css`.
- Timeout aumentado para 2 minutos para evitar timeouts em projetos maiores.
- Define viewport de 375x667 para simular viewport mobile.
- Salva CSS crítico gerado em `build/critical.min.css`.
- Usa logger para etapas e captura erros que param a execução.
- Executar após rodar o build ou antes de gerar relatórios de validação de performance.

```
npm run penthouse-critical
node scripts/penthouse-critical.js
```

#### update-image-refs.js

- Atualiza referências em build/index.html para usar srcset e WebP otimizados:
  - Usa cheerio para manipular HTML.
  - Lê diretório build/img/opt para detectar variantes de imagens com larguras específicas.
  - Para cada `<img>` que tenha src iniciado com img/, altera src para versão WebP principal, cria atributo srcset com versões de larguras diferentes e define sizes adaptado a largura máxima de 768px.
- Gera logs detalhados e cria arquivo logs/update-image-refs.done.
- Usa logger para erros e avisos, incluindo quando nenhuma versão srcset WebP é encontrada.
- Executar após adicionar ou converter novas imagens, ou ao editar caminhos no HTML.

```
npm run update-image-refs
node scripts/update-image-refs.js
```

#### utils/logger.js

- Facilita rastreamento e diagnóstico centralizado para todos scripts do projeto.  
- Função `createLogger(scriptName)` para criar instância de logger por script.
- Cria logger padronizado para scripts:
  - Cria diretório logs/ se não existir.
  - Usuário escreve logs com níveis info, warn e error.
  - Logs são gravados em arquivo único por dia separado por script (ex: build_2025-08-28.log).
  - Também exibe logs no console com formato timestamp, nível e mensagem.
  - Usado pelas outras ferramentas para centralizar registros padronizados.
- Função `writeLog(level, msg)`:
  - Formata linha com timestamp ISO, nível do log e mensagem.
  - Exibe log no console com cores e formatos dependendo do nível (error, warn, info).
  - Append no arquivo de log correspondente.
- Módulo utilitário para registrar logs padronizados durante os ciclos de build e validação. Não é executado diretamente, mas utilizado por outros scripts para garantir rastreabilidade e diagnósticos.
- É chamado automaticamente pelos scripts principais; não requer execução manual.
- Importado em outros scripts.

#### Arquivos do diretório raiz do projeto:

##### package.json
- Define o projeto K7 Studio versão 1.0.0, tipo module ES.
- Contém scripts principais para build, análise, backup, validação, preview local, entre outros.
- Dependências focadas em otimização web, manipulação de CSS, HTML, imagens (clean-css, critical, imagemin, sharp, penthouse, puppeteer, terser).
- DevDependencies para execuções headless Chrome e auditoria (chrome-launcher, lighthouse).
- Scripts bem organizados com comandos npm para automação das tarefas do build e deploy.

##### package-lock.json
- Define versões exatas e integridades das dependências listadas no package.json.
- Fornece controle rigoroso para assegurar ambientes de desenvolvimento e produção idênticos.
- Inclui pacotes detalhados para manipulação CSS, imagem, streaming, instrumentação, helpers, etc.

##### .gitignore
- Ignora arquivos sensíveis e locais (.env, local.env).
- Ignora pastas e arquivos autogerados temporários ou de saída: build/, backup/, logs/, node_modules/, dist/, cache, temp, reports, coverage.
- Ignora arquivos de logs, temporários e específicos de editores de texto/IDE.
- Mantém package-lock.json sob controle de versão para garantir consistência das dependências.

##### README.md
- Descrição detalhada do projeto com foco em build, otimização e CI/CD usando Node.js.
- Guia de uso para os principais scripts npm e fluxo ideal para desenvolvimento e deploy.
- Explicação detalhada dos scripts: build, replace-build-refs, update, backup, validate, preview.
- Explica integração CI/CD com GitHub Pages e Cloudflare Pages, destacando vantagens e fluxo recomendado.
- Oferece checklist resumidos para colaboradores e deploy, reforçando práticas de versionamento e backup.

#### Arquivos de workflows do diretório .github/workflows:

- Estes arquivos de workflows automatizam o build, validação e deploy do K7 Studio para diferentes destinos finais, garantindo qualidade com Lighthouse e segurança com rollback (GitHub Pages). O deploy no Cloudflare é configurado para produção, enquanto GitHub Pages serve como preview e homologação.

##### deploy.yml (Deploy para GitHub Pages)

- Esse workflow visa automação simples e eficiente para publicar o build otimizado direto no GitHub Pages, com validação e logs arquivados.

- Evento disparador: push na branch `main` ou disparo manual (`workflow_dispatch`).
- Ambiente: ubuntu-latest.
- Passos:
  1. Faz checkout do código com actions/checkout@v4.
  2. Configura Node.js 18 com cache npm via actions/setup-node@v4.
  3. Instala dependências usando `npm ci`.
  4. Executa script npm build: `npm run build` (minificação, otimização, etc).
  5. Executa validação com Lighthouse: `npm run validate`.
  6. Faz upload dos logs gerados na pasta logs/ como artefatos do workflow.
  7. Despliega a pasta build/ para GitHub Pages usando peaceiris/actions-gh-pages@v3, com token do GitHub para autenticação.
  8. Em caso de falha, executa rollback automático do build via script: `npm run backup:rollback`.

##### deploy-cloudflare.yml (Deploy para Cloudflare Pages)

- Esse workflow é a pipeline recomendada para o deploy em produção, beneficiando da CDN e cache global da Cloudflare.
- Evento disparador idêntico (push na main ou dispatch manual).
- Ambiente: ubuntu-latest.
- Passos:
  1. Checkout do código.
  2. Setup Node.js 18 com cache npm.
  3. Instalar dependências (`npm ci`).
  4. Rodar build otimizado (`npm run build`).
  5. Validar com Lighthouse (`npm run validate`).
  6. Upload dos logs.
  7. Deploy para Cloudflare Pages usando action oficial cloudflare/pages-action@v1.
     - Usa token API, ID da conta e nome do projeto configurados como secrets no GitHub.
     - Publica a pasta build/ no ambiente Cloudflare.

### Sequência ideal para executar os scripts no fluxo de Build Completo e Deploy

1. Executar o build completo do projeto:

```
npm run build
```

- Isso minifica CSS, JS e HTML, converte imagens para WebP, gera Critical CSS, atualiza referências para os arquivos otimizados e salva tudo na pasta build/.

2. Substituir as referências no HTML do build para os arquivos minificados e otimizados:

```
npm run replace-refs
```

- Atualiza o arquivo build/index.html para apontar para style.min.css, app.min.js e imagens otimizadas, evitando erros de carregamento.

3. Validar o build usando Lighthouse para gerar um relatório detalhado:

```
npm run validate
```

- Executa verificação de performance e qualidade do build no modo headless, salvando o relatório em logs/.

4. Opcionalmente, preparar um preview local para testar o build:

```
node scripts/preview.js
```
- Esse script não está diretamente no package.json como script npm, mas documentado no README para preview local. Pode-se usar o start script dependendo do contexto.

5. Criar backup do build para segurança antes do commit:

```
npm run backup:create
```

- Criar um backup timestampado da pasta build na pasta backup/.

6. Commitar e enviar as alterações para o repositório Git, disparando a pipeline CI/CD.

- Resumo em comandos npm da sequência ideal no ambiente padrão:

```
npm run build
npm run replace-refs
npm run validate
npm run backup:create
```
----

### 8. Fluxo de Trabalho Local Recomendado

 - Editar arquivos (`index.html`, CSS em `css/`, JS em `js/` ou imagens)  
 - Rodar:
```
node scripts/build.js
node scripts/replace-build-refs.js
node scripts/validate.js
node scripts/preview.js
```
 - Confirmar que está tudo OK e criar backup:
```
node scripts/backup.js create
```
 - Commitar e enviar alterações para o repositório:
```
git add .
git commit -m "Atualização incremental"
git push origin main
```

## 📝 Controle de Versões (Git)

- Configuração inicial (uma única vez por máquina)
```
git config user.name "K7 Studio"
git config user.email "k7.danceandsport@gmail.com"
```
- Fluxo de versionamento
```
git status          # verificar arquivos alterados
git add .           # adicionar alterações
git commit -m "Mensagem clara da mudança"
git push origin main
```
- A pipeline CI/CD é disparada automaticamente no push.
- Recomenda-se fazer git pull origin main sempre antes de iniciar edições locais.

## ⚙️ CI/CD – Integrações Oficiais Disponíveis

O projeto K7 Studio oferece duas opções oficiais de deploy automático:

### 1. GitHub Pages (padrão)

- Deploy automático ao **branch main** via workflow `.github/workflows/deploy.yml`.
- Executa:
  - `npm run build`
  - `npm run replace-build-refs`  
  - `npm run validate`
- Publica a pasta `build/` diretamente no GitHub Pages.
- Útil para **pré-visualização** e ambiente de homologação
- Logs ficam disponíveis como artefatos no GitHub Actions.

### 2. Cloudflare Pages (produção recomendada)

- Workflow paralelo: `.github/workflows/deploy-cloudflare.yml`.
- Ações executadas:
- `npm run build`
- `npm run replace-build-refs`
- `npm run validate`
- Publica `./build` no **Cloudflare Pages**, ou seja, executa o mesmo ciclo (build + validate), mas publica no **Cloudflare Pages**.
- Exige as seguintes secrets configuradas no repositório GitHub:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `projectName`, que é o nome do projeto no workflow, precisa bater com o nome configurado no painel interno da Cloudflare Pages (`projectName: k7studio`).


### 🚀 Diferenças práticas

- **GitHub Pages** → publicação direta no repositório GitHub, simples, ótimo para preview e documentação.  
- **Cloudflare Pages** → build rápido globalmente, cache inteligente e CDN global integrado, melhor eficiência em produção e performance avançada, recomendado como **produção final** para `https://k7studio.com.br`.  

### ✨ Fluxo recomendado

- Desenvolvedores podem usar **GitHub Pages** para visualizar alterações em tempo real.  
- Deploy oficial para `https://k7studio.com.br` roda em **Cloudflare Pages**.

---

## ✅ Checklist Resumido Para Colaboradores

**Para subir uma mudança de conteúdo:**
1. Edite os arquivos (`index.html`, CSS, JS, imagens)
2. Rode:
```
npm run build
npm run replace-build-refs
npm run validate
npm run preview
```
3. Crie backup e commit:
```
npm run backup:create
git add .
git commit -m "Atualização incremental"
git push origin main
```
4. CI/CD cuidará do deploy automático

---

## ✅ Checklist para Deploy

### 1. Alterar arquivos (ex: index.html, css/style.css, js/main.js)

### 2. Rodar build e validação localmente
```
node scripts/build.js
node scripts/replace-build-refs.js
node scripts/validate.js
```
### 3. (Opcional) Criar backup antes de commit:
```
node scripts/backup.js create
```
### 4. Commitar e enviar alterações:
```
git add .
git commit -m "Atualização de conteúdo"
git push origin main
```
### 5. Verificar logs e relatórios em logs/

## Sobre o arquivo `.gitignore`

- O arquivo `.gitignore` é fundamental para o projeto porque indica ao Git quais arquivos e pastas ele deve **ignorar**, ou seja, não rastrear nem incluir nos commits. Isso ajuda a manter o repositório limpo, seguro e livre de arquivos desnecessários ou temporários.

---

### Explicação das principais regras do arquivo `.gitignore` no nosso projeto:

- `local.env`, `.env`, `.env.local`, `.env.*.local`: São **arquivos de configuração local e variáveis de ambiente**, que podem conter informações sensíveis como senhas, tokens e chaves de API. Não devem ser commitados para não expor dados confidenciais.

- `build/`: Pasta onde são gerados os arquivos otimizados e compilados durante o processo de build. Como esses arquivos são gerados automaticamente, não faz sentido versioná-los.

- `backup/` e `backup/**/*.zip`: Pasta para armazenar backups do projeto e arquivos zipados. Esses arquivos são grandes, gerados dinamicamente e não devem ficar no controle de versão.

- `logs/` e `*.log`: Diretórios e arquivos que armazenam logs das execuções do projeto. São arquivos temporários, úteis apenas localmente.

- `node_modules/`: Diretório contendo as dependências instaladas via npm. Essas dependências podem ser restauradas facilmente com o `npm install`, portanto não devem ser versionadas para evitar inflar o repositório.

- `dist/`, `.cache/`, `.tmp/`, `temp/`: Pastas e arquivos temporários ou intermediários gerados por processos de build, cache ou temporários do sistema.

- Arquivos e pastas relacionadas ao editor e ambiente de desenvolvimento: `.vscode/`, `.idea/`, `*~`, `*.swp`, `*.bak` — arquivos e configurações pessoais para facilitar o desenvolvimento local, que não são parte do projeto.

- Arquivos do sistema operacional: `.DS_Store` (macOS), `Thumbs.db` (Windows) — arquivos automáticos que não são úteis ao projeto.

- `coverage/`, `reports/`: Diretórios gerados por ferramentas de teste ou relatórios, que não precisam estar no controle de versões.

---

### Ponto Importante:

- O arquivo `package-lock.json` **não deve ser ignorado**!  
Ele mantém o controle exato das versões das dependências usadas pelo projeto, assegurando que todas as máquinas de desenvolvimento e servidores utilizem versões idênticas para evitar inconsistências.

- Manter o arquivo `.gitignore` atualizado e entender seus propósitos ajuda toda a equipe a evitar problemas como vazamento de dados, repositórios inchados, conflitos desnecessários e perda de tempo com arquivos irrelevantes no Git.

---

## ✅ Checklist de boas práticas para colaboradores

- Sempre crie backup antes de commits significativos (`npm run backup:create`)  
- Execute o build completo seguido de substituição de referências, validação e preview antes de enviar commits  
- Mantenha o `.gitignore` atualizado para evitar versionar arquivos temporários, `build/`, `backup/`, `logs/`, `node_modules/`, entre outros  
- Use a pipeline CI/CD para assegurar qualidade e deploy automatizado  
- Faça git pull antes de iniciar alterações locais para evitar conflitos  

---

## 🚩 Detalhes técnicos e notas

- O script `build.js` cuida da minificação, conversão e cópia dos assets essenciais, incluindo imagens, favicon e arquivos otimizados na pasta img/opt  
- O script `replace-build-refs.js` realiza substituições nos caminhos das referências no HTML, garantindo que o browser carregue corretamente os arquivos otimizados no build, incluindo CSS, JS e imagens  
- O uso dos logs padronizados em `logs/` permite rastreamento completo do processo  
- O backup e rollback permitem segurança em alterações e testes  

---


## 📄 Licença
Projeto exclusivo K7 Studio – Todos os direitos reservados.
