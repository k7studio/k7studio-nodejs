import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

async function runLighthouse(url) {
  console.log(`Starting Lighthouse for URL: ${url}`);

const chrome = await launch({ chromeFlags: ['--headless'] });
const options = {
  logLevel: 'info',
  output: 'html',
  port: chrome.port,
  onlyCategories: ['performance', 'seo', 'best-practices'],
};

  const runnerResult = await lighthouse(url, options);
  const reportHtml = runnerResult.report;

  fs.writeFileSync('logs/lighthouse-report.html', reportHtml);
  console.log('Lighthouse report saved as logs/lighthouse-report.html');

  // Log metrics summary
  const categories = runnerResult.lhr.categories;
  console.log(`Performance: ${categories.performance.score * 100}`);
  console.log(`Best Practices: ${categories['best-practices'].score * 100}`);
  console.log(`SEO: ${categories.seo.score * 100}`);

  await chrome.kill();

  // Create done file flag
  fs.writeFileSync('logs/validate.done', new Date().toISOString());
}

const argv = yargs(hideBin(process.argv))
  .option('url', {
    type: 'string',
    description: 'URL to test with Lighthouse',
    demandOption: true,
  })
  .help()
  .argv;

runLighthouse(argv.url).catch((err) => {
  console.error(`Error running Lighthouse: ${err.message}`);
  process.exit(1);
});

