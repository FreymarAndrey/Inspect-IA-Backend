import playwright from "playwright";

export const runPlaywrightTest = async (url) => {
  const browser = await playwright.chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    const start = Date.now();
    await page.goto(url, { timeout: 20000 });
    const loadTime = Date.now() - start;
    const title = await page.title();
    await browser.close();

    return { success: true, loadTime, title };
  } catch (error) {
    await browser.close();
    return { success: false, error: error.message };
  }
};
