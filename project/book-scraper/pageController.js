//test
// const pageScraper = require('./pageScraper');
import pageScraper from './pageScraper'
async function scrapeAll(browserInstance, id, pw){
    let browser;
    try{
        browser = await browserInstance;
        await pageScraper.scraper(browser, id, pw);
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

// module.exports = (browserInstance) => scrapeAll(browserInstance)
export default scrapeAll