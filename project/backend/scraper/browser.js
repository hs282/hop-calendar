//test
//const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())

async function startBrowser() {
    let browser
    try {
        console.log('Opening the browser......')
        browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--single-process', '--incognito', '--no-zygote'],
            ignoreHTTPSErrors: true,
        })
    } catch (err) {
        console.log('Could not create a browser instance => : ', err)
    }
    return browser
}

export default startBrowser
