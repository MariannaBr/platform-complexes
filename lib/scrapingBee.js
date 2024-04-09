const puppeteer = require("puppeteer");
const proxyChain = require("proxy-chain");
const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    process.env.SCRAPING_BEE_API_KEY
  );
  var response = await client.get({
    url: url,
    params: {
      block_resources: "False",
      wait: "35000",
      wait_for: ".card",
      extract_rules: {
        apartments: {
          selector: '//input[@name="json_response"]',
          output: "@value",
        },
      },
    },
  });
  return response;
}

get("https://www.potrerolaunch.com/floorplan/")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
