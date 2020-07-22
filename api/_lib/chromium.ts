import { launch, Page } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
import { FileType } from './types';
let _page: Page | null;

async function getPage() {
    if (_page) {
        return _page;
    }

    const browser = await launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, type: FileType) {
    const page = await getPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(html);
    const file = await page.screenshot({ type });
    return file;
}
