//test
const scraperObject = {
    url: 'https://www.gradescope.com/auth/saml/jhu',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.courseList--coursesForTerm');
        // Get the link to all the required books
        let urls = await page.$$eval('a', links => {
            // Make sure the book to be scraped is in stock
            //links = links.filter(link => link.innerText !== "Fall 2020")
            // Extract the links from the data
            links = links.map(el =>  el.href)
            return links;
        });

        console.log(urls);
    }
}

module.exports = scraperObject;