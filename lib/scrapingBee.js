const puppeteer = require("puppeteer");
const proxyChain = require("proxy-chain");
const scrapingbee = require("scrapingbee");

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient(
    "T3F66P6BIUQDW9IIO97V654TP2KXLOLK0RRTJJ04DVT0IVIUT0YO37K74HHSS30NRLWMEUDT7LN6TMTF"
    //process.env.SCRAPING_BEE_API_KEY
  );
  var response = await client.get({
    url: url,
    params: {
      block_resources: "False",
      wait_for: ".fp-group-list",
      extract_rules: {
        apartments: {
          selector: ".fp-group-list > li",
          type: "list",
          output: {
            info: {
              selector: ".bed-bath > span",
              type: "list",
              output: "text",
            },
            price: {
              selector: ".rent > div",
              type: "item",
              output: "text",
            },
            area: {
              selector: ".sq-feet > span",
              type: "list",
              output: "text",
            },
            picture: {
              selector: ".image-link img",
              output: "@src",
            },
            link: {
              selector: ".secondary-action",
              output: "@href",
            },
          },
        },
      },
    },
  });
  return response;
}

get("https://www.thegantryapts.com/san-francisco/the-gantry/conventional/")
  .then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
  })
  .catch((e) => console.log("A problem occurs : " + e.response.data));
