import { launch } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export async function getScreenshot() {
    const browser = await launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.goto('https://www.facebook.com');
    const file = await page.screenshot({ type: 'jpeg' });
    return file;
}
