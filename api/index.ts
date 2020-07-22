import { IncomingMessage, ServerResponse } from 'http';
import { launch } from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    console.log('Current Platform:' + process.platform)
    console.log(req)
    
    const browser = await launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 2048, height: 1170 });
    await page.goto('https://www.facebook.com');
    const file = await page.screenshot({ type: 'jpeg' });

    res.statusCode = 200;
    res.setHeader('Content-Type', `image/jpeg`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(file);
}
