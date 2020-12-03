//test
// const pageScraper = require('./pageScraper');
import scraper from './pageScraper.js'
async function scrapeAll(browserInstance, id, pw, type) {
    let browser;
    try{
        browser = await browserInstance;
        const data = await scraper(browser, id, pw, type);
        return data
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

// module.exports = (browserInstance) => scrapeAll(browserInstance)
export default scrapeAll