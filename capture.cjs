const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport for desktop
    await page.setViewport({ width: 1440, height: 900 });

    try {
        // Wait for the app to load
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

        // Screenshot
        await page.screenshot({ path: 'C:\\Users\\User\\.gemini\\antigravity\\brain\\a8181dab-c7a8-4018-bf8e-a9886792523f\\visual_qa_hero.png', fullPage: false });

        console.log('Screenshot saved to artifact folder.');
    } catch (e) {
        console.error('Error taking screenshot:', e);
    } finally {
        await browser.close();
    }
})();
