// const browserObject = require('./browser');
// const scraperController = require('./pageController');
import startBrowser from './browser.js'
import scraperController from './pageController.js'

async function startScraper(id, pw, type) {
    //Start the browser and create a browser instance
    let browserInstance = await startBrowser()
    // Pass the browser instance to the scraper controller
    const data = await scraperController(browserInstance, id, pw, type)
    return data
}
export default startScraper