import { IncomingMessage, ServerResponse } from 'http';
import { launch } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    req;

    const browser = await launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.goto('https://www.facebook.com');
    const file = await page.screenshot({ type: 'jpeg', path: 'image.jpg' });
    console.log(file)
    res.statusCode = 200
    res.end(file)
}
