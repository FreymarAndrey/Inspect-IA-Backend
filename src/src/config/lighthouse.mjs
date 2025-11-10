import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

export const runLighthouseAudit = async (url) => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox"],
    chromePath: process.env.CHROME_PATH || "/usr/bin/chromium-browser",
  });

  const opts = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, opts);
  const report = runnerResult.lhr;

  await chrome.kill();

  return {
    performance: report.categories.performance.score * 100,
    accessibility: report.categories.accessibility.score * 100,
    best_practices: report.categories["best-practices"].score * 100,
    seo: report.categories.seo.score * 100,
    overall_score:
      ((report.categories.performance.score +
        report.categories.accessibility.score +
        report.categories["best-practices"].score +
        report.categories.seo.score) /
        4) *
      100,
  };
};
