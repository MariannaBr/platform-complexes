const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const server = "proxy-server.scraperapi.com";
  const port = "8001";
  const username = "scraperapi";
  const password = "0e0f3407ec0be7b71a3670290eeb28ef";
  console.log(server);
  // where scraped data will be stored
  let scraped_quotes = [];

  (async () => {
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: [`--proxy-server=http://${server}:${port}`],
      headless: false,
    });
    const page = await browser.newPage();
    await page.authenticate({
      username: username,
      password: password,
    });

    try {
      await page.goto("http://quotes.toscrape.com/page/1/", {
        timeout: 180000,
      });
      let bodyHTML = await page.evaluate(() => document.body.innerHTML);
      let $ = cheerio.load(bodyHTML);

      // find all quotes sections
      let quotes_sections = $("div.quote");

      // loop through the quotes sections and extract data
      quotes_sections.each((index, element) => {
        quote = $(element).find("span.text").text();
        author = $(element).find("small.author").text();

        // add scraped data to scraped_quotes array
        scraped_quotes.push({
          quote: quote,
          author: author,
        });
      });
    } catch (err) {
      console.log(err);
    }

    await browser.close();
    console.log(scraped_quotes);
  })();
})();
