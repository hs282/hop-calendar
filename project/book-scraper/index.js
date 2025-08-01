// const browserObject = require('./browser');
// const scraperController = require('./pageController');
import browserObject from './browser.js'
import scraperController from './pageController.js'
function startScraper(id, pw) {
    //Start the browser and create a browser instance
    let browserInstance = browserObject.startBrowser()

    // Pass the browser instance to the scraper controller
    scraperController(browserInstance, id, pw)
}
export default startScraper