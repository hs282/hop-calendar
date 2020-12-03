//test
async function scraper(browser, my_id, my_pw) {
    let url = 'https://www.gradescope.com/auth/saml/jhu'
    let page = await browser.newPage()
    // let my_id = "ima2@jh.edu";
    // let my_pw = "Wodngud1ghkdlxld!!!"
    console.log(`Navigating to ${url}...`)
    await page.goto(url)
    let scrapedData = []

    //logging in through school authorization
    await page.waitForSelector('div.form-group.col-md-24')
    await page.type('#i0116', my_id, { delay: 100 })
    await page.waitForSelector('#idSIButton9')
    await page.focus('#idSIButton9')
    await page.click('#idSIButton9')

    await page.waitForSelector('div.form-group.col-md-24')
    await page.type('#i0118', my_pw)
    await page.waitFor(4000)
    //await page.waitForSelector('#idSIButton9');
    await page.focus('#idSIButton9')
    await page.click('#idSIButton9')
    // Wait for the required DOM to be rendered

    //in blackboard
    await page.waitForSelector('.courseList--coursesForTerm')

    let urls = await page.$$eval(
        'div.courseList > div:nth-child(2) > a',
        (links) => {
            //has to be a course
            links = links.filter((link) => link.className == 'courseBox')
            //Extract the links from the data
            links = links.map((el) => el.href)
            return links
        }
    )

    // Loop through each of those links, open a new page instance and get the relevant data from them
    let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
            let dataObj = {}
            let newPage = await browser.newPage()
            await newPage.goto(link)
            //check it is fall 2020 course
            let verify = await newPage.$eval(
                'main header > div',
                (text) => text.textContent
            )
            if (verify == 'Fall 2020') {
                dataObj['courseName'] = await newPage.$eval(
                    'main header > h1',
                    (text) => text.textContent
                )
                dataObj['courseTitle'] = await newPage.$eval(
                    'nav .sidebar--subtitle',
                    (text) => text.textContent
                )
                dataObj['taskName'] = await newPage.$$eval(
                    'tbody > tr >th',
                    (names) => {
                        names = names.map((name) => name.textContent)
                        return names
                    }
                )
                dataObj['taskDue'] = await newPage.$$eval(
                    'tbody > tr > td > div > div > span',
                    (spans) => {
                        //has to be a due-date
                        spans = spans.filter(
                            (span) =>
                                span.className == 'submissionTimeChart--dueDate'
                        )
                        spans = spans.filter(
                            (span) => span.textContent.substring(0, 4) != 'Late'
                        )
                        //Extract the links from the data
                        spans = spans.map((el) => el.textContent)
                        return spans
                    }
                )
                dataObj['taskBlob'] =
                    'scraped from gradescope - submit to gradescope'
            }
            resolve(dataObj)
            await newPage.close()
        })
    for (let link in urls) {
        let currentPageData = await pagePromise(urls[link])
        //let currentPageData = await pagePromise(link)
        //if empty not include in scraped data
        if (currentPageData != {}) {
            scrapedData.push(currentPageData)
        }
    }
    return scrapedData
}

// module.exports = scraperObject;
export default scraper
