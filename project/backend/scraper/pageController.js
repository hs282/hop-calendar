//test
// const pageScraper = require('./pageScraper');
import scraper from './pageScraper.js'
async function scrapeAll(browserInstance, id, pw, type) {
    let browser = await browserInstance;
    try{
        const data = await scraper(browser, id, pw, type);
        await browser.close()
        return data
    }
    catch(err){
        await browser.close()
        console.log("Could not resolve the browser instance => ", err);
    }
}

// module.exports = (browserInstance) => scrapeAll(browserInstance)
export default scrapeAll