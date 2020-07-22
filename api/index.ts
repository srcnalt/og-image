import { IncomingMessage, ServerResponse } from 'http';
import { getScreenshot } from './_lib/chromium';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    console.log('Current Platform:' + process.platform)
    console.log(req)
    const file = await getScreenshot();
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/jpeg`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
    res.end(file);
}
